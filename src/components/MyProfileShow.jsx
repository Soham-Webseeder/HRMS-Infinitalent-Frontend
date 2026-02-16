import {
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyProfileShow() {
  const [activeSection, setActiveSection] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userData, setUserData] = useState({});
  const [passwordData, setPasswordData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [id, setId] = useState("");

  useEffect(() => {
    (async () => {
      const userToken = await localStorage.getItem("token");
      const user = jwtDecode(userToken);
      setId(user.id);
      // Set email in passwordData
      setPasswordData((prev) => ({ ...prev, email: userData.email }));

      let res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/user/${user.id}`
      );
      setUserData(res.data.response);
    })();
  }, [id,userData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    const isConfirmed = window.confirm(`Are you sure you want to change Details ?`);
    if (isConfirmed) {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/updateUserById/${id}`,
          userData
        );
        toast.success("User Update Successfully!");
      } catch (error) {
        toast.error("Error Updating Profile!");
      }
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = async () => {
    const isConfirmed = window.confirm("Are you sure you want to update Password?");
    if (isConfirmed) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/changePassword`,
          passwordData
        );

        if (res.status === 200) {
          toast.success("Password Updated Successfully!");
        } else {
          toast.error("Password Update Unsuccessful!");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the password.");
      }
    }
  };

  // Toggle functions for password visibility
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <Toaster />
        <h1 className="py-2 font-semibold text-2xl text-zinc-900">My Profile</h1>
        <div className="p-4 bg-white shadow-md border rounded-md border-gray-300">
          <div className="flex gap-6 mb-6 border-b pb-3">
            <button
              className={`flex items-center gap-2 text-gray-700 ${
                activeSection === "account"
                  ? "text-blue-600 border-b border-blue-900 pb-2"
                  : "text-gray-600 pb-2"
              }`}
              onClick={() => setActiveSection("account")}
            >
              <BsPerson />
              Account
            </button>
            <button
              className={`flex items-center gap-2 ${
                activeSection === "security"
                  ? "text-blue-900 border-b border-blue-900 pb-2"
                  : "text-gray-900 pb-2"
              }`}
              onClick={() => setActiveSection("security")}
            >
              <AiOutlineLock />
              Security
            </button>
          </div>

          {/* Account Section */}
          {activeSection === "account" && (
            <>
              <div className="border-b pb-3 mb-6">
                <h2 className="text-lg font-semibold text-zinc-800">Profile Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Barry"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">Last Name</label>
                  <input
                    type="text"
                    placeholder="Tone"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">Email</label>
                  <input
                    type="email"
                    placeholder="example@domain.com"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">Mobile No.<span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className="border-zinc-300 rounded-l-lg shadow-sm bg-zinc-100 p-2">+91</span>
                    <input
                      type="tel"
                      placeholder="78800*****"
                      name="mobileNumber"
                      value={userData.mobileNumber}
                      onChange={handleChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-r-lg shadow-sm w-full p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="border border-zinc-300 text-zinc-700 rounded-lg px-4 py-2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-900 text-white rounded-lg px-4 py-2"
                >
                  Save
                </button>
              </div>
            </>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <>
              <div className="border-b pb-3 mb-6">
                <h2 className="text-lg font-semibold text-zinc-800">Change Password</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current Password"
                      name="oldPassword"
                      onChange={handleUpdateChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="New Password"
                      onChange={handleUpdateChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleShowNewPassword}>
                      {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-zinc-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handleUpdateChange}
                      className="border-zinc-300 focus:outline-blue-300 rounded-lg shadow-sm w-full p-2"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={toggleShowConfirmPassword}>
                      {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="border border-zinc-300 text-zinc-700 rounded-lg px-4 py-2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePassword}
                  className="bg-blue-900 text-white rounded-lg px-4 py-2"
                >
                  Change Password
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
