import React from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { SidebarUpdated } from "../components/SidebarUpdated";
import { useSelector } from "react-redux";
import { Sidebar } from "../components/Sidebar";

export const Recruitment = () => {
  const { sidebar } = useSelector((state) => state.sidebar);

  return (
     <div className={`flex w-full h-full  `}>

    <div className={` ${sidebar ? 'max-md:hidden' : ''}`}>
    <SidebarUpdated />
    </div>


    <div className={`w-full ${!sidebar ? 'max-md:blur-sm pointer-events-none' : ''} `}>
      <Navbar />
    <Outlet />
    </div>
    </div>

  );
};
export default Recruitment;
