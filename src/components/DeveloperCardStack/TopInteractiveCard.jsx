import { motion,useTransform } from "framer-motion";
import { SPRING } from "./animations";
import DeveloperCard from "./DeveloperCard";

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


export default TopInteractiveCard;