import { CheckCircle2, ShieldCheck, Mail, Phone, Globe } from "lucide-react";
import SkillBadge from "../DeveloperCardStack/SkillBadge";

const ProfileOverview = () => {
  const developer = {
    skills: [
      "Leadership",
      "Strategy",
      "Swordsmanship",
      "Archery",
      "Battle Planning",
      "React",
      "Node.js",
      "MongoDB",
      "System Design",
      "Docker",
    ],

    bio: `Amarendra Baahubali is a visionary leader and fearless warrior known
for his unwavering courage, strategic brilliance, and ability to inspire
everyone around him. Whether leading armies into battle or building powerful
alliances, he believes true strength comes from protecting people and lifting
others to greatness.`,

    verified: true,

    email: "baahubali@mahishmati.com",

    phone: "+91 98765 43210",

    website: "www.mahishmati.dev",
  };

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left */}
      <div className="lg:col-span-2 rounded-[28px] border border-white/10 bg-[#0B1020] p-8 shadow-xl">

        {/* Skills */}

        <div>
          <h2 className="text-2xl font-bold text-white">
            Skills & Expertise
          </h2>

          <p className="mt-2 text-gray-400">
            Technologies, leadership qualities and areas of expertise.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {developer.skills.map((skill) => (
              <SkillBadge
                key={skill}
                skill={skill}
                showIcon={true}
              />
            ))}
          </div>
        </div>

        {/* About */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white">
            About Me
          </h2>

          <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
            <p className="leading-8 text-gray-300">
              {developer.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="rounded-[28px] border border-white/10 bg-[#0B1020] p-8 shadow-xl h-fit">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={26}
            className="text-violet-400"
          />

          <h2 className="text-2xl font-bold text-white">
            Verification
          </h2>

        </div>

        <div className="mt-8 space-y-5">

          <div className="flex items-start gap-4">

            <CheckCircle2
              size={22}
              className="text-emerald-400 mt-1"
            />

            <div>
              <h3 className="text-white font-semibold">
                Identity Verified
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Government identity successfully verified.
              </p>
            </div>

          </div>

          <div className="flex items-start gap-4">

            <CheckCircle2
              size={22}
              className="text-emerald-400 mt-1"
            />

            <div>
              <h3 className="text-white font-semibold">
                Developer Profile Verified
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Skills and portfolio reviewed by the community.
              </p>
            </div>

          </div>

          <div className="flex items-start gap-4">

            <CheckCircle2
              size={22}
              className="text-emerald-400 mt-1"
            />

            <div>
              <h3 className="text-white font-semibold">
                Email Verified
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                {developer.email}
              </p>
            </div>

          </div>

        </div>

        <div className="my-8 h-px bg-white/10" />

        <h3 className="text-white font-semibold">
          Contact Information
        </h3>

        <div className="mt-5 space-y-4">

          <div className="flex items-center gap-3 text-gray-300">

            <Mail
              size={18}
              className="text-violet-400"
            />

            {developer.email}

          </div>

          <div className="flex items-center gap-3 text-gray-300">

            <Phone
              size={18}
              className="text-violet-400"
            />

            {developer.phone}

          </div>

          <div className="flex items-center gap-3 text-gray-300">

            <Globe
              size={18}
              className="text-violet-400"
            />

            {developer.website}

          </div>

        </div>

        <button
          className="
            mt-8
            w-full
            rounded-xl
            bg-violet-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-violet-500
          "
        >
          Contact Developer
        </button>

      </div>
    </section>
  );
};

export default ProfileOverview;