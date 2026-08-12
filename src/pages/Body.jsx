import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Body = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Body;
