import React, { useEffect, useState } from "react";
import { Category } from "../components/Category";
import { Navbar2 } from "../components/Navbar2";
import { Notifications } from "../components/Notifications";

import { Navbar } from "../components/Navbar";
import {SidebarUpdated}  from "../components/SidebarUpdated";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeDetails } from "../redux/slices/EmployeeSlice";
import { jwtDecode } from "jwt-decode";
import Dashboard from "../components/Dashboard";
import { Sidebar } from "../components/Sidebar";

export const Home = () => {
  const user = useSelector((state) => state.user);

  console.log("userData", user);

  const { sidebar } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const employeeToken = await localStorage.getItem("token");
      const employeedata = jwtDecode(employeeToken);

      dispatch(setEmployeeDetails(employeedata.id));
    })();
  }, []);

  return (
    <div className={`flex w-full h-full  `}>
      <div className={` ${sidebar ? "max-md:hidden" : ""}`}>
      <SidebarUpdated />
      </div>

      <div
        className={`w-full ${
          !sidebar ? "max-md:blur-sm pointer-events-none" : ""
        } `}
      >
        <Navbar />
        {/* <Navbar2 />
        <Notifications />
        <Category />  */}
        <Dashboard />
      </div>
    </div>
  );
};
