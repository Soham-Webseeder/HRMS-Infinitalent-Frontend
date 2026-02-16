import { RxCross1 } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import PositionalInformation from "../employeeComponents/PositionalInformation2";
import Benefit from "../employeeComponents/Benefit2";
import BiographicalInfo from "../employeeComponents/BiographicalInfo2";
import AdditionalAddress from "../employeeComponents/AdditionalAddress2";
import Custom from "./Custom";
import LoginInfo from "../employeeComponents/LoginInfo2";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import axios from "axios";
import { setModal } from "../../redux/slices/SidebarSlice";
import BankDetails from "../employeeComponents/BankDetails2";
export default function AddEmployee({ updateId, setUpdateId, type }) {
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
            <div className="bg-gray-100 pl-5 pr-5 ">
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
                <div className="flex w-full  justify-between mt-8">
                <button
                    type="button"
                    onClick={()=>window.location.reload()}
                    className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
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
            <h1 className="text-2xl font-medium">
              {updateId ? "Update" : "Create"} Employee
            </h1>
            <p className="font-light text-gray-600 mt-4">
              <span class="cursor-pointer">Home</span> |
              <span class="cursor-pointer"> Employee</span> |
              <span class="cursor-pointer"> Update Employee</span>
            </p>
          </div>
          <div className="flex space-x-4 pb-4 items-center ml-auto">
            {updateId && (
              <button onClick={() => dispatch(setModal(false))}>
                <RxCross1 size={25} />
              </button>
            )}
          </div>
          <hr className="my-4 " />
        </div>
        <div className="bg-gray-100 border-gray-200 border rounded-md ">
          <div className="overflow-x-auto">
            <ul className="flex space-x-2  text-nowrap">
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
  );
}
