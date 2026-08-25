import { Infinity, Zap, ShieldCheck, Crown, ArrowRight } from 'lucide-react';

const PremiumSuccess = ({ validUntil = "22 Aug 2026", onExplore, onGoToDashboard }) => {
  return (
    <div className="min-h-screen bg-[#070B18] text-slate-200 flex flex-col items-center justify-center p-4 font-sans selection:bg-purple-500/30">
      {/* Outer Card with a subtle border */}
      <div className="w-full max-w-xl mx-auto border border-[#1E2640]/60 rounded-3xl p-6 sm:p-10 bg-[#090D1F]/50 backdrop-blur-md relative overflow-hidden flex flex-col items-center text-center">
        
        {/* Glow Effects in Background */}
        <div className="absolute top-[-10%] left-[25%] w-[250px] h-[250px] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[25%] w-[250px] h-[250px] rounded-full bg-pink-600/10 blur-[100px] pointer-events-none" />

        {/* Crown Circle Badge with outer glow and sparkles */}
        <div className="relative mb-6 mt-2">
          {/* Sparkles around badge */}
          <div className="absolute -top-3 -left-3 text-purple-400 animate-pulse text-sm">✦</div>
          <div className="absolute -top-1 -right-6 text-indigo-400 animate-pulse text-xs">✦</div>
          <div className="absolute bottom-2 -left-6 text-pink-400 animate-pulse text-xs">✦</div>
          <div className="absolute bottom-4 -right-4 text-purple-300 animate-pulse text-sm">✦</div>
          
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 p-[3px] shadow-[0_0_35px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#090D1F] flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_2px_8px_rgba(168,85,247,0.5)]">
                <path d="M2 4L5 12L12 6L19 12L22 4L17 18H7L2 4Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="2" cy="4" r="1" fill="white" />
                <circle cx="22" cy="4" r="1" fill="white" />
                <circle cx="12" cy="6" r="1" fill="white" />
              </svg>
            </div>
          </div>
        </div>

        {/* Header Text */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2.5">
          You're now <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Premium!</span> 🎉
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
          Congratulations! You've unlocked all premium features.<br />
          Enjoy the full <span className="text-purple-400 font-semibold">Date_Dev</span> experience.
        </p>

        {/* Plan & Validity Card */}
        <div className="w-full border border-[#1E2640]/60 rounded-2xl p-4 bg-[#0A0F26]/80 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Diamond Badge */}
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-indigo-400">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="currentColor" opacity="0.3" />
                <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] sm:text-xs text-slate-400">Your Plan</div>
              <div className="text-sm font-bold text-purple-400">Premium</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] sm:text-xs text-slate-400">Valid Until</div>
            <div className="text-sm font-bold text-white">{validUntil}</div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          {/* Benefit 1 */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1E2640]/30 bg-[#0A0F26]/30 text-left">
            <div className="w-9 h-9 rounded-lg bg-purple-950/40 flex items-center justify-center shrink-0">
              <Infinity className="w-4.5 h-4.5 text-purple-400" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-white">Unlimited</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Connections</div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1E2640]/30 bg-[#0A0F26]/30 text-left">
            <div className="w-9 h-9 rounded-lg bg-purple-950/40 flex items-center justify-center shrink-0">
              <Zap className="w-4.5 h-4.5 text-purple-400" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-white">Advanced</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Features</div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1E2640]/30 bg-[#0A0F26]/30 text-left">
            <div className="w-9 h-9 rounded-lg bg-purple-950/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-purple-400" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-white">Priority</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Support</div>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1E2640]/30 bg-[#0A0F26]/30 text-left">
            <div className="w-9 h-9 rounded-lg bg-purple-950/40 flex items-center justify-center shrink-0">
              <Crown className="w-4.5 h-4.5 text-purple-400" />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-semibold text-white">Premium</div>
              <div className="text-[9px] sm:text-[10px] text-slate-400">Badge</div>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <button
          onClick={onExplore}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/10 hover:shadow-pink-500/25 hover:brightness-110 transition-all duration-300 cursor-pointer mb-4"
        >
          Let's Explore <ArrowRight className="w-4 h-4" />
        </button>

        {/* Dashboard Link */}
        <button
          onClick={onGoToDashboard}
          className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium cursor-pointer"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
};

export default PremiumSuccess;
