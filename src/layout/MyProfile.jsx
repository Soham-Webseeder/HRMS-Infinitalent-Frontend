import React from "react";

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Personal_Profile } from "../components/my_profile/Personal_Profile";
import { useSelector } from "react-redux";
import My_profile_Nav from "../components/my_profile/My_profile_Nav";
import { Sidebar } from "../components/Sidebar";

export const MyProfile = () => {
  const { sidebar } = useSelector((state) => state.sidebar);

  return (
    <div className="relative">
      <div className="absolute   z-50">
        <div className="relative">
          <div className=" absolute left-96 top-24">
            <Personal_Profile />
          </div>
        </div>

        {sidebar ? <Sidebar /> : null}
      </div>
      <Navbar />
      {/* <My_profile_Nav /> */}
      <Outlet />
    </div>
  );
};

export default MyProfile;
