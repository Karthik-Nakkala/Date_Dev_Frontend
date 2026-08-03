import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import DeveloperCard from "./DeveloperCard";
import SwipeButtons from "./SwipeButtons";
import {
  SPRING,
  SNAP_BACK_SPRING,
  cardVariants,
  SWIPE_THRESHOLD,
  SWIPE_Y_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  EXIT_X,
  EXIT_Y,
} from "./animations";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addDevs, removeDev } from "../../store/slices/feedSlice";
import TopInteractiveCard from "./TopInteractiveCard";

const DeveloperCardStack = () => {
  const developers = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Motion controls and values for top card interactive layer
  const topCardControls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Derive top, middle, and back cards directly from array front
  const topDev = developers?.[0];
  const middleDev = developers?.[1];
  const backDev = developers?.[2];

  // Reset top card position whenever top developer ID changes
  useEffect(() => {
    x.set(0);
    y.set(0);
    topCardControls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
  }, [topDev?._id, x, y, topCardControls]);

  // Single unified method to finalize swipe state transition
  const finalizeSwipe = useCallback(
    async (direction) => {
      const currentDev = developers[0];

      if (!currentDev?._id) return;

      let status = null;

      if (direction === "right") status = "interested";
      if (direction === "left") status = "ignored";

      setSwipeDirection(direction);

      if (["interested", "ignored"].includes(status)) {
        try {
          await axios.post(
            BASE_URL + "/request/send/" + status + "/" + currentDev._id,
            {},
            {
              withCredentials: true,
            },
          );
        } catch (err) {
          console.log(err);
        }
      }

      // Remove swiped developer from Redux state so developers[0] becomes the next developer
      dispatch(removeDev(currentDev._id));
    },
    [developers, dispatch],
  );

  // Programmatic swipe handler (used by action buttons & keyboard shortcuts)
  const triggerSwipe = useCallback(
    async (direction) => {
      if (!developers[0]) return;

      const targetX =
        direction === "right" ? EXIT_X : direction === "left" ? -EXIT_X : 0;
      const targetY = direction === "up" ? EXIT_Y : 0;
      const targetRotate =
        direction === "right" ? 25 : direction === "left" ? -25 : 0;
      const targetScale = direction === "up" ? 0.85 : 1;

      setSwipeDirection(direction);

      await topCardControls.start({
        x: targetX,
        y: targetY,
        rotate: targetRotate,
        scale: targetScale,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });

      finalizeSwipe(direction);
    },
    [developers, topCardControls, finalizeSwipe],
  );

  // Bind keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        triggerSwipe("right");
      } else if (e.key === "ArrowLeft") {
        triggerSwipe("left");
      } else if (e.key === "ArrowUp") {
        triggerSwipe("up");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerSwipe]);

  const fetchDevelopers = async () => {
    try {
      setIsLoading(true);
      const devs = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addDevs(devs?.data?.feedUsers || []));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[600px] items-center justify-center text-white font-medium">
        Loading developers...
      </div>
    );
  }

  if (!developers.length) {
    return (
      <div className="flex flex-col h-[500px] items-center justify-center text-white gap-3">
        <p className="text-xl font-bold text-gray-300">No more developers found!</p>
        <p className="text-sm text-gray-500">Check back later for new profiles.</p>
      </div>
    );
  }

  // Drag End handler for touch & mouse drag gestures
  const handleDragEnd = async (event, info) => {
    const dragX = info.offset.x;
    const dragY = info.offset.y;
    const velX = info.velocity.x;
    const velY = info.velocity.y;

    if (dragX > SWIPE_THRESHOLD || velX > SWIPE_VELOCITY_THRESHOLD) {
      setSwipeDirection("right");
      await topCardControls.start({
        x: EXIT_X,
        rotate: 25,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });
      finalizeSwipe("right");
    } else if (dragX < -SWIPE_THRESHOLD || velX < -SWIPE_VELOCITY_THRESHOLD) {
      setSwipeDirection("left");
      await topCardControls.start({
        x: -EXIT_X,
        rotate: -25,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });
      finalizeSwipe("left");
    } else if (dragY < SWIPE_Y_THRESHOLD || velY < -SWIPE_VELOCITY_THRESHOLD) {
      setSwipeDirection("up");
      await topCardControls.start({
        y: EXIT_Y,
        scale: 0.85,
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });
      finalizeSwipe("up");
    } else {
      // Spring back to center when gesture fails to cross threshold
      topCardControls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: SNAP_BACK_SPRING,
      });
    }
  };

  return (
    <section className="w-full select-none max-w-[1200px] mx-auto px-4 py-4 sm:py-6">
      {/* Cards Stack Container */}
      <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[390px] lg:max-w-[780px] h-[580px] sm:h-[620px] lg:h-[420px]">
        {/* Back Card (Index 2 in stack) */}
        {backDev && (
          <motion.div
            key={`back-${backDev._id || backDev.id}`}
            variants={cardVariants}
            initial="enter"
            animate="back"
            transition={SPRING}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 10 }}
          >
            <DeveloperCard developer={backDev} />
          </motion.div>
        )}

        {/* Middle Card (Index 1 in stack) */}
        {middleDev && (
          <motion.div
            key={`middle-${middleDev._id || middleDev.id}`}
            variants={cardVariants}
            initial={{ scale: 0.9, y: 32, opacity: 0.55 }}
            animate="middle"
            transition={SPRING}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 20 }}
          >
            <DeveloperCard developer={middleDev} />
          </motion.div>
        )}

        {/* Top Interactive Card (Index 0 in stack) */}
        {topDev && (
          <TopInteractiveCard
            key={`top-${topDev._id || topDev.id}`}
            developer={topDev}
            controls={topCardControls}
            x={x}
            y={y}
            onDragEnd={handleDragEnd}
          />
        )}
      </div>

      {/* Swipe Control Buttons */}
      <SwipeButtons
        onIgnore={() => triggerSwipe("left")}
        onSuperLike={() => triggerSwipe("up")}
        onConnect={() => triggerSwipe("right")}
      />

      {/* Responsive Hints / Bottom Tip */}
      <div className="mt-6 text-center text-xs font-medium text-gray-400">
        {/* Desktop View Keyboard shortcuts hint */}
        <div className="hidden lg:flex items-center justify-center gap-1.5">
          <span>💡 Tip: You can use keyboard shortcuts</span>
          <span className="px-2 py-0.5 rounded bg-[#141A30] border border-white/10 text-gray-300 font-bold">
            ←
          </span>
          <span className="px-2 py-0.5 rounded bg-[#141A30] border border-white/10 text-gray-300 font-bold">
            →
          </span>
          <span className="px-2 py-0.5 rounded bg-[#141A30] border border-white/10 text-gray-300 font-bold">
            ↑
          </span>
        </div>

        {/* Mobile View Gesture hint */}
        <div className="lg:hidden flex items-center justify-center gap-2 text-gray-400">
          <span>Swipe right to connect</span>
          <span className="text-violet-400 font-bold">⇄</span>
        </div>
      </div>
    </section>
  );
};

export default DeveloperCardStack;


