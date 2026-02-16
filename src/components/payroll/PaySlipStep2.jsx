import { useState } from "react";
import payslipSVG from "../../assets/payslip.svg";
import logs from "../../assets/logs.svg";
import close from "../../assets/close.svg";
import file1 from "../../assets/file-1.svg";
import file2 from "../../assets/file-2.svg";
import file3 from "../../assets/file-3.svg";
import file4 from "../../assets/file-4.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function parseDate(ymString) {
  const [year, month] = ymString.split("-").map(Number);
  // Months are zero-based in JavaScript Date objects
  return new Date(year, month);
}

export default function PaySlipStep2({
  selectedEmployees,
  setShowStep2,
  salaryCycleDate,
  dateRanges,
  startDay,
  endDay,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { employee } = useSelector((state) => state.user) || {};
  const userID = typeof employee === 'object' ? employee?.id : employee;
  const now = new Date();
  now.setMonth(now.getMonth() - 1); // Set to last month
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const lastYear = now.getFullYear();

  const [salaryCycle, setSalaryCycle] = useState(salaryCycleDate);
  const [checked, setChecked] = useState(false);
  const [displayStep2, setDisplayStep2] = useState(true);
  const [displayStep3, setDisplayStep3] = useState(false);
  const [displayAttendanceSheet, setDisplayAttendanceSheet] = useState(false);
  const navigate = useNavigate();

  const handleSalaryCycleChange = (event) => {
    setSalaryCycle(event.target.value);
  };

  const handleContinueClick = () => {
    if (!checked) {
      alert("Please Confirm the checkbox before continuing");
      return;
    }
    setDisplayStep2(false);
    setDisplayStep3(true);
  };

  const handleGeneratePayrollData = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to generate payroll data?"
    );
    if (!confirmed) return;

    setIsLoading(true);

    try {
      const genDate = parseDate(salaryCycle);
      const date = genDate.toISOString().split("T")[0];

      const responses = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/generatePayrollsOfEmployees`,
        {
          startDate: startDay,
          endDate: endDay,
          selectedEmployees,
          month: salaryCycle?.split("-")[1],
          year: salaryCycle?.split("-")[0],
          userID
        }
      );

      toast.success("Payroll data generated successfully!");
      navigate("/payroll/dashboard");
      // No need to setIsLoading(false) here; navigation will unmount the component
    } catch (error) {
      console.error("Error generating payroll data:", error);
      toast.error("Failed to generate payroll data.");
      setIsLoading(false); // Hide loader if there's an error
    }
  };

  const handleGenerateCtcPayrollData = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to generate payroll data?"
    );
    if (!confirmed) return;

    setIsLoading(true);

    try {
      const genDate = parseDate(salaryCycle);
      const date = genDate.toISOString().split("T")[0];

      const responses = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/generateCtcPayrollOfEmployees`,
        {
          startDate: startDay,
          endDate: endDay,
          selectedEmployees,
          month: salaryCycle?.split("-")[1],
          year: salaryCycle?.split("-")[0],
          userID
        }
      );

      toast.success("Payroll data generated successfully!");
      navigate("/payroll/dashboard");
    } catch (error) {
      console.error("Error generating payroll data:", error);
      toast.error("Failed to generate payroll data.");
      setIsLoading(false);
    }
  };

  const handleNAPSStipendPayroll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to generate payroll data?"
    );
    if (!confirmed) return;

    setIsLoading(true);

    try {
      const genDate = parseDate(salaryCycle);
      const date = genDate.toISOString().split("T")[0];

      const responses = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/generateNAPSStipendOfEmployees`,
        {
          startDate: startDay,
          endDate: endDay,
          selectedEmployees,
          month: salaryCycle?.split("-")[1],
          year: salaryCycle?.split("-")[0],
          userID
        }
      );

      toast.success("Payroll data generated successfully!");
      navigate("/payroll/dashboard");
    } catch (error) {
      console.error("Error generating payroll data:", error);
      toast.error("Failed to generate payroll data.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {isLoading && <Loader />}
      <ToastContainer />
      {displayStep2 && (
        <div className="p-4 md:p-6 lg:p-8">
          <div className="w-full flex justify-between">
            <h1 className="text-xl font-medium">
              Step 2: Generate payroll data
            </h1>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="salary-cycle"
                className="block text-medium font-medium mb-2 text-blue-600"
              >
                Salary Cycle:
              </label>
              <input
                type="month"
                id="salary-cycle"
                name="salary-cycle"
                value={salaryCycle}
                onChange={handleSalaryCycleChange}
                max={`${lastYear}-${lastMonth}`}
                className="border border-gray-300 rounded-md p-2 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <img src={payslipSVG} alt="" className="w-60 h-60" />

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 flex gap-4 font-medium text-md text-slate-600">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />
                <label htmlFor="">
                  I confirm that I have reviewed the payroll configurations and
                  salary settings of past/current months
                </label>
              </div>
              <div className="col-span-3 flex flex-col gap-4">
                <p className="text-slate-600">
                  <Link to="" className="text-blue-600">
                    Click here{" "}
                  </Link>
                  to revise salary (if any)
                </p>
                <div className="w-full flex justify-center items-center text-lg text-slate-600 font-medium">
                  <div>
                    <p className="text-green-600">
                      Succesfully compiled employee data
                    </p>
                    <p className="text-black">Analyzed employee particulars</p>
                    <p>Checked salary structures</p>
                    <p>Evaluated employee attendance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <hr />
            <div className="flex justify-between items-center gap-4 mt-2">
              <div>
                <button
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
                  onClick={() => {
                    setShowStep2(false);
                  }}
                >
                  Back
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-md"
                  onClick={() => {
                    setDisplayAttendanceSheet(!displayAttendanceSheet);
                  }}
                >
                  View Attendance Sheet
                </button>
                <button
                  className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
                  onClick={handleContinueClick}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayAttendanceSheet && (
        <div className="absolute grid grid-cols-2 w-1/3 max-md:w-[50vw] h-screen bg-white z-20 top-0 right-0 shadow-md">
          <div className="relative col-span-2 text-xl text-center font-bold pt-4">
            <p className="w-full">Attendance Hi logs</p>
            <span
              className="absolute left-4 top-4 hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => {
                setDisplayAttendanceSheet(false);
              }}
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                    fill="#0F0F0F"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  // value={searchTerm}
                  // onChange={handleSearchChange}
                  className="px-4 py-1 border border-gray-300 rounded-md text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                />

                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="w-4/5 border-2 min-h-[400px]"></div>
            </div>
          </div>
          <div className="col-span-1 text-center font-bold text-lg">
            <img src={logs} alt="" className="w-60 h-60" />
            <h1>No logs available!</h1>
          </div>
        </div>
      )}

      {displayStep3 && (
        <div className="grid grid-cols-2 p-4 md:p-6 lg:p-8">
          <div className="col-span-2 w-full flex justify-between">
            <h1 className="text-xl font-medium">Step 3: Salary adjustments</h1>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="salary-cycle"
                className="block text-medium font-medium mb-2 text-blue-600"
              >
                Salary Cycle:
              </label>
              <input
                type="month"
                id="salary-cycle"
                name="salary-cycle"
                value={salaryCycle}
                onChange={handleSalaryCycleChange}
                className="border border-gray-300 rounded-md p-2 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="col-span-1">
            <h1 className="text-black">
              Great, now we need to file in any salary adjustments.
            </h1>

            <div className="flex flex-col gap-2 mt-6">
              <span className="flex gap-2 px-4 py-2 w-[300px] border-2 shadow-md">
                <img src={file1} alt="" srcSet="" />
                <p>
                  <Link to="/payroll/lop">File arrears and LOP</Link>
                </p>
              </span>
              {/* <span className="flex gap-2 px-4 py-2 w-[300px] border-2 shadow-md">
                  <img src={file2} alt="" srcSet="" />
                  <p>File extra payments</p>
                </span>
                <span className="flex gap-2 px-4 py-2 w-[300px] border-2 shadow-md">
                  <img src={file3} alt="" srcSet="" />
                  <p>File extra deductions</p>
                </span>
                <span className="flex gap-2 px-4 py-2 w-[300px] border-2 shadow-md">
                  <img src={file4} alt="" srcSet="" />
                  <p>Manual tax</p>
                </span> */}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <img src={payslipSVG} alt="" className="w-100 h-100" />
          </div>
          <div className="col-span-2 mt-8">
            <hr />
            <div className="flex justify-end items-center gap-4 mt-2">
              <button
                className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-md"
                onClick={() => {
                  setDisplayStep3(false);
                  setDisplayStep2(true);
                  setChecked(false);
                }}
              >
                Go Back
              </button>
              <button
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
                onClick={handleNAPSStipendPayroll}
              >
                NAPS Stipend Payroll
              </button>
              <button
                onClick={handleGeneratePayrollData}
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
              >
                Generate Payroll Data
              </button>
              <button
                onClick={handleGenerateCtcPayrollData}
                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
              >
                Generate CTC Payroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}