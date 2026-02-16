import { BiSearchAlt2 } from "react-icons/bi";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import animatedLogo from "../assets/animatedLogo.mp4";
import { HiOutlineLogout } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { TiThMenuOutline } from "react-icons/ti";
import { setSidebar } from "../redux/slices/SidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfilePopup from "./ProfilePopup";
import FullScreenButton from "./FullScreenBtn";
import NotificationIcon from "./NotificationIcon";
import logo from "../assets/Logo.jpeg";
import UniversalSearch from "./UniversalSearch ";

export const Navbar = () => {
  const { sidebar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    let confirmation = window.confirm("Do you wish to log out?");
    if (confirmation) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

  const handleSidebarToggle = () => {
    dispatch(setSidebar(!sidebar));
  };

  const user = useSelector((state) => state.user);
  console.log(user?.firstName, "user");
  return (
    <>
      <nav className="grid grid-cols-3 items-center w-full gap-2 py-4 px-4 bg-white sticky top-0 z-10 shadow-md shadow-black/20">
        {/* Sidebar Toggle (only for small screens) */}
        <div onClick={handleSidebarToggle} className="md:hidden cursor-pointer">
          <TiThMenuOutline className="text-4xl hover:bg-gray-200 active:text-white p-1 duration-200" />
        </div>

        {/* Search Input (Left-aligned) */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative hidden md:flex justify-between items-center gap-6 bg-gray-200 py-2 pl-4 pr-2 shadow-inner rounded-2xl w-60"
        >
          <div className="flex justify-center items-center gap-1">
            <BiSearchAlt2 className="text-gray-800" size={24} />
            <p>Search...</p>
          </div>
          <p className="uppercase text-xs font-semibold">ctrl + k</p>
        </div>

        {/* Logo (Always centered) */}
        <Link to={"/"} className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-20" />
          <p className="text-3xl text-blue-950 font-bold">INFINITALENT</p>
        </Link>

        {/* Right-aligned Icons */}
        <div className="flex justify-end items-center gap-4">
          {/* <NotificationIcon /> */}
          <FullScreenButton />
          <ProfilePopup user={user.employeeAllData?.firstName} />
        </div>
      </nav>
      <UniversalSearch isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const Greeting = ({ user }) => {
  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <span className="text-2xl headingFont">
      {getGreeting()},{" "}
      <span className="text-4xl capitalize">{user.firstName}!</span>
    </span>
  );
};
