import { BsPerson } from "react-icons/bs";
import { RiBuildingLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePopup = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(user , "userrrrrrrrrrrrrrrrr")

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    const con = window.confirm("Are you sure you want to logOut?");
    if (con) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="flex items-center w-full text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <div className="flex flex-col  items-end ">
   
        </div>
        <BsPerson
          size={40}
          className=" text-white rounded-full bg-blue-950 p-2"
        />
      </button>
      {isOpen && (
        <div
          className="absolute  right-0  mt-4 w-48 bg-white rounded-md shadow-2xl py-1
        transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <BsPerson
              size={40}
              className=" text-white rounded-full bg-blue-950 p-2"
            />
            <p className="pb-1">Hello, {user}</p>
          </div>
          <div className="flex flex-col justify-start">
            <hr />
            <Link
              to="/profile/MyProfile"
              className="flex text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
            >
              My Profile
            </Link>
            <hr />
            <button
              className="flex   items-center text-gray-700 hover:bg-gray-100 text-sm px-4 py-2"
              onClick={handleLogout}
            >
              Log-Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
