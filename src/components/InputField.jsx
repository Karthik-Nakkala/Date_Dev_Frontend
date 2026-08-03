import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const InputField = ({
  label,
  type = "text",
  placeholder,
  icon,
  showForgot = false,
  value,
  setField,
  autoComplete
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">

      <div className="flex justify-between items-center">
        <label className="text-white font-medium">
          {label}
        </label>

        {showForgot && (
          <button className="text-violet-400 hover:text-pink-500 text-sm">
            Forgot password?
          </button>
        )}
      </div>

      <div className="h-12 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-4 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all duration-300">

        <div className="text-gray-400 text-xl">
          {icon}
        </div>

        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-gray-500"
          value={value}
          onChange={(e)=>setField(e.target.value)}
          autoComplete={autoComplete}
        />

        {isPassword && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}

      </div>
    </div>
  );
};

export default InputField;