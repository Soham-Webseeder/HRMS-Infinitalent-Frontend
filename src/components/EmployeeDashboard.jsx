import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import {
  BsFillPersonLinesFill,
  BsFillPersonPlusFill,
  BsFillPersonXFill,
  BsWhatsapp,
} from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import NoticeDash from "./NoticeDash";
import Calendar from "./Calendar";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const EmployeeDashboard = () => {
  const [allEmployee, setAllEmployee] = useState("");
  const [allAttendance, setAllAttendance] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const user = useSelector((state) => state.user);
  const userId = user.userAllData.employeeDetails;
  console.log("semduuuuuuuuuuuuuuuuuuuuuuuuuuu", userId);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed in JavaScript
  const day = today.getDate();

  const fetchPresentData = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/attendance/getAttendanceByEmployee/${userId}?year=${year}&month=${month}&day=${day}`
      );
      setAllAttendance(res.data.data.length);
    } catch (error) {
      console.error("Error fetching present data:", error);
    }
  };

  useEffect(() => {
    fetchPresentData();
  }, []);
  return (
    <>
      <div className="w-full pl-0 md:pl-20 px-2 md:px-10">
        <div className=" p-4 flex flex-col items-center lg:items-start lg:flex-row justify-between pr-4">
          <div className="flex gap-4 items-center">
            <p>Show the Values</p>
            <label className="block-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={isChecked}
                onClick={toggleSwitch}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="flex ">
          <div className="w-full px-2 md:px-4">
            <div className="flex flex-col items-center sm:items-center  md:items-start lg:flex-row justify-center lg:justify-between">
              <div className="w-full">
                <div className=" rounded-md pb-4">
                  <div className="bg-white p-4 rounded-lg shadow-md border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Growth Pulses
                      </h2>
                    </div>
                    <div className="grid md:grid-cols-2 grid-col-1 gap-4">
                      <div className="bg-[#e6ffea] w-full p-4 rounded-lg shadow-md">
                        <div className="flex gap-4">
                          <BsFillPersonPlusFill className="text-[#ffffff] mb-2 text-5xl bg-green-800 p-2 rounded-md" />
                          <p className="text-2xl  font-semibold ">
                            {isChecked ? allAttendance : "****"}
                          </p>
                        </div>
                        <p className="text-lg text-gray-800 ">Total Present</p>
                      </div>
                      <div className="bg-[#ffe6e6] w-full p-4 rounded-lg shadow-md">
                        <div className="flex gap-4">
                          <BsFillPersonXFill className="text-[#ffffff] mb-2 text-5xl bg-red-800 p-2 rounded-md" />
                          <p className="text-2xl font-semibold ">
                            {isChecked? day - (day > 28? 8: day > 21? 6: day > 14? 4: day > 7? 2: day): "****"}
                          </p>
                        </div>
                        <p className="text-lg text-gray-600">Total Absent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div
                className="bg-white rounded-lg shadow-md p-4  w-full sm:w-full md:w-[50%] border "
                style={{ margin: "0" }}
              >
                <div className="space-y-4">
                  <Calendar />
                </div>
              </div>
              <div
                className="bg-white rounded-lg shadow-md p-4  w-full sm:w-full md:w-[50%] border "
                style={{ margin: "0" }}
              >
                <div className="space-y-4">
                  <div className="flex items-start">
                    <NoticeDash />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto border p-5 hidden sm:hidden md:inline w-[30%] rounded-md">
            <div className="p-2 bg-white border mb-4 rounded-md">
              <h2 className="text-xl font-semibold text-center">
                Contact Support
              </h2>
              <p className="text-sm text-gray-600 p-5">
                We’re always happy to help! Contact us anytime, and we’ll get
                back to you soon.
              </p>
              <div className="mt-4 flex justify-evenly flex-col sm:flex-col md:flex-row">
                <Link to="https://api.whatsapp.com/send?phone=+917898877166&amp;text=Hello WebSeeder Technologies, I would like to inquire about the different services&nbsp;that&nbsp;you&nbsp;offer.">
                  <button className="flex items-center justify-center space-x-2 p-2 rounded-md border">
                    <BsWhatsapp className="text-green-700" size={20} />
                    <span>WhatsApp</span>
                  </button>
                </Link>
                <Link to="mailto:hello@webseeder.in">
                  <button className="flex items-center justify-center space-x-2 p-2 rounded-md border">
                    <AiOutlineMail className="text-red-700" size={20} />
                    <span>Email Us</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border">
              <h2 className="text-lg font-semibold">FAQs</h2>
              <div className="mt-4 space-y-4">
                <details className="group" open>
                  <summary className="flex justify-between items-center p-4 rounded-lg bg-gray-100 cursor-pointer">
                    <span>How can a tailored HRMS benefit my business?</span>
                    <MdKeyboardArrowDown />
                  </summary>
                  <div className="px-4 pb-4">
                    <p>
                      A tailored HRMS offers benefits such as customization to
                      fit your unique HR processes, scalability to adapt to
                      growth, seamless integration with existing systems,
                      enhanced reporting and analytics capabilities, and
                      cost-effectiveness by eliminating unnecessary features.
                    </p>
                  </div>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center p-4 rounded-lg bg-gray-100 cursor-pointer">
                    <span>
                      Can a tailored HRMS integrate with our existing systems
                      and applications?
                    </span>
                    <MdKeyboardArrowDown />
                  </summary>
                  <div className="px-4 pb-4">
                    <p>
                      Yes, our tailored HRMS solutions are designed to
                      seamlessly integrate with your existing systems and
                      applications, ensuring smooth operations and minimizing
                      disruption to your business processes.
                    </p>
                  </div>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center p-4 rounded-lg bg-gray-100 cursor-pointer">
                    <span>
                      How long does it take to develop and deploy a tailored
                      HRMS?
                    </span>
                    <MdKeyboardArrowDown />
                  </summary>
                  <div className="px-4 pb-4">
                    <p>
                      The timeline for developing and deploying a tailored HRMS
                      depends on the complexity of your requirements and the
                      customization needed. We work closely with your team to
                      establish a realistic timeline and ensure timely delivery.
                    </p>
                  </div>
                </details>
              </div>
            </div>
            <div className="p-4 mt-4 bg-white  mx-auto border rounded-lg flex items-center space-x-4">
              <span className="font-semibold">Follow Us</span>
              <div className="flex space-x-2">
                <Link
                  aria-label="Facebook"
                  target="_blank"
                  className="block bg-[#3b5998] text-white p-2 rounded-full"
                  to="https://www.facebook.com/webseedertech"
                >
                  <FaFacebook className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="LinkedIn"
                  target="_blank"
                  className="block bg-[#0077b5] text-white p-2 rounded-full"
                  to="https://www.linkedin.com/company/webseedertech"
                >
                  <FaLinkedin className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="Twitter"
                  target="_blank"
                  className="block bg-[#cfdc00] text-white p-2 rounded-full"
                  to="https://twitter.com/WebSeederTech"
                >
                  <FaTwitter className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="Instagram"
                  target="_blank"
                  className="block bg-[#e4405f] text-white p-2 rounded-full"
                  to="https://www.instagram.com/webseedertech/"
                >
                  <FaInstagram className="h-5 w-5" />
                </Link>
                <Link
                  aria-label="Instagram"
                  target="_blank"
                  className="block bg-[#e4405f] text-white p-2 rounded-full"
                  to="https://in.pinterest.com/webseedertech/"
                >
                  <FaPinterest className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
