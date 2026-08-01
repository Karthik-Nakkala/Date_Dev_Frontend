import { useEffect, useState } from "react";
import {
  Camera,
  Pencil,
  X,
  Building2,
  MapPin,
  BadgeCheck,
  Users,
  Heart,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";
import Toast from "../Toast";

export default function EditDeveloperProfileModal({ setOpenEdit, developer }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const triggerToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const {
    firstName,
    lastName,
    company,
    photoUrl,
    skills,
    location,
    bio,
    openToWork,
    verified,
    role,
  } = developer;

  const [editPhotoInput, setEditPhotoInput] = useState(false);
  const [imageUrl, setImageUrl] = useState(photoUrl);

  const [aqquiredSkills, setSkills] = useState(skills);

  const [addedSkill, setAddedSkill] = useState("");

  function addSkill(skill) {
    setSkills((prevSkills) => [...prevSkills, skill]);
  }

  const [openInput, setOpenInput] = useState(false);

  const handleAddSkill = (skill) => {
    addSkill(skill);
    setOpenInput(false);
    setAddedSkill(""); // Clear input after adding
  };

  const [form, setForm] = useState({
    firstName: firstName,
    lastName: lastName,
    headline: role,
    company: company,
    location: location,
    about: bio,
    openToWork: openToWork,
    opportunities: true,
    verified: verified,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle functions for status switches
  const toggleOpenToWork = () => {
    setForm((prev) => ({ ...prev, openToWork: !prev.openToWork }));
  };

  const toggleOpportunities = () => {
    setForm((prev) => ({ ...prev, opportunities: !prev.opportunities }));
  };

  const toggleVerified = () => {
    setForm((prev) => ({ ...prev, verified: !prev.verified }));
  };

  const handleCloseEditPage = () => {
    setOpenEdit(false);
  };

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.headline,
        company: form.company,
        location: form.location,
        bio: form.about,
        verified: form.verified,
        photoUrl: imageUrl,
        skills: aqquiredSkills,
      };
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      console.log("After clicking save btn===>", res);
      if (res?.data?.data) {
        dispatch(addUser(res.data.data));
      }
      triggerToast("Saved successfully!", "success");
    } catch (err) {
      triggerToast("Something went wrong.", "error");
      console.log("Error saving profile:", err);
    }
  };

  const input =
    "w-full rounded-xl border border-white/10 bg-[#121827] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-5 lg:p-6">
      {/* Modal */}
      <div className="flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#090D18] shadow-2xl">
        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-20 flex items-start justify-between border-b border-white/10 bg-[#090D18] px-5 py-5 sm:px-6 lg:px-7">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
              Edit Developer Profile
              <Pencil size={18} className="text-violet-400" />
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Changes are reflected instantly.
            </p>
          </div>

          <button
            className="rounded-full border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
            onClick={handleCloseEditPage}
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}

        {/* ================= BODY ================= */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[1.7fr_0.9fr] lg:p-7">
            {/* ================= LEFT ================= */}
            <div>
              {/* Avatar + Basic Info */}
              <div className="flex flex-col gap-8 lg:flex-row">
                {/* Avatar */}
                <div className="border-b border-white/10 pb-6 lg:w-44 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                  <p className="mb-4 text-center text-sm text-gray-300 lg:text-left">
                    Editor
                  </p>

                  <div className="relative mx-auto h-32 w-32">
                    <img
                      src={imageUrl}
                      className="h-full w-full rounded-full border-4 border-violet-500 object-cover"
                    />

                    <button className="absolute bottom-1 right-1 rounded-full bg-white p-2 shadow">
                      <Camera size={16} />
                    </button>
                  </div>

                  <button
                    className="mt-5 w-full rounded-xl bg-white/10 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
                    onClick={() => setEditPhotoInput(true)}
                  >
                    Change Photo
                  </button>
                  {editPhotoInput && (
                    <input
                      type="text"
                      className={input}
                      placeholder="Enter photo url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && imageUrl.trim() !== "") {
                          e.preventDefault();
                          setEditPhotoInput(false);
                        }
                      }}
                    />
                  )}
                </div>

                {/* Form */}
                <div className="flex-1 space-y-5">
                  <h3 className="text-lg font-semibold text-white">
                    Basic Information
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      className={input}
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => handleFormChange(e)}
                    />

                    <input
                      className={input}
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleFormChange}
                    />
                  </div>

                  <input
                    className={input}
                    name="headline"
                    placeholder="Headline"
                    value={form.headline}
                    onChange={handleFormChange}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-4 top-4 text-gray-500"
                      />

                      <input
                        className={`${input} pl-11`}
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-4 text-gray-500"
                      />

                      <input
                        className={`${input} pl-11`}
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  About Me
                </h3>

                <textarea
                  rows={5}
                  name="about"
                  value={form.about}
                  onChange={handleFormChange}
                  className={`${input} resize-none`}
                />

                <p className="mt-2 text-right text-xs text-gray-500">
                  {form.about?.length}/120 characters
                </p>
              </div>

              {/* ================= SKILLS ================= */}
              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {aqquiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-violet-500/40 bg-violet-500/15 px-4 py-2 text-sm text-violet-200"
                    >
                      {skill}
                    </span>
                  ))}

                  <button
                    className="rounded-full border border-dashed border-white/20 px-4 py-2 text-sm text-gray-400 transition hover:border-violet-500 hover:text-violet-300"
                    onClick={() => setOpenInput(true)}
                  >
                    + Add Skill
                  </button>
                  {openInput && (
                    <div>
                      <input
                        type="text"
                        className={`${input} px-2 py-2`}
                        value={addedSkill}
                        onChange={(e) => {
                          setAddedSkill(e.target.value);
                        }}
                      />
                      <button
                        className="rounded-full border border-dashed border-white/20 px-4 py-2 text-sm text-gray-400 transition hover:border-violet-500 hover:text-violet-300"
                        onClick={() => handleAddSkill(addedSkill)}
                      >
                        Add Skill
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ================= STATUS ================= */}
              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="mb-5 text-lg font-semibold text-white">
                  Status
                </h3>

                <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-8">
                  {[
                    ["Open For Work", form.openToWork, toggleOpenToWork],
                    [
                      "Open To Opportunities",
                      form.opportunities,
                      toggleOpportunities,
                    ],
                    ["Verified", form.verified, toggleVerified],
                  ].map(([label, active, toggle]) => (
                    <div key={label} className="flex items-center gap-3">
                      <button
                        className={`relative h-7 w-14 rounded-full transition ${
                          active ? "bg-violet-600" : "bg-gray-600"
                        }`}
                        onClick={toggle}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                            active ? "left-8" : "left-1"
                          }`}
                        />
                      </button>

                      <span className="text-white">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= ACTION BUTTONS ================= */}
              <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
                <button
                  className="rounded-xl border border-white/10 px-7 py-3 font-medium text-white transition hover:bg-white/5"
                  onClick={handleCloseEditPage}
                >
                  Cancel
                </button>

                <button
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:opacity-90"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* ================= RIGHT PREVIEW ================= */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="mb-4 flex justify-center">
                <span className="rounded-full bg-white/10 px-4 py-1 text-xs text-gray-300">
                  Live Preview
                </span>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#181F35] to-[#0E1220]">
                <img
                  src={imageUrl}
                  className="h-56 w-full object-cover sm:h-64"
                />

                <div className="space-y-4 p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {form.firstName} {form.lastName}
                      </h3>

                      <BadgeCheck
                        size={20}
                        className="fill-violet-500 text-violet-500"
                      />
                    </div>

                    <p className="text-gray-400">{form.headline}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Building2 size={15} />
                      {form.company}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {form.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {aqquiredSkills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm leading-6 text-gray-400">
                    {form.about}
                  </p>

                  <div className="grid grid-cols-3 border-t border-white/10 pt-5">
                    <div className="text-center">
                      <Users
                        size={18}
                        className="mx-auto mb-2 text-violet-400"
                      />
                      <p className="font-bold text-white">239</p>
                      <p className="text-xs text-gray-500">Connections</p>
                    </div>

                    <div className="text-center">
                      <Camera
                        size={18}
                        className="mx-auto mb-2 text-violet-400"
                      />
                      <p className="font-bold text-white">4.7K</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>

                    <div className="text-center">
                      <Heart
                        size={18}
                        className="mx-auto mb-2 text-violet-400"
                      />
                      <p className="font-bold text-white">33K</p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
