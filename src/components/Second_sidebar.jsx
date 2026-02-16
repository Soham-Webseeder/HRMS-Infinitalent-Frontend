import { BiGift } from "react-icons/bi";
import React from "react";
import { SiPaypal } from "react-icons/si";
import { GiPalmTree } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { GoFileDirectory } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { BsFillBuildingsFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { NavLink } from "react-router-dom";
export const Second_sidebar = () => {
  return (
    <div className="w-[70px] h-[100vh]">
      <div className="flex flex-col gap-3 items-center w-full  h-full text-3xl text-white bg-gray-800">
        <div className="bg-white text-red-600 p-3 px-5 flex flex-col items-center">
          <NavLink to="/">
            {" "}
            <HiHome />
          </NavLink>
          <span className="text-xs text-center">Home</span>
        </div>
        <div className="p-3 flex flex-col items-center">
          <NavLink to="/company-profile">
            {" "}
            <BsFillBuildingsFill />
          </NavLink>
          <span className="text-xs text-center">Company Profile</span>
        </div>
        <div className="p-3 flex flex-col items-center">
          <NavLink to="/my-profile">
            {" "}
            <ImProfile />{" "}
          </NavLink>
          <span className="text-xs text-center">My-profile</span>
        </div>
        <div className="p-3 flex flex-col items-center">
          <NavLink to="/directory">
            {" "}
            <GoFileDirectory />
          </NavLink>
          <span className="text-xs text-center">Directory</span>
        </div>
        <div className="p-3 flex flex-col items-center">
          <NavLink to="/attendence">
            {" "}
            <SlCalender />
          </NavLink>
          <span className="text-xs text-center">Attendance</span>
        </div>
        <div className="p-3 flex flex-col items-center">
          <NavLink to="/leave">
            {" "}
            <GiPalmTree />{" "}
          </NavLink>
          <span className="text-xs text-center">Leave</span>
        </div>

        <div className="p-3 flex flex-col items-center">
          <NavLink to="">
            {" "}
            <SiPaypal />{" "}
          </NavLink>
          <span className="text-xs text-center">Payroll</span>
        </div>

        <div className="p-3 flex flex-col items-center">
          <NavLink to="">
            {" "}
            <BiGift />{" "}
          </NavLink>
          <span className="text-xs text-center">Rewards</span>
        </div>
      </div>
    </div>
  );
};
