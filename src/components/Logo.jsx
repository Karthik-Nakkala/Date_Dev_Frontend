const Logo = () => {
  return (
    <div className="flex flex-col items-center  gap-3">

      {/* Logo Icon */}
      <div
       className="
       text-4xl md:text-5xl lg:text-6xl
       font-bold
       bg-gradient-to-r
       from-violet-500
       via-purple-500
       to-pink-500
       bg-clip-text
       text-transparent
       drop-shadow-[0_0_30px_rgba(168,85,247,.45)]
       animate-bounce
       "
       >
        {"</>"}
      </div>

      {/* Logo Text */}
      <div
       className="
       text-3xl md:text-4xl lg:text-5xl
       font-black
       tracking-tight
       leading-none
       animate-fade
       "
       >
        <span className="text-white">Date</span>
        <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          _Dev
        </span>
      </div>

      <p className="text-gray-400 text-center lg:text-left text-base max-w-md">
        Meet developers. Build teams.
        <br />
        Ship projects.
      </p>

    </div>
  );
};

export default Logo;