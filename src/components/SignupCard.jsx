import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/slices/userSlice";
import { BASE_URL } from "../utils/constants";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCalendar,
  FiInfo,
  FiLink,
  FiCloud,
  FiTag,
  FiMapPin,
  FiBriefcase,
  FiEdit3,
  FiChevronDown,
  FiArrowRight,
  FiArrowLeft,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";

const SignupCard = () => {
  const [step, setStep] = useState(1);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const [bio, setBio] = useState("");
  const [projects, setProjects] = useState("");
  const [hackathons, setHackathons] = useState("");
  const [openForWork, setOpenForWork] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Skill Tag Handlers
  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim().replace(/,/g, "");
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Step 1 Validation & Proceed
  const handleNextStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your First Name and Last Name");
      return;
    }
    if (!emailId.trim() || !password) {
      setError("Please enter a valid Email and Password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setStep(2);
  };

  // Step 2 Validation & Proceed
  const handleNextStep2 = (e) => {
    e.preventDefault();
    setError("");
    setStep(3);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  
  try {
    // 1. Create an instance of FormData
    const formData = new FormData();

    // 2. Append all your normal text fields to the form data array
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("emailId", emailId.trim());
    formData.append("password", password);
    if (age) formData.append("age", Number(age));
    if (gender) formData.append("gender", gender);
    if (skills.length > 0) formData.append("skills", JSON.stringify(skills)); // Arrays must be stringified in FormData
    if (location) formData.append("location", location.trim());
    if (role) formData.append("role", role);
    if (bio) formData.append("about", bio.trim());
    if (projects) formData.append("projects", projects.trim());
    if (hackathons) formData.append("hackathons", hackathons.trim());
    formData.append("openToWork", openForWork === "Yes");

    // 3. Attach either the raw Local File OR the Typed Text URL string
    if (imageFile) {
      formData.append("profileImage", imageFile); // Matches upload.single('profileImage') on backend
    } else if (photoUrl) {
      formData.append("photoUrl", photoUrl.trim());
    }

    // 4. Send the request using FormData format
    const res = await axios.post(BASE_URL + "/signup", formData, {
      withCredentials: true,
    });

    if (res?.data?.data) {
      dispatch(addUser(res.data.data));
    }
    navigate("/");
  } catch (err) {
    setError(
      err?.response?.data?.message ||
        err?.response?.data ||
        "Signup failed. Please try again."
    );
  } finally {
    setLoading(false);
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
      bg-[#101525]/90
      backdrop-blur-2xl
      p-5
      sm:p-6
      shadow-[0_0_50px_rgba(0,0,0,.45)]
      transition-all
      duration-500
      hover:border-violet-500
    "
    >
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between mb-3.5 border-b border-[#2B3048] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
            Step {step} of 3
          </span>
          <span className="text-xs font-medium text-gray-400">
            {step === 1 && "Personal Information"}
            {step === 2 && "Professional Info"}
            {step === 3 && "About You"}
          </span>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 1
                ? "w-5 bg-gradient-to-r from-violet-600 to-pink-600"
                : "w-2 bg-[#2B3048]"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 2
                ? "w-5 bg-gradient-to-r from-violet-600 to-pink-600"
                : "w-2 bg-[#2B3048]"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 3
                ? "w-5 bg-gradient-to-r from-violet-600 to-pink-600"
                : "w-2 bg-[#2B3048]"
            }`}
          />
        </div>
      </div>

      {/* ================= STEP 1: PERSONAL INFORMATION ================= */}
      {step === 1 && (
        <form onSubmit={handleNextStep1} className="space-y-3">
          <div>
            <div className="text-xl lg:text-2xl font-bold text-white">
              Create your account 👋
            </div>
            <p className="text-gray-400 mt-0.5 text-xs">
              Step 1: Enter your personal details to get started
            </p>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-white font-medium text-xs block mb-1">
                First Name
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
                <FiUser className="text-gray-400 text-base mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Last Name
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
                <FiUser className="text-gray-400 text-base mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Email ID */}
          <div>
            <label className="text-white font-medium text-xs block mb-1">
              Email address
            </label>
            <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
              <FiMail className="text-gray-400 text-base mr-2.5 shrink-0" />
              <input
                type="email"
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white font-medium text-xs block mb-1">
              Password
            </label>
            <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
              <FiLock className="text-gray-400 text-base mr-2.5 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white text-base"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Age
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
                <FiCalendar className="text-gray-400 text-base mr-2.5 shrink-0" />
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                  min={16}
                  max={100}
                />
              </div>
            </div>

            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Gender
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all relative">
                <FiInfo className="text-gray-400 text-base mr-2.5 shrink-0" />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm cursor-pointer appearance-none pr-6"
                >
                  <option value="" disabled className="bg-[#0B1020] text-gray-500">
                    Select gender
                  </option>
                  <option value="male" className="bg-[#0B1020] text-white">
                    male
                  </option>
                  <option value="female" className="bg-[#0B1020] text-white">
                    female
                  </option>
                  <option value="other" className="bg-[#0B1020] text-white">
                    other
                  </option>
                </select>
                <FiChevronDown className="text-gray-400 absolute right-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-medium pt-0.5">{error}</p>
          )}

          {/* Next Button */}
          <button
            type="submit"
            className="
            h-10.5
            rounded-xl
            font-semibold
            text-sm
            sm:text-base
            w-full
            bg-gradient-to-r
            from-violet-600
            via-purple-600
            to-pink-600
            hover:opacity-90
            shadow-[0_0_25px_rgba(139,92,246,.45)]
            hover:scale-[1.01]
            active:scale-[0.99]
            transition-all
            duration-300
            text-white
            flex
            items-center
            justify-center
            gap-2
            cursor-pointer
            mt-2
          "
          >
            <span>Next: Professional Info</span>
            <FiArrowRight size={17} />
          </button>
        </form>
      )}

      {/* ================= STEP 2: PROFESSIONAL INFORMATION ================= */}
      {step === 2 && (
        <form onSubmit={handleNextStep2} className="space-y-3">
          <div>
            <div className="text-xl lg:text-2xl font-bold text-white">
              Professional Info 💼
            </div>
            <p className="text-gray-400 mt-0.5 text-xs">
              Step 2: Add your photo, skills & current role
            </p>
          </div>

{/* Profile Photo Selection (URL or File Upload) */}
<div className="flex flex-col gap-4">
  
  {/* Option 1: Paste Photo URL */}
  <div>
    <label className={`font-medium text-xs block mb-1 ${imageFile ? 'text-gray-500' : 'text-white'}`}>
      Option 1: Photo URL {imageFile && <span className="text-gray-500 text-[10px] ml-1">(Disabled because a file is selected)</span>}
    </label>
    <div className={`h-10.5 rounded-xl border bg-[#0B1020] flex items-center px-3.5 transition-all ${
      imageFile 
        ? 'border-gray-800 opacity-40 cursor-not-allowed' 
        : 'border-[#2B3048] focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30'
    }`}>
      <FiLink className="text-gray-400 text-base mr-2.5 shrink-0" />
      <input
        type="url"
        placeholder="https://your-photo-url.com"
        value={photoUrl}
        disabled={!!imageFile}
        onChange={(e) => setPhotoUrl(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500 disabled:cursor-not-allowed"
      />
      <FiCloud className="text-gray-400 text-base ml-2 shrink-0" />
    </div>
  </div>

  {/* Option 2: Upload File From Device */}
  <div>
    <label className={`font-medium text-xs block mb-1 ${photoUrl ? 'text-gray-500' : 'text-white'}`}>
      Option 2: Or Upload from Device (JPG, JPEG, PNG) {photoUrl && <span className="text-gray-500 text-[10px] ml-1">(Disabled because a URL is typed)</span>}
    </label>
    <div className={`h-10.5 rounded-xl border bg-[#0B1020] flex items-center px-3.5 transition-all ${
      photoUrl 
        ? 'border-gray-800 opacity-40 cursor-not-allowed' 
        : 'border-[#2B3048] focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30'
    }`}>
      <FiCloud className="text-gray-400 text-base mr-2.5 shrink-0" />
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        disabled={!!photoUrl}
        onChange={(e) => setImageFile(e.target.files[0])}
        className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm file:hidden cursor-pointer disabled:cursor-not-allowed"
      />
      {imageFile && (
        <span className="text-xs text-violet-400 truncate max-w-[150px] font-medium">
          {imageFile.name}
        </span>
      )}
    </div>
  </div>

</div>

          {/* Skills */}
          <div>
            <label className="text-white font-medium text-xs block mb-1">
              Skills
            </label>
            <div className="rounded-xl border border-[#2B3048] bg-[#0B1020] p-2.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-violet-600/20 border border-violet-500/40 text-violet-200 text-xs font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-pink-400"
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center">
                <FiTag className="text-gray-400 text-base mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Add skills (e.g., React, Node.js, Python)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                />
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5 pl-0.5">
              Press Enter after typing each skill
            </p>
          </div>

          {/* Location & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Location
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
                <FiMapPin className="text-gray-400 text-base mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Role
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all relative">
                <FiBriefcase className="text-gray-400 text-base mr-2.5 shrink-0" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm cursor-pointer appearance-none pr-6"
                >
                  <option value="" disabled className="bg-[#0B1020] text-gray-500">
                    Select role
                  </option>
                  <option value="Full Stack Developer" className="bg-[#0B1020] text-white">
                    Full Stack Developer
                  </option>
                  <option value="Frontend Developer" className="bg-[#0B1020] text-white">
                    Frontend Developer
                  </option>
                  <option value="Backend Developer" className="bg-[#0B1020] text-white">
                    Backend Developer
                  </option>
                  <option value="Mobile Developer" className="bg-[#0B1020] text-white">
                    Mobile Developer
                  </option>
                  <option value="DevOps Engineer" className="bg-[#0B1020] text-white">
                    DevOps Engineer
                  </option>
                  <option value="UI/UX Designer" className="bg-[#0B1020] text-white">
                    UI/UX Designer
                  </option>
                  <option value="Data Scientist" className="bg-[#0B1020] text-white">
                    Data Scientist
                  </option>
                  <option value="Other" className="bg-[#0B1020] text-white">
                    Other
                  </option>
                </select>
                <FiChevronDown className="text-gray-400 absolute right-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="
              h-10.5
              px-4
              rounded-xl
              border
              border-[#2B3048]
              bg-[#0D1122]
              text-white
              font-semibold
              text-xs sm:text-sm
              hover:bg-[#171B31]
              transition
              flex
              items-center
              justify-center
              gap-1.5
              cursor-pointer
            "
            >
              <FiArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="
              flex-1
              h-10.5
              rounded-xl
              font-semibold
              text-xs sm:text-sm
              bg-gradient-to-r
              from-violet-600
              via-purple-600
              to-pink-600
              hover:opacity-90
              shadow-[0_0_25px_rgba(139,92,246,.45)]
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all
              duration-300
              text-white
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
            "
            >
              <span>Next: About You</span>
              <FiArrowRight size={17} />
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 3: ABOUT YOU ================= */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <div className="text-xl lg:text-2xl font-bold text-white">
              About You & Finish 🚀
            </div>
            <p className="text-gray-400 mt-0.5 text-xs">
              Step 3: Tell developers about your projects & experience
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="text-white font-medium text-xs block mb-1">
              Bio
            </label>
            <div className="relative rounded-xl border border-[#2B3048] bg-[#0B1020] p-2.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
              <div className="flex items-start gap-2.5">
                <FiEdit3 className="text-gray-400 text-base shrink-0 mt-0.5" />
                <textarea
                  rows={2}
                  maxLength={300}
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500 resize-none pb-3"
                />
              </div>
              <span className="text-[11px] text-gray-500 absolute bottom-2 right-2.5">
                {bio.length}/300
              </span>
            </div>
          </div>

          {/* Projects & Hackathons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Projects
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
                <input
                  type="text"
                  placeholder="Projects (comma separated)"
                  value={projects}
                  onChange={(e) => setProjects(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-white font-medium text-xs block mb-1">
                Hackathons
              </label>
              <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
                <input
                  type="text"
                  placeholder="Hackathons participated"
                  value={hackathons}
                  onChange={(e) => setHackathons(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Open For Work */}
          <div>
            <label className="text-white font-medium text-xs block mb-1">
              Open For Work
            </label>
            <div className="h-10.5 rounded-xl border border-[#2B3048] bg-[#0B1020] flex items-center px-3.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all relative">
              <select
                value={openForWork}
                onChange={(e) => setOpenForWork(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white text-xs sm:text-sm cursor-pointer appearance-none pr-6"
              >
                <option value="" disabled className="bg-[#0B1020] text-gray-500">
                  Are you open for work?
                </option>
                <option value="Yes" className="bg-[#0B1020] text-white">
                  Yes
                </option>
                <option value="No" className="bg-[#0B1020] text-white">
                  No
                </option>
              </select>
              <FiChevronDown className="text-gray-400 absolute right-3.5 pointer-events-none" />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-medium pt-0.5">{error}</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="
              h-10.5
              px-4
              rounded-xl
              border
              border-[#2B3048]
              bg-[#0D1122]
              text-white
              font-semibold
              text-xs sm:text-sm
              hover:bg-[#171B31]
              transition
              flex
              items-center
              justify-center
              gap-1.5
              cursor-pointer
            "
            >
              <FiArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
              flex-1
              h-10.5
              rounded-xl
              font-semibold
              text-xs sm:text-sm
              bg-gradient-to-r
              from-violet-600
              via-purple-600
              to-pink-600
              hover:opacity-90
              shadow-[0_0_25px_rgba(139,92,246,.45)]
              hover:scale-[1.01]
              active:scale-[0.99]
              transition-all
              duration-300
              text-white
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              <FiCheckCircle size={17} />
            </button>
          </div>
        </form>
      )}

      {/* Footer text */}
      <p className="text-gray-500 mt-3.5 leading-tight text-xs text-center">
        By creating an account, you agree to our{" "}
        <span className="text-violet-400 hover:text-pink-400 transition cursor-pointer">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="text-violet-400 hover:text-pink-400 transition cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>
  );
};

export default SignupCard;
