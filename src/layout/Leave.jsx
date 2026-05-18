import React from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useSelector } from "react-redux";


export const Leave = () => {
  const { sidebar } = useSelector((state) => state.sidebar);

  return (
    <div className={`flex w-full h-full  `}>
      <div className={` ${sidebar ? "max-md:hidden" : ""}`}>
      <Sidebar />
      </div>

      <div
        className={`w-full ${
          !sidebar ? "max-md:blur-sm pointer-events-none" : ""
        } `}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default Leave;
