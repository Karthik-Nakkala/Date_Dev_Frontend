import { useAnimation, useMotionValue, useTransform } from "framer-motion";
import { SWIPE_X_THRESHOLD, SWIPE_Y_THRESHOLD, EXIT_X, EXIT_Y } from "./animations";

export function useSwipe(onSwipeComplete) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Rotate based on horizontal drag distance
  const rotate = useTransform(x, [-300, 300], [-25, 25]);

  // Transform opacity based on drag distance
  const opacityRight = useTransform(x, [0, 120], [0, 1]);
  const opacityLeft = useTransform(x, [-120, 0], [1, 0]);
  const opacityUp = useTransform(y, [-100, 0], [1, 0]);

  // Programmatic swipe (for buttons)
  const swipe = async (direction) => {
    if (direction === "right") {
      await controls.start({
        x: EXIT_X,
        y: 100,
        rotate: 20,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      });
      onSwipeComplete("right");
    } else if (direction === "left") {
      await controls.start({
        x: -EXIT_X,
        y: 100,
        rotate: -20,
        opacity: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      });
      onSwipeComplete("left");
    } else if (direction === "up") {
      await controls.start({
        x: 0,
        y: EXIT_Y,
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.35, ease: "easeOut" },
      });
      onSwipeComplete("up");
    }
  };

  const handleDragEnd = async (event, info) => {
    const dragX = info.offset.x;
    const dragY = info.offset.y;

    // Check thresholds
    if (dragX > SWIPE_X_THRESHOLD) {
      await controls.start({
        x: EXIT_X,
        y: dragY * 1.5,
        rotate: 25,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipeComplete("right");
    } else if (dragX < -SWIPE_X_THRESHOLD) {
      await controls.start({
        x: -EXIT_X,
        y: dragY * 1.5,
        rotate: -25,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipeComplete("left");
    } else if (dragY < SWIPE_Y_THRESHOLD) {
      await controls.start({
        x: dragX * 0.5,
        y: EXIT_Y,
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.3 },
      });
      onSwipeComplete("up");
    } else {
      // Snap back
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      });
    }
  };

  return {
    x,
    y,
    rotate,
    opacityRight,
    opacityLeft,
    opacityUp,
    controls,
    handleDragEnd,
    swipe,
  };
}
