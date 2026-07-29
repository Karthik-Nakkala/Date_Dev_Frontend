import { useState } from "react";
import { FiSearch, FiPlus, FiBell, FiMenu } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { PiLightningFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDrawer from "./SideNavbar";

const Header = () => {
  const user = useSelector((store) => store.user);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  return (
    <header className="w-full h-20 bg-[#070B18] border  flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center h-full">
        {/* Mobile Menu */}
        <button className="lg:hidden text-white text-3xl px-2 lg:px-4">
          <FiMenu />
        </button>

        {/* Logo */}
        <div className="lg:w-[270px] h-full flex items-center lg:px-8">
          <div className="flex items-center gap-1">
            {/* Logo Icon */}
            <div className="relative">
              <span className="hidden md:flex text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                {"</>"}
              </span>
            </div>

            {/* Logo Text */}
            <h1 className="text-3xl  font-bold tracking-tight">
              <Link to={"/"}>
                <span className="text-white">Date</span>
                <span className="text-pink-500">_Dev</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex flex-1 justify-center px-10">
        <div className="w-full max-w-[720px] h-11 rounded-xl border border-[#2A2E45] bg-[#0B1020] flex items-center px-5">
          <FiSearch className="text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Search developers, skills, technologies..."
            className="flex-1 ml-4 bg-transparent outline-none text-white placeholder:text-gray-500"
          />

          <div className="px-3 py-1 rounded-lg bg-[#151B2F] text-gray-400 text-sm">
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 px-6">
        {/* Messages */}
        <button className="hidden lg:flex relative w-12 h-11 rounded-xl border border-[#2A2E45] items-center justify-center hover:bg-[#10172C] transition">
          <HiOutlineChatBubbleLeftRight size={22} className="text-white" />

          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-600 text-[10px] text-white flex items-center justify-center font-semibold">
            2
          </span>
        </button>

        {/* Notifications */}
        <button className="relative w-12 h-11 rounded-xl lg:border border-[#2A2E45] flex items-center justify-center hover:bg-[#10172C] transition">
          <FiBell size={30} lg:size={22} className="text-white" />

          <span className="lg:hidden absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-600 text-[10px] text-white items-center justify-center font-semibold" />

          <span className="hidden lg:flex absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-600 text-[10px] text-white items-center justify-center font-semibold">
            8
          </span>
        </button>

        {/* Profile */}
        <Link to={"/feed"}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setProfileDrawerOpen(!profileDrawerOpen)}
          >
            {user && (
              <img
                src={user?.photoUrl}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}

            {user && (
              <span className="text-white text-md font-medium">
                {user?.firstName}
              </span>
            )}

            <ProfileDrawer
              isOpen={profileDrawerOpen}
              setIsOpen={setProfileDrawerOpen}
            />
          </div>
        </Link>
        {!user && (
          <span className="text-white text-md font-medium">
            <Link to={"/login"}>
              <b>Login</b>
            </Link>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
