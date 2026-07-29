import InputField from "./InputField";
import SocialButton from "./SocialButton";
import axios from "axios";

import { FiMail, FiLock } from "react-icons/fi";

import { FaGithub, FaDiscord, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LoginCard = () => {
  const [emailId, setEmailId] = useState("saaho.wadha@wadha.com");
  const [password, setPassword] = useState("Undercover@777");
  const [error,setError]=useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true },

      );
      dispatch(addUser(user.data));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div
      className="
      w-full
      max-w-xl
      md:max-w-lg
      rounded-2xl
      border
      border-[#2B3048]
      bg-[#101525]/75
      backdrop-blur-2xl
      p-4
      shadow-[0_0_50px_rgba(0,0,0,.45)]
      transition-all
      duration-500
      hover:scale-[1.01]
      hover:border-violet-500
    "
    >
      {/* Heading */}

      <div className="text-2xl lg:text-3xl font-bold">Welcome Back 👋</div>

      <p className="text-gray-400 mt-2 text-sm ">
        Login to continue to Date_Dev
      </p>

      {/* Form */}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <InputField
          label="Email address"
          placeholder="Enter your email"
          className="text-sm md:text-base"
          icon={<FiMail />}
          value={emailId}
          setField={setEmailId}
          autoComplete="email"
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          icon={<FiLock />}
          showForgot
          value={password}
          setField={setPassword}
          autoComplete="current-password"
        />

        <p className="text-red-600">{error}</p>

        {/* Remember */}

        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-violet-600 w-4 h-4" />

          <span className="text-gray-300">Remember me</span>
        </div>

        {/* Login */}

        <button
          className="
          h-10
          md:h-11
          rounded-xl
          font-semibold
          text-base
          md:text-lg
          w-full
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-pink-600
          hover:opacity-90
          shadow-[0_0_25px_rgba(139,92,246,.45)]
          hover:scale-[1.02]
          transition-all
          duration-300
        "
        >
          Login
        </button>
      </form>

      {/* Divider */}

      <div className="flex items-center gap-5 my-5">
        <div className="h-px flex-1 bg-[#2B3048]" />

        <span className="text-gray-500">or continue with</span>

        <div className="h-px flex-1 bg-[#2B3048]" />
      </div>

      {/* Social */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SocialButton icon={<FaGithub />} text="GitHub" />

        <SocialButton icon={<FaGoogle />} text="Google" />

        <SocialButton icon={<FaDiscord />} text="Discord" />
      </div>

      {/* Terms */}

      <p className="text-gray-500 mt-4 leading-5 text-xs md:text-sm">
        By continuing, you agree to our{" "}
        <span className="text-violet-400">Terms of Service</span> and{" "}
        <span className="text-violet-400">Privacy Policy</span>
      </p>
    </div>
  );
};

export default LoginCard;
