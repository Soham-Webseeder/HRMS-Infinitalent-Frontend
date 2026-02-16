import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { ImLinkedin } from "react-icons/im";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import Statutory_temprary from "./Statutory_temprary";
import { Bank_details } from "./BankDetails";

export const Statutory = () => {
  const [edit, setEdit] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    website: "",
    companyEmail: "",
    brandName: "",
    companyContact: "",
    domainName: "",
    industryType: "",
  });

  const [socialMediaFormData, setSocialMediaFormData] = useState({
    linkedinUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    youtubeUrl: "",
  });

  const handleCompanyChange = (e) => {
    setCompanyFormData({
      ...companyFormData,
      [e.target.name]: e.target.value,
    });
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
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/company/createOverview`,
        companyFormData
      );
      console.log("Company Form Data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting company form data:", error);
    }
  };

  const handleSocialMediaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/company/createOverview`,
        socialMediaFormData
      );
      console.log(
        "Social Media Form Data submitted successfully:",
        response.data
      );
    } catch (error) {
      console.error("Error submitting social media form data:", error);
    }
  };

  const handleEdit = () => {
    setEdit((prevEdit) => !prevEdit);
  };

  const handleEdit2 = () => {
    setEdit2((prevEdit) => !prevEdit);
  };

  const [fields, setFields] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const handleAddFields = () => {
    setFields([...fields, { name, email, phone }]);
    setName("");
    setEmail("");
    setPhone("");
    setShowButtons(true);
  };
  const handleCancel = () => {
    setFields([]);
    setShowButtons(false);
  };
  const handleRemoveFields = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleSaveFields = () => {};

  const [auditorfields, auditorsetFields] = useState([]);
  const [auditorname, auditorsetName] = useState("");
  const [auditoremail, auditorsetEmail] = useState("");
  const [auditorphone, auditorsetPhone] = useState("");
  const [auditorshowButtons, auditorsetShowButtons] = useState(false);
  const handleauditorAddFields = () => {
    auditorsetFields([...fields, { name, email, phone }]);
    auditorsetName("");
    auditorsetEmail("");
    auditorsetPhone("");
    auditorsetShowButtons(true);
  };
  const handleauditorCancel = () => {
    setFields([]);
    setShowButtons(false);
  };
  const handleauditorRemoveFields = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const handleauditorSaveFields = () => {};

  return (
    <div>
      <div className="bg-slate-200 h-[100vh]">
        <div className="container mx-auto md:w-[40%] sm:w-full w-full py-2">
          <div>
            <div className="flex flex-row items-center justify-between p-1 bg-slate-50 border-b-[0.7px] border-gray-500 mb-1">
              <h1 className="text-xl font-semibold mb-4 ml-1">Company ID</h1>
              <div
                onClick={handleEdit}
                className="mr-1 text-xl text-center font-bold cursor-pointer"
              >
                <MdOutlineEdit />
              </div>
            </div>

            <div className="bg-slate-100">
              {edit ? (
                <div>
                  {" "}
                  <form onSubmit={handleCompanySubmit}>
                    <div className="flex flex-row justify-around">
                      <div className="p-1 bg-slate-50 pl-3 w-[50%]">
                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyName1"
                            className="text-normal "
                          >
                            Company PAN
                          </label>
                          <div className="flex flex-row items-center justify-center">
                            <input
                              id="companyName1"
                              className="rounded-b-none border-b-[0.7px] border-gray-500 w-[80%] py-2 px-4"
                              type="text"
                              value={companyFormData.companyName}
                              onChange={handleCompanyChange}
                              name="companyName"
                              placeholder="Enter Company Name"
                            />
                            <input
                              id="panFile"
                              type="file"
                              name="panFile"
                              onChange={handleCompanyChange}
                            />
                          </div>
                        </div>

                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyEmail1"
                            className="text-normal"
                          >
                            Company TAN
                          </label>
                          <input
                            id="companyEmail1"
                            className="rounded-b-none border-b-[0.7px] border-gray-500 w-[80%] py-2 px-4"
                            type="email"
                            value={companyFormData.companyEmail}
                            name="companyEmail"
                            onChange={handleCompanyChange}
                            placeholder="Enter Company Email"
                          />
                        </div>

                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyWebsite1"
                            className="text-narmal "
                          >
                            Date of incorporatoin
                          </label>
                          <input
                            id="companyWebsite1"
                            className="rounded-b-none border-b-[0.7px] border-gray-500 w-[80%] mr-2 py-2 px-6"
                            type="date"
                            name="website"
                            value={companyFormData.website}
                            onChange={handleCompanyChange}
                            placeholder="Enter Company Website"
                          />
                        </div>

                        <div className="m-1 p-2 flex flex-col">
                          <label
                            htmlFor="industryType"
                            className="text-normal "
                          >
                            entity type
                          </label>
                          <select
                            id="industryType"
                            value={companyFormData.industryType}
                            onChange={handleCompanyChange}
                            name="industryType"
                            className="rounded-b-none border-b-[0.7px] border-gray-500 w-[80%] py-4 px-4"
                          >
                            <option value="education">Education</option>
                            <option value="technology">Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-1 bg-slate-50 pl-3 w-[50%]">
                        <div className="m-1 p-2 flex flex-col">
                          <label
                            htmlFor="companyName2"
                            className="text-normal "
                          >
                            CIN
                          </label>
                          <div className="flex flex-row gap-0 items-center justify-center">
                            <input
                              id="companyName2"
                              className="rounded-b-none border-b-[0.7px] border-gray-500 w-[80%] py-2 px-4"
                              type="text"
                              name="brandName"
                              value={companyFormData.brandName}
                              placeholder="Enter Company Name"
                              onChange={handleCompanyChange}
                            />
                            <input
                              id="panFile"
                              type="file"
                              name="panFile"
                              onChange={handleCompanyChange}
                            />
                          </div>
                        </div>

                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyEmail2"
                            className="text-normal "
                          >
                            Company GST
                          </label>
                          <div className="flex flex-row gap-0 items-center justify-center">
                            <input
                              id="companyEmail2"
                              className="rounded-b-none border-b-[0.7px] border-gray-500 w-[80%] py-2 px-4"
                              type="phone"
                              name="companyContact"
                              value={companyFormData.companyContact}
                              onChange={handleCompanyChange}
                              placeholder="Enter Company Email"
                            />
                            <input
                              id="gstFile"
                              type="file"
                              name="gstFile"
                              onChange={handleCompanyChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                      <div className=" bg-white flex flex-row w-[300px] ">
                        <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                          <RxCross2 className="text-black text-sm font-semibold" />
                          <button
                            onClick={handleEdit}
                            className="text-black text-sm font-semibold"
                          >
                            CANCEL
                          </button>
                        </div>
                        <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                          <AiOutlineCheck className="text-xl" />
                          <button
                            type="submit"
                            onClick={handleEdit}
                            className="text-white text-sm font-semibold pl-3 pr-3"
                          >
                            SAVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>{" "}
                </div>
              ) : (
                <div>
                  <form action="">
                    <div className="flex flex-row justify-around">
                      <div className="p-1 bg-slate-50 pl-3 w-[50%]">
                        <div className="m-1 p-2">
                          <label htmlFor="companyName1" className="text-normal">
                            Entity Type
                          </label>
                          <h1
                            id="companyName1"
                            className="text-lg font-semibold"
                          >
                            {" "}
                            -
                          </h1>
                        </div>
                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyEmail1"
                            className="text-normal"
                          >
                            Company PAN
                          </label>
                          <h1
                            id="companyEmail1"
                            className="text-lg font-semibold"
                          >
                            -
                          </h1>
                        </div>
                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyWebsite1"
                            className="text-normal"
                          >
                            Company TAN
                          </label>
                          <h1
                            id="companyWebsite1"
                            className="text-lg font-semibold"
                          >
                            -
                          </h1>
                        </div>
                        <div className="m-1 p-2">
                          <label htmlFor="industryType" className="text-normal">
                            CIN
                          </label>
                          <h1
                            id="industryType"
                            className="text-lg font-semibold"
                          >
                            -
                          </h1>
                        </div>
                      </div>
                      <div className="p-1 bg-slate-50 pl-3 w-[50%]">
                        <div className="m-1 p-2 flex flex-col">
                          <label htmlFor="companyName2" className="text-normal">
                            Date of Icorporation
                          </label>
                          <h1
                            id="companyName2"
                            className="text-lg font-semibold"
                          >
                            -
                          </h1>
                        </div>
                        <div className="m-1 p-2">
                          <label
                            htmlFor="companyEmail2"
                            className="text-normal"
                          >
                            GST
                          </label>
                          <h1
                            id="companyEmail2"
                            className="text-lg font-semibold"
                          >
                            -
                          </h1>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        <Statutory_temprary />
        <div className="mt-3">
          <Bank_details />
        </div>
      </div>
    </div>
  );
};

export default Statutory;
