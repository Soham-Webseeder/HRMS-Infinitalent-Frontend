import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import logo from "../signup/login_image1.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/changepassword`,

        { email }
      );
      console.log("Password reset email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLoginPage = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-row items-center justify-center w-full h-screen gap-0 bg-slate-200">
      <div className="w-1/3 h-3/4 border flex mt-3 flex-row items-center justify-end hidden md:block">
        <div className="flex flex-row items-center justify-end">
          <img
            className="pt-8"
            src={logo}
            width="80%"
            height="80%"
            alt="Logo"
          />
        </div>
      </div>
      <div className="w-1/3 h-5/6 flex items-center justify-center">
        <div className="mt-6 shadow-2xl rounded-md h-[50%]   bg-white">
          <form onSubmit={handleResetPassword}>
            <div className="flex flex-col items-center justify-evenlye text-black w-auto gap-3  ">
              <div className="flex flex-row  justify-between items-center w-[100%] px-10 ">
                <div className="p-1 pt-2 text-lg font-medium">
                  Forgot Password
                </div>
                <div className="text-xs">
                  Remembered your password?{" "}
                  <span
                    onClick={handleLoginPage}
                    className=" text-blue-500 text-lg cursor-pointer"
                  >
                    Login
                  </span>{" "}
                </div>
              </div>
              <div className="w-4/5 mt-5  flex flex-col p-1 py-2">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  className="rounded-b-none border-b-[0.7px] border-gray-500 w-full py-2 px-4 text-black"
                />
              </div>
              <div className="pb-4">
                <button
                  type="submit"
                  className="p-2 px-4 bg-red-400 text-sm font-medium text-white rounded-full shadow-xl"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
