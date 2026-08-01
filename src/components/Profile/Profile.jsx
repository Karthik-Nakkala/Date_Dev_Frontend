import { HiBadgeCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import SkillBadge from "../DeveloperCardStack/SkillBadge";
import Stats from "../DeveloperCardStack/Stats";
import ProfileAnalytics from "./ProfileAnalytics";
import ProfileHero from "./ProfileHero";
import ProfileOverview from "./ProfileOverView";

const Profile = () => {
  const developer = useSelector((store) => store.user);


  if (!developer) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090E1A] px-6 py-8">
      <ProfileHero developer={developer}/>
      <ProfileOverview developer={developer}/>
      <ProfileAnalytics developer={developer}/>
    </div>
  );
};

export default Profile;
