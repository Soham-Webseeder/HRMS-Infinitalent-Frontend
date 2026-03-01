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

export default function AddEmployee2({ updateId, setUpdateId }) {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    const defaultData = {
      // Basic Info
      firstName: "", middleName: "", lastName: "", email: "", phone: "", alternativePhone: "", country: "", city: "", zipCode: "",
      // Work & Position
      empId: "", designation: "", position: "", department: "", businessUnit: "", employmentStatus: "Active", employeeType: "ICPL", hireDate: "", originalHireDate: "",
      // Financials
      salary: "", bankName: "", branchName: "", accountNo: "", acHolderName: "", accountType: "Saving", ifscCode: "",
      // Compliance & Docs
      aadharCard: "", panCard: "", uanNo: "", esicNo: "", photograph: "", resume: "", SSC: "", HSC: "",
      documents: [{ docName: "", docDocument: "" }],
      // Biographical
      dateOfBirth: "", gender: "", maritalStatus: "Single", religion: "", citizenship: "",
      // Address & Emergency
      homeEmail: "", homePhone: "", cellPhone: "", businessEmail: "", businessPhone: "",
      emrContact: "", emrContactName: "", emrContactRelation: "",
      alterEmrContact: "", alterEmrContactName: "", alterEmrRelation: "",
      // Auth & System
      password: "", userEmail: "", isTrackingEnabled: true, geofenceCenter: [], geofenceRadius: 0, active: true
    };
    return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
  });

  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (updateId) {
      const getUserData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${updateId}`);
        setFormData(response.data.data);
      };
      getUserData();
    }
  }, [updateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/checkEmail?email=${formData.email}`);
      if (res.data.data?.exist && !updateId) {
        setEmailError("This email already exists.");
      } else {
        dispatch(increment());
      }
    } catch (err) { console.error(err); }
  };

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
  }, [updateId]);

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
                <RxCross1 size={20} />
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
