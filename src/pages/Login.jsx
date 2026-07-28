import Logo from "../components/Logo";
import FeatureItem from "../components/FeatureItem";
import LoginCard from "../components/LoginCard";
import { FiArrowLeft } from "react-icons/fi";


import {
  FaUsers,
  FaRocket,
  FaComments,
  FaTrophy,
} from "react-icons/fa";

const Login = () => {
    const featureItems=[
        {
            id:1,
            icon:<FaUsers />,
            title:"Find Developers",
            description:"Meet your likely passioned"
        },
        {
            id:2,
            icon:<FaRocket />,
            title:"Build Together",
            description:"Make together, Hack together"
        },
        {
            id:3,
            icon:<FaComments />,
            title:"Chat & Connect",
            description:"Instant chats, teams always connected."
        },
        {
            id:4,
            icon:<FaTrophy />,
            title:"Grow Together",
            description:"Better devs through shared learning."
        },
    ]
  return (
    <div className="min-h-screen bg-[#050816] text-white">
        <div className="absolute top-0 left-0 w-60 h-60 bg-pink-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-600/20 blur-[120px]" />

      {/* Outer Container */}
      <div className=" mx-auto max-w-[1600px]  overflow-hidden">

        <div className="hidden md:grid lg:grid-cols-2 h-screen w-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/programmer bg.png')" }}>


          {/* LEFT SIDE */}

         <div
           className="
           relative
           hidden
           lg:flex
           flex-col
           justify-between
           overflow-hidden
           p-16
          
          "
          >

            
            {/* Main Content */}

            <div>

              <Logo />

              <div className="flex flex-col items-center gap-3 mt-6">

               {featureItems.map(item=><FeatureItem 
                                            key={item.id}
                                            icon={item.icon}
                                            title={item.title}
                                            description={item.description}
                                        />
                                )
                }

              </div>

            </div>


          </div>

          {/* RIGHT SIDE */}

          <div className=" relative  items-center justify-center  p-4 lg:p-6">

            {/* Top Link */}

            <div className="absolute right-30 z-10 top-8 flex gap-2 text-gray-400">

              <span>New here?</span>

              <button className="text-violet-400 hover:text-pink-400 transition">
                Create an account
              </button>

            </div>

            {/* Login Card Placeholder */}

            

            <LoginCard />

          </div>

        </div>

      </div>

      {/* MOBILE */}

      <div className="lg:hidden min-h-screen bg-[#050816] flex flex-col px-6 pt-8 pb-10">
        <div className="absolute top-0 left-0 w-60 h-60 bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-600/20 blur-[120px]" />
        <button
           className="
           w-12
           h-12
           rounded-full
           bg-[#12162B]
           border
           border-[#2A2F48]
           flex
           items-center
           justify-center
           text-white
           mb-8
           active:scale-95
           transition
         ">
           <FiArrowLeft size={22} />
        </button>


        <Logo />

        <div className="relative z-10 mt-5 w-full">
           <LoginCard />
        </div>

      </div>

    </div>
  );
};

export default Login;