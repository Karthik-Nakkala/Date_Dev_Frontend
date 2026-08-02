import axios from "axios";
import { BadgeCheck, Check, X } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest } from "../store/slices/requestsSlice";

const ConnectionRequest = ({ request }) => {
  const { _id, photoUrl, firstName, lastName, isVerified, skills } =
    request.fromUserId;

    const dispatch=useDispatch();
    const store=useSelector((store)=>store.requests);


  const reviewRequest = async (status) => {
    console.log("Before request store updating",store);
    console.log("The id is :-",_id);
    try {
      const response = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
      console.log("After request store updating",store);
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
    <div className="group flex items-center justify-between rounded-2xl border border-[#2A2942] bg-[#0D0C19] px-5 py-4 transition-all duration-300 hover:border-violet-500/60 hover:bg-[#111021]">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={photoUrl}
            alt={firstName}
            className="h-14 w-14 rounded-xl object-cover"
          />

          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0D0C19] bg-emerald-500"></span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-lg font-semibold text-white">
              {firstName} {lastName}
            </h2>

            {isVerified && (
              <BadgeCheck
                size={16}
                className="fill-violet-600 text-violet-400"
              />
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
            {skills?.slice(0, 3).map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                {index !== 0 && (
                  <span className="h-1 w-1 rounded-full bg-zinc-600"></span>
                )}

                <span>{skill}</span>
              </div>
            ))}

            {skills?.length > 3 && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-600"></span>

                <span className="font-medium text-violet-400">
                  +{skills.length - 3}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="ml-6 flex shrink-0 items-center gap-3">
        <button className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-fuchsia-500 px-5 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer" onClick={()=>reviewRequest("accepted")}>
          <Check size={16} />
          Accept
        </button>

        <button className="flex h-10 items-center gap-2 rounded-xl border border-[#393656] px-5 text-sm font-medium cursor-pointer text-zinc-300 transition hover:border-violet-500 hover:text-white" onClick={()=>reviewRequest("rejected")}>
          <X size={16} />
          Ignore
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequest;
