import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, SlidersHorizontal, MoreVertical } from "lucide-react";
import DeveloperCard from "./DeveloperCard";
import SwipeButtons from "./SwipeButtons";
import defaultDevelopers from "./data";
import { 
  SPRING, 
  SNAP_BACK_SPRING, 
  CARD_STACK, 
  cardVariants, 
  SWIPE_THRESHOLD, 
  SWIPE_Y_THRESHOLD, 
  SWIPE_VELOCITY_THRESHOLD, 
  EXIT_X, 
  EXIT_Y 
} from "./animations";

const DeveloperCardStack = ({
  developers = defaultDevelopers,
  onConnect,
  onIgnore,
  onSuperLike,
  onUndo,
  onBoost,
}) => {
  const devList = useMemo(() => {
    return developers && developers.length > 0 ? developers : defaultDevelopers;
  }, [developers]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  // Derive top, middle, and back cards dynamically
  const topDev = devList[currentIndex % devList.length];
  const middleDev = devList[(currentIndex + 1) % devList.length];
  const backDev = devList[(currentIndex + 2) % devList.length];

  // Motion controls and values for top card interactive layer
  const topCardControls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Single unified method to finalize swipe state transition
  const finalizeSwipe = useCallback((direction) => {
    const currentDev = devList[currentIndex % devList.length];
    setHistory((prev) => [...prev, { developer: currentDev, direction, index: currentIndex }]);

    if (direction === "right" && onConnect) onConnect(currentDev);
    if (direction === "left" && onIgnore) onIgnore(currentDev);
    if (direction === "up" && onSuperLike) onSuperLike(currentDev);

    setSwipeDirection(direction);
    setCurrentIndex((prev) => prev + 1);
  }, [devList, currentIndex, onConnect, onIgnore, onSuperLike]);

  // Programmatic swipe handler (used by action buttons & keyboard shortcuts)
  const triggerSwipe = useCallback(async (direction) => {
    const targetX = direction === "right" ? EXIT_X : direction === "left" ? -EXIT_X : 0;
    const targetY = direction === "up" ? EXIT_Y : 0;
    const targetRotate = direction === "right" ? 25 : direction === "left" ? -25 : 0;
    const targetScale = direction === "up" ? 0.85 : 1;

    setSwipeDirection(direction);

    await topCardControls.start({
      x: targetX,
      y: targetY,
      rotate: targetRotate,
      scale: targetScale,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });

    finalizeSwipe(direction);
  }, [topCardControls, finalizeSwipe]);

  // Handle Undo functionality
  const handleUndo = useCallback(async () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    const prevIndex = lastAction.index;
    const lastDirection = lastAction.direction;

    setHistory((prev) => prev.slice(0, -1));
    setSwipeDirection(lastDirection);

    const startX = lastDirection === "right" ? EXIT_X : lastDirection === "left" ? -EXIT_X : 0;
    const startY = lastDirection === "up" ? EXIT_Y : 0;
    const startRotate = lastDirection === "right" ? 25 : lastDirection === "left" ? -25 : 0;

    topCardControls.set({
      x: startX,
      y: startY,
      rotate: startRotate,
      opacity: 0,
      scale: 0.9,
    });

    setCurrentIndex(prevIndex);
    if (onUndo) onUndo(lastAction.developer);

    topCardControls.start({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: SPRING,
    });
  }, [history, topCardControls, onUndo]);

  // Handle Boost action
  const handleBoost = useCallback(() => {
    if (onBoost) onBoost();
  }, [onBoost]);

  // Reset top card position whenever index changes
  useEffect(() => {
    x.set(0);
    y.set(0);
    topCardControls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
  }, [currentIndex, x, y, topCardControls]);

  // Bind keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        triggerSwipe("right");
      } else if (e.key === "ArrowLeft") {
        triggerSwipe("left");
      } else if (e.key === "ArrowUp") {
        triggerSwipe("up");
      } else if (e.key === "ArrowDown") {
        handleUndo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerSwipe, handleUndo]);

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
      {/* Header and Title Section */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-600/15 border border-violet-500/20 text-violet-400">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Discover Developers
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-gray-400 font-medium">
              Swipe to connect, collaborate, and grow together!
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#161B33]/80 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-300 hover:bg-[#1E254A] transition active:scale-95 cursor-pointer">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span>Filters</span>
          </button>
          <button className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-[#161B33]/80 text-gray-300 hover:bg-[#1E254A] transition active:scale-95 cursor-pointer">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Cards Stack Container */}
      <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[390px] lg:max-w-[780px] h-[580px] sm:h-[620px] lg:h-[420px]">
        {/* Back Card (Index 2 in stack) */}
        {backDev && (
          <motion.div
            key={`back-${backDev.id}-${currentIndex + 2}`}
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
            key={`middle-${middleDev.id}-${currentIndex + 1}`}
            variants={cardVariants}
            initial="enter"
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
            key={`top-${topDev.id}-${currentIndex}`}
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
        onUndo={handleUndo}
        onIgnore={() => triggerSwipe("left")}
        onSuperLike={() => triggerSwipe("up")}
        onConnect={() => triggerSwipe("right")}
        onBoost={handleBoost}
        canUndo={history.length > 0}
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
          <span className="px-2 py-0.5 rounded bg-[#141A30] border border-white/10 text-gray-300 font-bold">
            ↓
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

// Top Interactive Card layer with drag gesture & dynamic overlays
function TopInteractiveCard({ developer, controls, x, y, onDragEnd }) {
  const rotate = useTransform(x, [-300, 300], [-18, 18]);
  const scale = useTransform(x, [-300, 0, 300], [1.02, 1, 1.02]);

  // Dynamic Opacities based on drag distance
  const opacityConnect = useTransform(x, [15, 120], [0, 1]);
  const opacityIgnore = useTransform(x, [-120, -15], [1, 0]);
  const opacitySuperLike = useTransform(y, [-120, -20], [1, 0]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, zIndex: 30 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={onDragEnd}
      animate={controls}
      initial={{ scale: 1, y: 0, opacity: 1 }}
      transition={SPRING}
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
    >
      <DeveloperCard developer={developer} />

      {/* Swipe Overlays */}
      {/* Connect Overlay (Green) */}
      <motion.div
        style={{ opacity: opacityConnect }}
        className="absolute inset-0 z-40 bg-emerald-500/15 pointer-events-none rounded-[28px] flex items-center justify-center border-4 border-emerald-400/60"
      >
        <div className="text-emerald-400 text-3xl sm:text-5xl font-black uppercase tracking-widest border-4 sm:border-8 border-emerald-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl rotate-[-12deg] bg-black/60 shadow-2xl backdrop-blur-sm">
          Connect
        </div>
      </motion.div>

      {/* Ignore Overlay (Red) */}
      <motion.div
        style={{ opacity: opacityIgnore }}
        className="absolute inset-0 z-40 bg-rose-500/15 pointer-events-none rounded-[28px] flex items-center justify-center border-4 border-rose-500/60"
      >
        <div className="text-rose-500 text-3xl sm:text-5xl font-black uppercase tracking-widest border-4 sm:border-8 border-rose-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl rotate-[12deg] bg-black/60 shadow-2xl backdrop-blur-sm">
          Ignore
        </div>
      </motion.div>

      {/* Super Like Overlay (Purple/Blue) */}
      <motion.div
        style={{ opacity: opacitySuperLike }}
        className="absolute inset-0 z-40 bg-violet-500/15 pointer-events-none rounded-[28px] flex items-center justify-center border-4 border-violet-400/60"
      >
        <div className="text-violet-400 text-3xl sm:text-5xl font-black uppercase tracking-widest border-4 sm:border-8 border-violet-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl rotate-0 -translate-y-4 bg-black/60 shadow-2xl backdrop-blur-sm">
          Super Like
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeveloperCardStack;