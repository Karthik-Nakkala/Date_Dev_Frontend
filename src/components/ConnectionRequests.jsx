import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/slices/requestsSlice";
import ConnectionRequest from "./ConnectionRequest";

const ConnectionRequests = () => {

    const [connectRequests,setConnectRequests]=useState([]);
    const dispatch=useDispatch();
    const store=useSelector((store)=>store.requests);
  const handleConnectionRequests = async () => {
    if(store?.length>0){
        setConnectRequests(store);
        return;
    }
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setConnectRequests(response?.data?.requests);
      dispatch(addRequests(response?.data?.requests));
      console.log(response?.data?.requests);

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    handleConnectionRequests();
  },[]);
   return (
    <section className="">
      <div className="m-3 text-center">
        <h2 className="text-2xl font-semibold text-white">
          {connectRequests.length} Requests
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-1/2 m-auto">
        {connectRequests.map((request) => (
          <ConnectionRequest key={request._id} request={request} />
        ))}
      </div>
    </section>
  );
};

export default ConnectionRequests;
