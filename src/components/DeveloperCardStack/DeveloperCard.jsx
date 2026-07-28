import { HiBadgeCheck } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import SkillBadge from "./SkillBadge";
import Stats from "./Stats";

const DeveloperCard = ({ developer }) => {
  if (!developer) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/12 bg-[#0B1020]/95 shadow-2xl backdrop-blur-xl select-none">
      
      {/* Desktop Card Layout */}
      <div className="hidden lg:flex h-full w-full">
        {/* Left Section (Developer Image) */}
        <div className="w-[38%] relative h-full shrink-0 overflow-hidden">
          <img
            src={developer.image}
            alt={developer.name}
            className="h-full w-full object-cover pointer-events-none"
          />
          {developer.openToOpportunities && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#062419]/90 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to Opportunities
            </div>
          )}
        </div>

        {/* Right Section (Developer Information) */}
        <div className="flex flex-1 flex-col p-7 sm:p-8 justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {developer.name}
                  </h2>
                  {developer.verified && (
                    <HiBadgeCheck className="text-blue-500 text-2xl shrink-0" />
                  )}
                </div>
                <p className="mt-1 text-base sm:text-lg font-semibold text-violet-400">
                  {developer.role} {developer.company}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-gray-400 flex items-center gap-1.5 font-medium">
                  <span>📍</span> {developer.location}
                </p>
              </div>

              <button className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition cursor-pointer">
                <BsThreeDotsVertical className="text-lg" />
              </button>
            </div>

            {/* Skill Chips */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
              {developer.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} showIcon={false} />
              ))}
            </div>

            {/* Bio Description */}
            <p className="mt-5 sm:mt-6 text-sm leading-relaxed text-gray-300 font-normal">
              {developer.bio}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mt-auto">
            <Stats developer={developer} />
          </div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden flex flex-col h-full w-full">
        {/* Top Image Section */}
        <div className="relative w-full h-[350px] sm:h-[380px] shrink-0 overflow-hidden">
          <img
            src={developer.image}
            alt={developer.name}
            className="h-full w-full object-cover pointer-events-none"
          />
          
          {/* Subtle gradient overlay on bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-black/30" />
          
          {/* Top-left Verified Badge */}
          <div className="absolute top-4 left-4">
            {developer.verified && (
              <div className="flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-violet-600/35 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Verified
              </div>
            )}
          </div>

          {/* Top-right Options Button */}
          <div className="absolute top-4 right-4">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-white shadow-lg active:scale-95 cursor-pointer">
              <BsThreeDotsVertical className="text-base" />
            </button>
          </div>

          {/* Floating Basic Info on Image Bottom */}
          <div className="absolute bottom-4 left-5 right-5">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {developer.name}
              </h2>
              {/* Hexagon-Star Purple Icon */}
              <span className="text-violet-400 flex items-center">
                <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-current" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l8.5 4.9v9.8L12 22l-8.5-4.9V6.9z" fillOpacity="0.25" />
                  <path d="M12 2l8.5 4.9v9.8L12 22l-8.5-4.9V6.9z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" className="fill-violet-300" />
                </svg>
              </span>
            </div>
            <p className="text-xs text-gray-300 font-medium mt-0.5">
              📍 {developer.age ? `${developer.age} • ` : ""}{developer.location}
            </p>
            <div className="mt-1">
              <p className="text-sm font-bold text-violet-400">
                {developer.role}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {developer.company}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className="flex-1 flex flex-col p-5 bg-[#0B1020] justify-between overflow-y-auto">
          <div>
            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2">
              {developer.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} showIcon={true} />
              ))}
            </div>

            {/* Bio with Left Violet Bar */}
            <div className="mt-4 border-l-2 border-violet-500 pl-3 py-0.5">
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                {developer.bio}
              </p>
            </div>
          </div>

          {/* Mobile Stats Bar */}
          <Stats developer={developer} />
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;