import Logo from "../components/Logo";
import FeatureItem from "../components/FeatureItem";
import SignupCard from "../components/SignupCard";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaRocket,
  FaComments,
  FaTrophy,
  FaBriefcase,
} from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();

  const featureItems = [
    {
      id: 1,
      icon: <FaUsers />,
      title: "Find Developers",
      description: "Meet your future teammates",
    },
    {
      id: 2,
      icon: <FaRocket />,
      title: "Build Together",
      description: "Create projects. Hack together",
    },
    {
      id: 3,
      icon: <FaComments />,
      title: "Chat & Connect",
      description: "Instant chats, meaningful connections",
    },
    {
      id: 4,
      icon: <FaTrophy />,
      title: "Grow Together",
      description: "Learn, share and grow together",
    },
    {
      id: 5,
      icon: <FaBriefcase />,
      title: "Opportunities",
      description: "Discover projects & career opportunities",
    },
  ];

  return (
    <div
      className="h-screen w-screen bg-[#050816] text-white overflow-hidden relative font-sans bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/programmer bg.png')" }}
    >
      {/* Overlay for ideal contrast */}
      <div className="absolute inset-0 bg-[#050816]/40 backdrop-brightness-95 pointer-events-none" />

      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600/20 blur-[140px] pointer-events-none" />

      {/* DESKTOP SINGLE FRAME LAYOUT (lg:) */}
      <div className="hidden lg:grid lg:grid-cols-2 h-screen w-full relative z-10 p-4 xl:p-6 overflow-hidden">
        {/* LEFT SIDE (Brand & Features) */}
        <div className="flex flex-col justify-center items-start pl-6 xl:pl-12 space-y-5 my-auto">
          <Logo
            subtitle={
              <p className="text-gray-300 text-left text-xs xl:text-sm max-w-sm leading-snug">
                Create your developer profile.
                <br />
                Connect. Collaborate. Build.
              </p>
            }
          />

          <div className="flex flex-col items-start gap-2.5 pt-2 pl-2">
            {featureItems.map((item) => (
              <FeatureItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Signup Form) */}
        <div className="flex flex-col justify-center items-center relative h-full">
          {/* Top Navigation Link */}
          <div className="absolute right-4 top-2 xl:right-8 z-20 flex items-center gap-1.5 text-gray-400 text-xs font-normal">
            <span>Already have an account?</span>
            <button
              onClick={() => navigate("/login")}
              className="text-violet-400 hover:text-pink-400 font-medium transition cursor-pointer"
            >
              Login
            </button>
          </div>

          {/* Signup Form Card */}
          <div className="w-full flex justify-center items-center my-auto">
            <SignupCard />
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT (< lg) */}
      <div className="lg:hidden min-h-screen bg-[#050816] flex flex-col px-4 sm:px-6 pt-4 pb-8 relative z-10 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/login")}
            className="
            w-9
            h-9
            rounded-full
            bg-[#12162B]
            border
            border-[#2A2F48]
            flex
            items-center
            justify-center
            text-white
            active:scale-95
            transition
            cursor-pointer
          "
          >
            <FiArrowLeft size={18} />
          </button>

          <div className="text-xs text-gray-400 font-normal">
            Already registered?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-violet-400 hover:text-pink-400 font-medium transition"
            >
              Login
            </button>
          </div>
        </div>

        <Logo
          subtitle={
            <p className="text-gray-400 text-center text-xs">
              Create your developer profile. Connect. Collaborate. Build.
            </p>
          }
        />

        <div className="relative z-10 mt-4 w-full flex justify-center pb-6">
          <SignupCard />
        </div>
      </div>
    </div>
  );
};

export default Signup;
