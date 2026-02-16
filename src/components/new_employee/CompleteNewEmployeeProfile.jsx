import { RxCross1 } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import PositionalInformation from "../employee/PositionalInformation";
import Benefit from "../employee/Benefit";
import BiographicalInfo from "../employee/BiographicalInfo";
import AdditionalAddress from "../employee/AdditionalAddress";
import LoginInfo from "../employee/LoginInfo";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../redux/slices/CounterSlice";
import axios from "axios";
import { setModal } from "../../redux/slices/SidebarSlice";
import BankDetails from "../employee/BankDetails";

export default function CompleteNewEmployeeProfile({
  updateId,
  setUpdateId,
  type,
}) {
  const [counter, setCounter] = useState();
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    localStorage.setItem("formData", JSON.stringify(formData));
    if (formData) {
      dispatch(increment());
    }
  };

  // console.log(formData.empId, "empidddddddddddddddddddd");

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
    const getUserData = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
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
        return <BiographicalInfo />;
      case 2:
        return <PositionalInformation />;
      // case 3:
      //   return <Class />;
      case 3:
        return <BankDetails />;
      // case 4:
      //   return <Supervisor />;
      case 4:
        return <Benefit />;
      case 5:
        return <AdditionalAddress />;
      // case 5:
      //   return <EmergencyContact />;
      // case 6:
      //   return <Custom />;
      case 6:
        return <LoginInfo updateId={updateId} setUpdateId={setUpdateId} />;

      case "basicInfo":
      default:
        return (
          <div className="bg-zinc-100 w-full ">
            <div className="bg-white p-5 shadow-md ">
              <form onSubmit={handleSubmit} className="">
                <div className="h-[60vh]">
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
                <div className="flex w-full  justify-end mt-8">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
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
      <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full mx-auto">
        <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full bg-white">
          Complete your profile
        </h1>
        <div className="bg-white border-gray-200 border rounded-md shadow-lg px-5 py-5">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex space-x-4 pb-4 border-b justify-between items-center">
              {updateId && (
                <button onClick={() => dispatch(setModal(false))}>
                  <RxCross1 size={25} />
                </button>
              )}
            </div>
            <div className="py-4 overflow-x-auto">
              <ul className="flex space-x-2 border-b text-nowrap">
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 0
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Basic Info
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 1
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Biographical Info
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 2
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Positional Information
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 3
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
                    className={`py-2 px-4 text-sm ${
                      currentForm === 4
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "text-zinc-600 hover:text-blue-600"
                    }`}
                  >
                    Benefit
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 5
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
                </li> */}
                <li>
                  <button
                    className={`py-2 px-4 text-sm ${
                      currentForm === 6
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
    </div>
  );
}
