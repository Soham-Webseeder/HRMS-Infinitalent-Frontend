import { AiOutlineLeft } from "react-icons/ai";
import { BiLockOpen } from "react-icons/bi";
import { IoMdContact } from "react-icons/io";
import React, { useState } from "react";
import logo from "../signup/login_image1.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const animatedComponents = makeAnimated();

export const Signup1 = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const navigate = useNavigate();

  const [page1, setpage1] = useState(false);
  const [verify, setVarify] = useState(false);

  const handleNextPage = () => {
    if (page1 == false) {
      setpage1(true);
      console.log(page1);
    } else {
      setpage1(false);
    }
  };
  const handleVarify = () => {
    setVarify(true);

    console.log(verify);
  };

  const [signupformData1, setSignupFormData1] = useState({
    userName: "",
    email: "",
    phone: "",
    referralCode: "",
    termsAndConditions: false,
    companyName: "",
    companySize: "",
    yourRole: "",
    companyIndustry: "",
    requirements: [],
    password: "",
  });

  console.log(signupformData1, "siugasjdfjk");

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`,
        signupformData1
      );
      console.log("signup Form Data1 submitted successfully:", response.data);
      toast.success("Company data fetched successfully");

      navigate("/login");
    } catch (error) {
      console.error("Error submitting company form data:", error);
      toast.error("require all fields");
    }
  };

  const handlesignup1Change = (e) => {
    setSignupFormData1({
      ...signupformData1,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequirementChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    setSignupFormData1({
      ...signupformData1,
      requirements: selectedValues, 
    });
  };
  const handleSignupPage = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-row items-center justify-center w-[100vw] h-[100vh] gap-2 bg-slate-200">
      <div className="w-[25%]  h-[70%] border flex  md:mt-8 sm:mt-1 md:block hidden">
        <div>
          {" "}
          <img
            className="pt-8"
            src={logo}
            width="90%"
            height="90%"
            alt=""
          />{" "}
        </div>
      </div>
      <div className="md:w-[25%] sm:w-full h-[80%]">
        <div className="flex flex-row items-center justify-between px-4 py-2">
          <div className="w-[50px] flex justify-center h-[50px] text-center rounded-full items-center text-xl bg-red-400 text-white">
            <IoMdContact />
          </div>
          <div className="w-[70%] flex flex-row">
            <div className="w-[50%] bg-red-400 h-0.5 border border-red-400"></div>
            <div
              className="w-[50%] h-0.5 border"
              style={{ backgroundColor: page1 ? "crimson" : "white" }}
            ></div>
          </div>

          <div className="w-[50px] flex  h-[50px] justify-center text-center items-center rounded-full text-xl bg-red-400  text-white">
            <BiLockOpen />
          </div>
        </div>
        <div className="mt-3 shadow-2xl rounded-md">
          <form onSubmit={handleSubmit1}>
            {!page1 ? (
              <div className="flex flex-col items-center justify-evenly bg-white text-black w-auto gap-3 max-w-sm md:max-w-full p-8 md:p-0">
                <div className="flex flex-row items-center gap-5 ">
                  <div className="p-1 pt-2 text-lg font-medium md:p-0">
                    Company Information
                  </div>
                  <div className="text-xs">
                    Already have an Account{" "}
                    <span
                      className="text-blue-500 text-lg cursor-pointer"
                      onClick={handleSignupPage}
                    >
                      signIn
                    </span>{" "}
                  </div>
                </div>
                <div className="w-[90%]  flex flex-col p-1 py-2">
                  <label htmlFor="">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={signupformData1.userName}
                    required
                    onChange={handlesignup1Change}
                    placeholder="Enter your Name"
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4 text-black"
                  />
                </div>
                <div className="w-[90%]  flex flex-col p-1 py-2">
                  <label htmlFor="">User Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signupformData1.email}
                    required
                    onChange={handlesignup1Change}
                    placeholder="Enter your Email"
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4 text-black"
                  />
                </div>
                <div className="w-[90%]  flex flex-col p-1 py-2">
                  <div className="flex flex-row justify-between">
                    <label htmlFor="">Contact Number</label>
                    <span
                      onClick={handleVarify}
                      className="text-green-500 font-semibold text-sm"
                    >
                      Varify
                    </span>
                  </div>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={signupformData1.phone}
                    onChange={handlesignup1Change}
                    placeholder="enter phone Number"
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4 text-black"
                  />
                </div>
                {verify && (
                  <div className="w-[90%]  flex flex-col p-1 py-2">
                    <input
                      type="text"
                      onChange={handlesignup1Change}
                      placeholder="Enter OTP"
                      className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4 text-black"
                    />
                  </div>
                )}
                <div className="w-[90%]  flex flex-col p-1 py-2">
                  <label htmlFor="">Referral code(optional)</label>
                  <input
                    type="text"
                    name="referralCode"
                    value={signupformData1.referralCode}
                    onChange={handlesignup1Change}
                    placeholder="Enter rafferal code"
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4 text-black"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="termsCheckbox"
                    name="termsAndConditions"
                    checked={signupformData1.termsAndConditions}
                    value={signupformData1.termsAndConditions}
                    required
                    onChange={handlesignup1Change}
                    className="mx-3"
                  />
                  <label htmlFor="termsCheckbox" className="text-xs m-2 ">
                    I agree to the terms and conditions Lorem ipsum dolor sit,
                    amet consectetur adipisicing elit. Quaerat, expedita!
                  </label>
                </div>
                <div className="pb-4">
                  <button
                    onClick={handleNextPage}
                    className="p-2 px-4 bg-red-400 text-sm font-medium text-white rounded-full shadow-xl"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-evenly bg-white text-black w-auto gap-3 max-w-sm md:max-w-full p-8 md:p-0">
                <div className="p-1 pt-2 mr-[56%] text-lg font-medium">
                  Company Information
                </div>
                <div className="w-[90%]  flex flex-col p-1 py-2">
                  <input
                    type="text"
                    name="companyName"
                    value={signupformData1.companyName}
                    onChange={handlesignup1Change}
                    placeholder="Enter Compny Name"
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4 text-black"
                  />
                </div>
                <div className="w-[90%] flex flex-col p-1 py-2">
                  <select
                    name="companySize"
                    onChange={handlesignup1Change}
                    value={signupformData1.companySize}
                    id=""
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4"
                  >
                    <option value="">Company-size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-20">11-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-200">101-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div className="w-[90%] flex flex-col p-1 py-2">
                  <select
                    name="yourRole"
                    onChange={handlesignup1Change}
                    value={signupformData1.yourRole}
                    id=""
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4"
                  >
                    <option value="">Your Role</option>
                    <option value="hr">HR Team</option>
                    <option value="finance">Finance Team</option>
                    <option value="management">Management Team</option>
                    <option value="consulting">HR Consulting Firm</option>
                    <option value="employee">Employee</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-[90%] flex flex-col p-1 py2">
                  <select
                    id="industryType"
                    name="companyIndustry"
                    onChange={handlesignup1Change}
                    value={signupformData1.companyIndustry}
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%] py-2 px-4"
                  >
                    <option value="">Select an industry</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Telecommunications">
                      Telecommunications
                    </option>
                    <option value="Textiles and Garments">
                      Textiles and Garments
                    </option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Banking and Finance">
                      Banking and Finance
                    </option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Tourism">Tourism</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Energy">Energy</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Entertainment and Media">
                      Entertainment and Media
                    </option>
                    <option value="Fast-Moving Consumer Goods (FMCG)">
                      Fast-Moving Consumer Goods (FMCG)
                    </option>
                    <option value="Steel and Manufacturing">
                      Steel and Manufacturing
                    </option>
                    <option value="Retail">Retail</option>
                    <option value="Space and Aerospace">
                      Space and Aerospace
                    </option>
                    <option value="Information Technology (IT)">
                      Information Technology (IT)
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-[90%] flex  flex-col p-1 py2">
                  <label htmlFor="">Your Requirements</label>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    value={signupformData1.requirements.map((requirement) => ({
                      value: requirement,
                      label: requirement,
                    }))}
                    isMulti
                    options={options}
                    name="requirements"
                    onChange={handleRequirementChange}
                  />
                </div>
                <div className="w-[90%]  flex flex-col p-1 py-2">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    name="password"
                    value={signupformData1.password}
                    onChange={handlesignup1Change}
                    placeholder="enter Password"
                    className="rounded-b-none border-b-[0.7px] border-gray-500 w-[100%]  px-4"
                  />
                </div>
                <div className="flex flex-row items-center justify-between pt-4 p-2 pb-5 w-[90%]">
                  <div
                    onClick={handleNextPage}
                    className="cursor-pointer ml-2 hover:bg-red-400 hover:text-white hover:scale-105 w-[40px] h-[40px] flex items-center justify-center bg-white text-red-400 border border-red-400 rounded-full shadow-xl"
                  >
                    <AiOutlineLeft />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="p-2 px-4 bg-red-400 text-sm font-medium text-white rounded-full shadow-xl"
                    >
                      Complate Signup
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Signup1;
