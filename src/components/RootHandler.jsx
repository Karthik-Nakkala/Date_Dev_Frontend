import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/slices/userSlice";

import Body from "../pages/Body";
import Landing from "../pages/Landing";

const RootHandler = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(!user);

  useEffect(() => {
    if (!user) {
      axios
        .get(BASE_URL + "/profile/view", { withCredentials: true })
        .then((res) => {
          const userData = res?.data?.data || res?.data;
          if (userData && (userData.firstName || userData._id)) {
            dispatch(addUser(userData));
          }
        })
        .catch(() => {
          // Unauthenticated: user stays null
        })
        .finally(() => {
          setCheckingAuth(false);
        });
    }
  }, []);

  if (checkingAuth) {
    return (
      <div className="h-screen w-screen bg-[#070B18] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // If user is authenticated -> render main app Body (Header + Outlet)
  // If user is NOT authenticated -> render Landing page directly (ZERO flicker)
  return user ? <Body /> : <Landing />;
};

export default RootHandler;
