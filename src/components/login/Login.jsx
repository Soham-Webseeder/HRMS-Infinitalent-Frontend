import { IoMdLogIn } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BiLockOpen } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import logo from "../../assets/Logo.jpeg";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { toastSettings } from "../../routes/routes";
import { useDispatch } from "react-redux";
import { setEmployeeAllData, setEmployeeRole } from "../../redux/slices/EmployeeSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [captcha, setCaptcha] = useState("");

  const handleToken = (token) => {
    localStorage.setItem("token", token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateCaptcha(captcha) === true) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
          loginFormData
        );

        if (res.data.success && res.data.token) {
          toast.success("Login Successful", toastSettings);

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("companyId", res.data.user.companyId || "");
          
          dispatch(setEmployeeAllData(res.data.user));
          
          dispatch(setEmployeeRole(res.data.user.role));

          // 3. Navigate based on role
          if (res.data.user.role === "admin") {
            navigate("/");
          } else {
            navigate("/emp/dashboard");
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Credential incorrect", toastSettings);
      }
    } else {
      alert("Captcha Does Not Match");
    }
  };

  const handleInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={logo} className="w-32 mx-auto" />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  value={loginFormData.email}
                  required
                  onChange={handleInputChange}
                  placeholder="Email"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  value={loginFormData.password}
                  required
                  onChange={handleInputChange}
                  placeholder="Password"
                />
                <div className="border mx-auto max-w-xs rounded-lg mt-5 flex flex-col justify-start items-center p-2 gap-2">
                  <small className="text-gray-500">
                    please enter the captcha to continue
                  </small>
                  <LoadCanvasTemplateNoReload />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="enter the captcha here"
                  />
                </div>
                <p className=" flex text-sm mt-4 font-medium leading-none text-gray-500 ">
                  Create an new account?{" "}
                  <p
                    onClick={() => { navigate('/register') }}
                    className="px-2 text-sm font-medium leading-none underline text-gray-800 cursor-pointer animate-bounce"
                  >
                    Register
                  </p>
                </p>
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <IoMdLogIn className="text-xl" />
                  <span className="ml-3">Sign In</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
