import { FiUsers, FiFolder, FiGithub } from "react-icons/fi";
import { GiTrophyCup } from "react-icons/gi";

const Stats = ({ developer }) => {
  if (!developer) return null;

  return (
    <>
      {/* Desktop Stats */}
      <div className="hidden lg:grid grid-cols-3 border-t border-white/10 pt-2 mt-auto">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 text-violet-400 text-xl">
            <FiUsers className="w-5 h-5" />
            <span className="text-xl font-extrabold text-white">
              {developer.connections}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400 uppercase tracking-wider font-bold">
            Connections
          </p>
        </div>

        <div className="text-center border-x border-white/10">
          <div className="flex justify-center items-center gap-2 text-violet-400 text-xl">
            <FiFolder className="w-5 h-5" />
            <span className="text-xl font-extrabold text-white">
              {developer.projects}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400 uppercase tracking-wider font-bold">
            Projects
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center items-center gap-2 text-amber-400 text-xl">
            <GiTrophyCup className="w-5 h-5" />
            <span className="text-xl font-extrabold text-white">
              {developer.hackathons}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-gray-400 uppercase tracking-wider font-bold">
            Hackathons
          </p>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="grid lg:hidden grid-cols-3 border-t border-white/10 pt-3.5 mt-4">
        {/* Connections Column */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-600/15 text-violet-400 text-sm shrink-0">
            <FiUsers />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white leading-tight">
              {developer.connections}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              Connections
            </p>
          </div>
        </div>

        {/* Projects Column */}
        <div className="flex items-center gap-2 px-1 border-x border-white/10">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600/15 text-blue-400 text-sm shrink-0">
            <FiFolder />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white leading-tight">
              {developer.projects}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              Projects
            </p>
          </div>
        </div>

        {/* GitHub Column */}
        <div className="flex items-center gap-2 pl-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gray-500/15 text-gray-300 text-sm shrink-0">
            <FiGithub />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-white truncate leading-tight">
              {developer.github || "github-id"}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              GitHub
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;