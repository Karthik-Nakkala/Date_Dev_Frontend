// Spring configurations for Framer Motion card animations
export const SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.8,
};

export const SNAP_BACK_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 30,
};

// Thresholds for swipe gestures
export const SWIPE_THRESHOLD = 110;
export const SWIPE_Y_THRESHOLD = -90;
export const SWIPE_VELOCITY_THRESHOLD = 400;

// Dismissal off-screen travel distances
export const EXIT_X = 1200;
export const EXIT_Y = -800;

// Card stack resting transform properties
export const CARD_STACK = [
  // Top card (interactive)
  { scale: 1, y: 0, opacity: 1 },
  // Middle card (behind top)
  { scale: 0.95, y: 16, opacity: 0.85 },
  // Back card (behind middle)
  { scale: 0.90, y: 32, opacity: 0.55 },
];

export const cardVariants = {
  enter: { scale: 0.85, y: 48, opacity: 0 },
  top: CARD_STACK[0],
  middle: CARD_STACK[1],
  back: CARD_STACK[2],
};
