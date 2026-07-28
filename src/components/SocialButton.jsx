const SocialButton = ({ icon, text }) => {
  return (
    <button
      className="flex items-center justify-center gap-3
      h-14 rounded-xl border border-[#2B3048]
      hover:border-pink-500 
      hover:-translate-y-1
      hover:bg-[#171B31]
      transition-all
      duration-300
      bg-[#0D1122] text-white"
    >
      <span className="text-2xl">
        {icon}
      </span>

      <span className="font-medium">
        {text}
      </span>
    </button>
  );
};

export default SocialButton;