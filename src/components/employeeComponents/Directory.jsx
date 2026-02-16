import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoFilterSharp } from "react-icons/io5";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaRegObjectGroup } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { SiJirasoftware } from "react-icons/si";
import { MdDateRange } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdMailOutline } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import axios from "axios";

function DirectoryMain() {
  const data = [{}, {}, {}, {}, {}];

  // states
  const [activeTab, setActiveTab] = React.useState("myReports");
  const [filterPop, setfilterPop] = React.useState(false);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
    );
    setEmployees(response.data.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="w-full min-h-screen  bg-gray-100  sm:px-4 flex flex-col  items-center pt-1 relative">
      <div className="space-y-4 bg-white rounded border-gray-200 border border-rounded shadow-lg p-2  w-full 2xl:w-[80%]">
        {/* div-1 */}

        <div className="flex justify-between  py-1 px-1 ">
          <div className="flex gap-4 text-gray-600">
            <FaRegObjectGroup
              className="cursor-pointer p-1 rounded-[50%] hover:bg-gray-200 active:bg-gray-300 text-gray-700"
              size={28}
            />
            <FaCloudDownloadAlt
              className="cursor-pointer p-1 rounded-[50%] hover:bg-gray-200 active:bg-gray-300 text-gray-700"
              size={28}
            />
            <TfiAnnouncement
              className="cursor-pointer p-1 rounded-[50%] hover:bg-gray-200 active:bg-gray-300 text-gray-700"
              size={28}
            />
          </div>

          <div className="flex gap-2 items-center">
            <p className="max-sm:text-sm">287 of 300 employees</p>
            <button
              className="border-black border px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:bg-blue-600  text-sm md:text-base  gap-2 flex items-center"
              onClick={() => setfilterPop(true)}
            >
              <IoFilterSharp size={20} /> FILTERS
            </button>
          </div>
        </div>

        {/* div-2 */}

        <div className="space-y-2">
          <ul className="flex gap-5 whitespace-nowrap overflow-x-auto text-[1rem] border-y text-gray-600 max-sm:text-sm">
            {/* <li className={`${activeTab === 'myReports' && 'border-blue-600 border-b-2'}  py-2 cursor-pointer`} onClick={() => setActiveTab('myReports')}>MY REPORTS</li>

            <li className={`${activeTab === 'myTeam' && 'border-blue-600 border-b-2'}  py-2 cursor-pointer`} onClick={() => setActiveTab('myTeam')}>MY TEAM</li> */}

            <li
              className={`${
                activeTab === "myDept" && "border-blue-600 border-b-2"
              }  py-2 cursor-pointer`}
              onClick={() => setActiveTab("myDept")}
            >
              MY DEPARTMENT
            </li>

            <li
              className={`${
                activeTab === "myMembers" && "border-blue-600 border-b-2"
              }  py-2 cursor-pointer`}
              onClick={() => setActiveTab("myMembers")}
            >
              ALL MEMBERS
            </li>
          </ul>

          {/* my member */}
          {activeTab === "myMembers" && (
            <div className="overflow-x-auto  w-full">
              {employees.map((emp, id) => (
                <ul
                  key={id}
                  className="px-2 flex  gap-4 justify-between  max-sm:text-sm text-[1rem] py-2 "
                >
                  <li className="flex gap-2 item-center">
                    <img
                      className="bg-gray-300 h-11 w-11 rounded-full"
                      src={emp.photograph}
                      alt="img"
                    />
                    <div className="">
                      <p className="w-[8rem] overflow-hidden text-ellipsis  whitespace-nowrap">
                        {emp.firstName} {emp.lastName}
                      </p>
                      <p className=" overflow-hidden text-ellipsis  whitespace-nowrap">
                      </p>
                    </div>
                  </li>

                  <li className="whitespace-nowrap flex gap-2 items-center">
                    <BsPcDisplayHorizontal size={18} /> {emp.department}
                  </li>

                  <li className="whitespace-nowrap flex gap-2 items-center">
                    <SiJirasoftware size={18} />
                    {emp.designation} designation
                  </li>

                  <li className="whitespace-nowrap flex gap-2 items-center">
                    <MdDateRange size={18} />
                  </li>

                  <li className="whitespace-nowrap flex gap-2 items-center">
                    <LiaBirthdayCakeSolid size={18} />
                    {emp.startDate}{" "}
                  </li>
                  <li className="relative flex gap-5 items-center">
                    <div className="group relative">
                      <FiSmartphone size={18} className="icon" />
                      <span className="absolute left-10 bg-black text-white px-2 py-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {emp.phone}
                      </span>
                    </div>
                  </li>
                  <li className="relative flex gap-5 items-center">
                    <div className="group relative">
                      <MdMailOutline size={18} className="icon" />
                      <span className="absolute top-10 bg-black text-white px-2 py-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {emp.email}
                      </span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          )}

          {/* my team */}
          {activeTab === "myReports" && (
            <div>
              <p>myReports</p>
            </div>
          )}

          {/* my team */}
          {activeTab === "myTeam" && (
            <div>
              <p>myTeam</p>
            </div>
          )}

          {/* my team */}
          {activeTab === "myDept" && (
            <div>
              <p>myDept</p>
            </div>
          )}
        </div>
      </div>

      {filterPop && (
        <div className="fixed inset-0 flex justify-end   bg-gray-100 bg-opacity-80 backdrop-blur-xs  z-40">
          <div className=" opacity-100 bg-white  space-y-4 rounded shadow-lg w-[20rem] md:w-[25rem] overflow-y-auto px-2 pb-4">
            <div className="flex sticky top-0 z-40  bg-white pt-4 py-1">
              <button
                className="bg-red-400  text-white p-1 px-1.5 rounded-full hover:bg-red-500 active:bg-red-400 shadow  "
                onClick={() => setfilterPop(false)}
              >
                <RxCross2 />
              </button>

              <div className="flex w-full justify-center ">
                <p className="font-semibold text-lg ">Filter & sort</p>
              </div>
            </div>

            <div className=" space-y-2 shadow-md mb-4 p-3 b-2 border rounded-md">
              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="firstName"
                  className="text-sm text-gray-500 font-semibold"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                  placeholder="First Name"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="lastName"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                  placeholder="Last Name"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="bloodGroup"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Blood Group
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>A+</option>
                  <option>B+</option>
                  <option>AB+</option>
                  <option>O</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="gender"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Gender
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="gender"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Marital Status
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <h2 className="mt-2 text-gray-600 font-semibold text-md">
                  Personal Dates
                </h2>

                <label
                  htmlFor="birthdays"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Birthdays
                </label>

                <div className="flex gap-2">
                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="in-between"
                      name="specific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="in-between"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      In-between
                    </label>
                  </div>

                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="specific"
                      name="specific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="specific"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      specific
                    </label>
                  </div>
                </div>

                <input
                  type="date"
                  id="birthdays"
                  name="birthdays"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="marriageAnn"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Marriage Anniversary
                </label>

                <div className="flex gap-2">
                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="marriageAnnin-between"
                      name="marriageAnnspecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="marriageAnnin-between"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      In-between
                    </label>
                  </div>

                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="marriageAnnspecific"
                      name="marriageAnnspecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="marriageAnnspecific"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      specific
                    </label>
                  </div>
                </div>

                <input
                  type="date"
                  id="marriageAnn"
                  name="marriageAnn"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <h2 className="mt-2 text-gray-600 font-semibold text-md">
                  Contact & Pay
                </h2>
                <label
                  htmlFor="mobileNumber"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Mobile Number
                </label>

                <div className="flex">
                  <select
                    id="countryCode"
                    name="countryCode"
                    className="border-y-2 border-l-2  border-gray-300 rounded-l py-1 pl-2 outline-none focus:border-blue-400"
                  >
                    <option value="+91">+91</option> {/* India */}
                    <option value="+1">+1</option> {/* USA */}
                    <option value="+44">+44</option> {/* UK */}
                  </select>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    className="border-2 border-gray-300 rounded-r py-1 pl-2 outline-none focus:border-blue-400 w-full"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5 pb-2">
                <label
                  htmlFor="bank"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Bank Name
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>select</option>
                  <option>HDFC</option>
                  <option>UNION</option>
                </select>
              </div>

              <hr className="border border-gray-300 " />

              <div className="flex flex-col gap-0.5 ">
                <h2 className="mt-2 text-gray-600 font-semibold text-md">
                  Company Attributes
                </h2>

                <h3 className="mt-1 text-sm text-gray-600 font-semibold">
                  Dates
                </h3>

                <label
                  htmlFor="Date"
                  className="text-sm text-gray-500 font-bold"
                >
                  Date of joining
                </label>

                <div className="flex gap-2">
                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="dateIn-between"
                      name="dateSpecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="in-between"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      In-between
                    </label>
                  </div>

                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="dateSpecific"
                      name="dateSpecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="specific"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      specific
                    </label>
                  </div>
                </div>

                <input
                  type="date"
                  id="birthdays"
                  name="birthdays"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="noticeDates"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Notice Dates
                </label>

                <div className="flex gap-2">
                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="noticeDatesIn-between"
                      name="noticeDatesSpecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="noticeDatesIn-between"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      In-between
                    </label>
                  </div>

                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="noticeDatesSpecific"
                      name="noticeDatesSpecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="noticeDatesSpecific"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      specific
                    </label>
                  </div>
                </div>

                <input
                  type="noticeDates"
                  id="noticeDates"
                  name="noticeDates"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="exitDates"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Exit Dates
                </label>

                <div className="flex gap-2">
                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="exitDatesIn-between"
                      name="exitDatesSpecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="exitDatesIn-between"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      In-between
                    </label>
                  </div>

                  <div className="flex  gap-2">
                    <input
                      type="radio"
                      id="exitDatesSpecific"
                      name="exitDatesSpecific"
                      className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 "
                    />

                    <label
                      htmlFor="exitDatesSpecific"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      specific
                    </label>
                  </div>
                </div>

                <input
                  type="exitDates"
                  id="exitDates"
                  name="exitDates"
                  className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 w-full"
                />
              </div>

              <div className="flex flex-col gap-0.5 ">
                <h3 className="mt-1 text-sm text-gray-600 font-semibold">
                  Job Status
                </h3>

                <label
                  htmlFor="EmpStage"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Emoloyment Stage
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>x</option>
                  <option>y</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="EmpType"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Emoloyment Type
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>x</option>
                  <option>y</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="EmpStatus"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Emoloymee's Status
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>x</option>
                  <option>y</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="EmpStatus"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Self Service
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <h3 className="mt-1 text-sm text-gray-600 font-semibold">
                  Placement
                </h3>

                <label className="text-sm text-gray-500 font-semibold">
                  Office Location
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>Delhi</option>
                  <option>U.K</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label className="text-sm text-gray-500 font-semibold">
                  Business Unit
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>Delhi</option>
                  <option>U.K</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label className="text-sm text-gray-500 font-semibold">
                  Department
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>Tech</option>
                  <option>Bio-tech</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label className="text-sm text-gray-500 font-semibold">
                  Team
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>None</option>
                  <option>All Team</option>
                  <option>Half Team</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <h3 className="mt-1 text-sm text-gray-600 font-semibold">
                  Managerial
                </h3>

                <label className="text-sm text-gray-500 font-semibold">
                  Manager's Team Members
                </label>

                <select className="border-2 border-gray-300 rounded py-1 pl-2 outline-none focus:border-blue-400 ">
                  <option>No Manager</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <div className="space-x-2 pt-4">
                <button className="bg-blue-500 text-sm text-white font-semibold px-3 py-1 rounded hover:bg-blue-700 active:bg-blue-500">
                  Apply filter
                </button>

                <button className="text-blue-500 text-sm font-semibold px-3 py-1 rounded hover:text-blue-700 active:text-blue-500">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectoryMain;
