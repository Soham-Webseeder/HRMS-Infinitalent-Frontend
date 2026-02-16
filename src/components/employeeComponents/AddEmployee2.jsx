import { RxCross1 } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import PositionalInformation from "./PositionalInformation2";
import Benefit from "./Benefit2";
import BiographicalInfo from "./BiographicalInfo2";
import AdditionalAddress from "./AdditionalAddress2";
import LoginInfo from "./LoginInfo2";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import axios from "axios";
import { setModal } from "../../redux/slices/SidebarSlice";
import BankDetails from "./BankDetails2";
import SalarySetup2 from "./SalarySetup2";
import { Link, useNavigate } from "react-router-dom";
export default function AddEmployee2({ updateId, setUpdateId, type }) {
  const [counter, setCounter] = useState();
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  const [formData, setFormData] = useState(() => {
    // Initialize state from localStorage or use comprehensive defaults
    const savedFormData = localStorage.getItem("formData");
    const defaultData = {
      // Basic Info
      firstName: "",
      middleName: "",
      lastName: "",
      maidenName: "",
      email: "",
      phone: "",
      alternativePhone: "",
      country: "",
      city: "",
      zipCode: "",
      empId: 1,

      // Positional Information
      dutyType: "",
      originalHireDate: "",
      terminationReason: "",
      rateType: "",
      payFrequency: "",
      salary: "",
      position: "",
      hireDate: "",
      reHireDate: "",
      rate: "",
      payFrequencyText: "",
      department: "",
      designation: "",
      businessUnit: "",
      hourlyRate: "",
      employmentStatus: "Active",
      employeeType: "ICPL",
      geofenceCenter: [],
      geofenceRadius: 0,

      // Benefits
      benefits: [{
        benefitType: "",
        startDate: "",
        benefitDescription: "",
        endDate: "",
      }],

      // Biographical Info
      dateOfBirth: "",
      maritalStatus: "Single",
      religion: "",
      citizenship: "",
      gender: "",
      // Files (Base64 strings or URLs)
      photograph: "",
      resume: "",
      aadharCard: "",
      panCard: "",
      SSC: "",
      HSC: "",
      documents: [{
        docName: "",
        docDocument: "",
      }],

      // Additional Address (Emergency Contact/Other Info)
      homeEmail: "",
      homePhone: "",
      cellPhone: "",
      businessEmail: "",
      businessPhone: "",
      emrContact: "",
      emrContactName: "",
      emrContactRelation: "",
      alterEmrContact: "",
      alterEmrContactName: "",
      alterEmrRelation: "",

      // Bank Details
      bankName: "",
      branchName: "",
      accountNo: "",
      acHolderName: "",
      accountType: "Saving",
      ifscCode: "",

      // Login Info
      password: "",
      userEmail: "", // Can be same as email
    };
    // Merge saved data with defaults to ensure all fields are present
    const parsedData = savedFormData ? JSON.parse(savedFormData) : {};
    return {
      ...defaultData,
      ...parsedData,
      benefits: parsedData.benefits || defaultData.benefits,
      documents: parsedData.documents || defaultData.documents,
    };
  });

  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/checkEmail?email=${email}`
      );
      return response.data.data?.exist;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setEmailError("This email already exists.");
      return; // Stop submission if the email exists
    }
    console.log(formData, "formData");
    localStorage.setItem("formData", JSON.stringify(formData));
    if (formData) {
      dispatch(increment());
    }
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      console.log(JSON.parse(savedFormData));
    }

    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );
      console.log(response.data.data, "emp");

      setCounter(response.data.data.length + 1);
      console.log("length", counter);
      setFormData((prev) => ({
        ...prev,
        empId: counter,
      }));
    };
    getData();
  }, []);

  useEffect(() => {
    // If we are NOT in update mode, clear the stale cache
    if (!updateId) {
      localStorage.removeItem("formData");
      // Optionally reset state to defaults if needed
    }

    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
        );
        const nextEmpId = response.data.data.length + 1;
        setCounter(nextEmpId);

        // Update formData with the new ID only for new creations
        if (!updateId) {
          setFormData((prev) => ({
            ...prev,
            empId: nextEmpId,
          }));
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    getData();
  }, [updateId]); // Add updateId as a dependency

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL
        }/employee/getEmployeeById/${updateId}`
      );

      console.log(response.data.data, "data of user");
      setFormData(response.data.data);
    };
    getUserData();
  }, []);

  const renderForm = () => {
    switch (currentForm) {
      case 1:
        return <BiographicalInfo formData={formData} setFormData={setFormData} updateId={updateId} />;
      case 2:
        return <PositionalInformation formData={formData} setFormData={setFormData} updateId={updateId} />;
      case 3:
        return <BankDetails formData={formData} setFormData={setFormData} updateId={updateId} />;
      case 4:
        return <Benefit formData={formData} setFormData={setFormData} updateId={updateId} />;
      case 5:
        return <AdditionalAddress formData={formData} setFormData={setFormData} updateId={updateId} />;
      case 6:
        return <LoginInfo formData={formData} setFormData={setFormData} updateId={updateId} />;

      case "basicInfo":
      default:
        return (
          <div className="bg-zinc-100 w-full ">
            <div className="bg-gray-100 pl-5 pr-5 ">
              <form onSubmit={handleSubmit} className="">
                <div>
                  <div className="mt-4 grid grid-cols-2 gap-4 ">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Your Middle Name"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Your Last Name"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Your Zip Code"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-zinc-700">
                        Alternative Phone
                      </label>
                      <input
                        type="tel"
                        name="alternativePhone"
                        value={formData.alternativePhone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full  justify-between mt-8">
                  <button
                    type="button"
                    className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
                    onClick={() => window.location.reload()}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
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
    <div>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="w-full mb-4 pb-4 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className=" text-xl md:text-2xl font-bold mb-2">
              {updateId ? "Update" : "Create"} Employee
            </h1>
            <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
              <Link to="/" className="cursor-pointer hover:text-slate-800">
                Home
              </Link>
              <span>|</span>
              <Link to="/app/employee" className="cursor-pointer hover:text-slate-800">
                Employee
              </Link>
              <span>|</span>
              <span className="cursor-default text-gray-500 hover:text-slate-800">
                Add Employee
              </span>
            </div>
          </div>
          <hr className="my-4 " />
        </div>
        {!updateId && (
            <button
              onClick={() => {
                localStorage.removeItem("formData");
                window.location.reload(); // Hard refresh to clear state in all child components
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors"
            >
              CLEAR STALE DATA
            </button>
          )}
        <div className="bg-gray-100 border-gray-200 border rounded-md ">
          <div className="flex space-x-4 pb-4 justify-between items-center">
            {updateId && (
              <button onClick={() => dispatch(setModal(false))}>
                <RxCross1 size={25} />
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <ul className="flex space-x-2  text-nowrap">
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 0
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Basic Info
                </button>
              </li>
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 1
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Biographical Info
                </button>
              </li>
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 2
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Positional Information
                </button>
              </li>
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 3
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Bank Details
                </button>
              </li>
              {/* <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 3
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Class
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 4
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Supervisor
                  </button>
                </li> */}
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 4
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Benefit
                </button>
              </li>
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 5
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Additional Info
                </button>
              </li>
              {/* <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 5
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Emergency Contact
                  </button>
                </li> */}
              {/* <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 6
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Custom
                  </button>
                </li> 
                  <li>
                {/* <button
                  className={`py-2 px-4 text-sm ${currentForm === 6
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Salary Setup
                </button>
              </li> */}
              <li>
                <button
                  className={`py-2 px-4 text-sm ${currentForm === 6
                    ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                    : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  Login Info
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
