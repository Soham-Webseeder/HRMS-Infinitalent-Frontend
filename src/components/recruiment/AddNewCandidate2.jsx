import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EducationalInformation from "./EducationalInformation";
import PastExperience from "./PastExperience";
import { increment } from "../../redux/slices/CounterSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddNewCandidate2({ updateId, setUpdateId, type }) {
  const [positionData, setPositionData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternativePhone: "",
    presentAddress: "",
    permanentAddress: "",
    country: "",
    interviewDate: "",
    applicationDate: "",
    jobPosition: "",
    resume: "", // Changed initial value to empty string
    document: "", // Changed initial value to empty string
    linkedln: "",
  });
  const currentForm = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = localStorage.getItem("candidateData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      alternativePhone: "",
      presentAddress: "",
      permanentAddress: "",
      country: "",
      interviewDate: "",
      applicationDate: "",
      jobPosition: "",
      resume: "", // Changed initial value to empty string
      document: "", // Changed initial value to empty string
      linkedln: "",
    });
  }, []);

  const fetchPosition = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/get-designations`
      );
      setPositionData(res.data.response);
      // console.log(res.data.response,"Desi")
      console.log(positionData, "posion");
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchPosition();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result, // Base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("candidateData", JSON.stringify(formData));
    dispatch(increment());
  };

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return <EducationalInformation />;
      case 2:
        return <PastExperience updateId={updateId} setUpdateId={setUpdateId} />;
      case 0:
      default:
        return (
          <div className="bg-zinc-100 ">
            <div className="bg-gray-100 p-5 shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Last Name"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Phone"
                      required
                    />
                  </div>

                  {/* Alternative Phone */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Alternative Phone
                    </label>
                    <input
                      type="tel"
                      name="alternativePhone"
                      value={formData.alternativePhone}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Alternative Phone"
                    />
                  </div>

                  {/* Present Address */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Present Address
                    </label>
                    <input
                      type="text"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Present Address"
                    />
                  </div>

                  {/* Permanent Address */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Permanent Address
                    </label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Permanent Address"
                    />
                  </div>

                  {/* Country */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="Country"
                    />
                  </div>

                  {/* Application Date */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Application Date
                    </label>
                    <input
                      type="date"
                      name="applicationDate"
                      value={formData.applicationDate}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                    />
                  </div>

                  {/* Interview Date */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">
                      Interview Date
                    </label>
                    <input
                      type="date"
                      name="interviewDate"
                      value={formData.interviewDate}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                    />
                  </div>

                  {/* Job Position */}
                  <div className="mb-2">
                    <label className="text-gray-700 font-bold">
                      Job Position <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jobPosition"
                      value={formData.jobPosition}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Job Position</option>
                      {positionData.map((position) => (
                        <option key={position._id} value={position._id}>
                          {position.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedln"
                      value={formData.linkedln}
                      onChange={handleChange}
                      className="mt-2 p-2 border rounded"
                      placeholder="LinkedIn"
                    />
                  </div>

                  {/* Resume */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">Resume</label>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx" // Update if needed for other file types
                      className="mt-2 p-2 border rounded bg-white"
                    />
                  </div>

                  {/* Document */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-bold">Document</label>
                    <input
                      type="file"
                      name="document"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx" // Update if needed for other file types
                      className="bg-white mt-2 p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end mt-4">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-500 text-white rounded-full"
                  >
                    NEXT
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className=" md:p-6 lg:p-8 bg-white  p-4 w-full">
      <h1 className=" text-xl md:text-2xl font-bold ">Recruitment</h1>
      <div className="flex justify-between items-center">

        {/* Navigation Links */}
        <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
          <Link to="/" className="cursor-pointer hover:text-slate-800">
            Home
          </Link>
          <span>|</span>
          <Link to="/app/employee" className="cursor-pointer hover:text-slate-800">
            Recruitment
          </Link>
          <span>|</span>
          <span className="cursor-default text-gray-500 hover:text-slate-800">
            Add Candidate
          </span>
        </div>

        {/* Export Button */}
          {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
            <svg
              className="fill-current w-4 h-3.5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span className="text-md justify-center">Export</span>
          </button> */}
      </div>

      <hr className="my-4 border-t-2 border-gray-300" />
      <div className=" overflow-x-hidden flex flex-col w-full mx-auto">
        <div className="bg-gray-100 shadow rounded-lg p-4  ">
          <div className="py-4 overflow-x-auto">
            <ul className="flex space-x-2 border-b text-nowrap">
              <li>
                <button
                  onClick={() =>
                    dispatch({ type: "SET_CURRENT_FORM", payload: 0 })
                  }
                  className={`py-2 px-4 text-sm ${
                    currentForm === 0
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-zinc-600 hover:text-blue-600"
                  }`}
                >
                  Basic Information
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    dispatch({ type: "SET_CURRENT_FORM", payload: 1 })
                  }
                  className={`py-2 px-4 text-sm ${
                    currentForm === 1
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-zinc-600 hover:text-blue-600"
                  }`}
                >
                  Educational Information
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    dispatch({ type: "SET_CURRENT_FORM", payload: 2 })
                  }
                  className={`py-2 px-4 text-sm ${
                    currentForm === 2
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-zinc-600 hover:text-blue-600"
                  }`}
                >
                  Past Experience
                </button>
              </li>
            </ul>
          </div>
          <div className="py-4">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
}
