import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Connection from "./Connection";

const Connections = () => {
  const [allConnections, setAllConnections] = useState([]);

  const handleConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      setAllConnections(res?.data?.data);
    } catch (err) {
      console.log("Something went wrong" + err);
    }
  };

  useEffect(() => {
    handleConnections();
  }, []);

  if (allConnections?.length === 0) {
    return <div className="text-amber-100">Loading</div>;
  }

  return (
    <section className="">
      <div className="m-3 text-center">
        <h2 className="text-2xl font-semibold text-white">
          {allConnections.length} Connections
        </h2>
      </div>

      <div className="flex flex-col gap-3 w-1/2 m-auto">
        {allConnections.map((connection) => (
          <Connection key={connection._id} connection={connection} />
        ))}
      </div>
    </section>
  );
};

export default Connections;
