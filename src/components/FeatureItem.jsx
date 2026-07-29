const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 flex items-center justify-center text-white text-xl shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="text-white font-semibold text-base">{title}</h3>

        <p className="text-gray-400 w-3xs leading-5 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
