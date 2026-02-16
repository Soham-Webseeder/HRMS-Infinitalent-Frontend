import React, { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { ImLinkedin } from "react-icons/im";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCompany_ID } from "../../redux/slices/EmployeeSlice";
import { Address } from "./Address";
import Admin from "./Admin";

const Overview = () => {
  const { user } = useSelector((state) => state.user);
  const { company_ID } = useSelector((state) => state.user);

  const [c_id, setC_id] = useState("");

  const dispatch = useDispatch();
  const [companyData, setCompanyData] = useState(
    {
      companyName: "",
      website: "",
      linkedinUrl:"",
      youtubeUrl:"",
      twitterUrl:"",
      facebookUrl:"",
      companyEmail: "",
      brandName: "",
      companyContact: "",
      domainName: "",
      industryType: "",
      registeredOffice: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      corporateOffice: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
      customOffice: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
    }
  );

  useEffect(() => {
    fetchCompanyData();
    const fetchUserData = async () => {
      try {
        console.log(user.id, "userid");
        if (user.id) {
          const res = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/auth/user/${user.id}`
          );
          const response = res.data.response.companyDetails;

          setC_id(response);
          dispatch(setCompany_ID(response));
          console.log(company_ID, "companyIddddddd");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchUserData();
  }, [user]);

  const fetchCompanyData = async () => {
    if (c_id) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/company/${c_id}`
        );
        const companydata = response.data.response;
        console.log(companydata.linkedinUrl, "linkedinUrl");
        const updatedData = {
          companyName: companydata.companyName || "",
          website: companydata.website || "",
          companyEmail: companydata.companyEmail || "",
          brandName: companydata.brandName || "",
          companyContact: companydata.companyContact || "",
          domainName: companydata.domainName || "",
          industryType: companydata.industryType || "",
          linkedinUrl: companydata.linkedinUrl || "",
          twitterUrl: companydata.twitterUrl || "",
          youtubeUrl: companydata.youtubeUrl || "",
          facebookUrl: companydata.facebookUrl || "",
          registeredOffice: {
            addressLine1: companydata.registeredOffice?.addressLine1 || "",
            addressLine2: companydata.registeredOffice?.addressLine2 || "",
            city: companydata.registeredOffice?.city || "",
            state: companydata.registeredOffice?.state || "",
            country: companydata.registeredOffice?.country || "",
            pincode: companydata.registeredOffice?.pincode || "",
          },
          corporateOffice: {
            addressLine1: companydata.corporateOffice?.addressLine1 || "",
            addressLine2: companydata.corporateOffice?.addressLine2 || "",
            city: companydata.corporateOffice?.city || "",
            state: companydata.corporateOffice?.state || "",
            country: companydata.corporateOffice?.country || "",
            pincode: companydata.corporateOffice?.pincode || "",
          },
          customOffice: {
            addressLine1: companydata.customOffice?.addressLine1 || "",
            addressLine2: companydata.customOffice?.addressLine2 || "",
            city: companydata.customOffice?.city || "",
            state: companydata.customOffice?.state || "",
            country: companydata.customOffice?.country || "",
            pincode: companydata.customOffice?.pincode || "",
          },
        };
        // Update both state variables with the same data
        setCompanyData(updatedData);
        setCompanyFormData(updatedData);
        setSocialMediaFormData({
          linkedinUrl: companydata.linkedinUrl || "",
          twitterUrl: companydata.twitterUrl || "",
          youtubeUrl: companydata.youtubeUrl || "",
          facebookUrl: companydata.facebookUrl || "",
        })



      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }
  };
  

  console.log(companyData, "COMPA")


  console.log(companyData, "COMPA")

  useEffect(() => {
    fetchCompanyData();
    console.log(c_id,"company id")
  }, [c_id]);

  const [edit, setEdit] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    website: "",
    companyEmail: "",
    brandName: "",
    companyContact: "",
    domainName: "",
    industryType: "",
    linkedinUrl: "",
    youtubeUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    registeredOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    corporateOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    customOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [socialMediaFormData, setSocialMediaFormData] = useState({
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    youtubeUrl: "",
  });

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleCompanyChange = (e) => {
    setCompanyFormData({
      ...companyFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisteredOfficeChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    setCompanyFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  const handleSocialMediaChange = (e) => {
    setSocialMediaFormData({
      ...socialMediaFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();

    try {
      // Log the companyFormData to ensure it's correct
      console.log("Submitting company form data:", companyFormData);

      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/updateCompany/${c_id}`,
        companyFormData
      );

      // Check if response is as expected
      console.log("Response received:", response);

      if (response.status === 200) {
        toast.success("Company Updated Successfully!");
       
        setEdit(false);
       
        setCompanyData(response.data.data); // Update state with saved data
      } else {
        toast.error("Failed to update company.");
      }
    } catch (error) {
      // Detailed error logging
      console.error("Error submitting company form data:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }

      toast.error("An error occurred while updating the company.");
    }
  };

  const handleEdit2 = () => {
    setEditMode(true); // Enable edit mode when the form is opened
    setEdit2((prevEdit) => !prevEdit);

  };

  const handleSocialMediaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/updateCompany/${c_id}`,
        socialMediaFormData
      );
      toast.success("Social Media Updated Successfully!");
      console.log("Social Media Form Data submitted successfully:", response);
      setEdit2(false);
      setEditMode(false); // Disable edit mode after saving
      setSocialMediaFormData(response.data.data);
      fetchCompanyData();
      
    } catch (error) {
      console.error("Error submitting social media form data:", error);
    }
  };

  const handleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  // const handleEdit2 = () => {
  //   setEdit2((prevEdit) => !prevEdit);
  // };

  return (
    <div className="w-full flex items-center justify-center">
      <div className=" px-4 w-full flex items-center flex-col  2xl:w-[80%]">
        <Toaster />
        <div className="  w-full py-1">
          <div>
            <div className="flex flex-row items-center justify-center p-2 bg-white mb-2 shadow-md rounded-md">
              <h1 className="text-[28px] font-bold text-center">Overview </h1>

            </div>

            <div className="bg-white shadow-md rounded-md p-4">
              {edit ? (
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className=" flex mb-2 w-full pr-2 justify-between items-center  shadow-md  border-gray-490 rounded-md">
                    <h1 className="text-xl font-bold p-1 ">
                      Profile:
                    </h1>
                    <div
                      onClick={handleEdit}
                      className="text-xl font-bold cursor-pointer"
                    >
                      <MdOutlineEdit />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="space-y-4">

                      <div className="flex flex-col mt-2">

                        <label
                          htmlFor="companyName1"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Registered Company Name
                        </label>
                        <input
                          id="companyName1"
                          className="border rounded-md py-2 px-4 mt-2"
                          type="text"
                          value={companyFormData.companyName}
                          onChange={handleCompanyChange}
                          name="companyName"
                          placeholder="Enter Company Name"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="companyEmail1"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Company Official Email
                        </label>
                        <input
                          id="companyEmail1"
                          className="border rounded-md py-2 px-4 mt-2"
                          type="email"
                          value={companyFormData.companyEmail}
                          name="companyEmail"
                          onChange={handleCompanyChange}
                          placeholder="Enter Company Email"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="companyWebsite1"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Company Website
                        </label>
                        <input
                          id="companyWebsite1"
                          className="border rounded-md py-2 px-4 mt-2"
                          type="url"
                          name="website"
                          value={companyFormData.website}
                          onChange={handleCompanyChange}
                          placeholder="Enter Company Website"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="industryType"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Industry Type
                        </label>
                        <input
                          id="industryType"
                          className="border rounded-md py-2 px-4 mt-2"
                          value={companyFormData.companyIndustry}
                          onChange={handleCompanyChange}
                          name="industryType"
                          placeholder="Enter Industry Type"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="brandName"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Brand Name
                        </label>
                        <input
                          id="brandName"
                          className="border rounded-md py-2 px-4 mt-2"
                          type="text"
                          name="brandName"
                          value={companyFormData.brandName}
                          placeholder="Enter Brand Name"
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="companyContact"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Company Official Contact
                        </label>
                        <input
                          id="companyContact"
                          className="border rounded-md py-2 px-4 mt-2"
                          type="tel"
                          name="companyContact"
                          value={companyFormData.companyContact}
                          onChange={handleCompanyChange}
                          placeholder="Enter Company Contact"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="domainName"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Domain Name
                        </label>
                        <input
                          id="domainName"
                          className="border rounded-md py-2 px-4 mt-2"
                          type="text"
                          name="domainName"
                          value={companyFormData.domainName}
                          onChange={handleCompanyChange}
                          placeholder="Enter Domain Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      {/* Registered Office Address */}
                      <div >
                        <h1 className="text-xl font-bold text-slate-700 my-2 p-1 border shadow-md rounded-md">
                          Registered Office Address:
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="registeredOffice.addressLine1"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 1
                          </label>
                          <input
                            id="registeredOffice.addressLine1"
                            name="registeredOffice.addressLine1"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={
                              companyFormData.registeredOffice.addressLine1
                            }
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="registeredOffice.addressLine2"
                            className="text-md font-bold text-gray-700 py-1 "
                          >
                            Address Line 2
                          </label>
                          <input
                            id="registeredOffice.addressLine2"
                            name="registeredOffice.addressLine2"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={
                              companyFormData.registeredOffice.addressLine2
                            }
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex flex-col">
                            <label
                              htmlFor="registeredOffice.city"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              City
                            </label>
                            <input
                              id="registeredOffice.city"
                              name="registeredOffice.city"
                              type="text"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.registeredOffice.city}
                              onChange={handleRegisteredOfficeChange}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="registeredOffice.state"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              State
                            </label>
                            <select
                              id="registeredOffice.state"
                              name="registeredOffice.state"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.registeredOffice.state}
                              onChange={handleRegisteredOfficeChange}
                            >
                              <option value="">Select a state</option>
                              {states.map((state, index) => (
                                <option key={index} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="registeredOffice.country"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              Country
                            </label>
                            <input
                              id="registeredOffice.country"
                              name="registeredOffice.country"
                              type="text"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.registeredOffice.country}
                              onChange={handleRegisteredOfficeChange}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="registeredOffice.pincode"
                            className="text-md font-bold text-gray-700 py-1 mt-2"
                          >
                            Pincode
                          </label>
                          <input
                            id="registeredOffice.pincode"
                            name="registeredOffice.pincode"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.registeredOffice.pincode}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                      </div>

                      {/* Corporate Office Address */}
                      <div className="">
                        <h1 className="text-xl font-bold text-black my-2 p-1 border shadow-md rounded-md">
                          Corporate Office Address:
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                          <label
                            htmlFor="corporateOffice.addressLine1"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 1
                          </label>
                          <input
                            id="corporateOffice.addressLine1"
                            name="corporateOffice.addressLine1"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.corporateOffice.addressLine1}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                 
                        <div className="flex flex-col ">
                          <label
                            htmlFor="corporateOffice.addressLine2"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 2
                          </label>
                          <input
                            id="corporateOffice.addressLine2"
                            name="corporateOffice.addressLine2"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.corporateOffice.addressLine2}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="corporateOffice.city"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              City
                            </label>
                            <input
                              id="corporateOffice.city"
                              name="corporateOffice.city"
                              type="text"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.corporateOffice.city}
                              onChange={handleRegisteredOfficeChange}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="corporateOffice.state"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              State
                            </label>
                            <select
                              id="corporateOffice.state"
                              name="corporateOffice.state"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.corporateOffice.state}
                              onChange={handleRegisteredOfficeChange}
                            >
                              <option value="">Select a state</option>
                              {states.map((state, index) => (
                                <option key={index} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="corporateOffice.country"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              Country
                            </label>
                            <input
                              id="corporateOffice.country"
                              name="corporateOffice.country"
                              type="text"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.corporateOffice.country}
                              onChange={handleRegisteredOfficeChange}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="corporateOffice.pincode"
                            className="text-md font-bold text-gray-700 py-1 mt-2"
                          >
                            Pincode
                          </label>
                          <input
                            id="corporateOffice.pincode"
                            name="corporateOffice.pincode"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.corporateOffice.pincode}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                      </div>

                      {/* Custom Office Address */}
                      <div className="gap-2">
                        <h1 className="text-xl font-bold text-black my-2 p-1 border shadow-md rounded-md">
                          Custom Office Address:
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                          <label
                            htmlFor="customOffice.addressLine1"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 1
                          </label>
                          <input
                            id="customOffice.addressLine1"
                            name="customOffice.addressLine1"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.customOffice.addressLine1}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="customOffice.addressLine2"
                            className="text-md font-bold text-gray-700 py-1 "
                          >
                            Address Line 2
                          </label>
                          <input
                            id="customOffice.addressLine2"
                            name="customOffice.addressLine2"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.customOffice.addressLine2}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex flex-col">
                            <label
                              htmlFor="customOffice.city"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              City
                            </label>
                            <input
                              id="customOffice.city"
                              name="customOffice.city"
                              type="text"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.customOffice.city}
                              onChange={handleRegisteredOfficeChange}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="customOffice.state"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              State
                            </label>
                            <select
                              id="customOffice.state"
                              name="customOffice.state"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.customOffice.state}
                              onChange={handleRegisteredOfficeChange}
                            >
                              <option value="">Select a state</option>
                              {states.map((state, index) => (
                                <option key={index} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="customOffice.country"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              Country
                            </label>
                            <input
                              id="customOffice.country"
                              name="customOffice.country"
                              type="text"
                              className="border rounded-md py-2 px-4 mt-2"
                              value={companyFormData.customOffice.country}
                              onChange={handleRegisteredOfficeChange}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="customOffice.pincode"
                            className="text-md font-bold text-gray-700 py-1 mt-2"
                          >
                            Pincode
                          </label>
                          <input
                            id="customOffice.pincode"
                            name="customOffice.pincode"
                            type="text"
                            className="border rounded-md py-2 px-4 mt-2"
                            value={companyFormData.customOffice.pincode}
                            onChange={handleRegisteredOfficeChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-end mt-4 space-x-4">
                    <button
                      onClick={handleEdit}
                      className="bg-gray-200 flex items-center justify-center rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-300"
                    >
                      <RxCross2 className="mr-1" />
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      onClick={handleCompanySubmit}
                      className="bg-blue-600 flex items-center justify-center rounded-md p-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      <AiOutlineCheck className="mr-1 text-xl" />
                      SAVE
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex mb-2 w-full pr-2 justify-between items-center  shadow-md  border-gray-490 rounded-md">
                    <h1 className="text-xl font-bold p-1 ">
                      Profile:
                      </h1>
                    <div
                      onClick={handleEdit}
                      className="text-xl font-bold cursor-pointer"
                    >
                      <MdOutlineEdit />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex flex-col mt-2">
                        <label
                          htmlFor="companyName1"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Registered Company Name
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.companyName
                            ? companyData.companyName
                            : ""}
                        </h1>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="companyEmail1"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Company Official Email
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.companyEmail
                            ? companyData.companyEmail
                            : ""}
                        </h1>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="companyWebsite1"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Company Website
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.website
                            ? companyData.website
                            : ""}
                        </h1>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="industryType"
                          className="text-md font-bold text-gray-700 py-1 mb-4"
                        >
                          Industry Type
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.industryType
                            ? companyData.industryType
                            : ""}
                        </h1>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="brandName"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Brand Name
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.brandName
                            ? companyData.brandName
                            : ""}
                        </h1>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="companyContact"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Company Official Contact
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.companyContact
                            ? companyData.companyContact
                            : ""}
                        </h1>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="domainName"
                          className="text-md font-bold text-gray-700 py-1"
                        >
                          Domain Name
                        </label>
                        <h1 className="text-sm">
                          {companyData && companyData.domainName
                            ? companyData.domainName
                            : ""}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-4">
                      <h1 className="text-xl font-bold text-black my-2 p-1 border shadow-md rounded-md">
                        Registered Office Address:
                      </h1>
                      <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="registeredOffice.addressLine1"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 1
                          </label>
                          <h1 className="text-sm">
                            {companyData?.registeredOffice?.addressLine1 || ""}
                          </h1>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="registeredOffice.addressLine2"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 2
                          </label>
                          <h1 className="text-sm">
                            {companyData?.registeredOffice?.addressLine2 || ""}
                          </h1>
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="registeredOffice.city"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              City
                            </label>
                            <h1 className="text-sm">
                              {companyData?.registeredOffice?.city || ""}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="registeredOffice.state"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              State
                            </label>
                            <h1 className="text-sm">
                              {companyData?.registeredOffice?.state || ""}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="registeredOffice.country"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              Country
                            </label>
                            <h1 className="text-sm">
                              {companyData?.registeredOffice?.country || ""}
                            </h1>
                          </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="registeredOffice.pincode"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Pincode
                          </label>
                          <h1 className="text-sm">
                            {companyData?.registeredOffice?.pincode || ""}
                          </h1>
                        </div>
                        </div>

                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-xl font-bold text-black my-2 p-1 border shadow-md rounded-md">
                        Corporate Office Address:
                      </h1>
                      <div className="flex flex-col gap-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="corporateOffice.addressLine1"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 1
                          </label>
                          <h1 className="text-sm">
                            {companyData?.corporateOffice?.addressLine1 || ""}
                          </h1>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="corporateOffice.addressLine2"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 2
                          </label>
                          <h1 className="text-sm">
                            {companyData?.corporateOffice?.addressLine2 || ""}
                          </h1>
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="corporateOffice.city"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              City
                            </label>
                            <h1 className="text-sm">
                              {companyData?.corporateOffice?.city || ""}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="corporateOffice.state"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              State
                            </label>
                            <h1 className="text-sm">
                              {companyData?.corporateOffice?.state || ""}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="corporateOffice.country"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              Country
                            </label>
                            <h1 className="text-sm">
                              {companyData?.corporateOffice?.country || ""}
                            </h1>
                          </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="corporateOffice.pincode"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Pincode
                          </label>
                          <h1 className="text-sm">
                            {companyData?.corporateOffice?.pincode || ""}
                          </h1>
                        </div>
                        </div>

                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-xl font-bold text-black my-2 p-1 border shadow-md rounded-md">
                        Custom Office Address:
                      </h1>
                      <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label
                            htmlFor="customOffice.addressLine1"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 1
                          </label>
                          <h1 className="text-sm">
                            {companyData?.customOffice?.addressLine1 || ""}
                          </h1>
                        </div>

                        <div className="flex flex-col">
                          <label
                            htmlFor="customOffice.addressLine2"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Address Line 2
                          </label>
                          <h1 className="text-sm">
                            {companyData?.customOffice?.addressLine2 || ""}
                          </h1>
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label
                              htmlFor="customOffice.city"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              City
                            </label>
                            <h1 className="text-sm">
                              {companyData?.customOffice?.city || ""}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="customOffice.state"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              State
                            </label>
                            <h1 className="text-sm">
                              {companyData?.customOffice?.state || ""}
                            </h1>
                          </div>

                          <div className="flex flex-col">
                            <label
                              htmlFor="customOffice.country"
                              className="text-md font-bold text-gray-700 py-1"
                            >
                              Country
                            </label>
                            <h1 className="text-sm">
                              {companyData?.customOffice?.country || ""}
                            </h1>
                          </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="customOffice.pincode"
                            className="text-md font-bold text-gray-700 py-1"
                          >
                            Pincode
                          </label>
                          <h1 className="text-sm">
                            {companyData?.customOffice?.pincode || ""}
                          </h1>
                        </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container  py-4">
          <div >
            <div className="bg-white pt-1 rounded-md shadow-md py-2">
              {!edit2 ? (
                <div className="flex flex-col gap-2 ml-5 ">
                  <div className=" flex w-full justify-between items-center border shadow-md rounded-md">

                    <h1 className="text-xl font-bold text-slate-700 my-2 px-2 ">
                      Social Media:
                    </h1>
                    <div
                      onClick={handleEdit2}
                      className="mr-1 text-xl text-center font-bold cursor-pointer"
                    >
                      <MdOutlineEdit />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 max-sm:grid-cols-1 space-y-2">

                    <Link to={companyData?.linkedinUrl || "#"}>
                      <div className="flex gap-2 items-center">
                        <div className="text-3xl text-blue-700 rounded-full">
                          <ImLinkedin />
                        </div>
                        <p className="text-blue-500 text-[17px] max-sm:text-[15px]">
                          {companyData?.linkedinUrl || "linkedin"}
                        </p>
                      </div>
                    </Link>
                    <Link to={companyData?.facebookUrl || "#"}>
                      <div className="flex gap-2 items-center">
                        <div className="text-3xl text-blue-800 rounded-full">
                          <FaFacebook />
                        </div>
                        <p className="text-blue-500 text-[17px] max-sm:text-[15px]">
                          {companyData?.facebookUrl || "facebook"}
                        </p>
                      </div>
                    </Link>
                    <Link to={companyData?.twitterUrl || "#"}>
                      <div className="flex gap-2 items-center">
                        <div className="text-3xl text-blue-500 rounded-full">
                          <FaTwitter />
                        </div>
                        <p className="text-blue-500 text-[17px] max-sm:text-[15px]">
                          {companyData?.twitterUrl || "twitter"}
                        </p>
                      </div>
                    </Link>
                    <Link to={companyData?.youtubeUrl || "#"}>
                      <div className="flex gap-2 items-center">
                        <div className="text-3xl text-red-500 rounded-full">
                          <AiFillYoutube />
                        </div>
                        <p className="text-blue-500 text-[17px] max-sm:text-[15px]">
                          {companyData?.youtubeUrl || "youtube"}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                <div className="px-4 flex w-full justify-between items-center border shadow-md rounded-md ">
                    <h1 className="text-xl font-bold text-black my-2 p-1 ">
                      Social Media
                    </h1>
                    <div
                      onClick={handleEdit2}
                      className="mr-1 text-xl text-center font-bold cursor-pointer"
                    >
                      <MdOutlineEdit />
                    </div>
                  </div>
                  <form onSubmit={handleSocialMediaSubmit} className="px-4" >
                    <div className=" grid grid-cols-2 max-sm:grid-cols-1">
                      <div className="flex flex-row justify-start items-center m-2">
                        <div className="text-3xl text-blue-700 text-center">
                          <ImLinkedin />
                        </div>
                       
                          <input
                            className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                            type="url"
                            name="linkedinUrl"
                            value={socialMediaFormData.linkedinUrl}
                            onChange={handleSocialMediaChange}
                            placeholder="Enter LinkedIn URL"
                          />
                    
                      </div>
                      <div className="flex flex-row justify-start items-center m-2">
                        <div className="text-3xl text-blue-800 text-center">
                          <FaFacebook />
                        </div>
                    
                          <input
                            className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                            type="url"
                            name="facebookUrl"
                            value={socialMediaFormData.facebookUrl}
                            onChange={handleSocialMediaChange}
                            placeholder="Enter Facebook URL"
                          />
                        
                      </div>
                      <div className="flex flex-row justify-start items-center m-2">
                        <div className="text-3xl text-blue-500 text-center">
                          <FaTwitter />
                        </div>
                       
                          <input
                            className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                            type="url"
                            name="twitterUrl"
                            value={socialMediaFormData.twitterUrl}
                            onChange={handleSocialMediaChange}
                            placeholder="Enter Twitter URL"
                          />
                       
                      </div>
                      <div className="flex flex-row justify-start items-center m-2">
                        <div className="text-3xl text-red-700 text-center">
                          <AiFillYoutube />
                        </div>
                  
                          <input
                            className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                            type="url"
                            name="youtubeUrl"
                            value={socialMediaFormData.youtubeUrl}
                            onChange={handleSocialMediaChange}
                            placeholder="Enter YouTube URL"
                          />
                      
                      </div>
                    </div>

                    {/* Render the Save and Cancel buttons only in edit mode */}
                    {editMode && (
                      <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                        <div className="flex flex-row">
                          <div className="mr-4 bg-gray-200 flex items-center justify-center rounded-md p-2 text-sm font-semibold text-black hover:bg-gray-300 cursor-pointer"   onClick={() => setEdit2(false)}>
                            <RxCross2 className="text-black text-sm font-semibold" />
                            <button
                              type="button"
                             // Disable edit mode when cancel is clicked
                              className="text-black text-sm font-semibold"
                            >
                              CANCEL
                            </button>
                          </div>
                          <div className="bg-blue-700 flex items-center justify-center rounded-md p-2 text-sm font-semibold cursor-pointer text-black hover:bg-blue-300"  >
                            <AiOutlineCheck className="text-xl text-white" />
                            <button
                              type="submit"
                              className="text-white text-sm font-semibold"
                              >
                              SAVE
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* <Address /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
