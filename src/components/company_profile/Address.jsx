import { FiEdit2 } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector } from "react-redux";
export const Address = () => {
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

  const [addData, setAddData] = useState(false);
  const [addData2, setAddData2] = useState(false);
  const [addData3, setAddData3] = useState(false);
  const { company_ID } = useSelector((state) => state.user);

  const handleAddOpen = () => {
    if (addData == false) {
      setAddData(true);
      console.log(addData);
    } else {
      setAddData(false);
      console.log(addData);
    }
  };
  const handleAddOpen2 = () => {
    if (addData2 == false) {
      setAddData2(true);
      console.log(addData2);
    } else {
      setAddData2(false);
      console.log(addData2);
    }
  };
  const handleAddOpen3 = () => {
    if (addData3 == false) {
      setAddData3(true);
      console.log(addData3);
    } else {
      setAddData3(false);
      console.log(addData3);
    }
  };

  const [formData, setFormData] = useState({
    registeredOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });
  const [formData2, setFormData2] = useState({
    registeredOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });
  const [formData3, setFormData3] = useState({
    registeredOffice: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = {
      ...formData,
      registeredOffice: {
        ...formData.registeredOffice,
        [id]: value,
      },
    };
    setFormData(updatedFormData);
  };

  const handleChange2 = (e) => {
    const { id, value } = e.target;
    const updatedFormData = {
      ...formData,
      registeredOffice: {
        ...formData.registeredOffice,
        [id]: value,
      },
    };
    setFormData(updatedFormData);
  };

  console.log(formData, "dsadhkjsadh");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(company_ID, "company_ID");
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/updateCompany/${company_ID}`,
        formData
      );

      console.log("Data submitted successfully");
      console.log(formData);
      // You can display a success toast notification here if you want
    } catch (error) {
      console.error("Error submitting data:", error);
      // You can display an error toast notification here if you want
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      console.log(company_ID, "company_ID");
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/updateCompany/${company_ID}`,
        formData2
      );

      console.log("Data submitted successfully");
      console.log(formData2);
      // You can display a success toast notification here if you want
    } catch (error) {
      console.error("Error submitting data:", error);
      // You can display an error toast notification here if you want
    }
  };
  return (
    <div className="">
      <div className="h-[100vh] w-full flex justify-center ">
        <div className="container   py-2">
          <div
            className="  
          "
          >
            <div className="flex flex-row justify-between  items-center border-b-[0.3px] bg-white p-2 border-gray-300">
              <h1 className="pl-3 text-medium font-medium uppercase">
                Registered office
              </h1>
              <div onClick={handleAddOpen} className=" cursor-pointer text-xl">
                <FiEdit2 />
              </div>
            </div>

            {!addData ? (
              //gbhjgcgcvcgghh
              formData ? (
                <div className="flex flex-row items-center pl-4 text-blue-500 bg-white">
                  <button
                    onClick={handleAddOpen2}
                    className="text-3xl  font-bold cursor-pointer p-2"
                  >
                    <AiFillPlusCircle />
                  </button>
                  <h1 className="text-md  font-medium ">Add</h1>
                </div>
              ) : (
                <div className="bg-white w-full">
                  <form className="flex flex-col pl-2" onSubmit={handleSubmit2}>
                    <div className="flex flex-col p-3">
                      <label htmlFor="addressLine1" className="text-sm">
                        Address Line 1
                      </label>
                      <h1
                        id="addressLine1"
                        className="rounded-md border-b border-gray-300 py-2"
                      ></h1>
                    </div>
                    <div className="flex flex-col p-3">
                      <label htmlFor="addressLine2" className="text-sm">
                        Address Line 2
                      </label>
                      <h1
                        id="addressLine2"
                        className="rounded-md border-b border-gray-300 py-2"
                      ></h1>
                    </div>

                    <div className="flex flex-row gap-3 w-full p-3">
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="city" className="text-sm">
                          City
                        </label>
                        <h1
                          id="city"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="state" className="text-sm">
                          State
                        </label>
                        <h1
                          id="state"
                          name="states"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="country" className="text-sm">
                          Country
                        </label>
                        <h1
                          id="country"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2 pl-3">
                      <label htmlFor="pincode" className="text-sm">
                        Pincode
                      </label>
                      <h1
                        id="pincode"
                        type="number"
                        className="rounded-md border-b border-gray-300 py-1"
                      ></h1>
                    </div>
                    <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                      <div className="flex flex-row w-[220px]">
                        <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                          <RxCross2 className="text-black text-sm font-semibold" />
                          <button
                            className="text-black text-sm font-semibold"
                            onClick={handleAddOpen2}
                          >
                            CANCEL
                          </button>
                        </div>
                        <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                          <AiOutlineCheck className="text-xl" />
                          <button
                            type="submit"
                            className="text-white text-sm font-semibold pl-3 pr-3"
                          >
                            SAVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )
            ) : (
              <div className="bg-white">
                <form className="flex flex-col pl-2" onSubmit={handleSubmit}>
                  <div className="flex flex-col p-3">
                    <label htmlFor="addressLine1" className="text-sm">
                      Address Line 1
                    </label>
                    <input
                      id="addressLine1"
                      name="addressLine1" // Added name attribute
                      type="text"
                      className="rounded-md border-b border-gray-300 py-2"
                      value={formData.addressLine1} // Assuming you have formData state
                      onChange={handleChange} // Assuming you have handleChange function
                    />
                  </div>
                  <div className="flex flex-col p-3 flex-wrap">
                    <label htmlFor="addressLine2" className="text-sm">
                      Address Line 2
                    </label>
                    <input
                      id="addressLine2"
                      name="addressLine2" // Added name attribute
                      type="text"
                      className="rounded-md border-b border-gray-300 py-2"
                      value={formData.addressLine2} // Assuming you have formData state
                      onChange={handleChange} // Assuming you have handleChange function
                    />
                  </div>

                  <div className="flex flex-row gap-3 w-full p-3 ">
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="city" className="text-sm">
                        City
                      </label>
                      <input
                        id="city"
                        name="city" // Added name attribute
                        type="text"
                        className="rounded-md border-b border-gray-300 py-1"
                        value={formData.city} // Assuming you have formData state
                        onChange={handleChange} // Assuming you have handleChange function
                      />
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="state" className="text-sm">
                        State
                      </label>
                      <select
                        id="state"
                        name="state" // Added name attribute
                        className="rounded-md border-b border-gray-300 py-1"
                        value={formData.state} // Assuming you have formData state
                        onChange={handleChange} // Assuming you have handleChange function
                      >
                        <option value="">Select a state</option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="country" className="text-sm">
                        Country
                      </label>
                      <input
                        id="country"
                        name="country" // Added name attribute
                        type="text"
                        className="rounded-md border-b border-gray-300 py-1"
                        value={formData.country} // Assuming you have formData state
                        onChange={handleChange} // Assuming you have handleChange function
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-[20%] md:w-1/2 pl-3">
                    <label htmlFor="pincode" className="text-sm">
                      Pincode
                    </label>
                    <input
                      id="pincode"
                      name="pincode" // Added name attribute
                      type="number"
                      className="rounded-md border-b  border-gray-300 py-1"
                      value={formData.pincode} // Assuming you have formData state
                      onChange={handleChange} // Assuming you have handleChange function
                    />
                  </div>
                  <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                    <div className="flex flex-row w-[220px]">
                      <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                        <RxCross2 className="text-black text-sm font-semibold" />
                        <button
                          className="text-black text-sm font-semibold"
                          onClick={handleAddOpen}
                        >
                          CANCEL
                        </button>
                      </div>
                      <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                        <AiOutlineCheck className="text-xl" />
                        <button
                          type="submit"
                          className="text-white text-sm font-semibold pl-3 pr-3"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* form */}

          <div className="flex flex-col h-auto mt-2 bg-white shadow-md rounded-md">
            <div className="flex flex-row justify-between  items-center border-b-[0.3px] p-2 border-gray-300">
              <h1 className="pl-3 text-medium font-medium uppercase">
                Corporate office
              </h1>
              <div onClick={handleAddOpen2} className=" cursor-pointer text-xl">
                <FiEdit2 />
              </div>
            </div>

            {!addData2 ? (
              //gbhjgcgcvcgghh
              formData2 ? (
                <div className="flex flex-row items-center ml-4 text-blue-500">
                  <button
                    onClick={handleAddOpen2}
                    className="text-3xl  font-bold cursor-pointer p-2"
                  >
                    <AiFillPlusCircle />
                  </button>
                  <h1 className="text-md  font-medium ">Add</h1>
                </div>
              ) : (
                <div className="bg-white w-full">
                  <form className="flex flex-col pl-2" onSubmit={handleSubmit2}>
                    <div className="flex flex-col p-3">
                      <label htmlFor="addressLine1" className="text-sm">
                        Address Line 1
                      </label>
                      <h1
                        id="addressLine1"
                        className="rounded-md border-b border-gray-300 py-2"
                      ></h1>
                    </div>
                    <div className="flex flex-col p-3">
                      <label htmlFor="addressLine2" className="text-sm">
                        Address Line 2
                      </label>
                      <h1
                        id="addressLine2"
                        className="rounded-md border-b border-gray-300 py-2"
                      ></h1>
                    </div>

                    <div className="flex flex-row gap-3 w-full p-3">
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="city" className="text-sm">
                          City
                        </label>
                        <h1
                          id="city"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="state" className="text-sm">
                          State
                        </label>
                        <h1
                          id="state"
                          name="states"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="country" className="text-sm">
                          Country
                        </label>
                        <h1
                          id="country"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2 pl-3">
                      <label htmlFor="pincode" className="text-sm">
                        Pincode
                      </label>
                      <h1
                        id="pincode"
                        type="number"
                        className="rounded-md border-b border-gray-300 py-1"
                      ></h1>
                    </div>
                    <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                      <div className="flex flex-row w-[220px]">
                        <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                          <RxCross2 className="text-black text-sm font-semibold" />
                          <button
                            className="text-black text-sm font-semibold"
                            onClick={handleAddOpen2}
                          >
                            CANCEL
                          </button>
                        </div>
                        <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                          <AiOutlineCheck className="text-xl" />
                          <button
                            type="submit"
                            className="text-white text-sm font-semibold pl-3 pr-3"
                          >
                            SAVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )
            ) : (
              <div className="bg-white ">
                <form className="flex flex-col pl-2" onSubmit={handleSubmit2}>
                  <div className="flex flex-col p-3">
                    <label htmlFor="addressLine1" className="text-sm">
                      Address Line 1
                    </label>
                    <input
                      id="addressLine1"
                      type="text"
                      className="rounded-md border-b border-gray-300 py-2"
                    />
                  </div>
                  <div className="flex flex-col p-3">
                    <label htmlFor="addressLine2" className="text-sm">
                      Address Line 2
                    </label>
                    <input
                      id="addressLine2"
                      type="text"
                      className="rounded-md border-b border-gray-300  py-2"
                    />
                  </div>

                  <div className="flex flex-row gap-3 w-full p-3">
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="city" className="text-sm">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="rounded-md border-b border-gray-300 py-1"
                      />
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="state" className="text-sm">
                        State
                      </label>
                      <select
                        id="state"
                        name="states"
                        className="rounded-md border-b border-gray-300  py-1"
                      >
                        <option value="">Select a state</option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="country" className="text-sm">
                        Country
                      </label>
                      <input
                        id="country"
                        type="text"
                        className="rounded-md border-b border-gray-300  py-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-[20%] md:w-1/2 pl-3">
                    <label htmlFor="pincode" className="text-sm">
                      Pincode
                    </label>
                    <input
                      id="pincode"
                      type="number"
                      className="rounded-md border-b  border-gray-300 py-1"
                    />
                  </div>
                  <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                    <div className="flex flex-row w-[220px]">
                      <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                        <RxCross2 className="text-black text-sm font-semibold" />
                        <button
                          className="text-black text-sm font-semibold"
                          onClick={handleAddOpen2}
                        >
                          CANCEL
                        </button>
                      </div>
                      <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                        <AiOutlineCheck className="text-xl" />
                        <button
                          type="submit"
                          className="text-white text-sm font-semibold pl-3 pr-3"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="flex flex-col h-[90px] mt-2 bg-white shadow-md rounded-md">
            <div className="flex flex-row justify-between  items-center border-b-[0.3px] p-2 border-gray-300">
              <h1 className="pl-3 text-medium font-medium uppercase">
                Custom address title
              </h1>
              <div onClick={handleAddOpen3} className=" cursor-pointer text-xl">
                <FiEdit2 />
              </div>
            </div>
            {!addData3 ? (
              //gbhjgcgcvcgghh
              formData3 ? (
                <div className="flex flex-row items-center ml-4 text-blue-500">
                  <button
                    onClick={handleAddOpen2}
                    className="text-3xl  font-bold cursor-pointer p-2"
                  >
                    <AiFillPlusCircle />
                  </button>
                  <h1 className="text-md  font-medium ">Add</h1>
                </div>
              ) : (
                <div className="bg-white w-full">
                  <form className="flex flex-col pl-2" onSubmit={handleSubmit2}>
                    <div className="flex flex-col p-3">
                      <label htmlFor="addressLine1" className="text-sm">
                        Address Line 1
                      </label>
                      <h1
                        id="addressLine1"
                        className="rounded-md border-b border-gray-300 py-2"
                      ></h1>
                    </div>
                    <div className="flex flex-col p-3">
                      <label htmlFor="addressLine2" className="text-sm">
                        Address Line 2
                      </label>
                      <h1
                        id="addressLine2"
                        className="rounded-md border-b border-gray-300 py-2"
                      ></h1>
                    </div>

                    <div className="flex flex-row gap-3 w-full p-3">
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="city" className="text-sm">
                          City
                        </label>
                        <h1
                          id="city"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="state" className="text-sm">
                          State
                        </label>
                        <h1
                          id="state"
                          name="states"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                      <div className="flex flex-col w-[20%] md:w-1/2">
                        <label htmlFor="country" className="text-sm">
                          Country
                        </label>
                        <h1
                          id="country"
                          className="rounded-md border-b border-gray-300 py-1"
                        ></h1>
                      </div>
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2 pl-3">
                      <label htmlFor="pincode" className="text-sm">
                        Pincode
                      </label>
                      <h1
                        id="pincode"
                        type="number"
                        className="rounded-md border-b border-gray-300 py-1"
                      ></h1>
                    </div>
                    <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                      <div className="flex flex-row w-[220px]">
                        <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                          <RxCross2 className="text-black text-sm font-semibold" />
                          <button
                            className="text-black text-sm font-semibold"
                            onClick={handleAddOpen2}
                          >
                            CANCEL
                          </button>
                        </div>
                        <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                          <AiOutlineCheck className="text-xl" />
                          <button
                            type="submit"
                            className="text-white text-sm font-semibold pl-3 pr-3"
                          >
                            SAVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )
            ) : (
              <div className="bg-white">
                <form className="flex flex-col pl-2">
                  <div className="flex flex-col p-3">
                    <label htmlFor="addressLine1" className="text-sm">
                      Address title
                    </label>
                    <input
                      id="addressLine1"
                      type="text"
                      className="rounded-md border-b border-gray-300 py-2"
                    />
                  </div>
                  <div className="flex flex-col p-3">
                    <label htmlFor="addressLine1" className="text-sm">
                      Address Line 1
                    </label>
                    <input
                      id="addressLine1"
                      type="text"
                      className="rounded-md border-b border-gray-300 py-2"
                    />
                  </div>
                  <div className="flex flex-col p-3">
                    <label htmlFor="addressLine2" className="text-sm">
                      Address Line 2
                    </label>
                    <input
                      id="addressLine2"
                      type="text"
                      className="rounded-md border-b border-gray-300  py-2"
                    />
                  </div>

                  <div className="flex flex-row gap-3 w-full p-3">
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="city" className="text-sm">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        className="rounded-md border-b border-gray-300 py-1"
                      />
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="state" className="text-sm">
                        State
                      </label>
                      <select
                        id="state"
                        name="states"
                        className="rounded-md border-b border-gray-300  py-1"
                      >
                        <option value="">Select a state</option>
                        {states.map((state, index) => (
                          <option key={index} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-[20%] md:w-1/2">
                      <label htmlFor="country" className="text-sm">
                        Country
                      </label>
                      <input
                        id="country"
                        type="text"
                        className="rounded-md border-b border-gray-300  py-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-[20%] md:w-1/2 pl-3">
                    <label htmlFor="pincode" className="text-sm">
                      Pincode
                    </label>
                    <input
                      id="pincode"
                      type="number"
                      className="rounded-md border-b  border-gray-300 py-1"
                    />
                  </div>
                  <div className="h-[100px] flex flex-row items-center justify-end bg-white">
                    <div className="flex flex-row w-[220px]">
                      <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                        <RxCross2 className="text-black text-sm font-semibold" />
                        <button
                          className="text-black text-sm font-semibold"
                          onClick={handleAddOpen3}
                        >
                          CANCEL
                        </button>
                      </div>
                      <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                        <AiOutlineCheck className="text-xl" />
                        <button
                          type="submit"
                          className="text-white text-sm font-semibold pl-3 pr-3"
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
