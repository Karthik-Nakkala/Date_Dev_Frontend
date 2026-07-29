import { X, User, Eye, Settings, LogOut } from "lucide-react";

const ProfileDrawer = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-80 bg-[#0E1222] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="text-xl font-semibold text-white">Account</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="mt-4 px-3">
          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-gray-300 transition hover:bg-violet-600/20 hover:text-violet-400">
            <User size={20} />
            <span>Profile</span>
          </button>


          <button className="mt-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-gray-300 transition hover:bg-violet-600/20 hover:text-violet-400">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <div className="my-5 border-t border-white/10" />

          <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/15">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
