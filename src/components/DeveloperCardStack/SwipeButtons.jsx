import { RotateCcw, X, Star, Heart, Zap } from "lucide-react";

const SwipeButtons = ({
  onUndo,
  onIgnore,
  onSuperLike,
  onConnect,
  onBoost,
  canUndo = false,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
      {/* Undo Button */}
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-amber-500/25 bg-[#14192E] shadow-xl transition-all duration-300 ${
          canUndo
            ? "cursor-pointer hover:-translate-y-0.5 hover:border-amber-500/50 hover:bg-[#1A203B] hover:shadow-amber-500/15 active:scale-95"
            : "cursor-not-allowed opacity-35"
        }`}
        title="Undo Swipe"
      >
        <RotateCcw className="h-5 w-5 text-amber-400 transition-transform group-hover:rotate-[-45deg]" />
      </button>

      {/* Ignore Button */}
      <button
        onClick={onIgnore}
        className="group relative flex h-14 w-14 sm:h-15 sm:w-15 cursor-pointer items-center justify-center rounded-full border border-rose-500/25 bg-[#14192E] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500/50 hover:bg-[#1A203B] hover:shadow-rose-500/20 active:scale-95"
        title="Pass / Ignore"
      >
        <X className="h-6 w-6 text-rose-500 transition-transform group-hover:scale-110" />
      </button>

      {/* Super Like Button */}
      <button
        onClick={onSuperLike}
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 cursor-pointer items-center justify-center rounded-full border border-violet-500/25 bg-[#14192E] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/50 hover:bg-[#1A203B] hover:shadow-violet-500/20 active:scale-95"
        title="Super Like"
      >
        <Star className="h-5.5 w-5.5 text-violet-400 fill-transparent transition-all group-hover:scale-110 group-hover:fill-violet-400/25" />
      </button>

      {/* Connect Button */}
      <button
        onClick={onConnect}
        className="group relative flex h-14 w-14 sm:h-15 sm:w-15 cursor-pointer items-center justify-center rounded-full border border-emerald-500/25 bg-[#14192E] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-[#1A203B] hover:shadow-emerald-500/20 active:scale-95"
        title="Connect"
      >
        <Heart className="h-6 w-6 text-emerald-400 fill-transparent transition-all group-hover:scale-110 group-hover:fill-emerald-400/25" />
      </button>

      {/* Boost Button */}
      <button
        onClick={onBoost}
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 cursor-pointer items-center justify-center rounded-full border border-blue-500/25 bg-[#14192E] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-[#1A203B] hover:shadow-blue-500/20 active:scale-95"
        title="Boost Profile"
      >
        <Zap className="h-5 w-5 text-blue-400 fill-transparent transition-all group-hover:scale-110 group-hover:fill-blue-400/25" />
      </button>
    </div>
  );
};

export default SwipeButtons;