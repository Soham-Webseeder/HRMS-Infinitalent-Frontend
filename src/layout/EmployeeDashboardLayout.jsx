import React from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { SidebarUpdated } from "../components/SidebarUpdated";
import { useSelector } from "react-redux";
import { Sidebar } from "../components/Sidebar";

export const EmployeeDashboardLayout = () => {
  const { sidebar } = useSelector((state) => state.sidebar);

  return (
    <div className="w-[100%] h-[100%]">
      <div className="relative">
        <div className="absolute">{sidebar ?        <SidebarUpdated />
  : null}</div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default EmployeeDashboardLayout;
