import { HiBadgeCheck } from "react-icons/hi";
import {
  MapPin,
  Cake,
  Sword,
  Pencil,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditDeveloperProfileModal from "./EditDeveloperProfileModal";

const ProfileHero = ({developer}) => {
  const coverPhoto="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1600";


  const [openEdit,setOpenEdit]=useState(false);

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0B1020] shadow-[0_0_80px_rgba(0,0,0,.35)]">

      {/* Cover */}

      <div className="relative h-[150px] lg:h-[180px]">

        <img
          src={coverPhoto}
          alt=""
          className="h-full w-full object-cover"
        />

        {/* overlay */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-[#0B1020]" />

        {/* Top Buttons */}

        <div className="absolute left-8 top-7 flex items-center gap-4">

          {developer.openForWars && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 backdrop-blur-md">

              <Sword size={16} />

              Open For Wars

            </div>
          )}
        </div>
          
        <button
          className="absolute right-8 top-7 flex items-center gap-2 rounded-xl
          border border-violet-500/40
          bg-violet-600/20
          px-5 py-3
          text-white
          transition
          hover:bg-violet-600/30"
          onClick={()=>setOpenEdit(true)}
        >
          <Pencil size={17} />

          Edit Profile
        </button>
       
      </div>

      {openEdit && <EditDeveloperProfileModal setOpenEdit={setOpenEdit} developer={developer}/>}

      {/* Main Hero */}

      <div className="relative px-8 pb-4 lg:px-12">

        <div className="-mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}

          <div className="flex flex-col lg:flex-row lg:items-end gap-8">

            {/* Avatar */}

            <div
              className="
              h-[190px]
              w-[190px]
              overflow-hidden
              rounded-[34px]
              border-4
              border-[#111827]
              bg-black
              shadow-2xl
            "
            >
              <img
                src={developer.photoUrl}
                alt={developer.firstName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details */}

            <div className="pb-3">

              <div className="flex items-center gap-3">

                <h1 className="text-5xl font-extrabold tracking-tight text-white">

                  {developer.firstName + developer.lastName} 

                </h1>

                {developer.verified && (
                  <HiBadgeCheck
                    size={30}
                    className="text-blue-500"
                  />
                )}
              </div>

              <p className="mt-3 text-2xl font-semibold text-violet-400">

                {developer.role}

              </p>

              <div className="mt-3 flex items-center gap-2 text-lg text-gray-300">

                <ShieldCheck size={18} />

                {developer.company}

              </div>

              <div className="mt-4 flex flex-wrap items-center gap-8 text-gray-400">

                <div className="flex items-center gap-2">

                  <MapPin size={18} />

                  {developer.location}

                </div>

                <div className="flex items-center gap-2">

                  <Cake size={18} />

                  {developer.age} years

                </div>

              </div>

            </div>

                      {/* Right Stats Card */}

          <div className="mt-10 lg:mt-0 lg:w-[330px]">

            <div
              className="
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-7
                shadow-xl
              "
            >
              <h3 className="text-lg font-semibold text-white">
                Kingdom Statistics
              </h3>

              <div className="mt-6 space-y-5">

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Trophy size={20} className="text-yellow-400" />
                    Battles Won
                  </div>

                  <span className="text-2xl font-bold text-white">
                    {developer.hackathons}
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users size={20} className="text-violet-400" />
                    connections
                  </div>

                  <span className="text-2xl font-bold text-white">
                    {developer.connections}
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-300">
                    <ShieldCheck
                      size={20}
                      className="text-emerald-400"
                    />
                    Hackthons
                  </div>

                  <span className="text-2xl font-bold text-emerald-400">
                    {developer.projects}
                  </span>
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>
      </div>
    </section>
  );
};

export default ProfileHero;