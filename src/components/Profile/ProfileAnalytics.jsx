import {
  Trophy,
  FolderGit2,
  Cpu,
  Medal,
  Star,
  TrendingUp,
} from "lucide-react";

const ProfileAnalytics = () => {
  const developer = {
    topSkills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "System Design",
      "Docker",
    ],

    projects: 28,
    awards: 14,
    technologies: 37,

    achievements: [
      {
        title: "Built Mahishmati Battle Management System",
        year: "2024",
      },
      {
        title: "Honesty Award Winner With Atmost Passion",
        year: "2023",
      },
    ],
  };

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT */}

      <div className="lg:col-span-2 space-y-8">
        {/* Top Skills */}

        <div className="rounded-[28px] border border-white/10 bg-[#0B1020] p-8">
          <h2 className="text-2xl font-bold text-white">
            Top Skills
          </h2>

          <p className="mt-2 text-gray-400">
            Most used technologies and expertise.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {developer.topSkills.map((skill) => (
              <div
                key={skill}
                className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-[24px] border border-white/10 bg-[#0B1020] p-6">
            <FolderGit2 className="text-violet-400" size={28} />

            <h2 className="mt-5 text-4xl font-bold text-white">
              {developer.projects}
            </h2>

            <p className="mt-2 text-gray-400">
              Projects Completed
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#0B1020] p-6">
            <Medal className="text-yellow-400" size={28} />

            <h2 className="mt-5 text-4xl font-bold text-white">
              {developer.awards}
            </h2>

            <p className="mt-2 text-gray-400">
              Awards Received
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#0B1020] p-6">
            <Cpu className="text-cyan-400" size={28} />

            <h2 className="mt-5 text-4xl font-bold text-white">
              {developer.technologies}
            </h2>

            <p className="mt-2 text-gray-400">
              Technologies Used
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="rounded-[28px] border border-white/10 bg-[#0B1020] p-8">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400" size={26} />

          <h2 className="text-2xl font-bold text-white">
            Recent Achievements
          </h2>
        </div>

        <div className="mt-8 space-y-5">
          {developer.achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6.5 transition hover:border-violet-500/30"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {achievement.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {achievement.year}
                  </p>
                </div>

                <Star
                  size={20}
                  className="text-yellow-400"
                />
              </div>
            </div>
          ))}
        </div>



        
      </div>
    </section>
  );
};

export default ProfileAnalytics;