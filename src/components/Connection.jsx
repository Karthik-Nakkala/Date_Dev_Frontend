import {
  BadgeCheck,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

const Connection = ({ connection }) => {
  return (
    <div className="group flex items-center rounded-2xl border border-zinc-800 bg-[#0c1018] px-5 py-3.5 transition-all duration-300 hover:border-violet-600/60 hover:bg-[#101522] hover:shadow-[0_0_35px_rgba(139,92,246,0.08)]">
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={connection.photoUrl}
            alt={connection.firstName}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#1b2232]"
          />

          {connection?.isOnline && (
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-[#0c1018] bg-emerald-500"></span>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0">
          {/* Name */}
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[18px] font-semibold text-white">
              {connection.firstName} {connection.lastName}
            </h3>

            {connection.isVerified && (
              <BadgeCheck
                size={17}
                className="fill-violet-600 text-violet-400"
              />
            )}
          </div>

          {/* Role */}
          <p className="mt-1 text-sm text-zinc-400">{connection.role}</p>

          {/* Skills */}
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            {connection.skills?.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                {index !== 0 && (
                  <span className="h-1 w-1 rounded-full bg-zinc-600"></span>
                )}

                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="ml-auto flex items-center gap-3">

        {/* Message Button */}
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-600/40 bg-violet-600/10 text-violet-400 transition hover:border-violet-500 hover:bg-violet-600 hover:text-white">
          <MessageSquare size={18} />
        </button>

        {/* Menu */}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-[#121824] text-zinc-400 transition hover:border-zinc-700 hover:bg-[#171f2e] hover:text-white">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
};

export default Connection;
