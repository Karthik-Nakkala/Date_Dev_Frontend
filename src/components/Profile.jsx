import { HiBadgeCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import SkillBadge from "./DeveloperCardStack/SkillBadge";
import Stats from "./DeveloperCardStack/Stats";

const Profile = () => {
  const developer = useSelector((store) => store.authUser);

  console.log("AuthUser--->",developer);

  if (!developer) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <div className="rounded-3xl border border-white/10 bg-[#0B1020] overflow-hidden shadow-2xl">

        {/* Cover */}
        <div className="h-52 bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-700" />

        {/* Profile */}
        <div className="px-8 pb-8">
          <img
            src={developer.photoUrl}
            alt={developer.firstName}
            className="-mt-16 h-32 w-32 rounded-3xl border-4 border-[#0B1020] object-cover"
          />

          <div className="mt-5 flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white">
              {developer.firstName}
            </h1>

            {developer.verified && (
              <HiBadgeCheck className="text-blue-500 text-2xl" />
            )}
          </div>

          <p className="mt-2 text-violet-400 font-semibold">
            {developer.role}
          </p>

          <p className="text-gray-400">
            {developer.company}
          </p>

          <p className="mt-1 text-gray-400">
            📍 {developer.location}
          </p>

          <p className="mt-1 text-gray-400">
            🎂 {developer.age} years
          </p>

          {developer.openForWars && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Open For Wars
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} showIcon />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="mb-2 text-xl font-semibold text-white">
              About
            </h2>

            <p className="leading-7 text-gray-300">
              {developer.bio}
            </p>
          </div>

          <div className="mt-8">
            <Stats developer={developer} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;