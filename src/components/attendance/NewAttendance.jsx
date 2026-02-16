import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { BiCloudDownload } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";

function NewAttendance() {
  const data = [{}, {}, {}, {}, {}];
  // const currentMonth = new Date().toISOString().slice(0, 7);

  // states

  const [showLogDetails, setShowLogDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceDropdown, setAttendanceDropdown] = useState(false);
  const [updateAttendencePop, setupdateAttendencePop] = useState(false);
  const [clockInReqPop, setclockInReqPop] = useState(false);
  const [tablePopup, setTablePopup] = useState(-1);
  const [bulkRegData, setBulkRegData] = useState({ shiftDate: "", shift: "" });
  const [employees, setEmployees] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [inTime, setInTime] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [totalWorkDuration, setTotalWorkDuration] = useState("");
  const [averageDuration, setAverageDuration] = useState("");
  const [currentMonth,setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
  };

  const handleMonthChange = async(event) => {
    const selectedMonthYear = event.target.value;
    console.log("Selected Month and Year:", selectedMonthYear);
    setCurrentMonth(selectedMonthYear);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [currentMonth]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      console.log("Employee data:", response.data);
      setEmployees(response.data.data);
      console.log("Fetched employee data:", response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error.response || error);
    }
  };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setDropdownOpen(true);
  // };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAttendanceByEmployee/${selectedEmployee._id}?year=${currentMonth.split('-')[0]}&month=${currentMonth.split('-')[1]}`
      );

      const allAttendance = response.data?.data;

      allAttendance?.attendance?.sort((a, b) => {
            const dateA = parseDate(a.date); // Parse date from DD-MM-YYYY
            const dateB = parseDate(b.date); // Parse date from DD-MM-YYYY
            return dateB - dateA; // Sort in descending order
          
        });

      setAttendanceData(allAttendance);
      
      // setFilteredEmployees(response.data.response);
      // setLoading(false);

      let totalMinutes = 0;
    let validEntriesCount = 0;
      // Calculate total working hours
      allAttendance?.attendance?.forEach(record => {
        if (record.workingHours) {
          const [hours, minutes] = record.workingHours.split(':').map(Number);
          totalMinutes += hours * 60 + minutes; // Convert to total minutes
          validEntriesCount++; // Increment count of valid entries
        }
      });
  
      // Calculate total working hours
      const totalHours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
      const totalWorkingHours = `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
      
      setTotalWorkDuration(totalWorkingHours);
  
      // Calculate average working hours
      let averageWorkingHours = "00:00"; // Default if no valid entries
      if (validEntriesCount > 0 && allAttendance.totalDays > 0) {
        const averageMinutes = totalMinutes / allAttendance.totalDays; // Calculate average in minutes based on total days
        const avgHours = Math.floor(averageMinutes / 60);
        const avgRemainingMinutes = Math.round(averageMinutes % 60); // Round minutes for better accuracy
        averageWorkingHours = `${String(avgHours).padStart(2, '0')}:${String(avgRemainingMinutes).padStart(2, '0')}`;
      }
      
      setAverageDuration(averageWorkingHours);
  
  

    } catch (error) {
      console.error("Error fetching attendance:", error);
      // setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchAttendance();
  // }, []);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed
  };

  const filteredEmployee = employees?.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (dropdownOpen) {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".search-dropdown")) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  // Handle search change

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setDropdownOpen(true); // Open the dropdown as soon as the user starts typing

    if (value) {
      // Filter the attendance data to find matching employee by first or last name
      const filteredEmployees = employees.filter((employee) => {
        const employeeName = {firstName:employee.firstName,lastName:employee.lastName};
        if (employeeName) {
          const fullName = `${employeeName.firstName} `.toLowerCase();
          return fullName.includes(value.toLowerCase());
        }
        return false; // Skip entries where employeeName is null or undefined
      });

      // setPresentDay(() => {
      //   return filteredEmployees.filter((data) => data.attendanceStatus === "P")
      //     .length;
      // });
      // setAbsentDay(filteredEmployees.length - presentDay);

      // setLeaveDay(() => {
      //   return allLeave.filter((data) => {
      //     data.employeeName === value;
      //   });
      // });

      // Example of setting the total duration

      // If a match is found, set the first matching employee's data
      if (filteredEmployees.length > 0) {
        setSelectedEmployee(filteredEmployees[0]); // Set the whole object (id, name, etc.)
        fetchAttendance()
      }

      // Update the filtered employees for display in the dropdown
      setFilteredEmployees(filteredEmployees);
    }
  };

  // console.log(allLeave, "alllleave");

  // const calculateWorkingHours = () => {
  //   let totalMinutes = 0;

  //   if (filteredEmployees.length === 0) {
  //     // No data to process, set values to 0
  //     setTotalWorkDuration("0h 0m");
  //     setAverageDuration("0h 0m");
  //     return {
  //       totalWorkDuration: "0h 0m",
  //       averageDuration: "0h 0m",
  //     };
  //   }

  //   filteredEmployees.forEach((data) => {
  //     const { inTime, outTime } = data;

  //     if (!inTime || !outTime) {
  //       // Skip if either inTime or outTime is missing
  //       return;
  //     }

  //     const parseTime = (time) => {
  //       // Handles both "HH:MM" and "HH:MM AM/PM" formats
  //       const timeParts = time.match(/(\d+):(\d+)(?:\s*(AM|PM))?/i);
  //       if (!timeParts) return null;

  //       let [_, hours, minutes, period] = timeParts;
  //       hours = parseInt(hours, 10);
  //       minutes = parseInt(minutes, 10);

  //       // Handle AM/PM format if present
  //       if (period) {
  //         if (period.toUpperCase() === "PM" && hours !== 12) {
  //           hours += 12;
  //         } else if (period.toUpperCase() === "AM" && hours === 12) {
  //           hours = 0; // Handle midnight case
  //         }
  //       }

  //       return { hours, minutes };
  //     };

  //     const inTimeParsed = parseTime(inTime);
  //     const outTimeParsed = parseTime(outTime);

  //     if (!inTimeParsed || !outTimeParsed) {
  //       // Skip if times are not in the expected format
  //       return;
  //     }

  //     // Create Date objects for inTime and outTime
  //     const inDate = new Date();
  //     inDate.setHours(inTimeParsed.hours, inTimeParsed.minutes, 0, 0);

  //     const outDate = new Date();
  //     outDate.setHours(outTimeParsed.hours, outTimeParsed.minutes, 0, 0);

  //     // Calculate the difference in minutes, ensuring no negative values
  //     const diffInMinutes = Math.max((outDate - inDate) / (1000 * 60), 0); // Convert milliseconds to minutes
  //     totalMinutes += diffInMinutes;
  //   });

  //   // Calculate the total hours and minutes
  //   const totalHours = Math.floor(totalMinutes / 60);
  //   const remainingMinutes = Math.round(totalMinutes % 60);

  //   // Get the average duration in minutes
  //   const averageMinutes = totalMinutes / filteredEmployees.length;
  //   const avgHours = Math.floor(averageMinutes / 60);
  //   const avgRemainingMinutes = Math.round(averageMinutes % 60);

  //   // // Update the state with calculated values
  //   // setTotalWorkDuration(`${totalHours}h ${remainingMinutes}m`);
  //   // setAverageDuration(`${avgHours}h ${avgRemainingMinutes}m`);

  //   return {
  //     totalWorkDuration: `${totalHours}h ${remainingMinutes}m`,
  //     averageDuration: `${avgHours}h ${avgRemainingMinutes}m`,
  //   };
  // };

  // useEffect(() => {
  //   calculateWorkingHours();
  // }, [selectedEmployee]);
  // Handle click outside to close dropdown
  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  const handleEmployeeSelect = (e) => {
    const options = e.target.options;
    const selected = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const employee = employees.find(
          (emp) => `${emp.firstName} ${emp.lastName}` === options[i].value
        );
        if (
          employee &&
          !selectedEmployees.some((emp) => emp._id === employee._id)
        ) {
          selected.push(employee);
        }
      }
    }
    setSelectedEmployees([...selectedEmployees, ...selected]);
  };

  const removeEmployee = (employeeToRemove) => {
    setSelectedEmployees(
      selectedEmployees.filter((emp) => emp._id !== employeeToRemove._id)
    );
  };

  const formatClockInTime = (clockInTime) => {
    const currentDate = new Date(); // Get current date

    const [hours, minutes] = clockInTime.split(":"); // Extract hours and minutes from input time

    const formattedDate = {
      date: currentDate.getDate(), // Day of the month
      month: currentDate.getMonth() + 1, // Months are zero-indexed, so add 1
      year: currentDate.getFullYear(),
      time: `${hours}:${minutes}`, // Keep time in HH:mm format
    };

    return formattedDate;
  };

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const year = date.getUTCFullYear(); // Get full year
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
  
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
  };

  const handleClickToSave = async () => {
    if (!selectedEmployees.length || !inTime) {
      alert("Please select at least one employee and clock-in time.");
      return;
    }

    try {
      // Format the clock-in time using the helper function
      const clockInDate = formatClockInTime(inTime);
      setclockInReqPop(false);
      // Iterate through selected employees and send their attendance data
      await Promise.all(
        selectedEmployees.map((employee) =>
          axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/attendance/createAttendance`,
            {
              employeeName: employee._id, // Employee ID
              date: formatDateToDDMMYYYY(new Date()), // Current date in YYYY-MM-DD format
              attendanceStatus: "Present", // Assuming employee is present
              inTime: clockInDate.time, // Formatted clock-in time (e.g., "09:59 AM")
              outTime: null, // Out time will be null for now
              breakDuration: "01:00", // Set default break duration
              lateBy: "00:10", // Default late by time
              earlyBy: "00:00", // Default early by time
              overTime: "01:30", // Default overtime
              workingHours: "", // Set to empty string for now
            }
          )
        )

      );

      alert("Attendance saved successfully for all selected employees!");
    } catch (error) {
      console.error("Error saving attendance", error);
      alert("Failed to save attendance.");
    }
  };

  function convertTo24Hour(time) {
    if (!time) return "Invalid Time"; // Return an error message or empty string if time is undefined

    const [timePart, modifier] = time.split(" "); // Split time and AM/PM
    let [hours, minutes] = timePart.split(":");

    if (hours === "12") {
      hours = modifier === "AM" ? "00" : "12";
    } else if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }

    // Return time in hh:mm:ss format
    return `${hours.padStart(2, "0")}:${minutes}:00`;
  }

  function getWorkingHours(inTime, outTime) {
    // Assuming you have a date in the format like "16/09/2024" or similar in your data, here is how you can handle it
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD'

    const inTimeDate = new Date(`${currentDate}T${convertTo24Hour(inTime)}`);
    const outTimeDate = new Date(`${currentDate}T${convertTo24Hour(outTime)}`);

    // If outTime is earlier than inTime, we assume it crossed over midnight, so we add one day to outTime
    if (outTimeDate < inTimeDate) {
      outTimeDate.setDate(outTimeDate.getDate() + 1);
    }

    const diffMs = outTimeDate - inTimeDate; // Difference in milliseconds

    const diffHrs = Math.floor(diffMs / 1000 / 60 / 60); // Convert milliseconds to hours
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining milliseconds to minutes

    return `${diffHrs}h ${diffMins}m`;
  }

  return (
    <>
      <div className="p-8 bg-white border rounded-lg shadow-md">
        <div className="w-full 2xl:w-[100%] p-3  ">
          {/*heading  */}
          {clockInReqPop && (
            <div
              className="fixed inset-0 flex justify-end  bg-gray-100 bg-opacity-20 backdrop-blur-xs z-40  "
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setclockInReqPop(false);
                }
              }}
            >
              <div className=" opacity-100 bg-white  space-y-4 rounded shadow-lg w-[20rem] md:w-[25rem] overflow-y-auto px-2 pb-4">
                <div className="flex justify-between  sticky top-0 z-40  bg-white pt-4 py-1">
                  <button
                    className="bg-red-400  text-white p-1 px-1.5 rounded-full hover:bg-red-500 active:bg-red-400 shadow  "
                    onClick={() => setclockInReqPop(false)}
                  >
                    <RxCross2 />
                  </button>

                  <p className="font-semibold text-lg">Clock In Request</p>
                </div>

                <div className=" space-y-2 shadow-md mb-4 p-3 b-2 border rounded-md">
                  <div className="pb-3">
                    <label className="text-sm text-gray-500 font-semibold ">
                      Participants
                    </label>

                    <div className="flex relative z-10">
                      <img className="bg-gray-200 h-12 w-12 rounded-full " />
                      <img className="h-12 w-12 rounded-full absolute left-[20px] z-40 bg-red-100" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <label
                      htmlFor="inTime"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      Clock in time
                    </label>
                    <input
                      type="time"
                      id="inTime"
                      name="inTime"
                      className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400 w-fit"
                      value={inTime}
                      onChange={handleInTimeChange}
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <label
                      htmlFor="selectShift"
                      className="text-sm text-gray-500 font-semibold"
                    >
                      Employee list
                    </label>
                    <select
                      className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400"
                      multiple
                      onChange={handleEmployeeSelect}
                    >
                      {employees.map((emp) => (
                        <option
                          key={emp._id}
                          value={`${emp.firstName} ${emp.lastName}`}
                        >
                          {emp.firstName} {emp.lastName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEmployees.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm text-gray-700 font-semibold">
                        Selected Employees:
                      </h3>
                      <ul className="flex flex-wrap gap-4 mt-2">
                        {selectedEmployees.map((emp) => (
                          <p
                            key={emp._id}
                            className="text-gray-700 flex w-max items-center border border-md shadow-md p-1"
                          >
                            {emp.firstName} {emp.lastName}{" "}
                            <button
                              onClick={() => removeEmployee(emp)}
                              className="text-red-500 ml-2 "
                            >
                              <RxCross1 className="mt-1" />
                            </button>
                          </p>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={handleClickToSave}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Save Attendance
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="w-full mb-2 flex flex-col md:flex-row items-center justify-between">
  <div>
    <h1 className="text-2xl max-sm:text-xl font-bold">
      My Attendance
    </h1>
    <h2 className="flex text-sm text-gray-500 mt-1">
      <Link
        to="/"
        className="pr-1 border-r-2 border-gray-400 flex justify-center items-center h-4 hover:text-slate-800 transition-colors"
      >
        Home
      </Link>
      <Link
        to="/app/attendance"
        className="px-1 border-r-2 border-gray-400 flex justify-center items-center h-4 hover:text-slate-800 transition-colors"
      >
        Attendance
      </Link>
      <span className="px-1 flex justify-center items-center h-4 hover:text-slate-800 transition-colors cursor-default">
        Attendance Form
      </span>
    </h2>
  </div>
  <button
    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 mt-4 md:mt-0"
    onClick={() => setclockInReqPop(true)}
  >
    CLOCK-IN REQUEST
  </button>
</div>
<hr className="my-2 border-t-2 border-gray-300" />
          <div className="space-y-4">
            {/* Container for Clock-In Button */}
            <div className="w-full">
              {" "}
              {/* Ensures button is full-width */}
              <div className="clear-both"></div> {/* Clears the float */}
            </div>

            {/* Overview Section */}
            <div className="mt-4">
              {" "}
              {/* Margin added here */}
              {/* div-1 */}
              <div className="flex flex-wrap gap-4 md:gap-8 text-[1rem] text-blue-600 max-sm:text-sm">
                {/* Content for div-1 if necessary */}
              </div>
              {/* div-2 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-3 py-1.5 shadow shadow-gray-400 rounded text-[1.2rem] max-sm:text-[1.1rem]">
                  <span className="flex items-center gap-2 font-bold">
                    Employee Id :{" "}
                    {selectedEmployee?selectedEmployee.empId:"" || "N/A"}{" "}
                  </span>
                  <span className="flex items-center gap-2 font-bold">
                    Present Days : {attendanceData?.presentDays || 0}{" "}
                  </span>
                  <span className="flex items-center gap-2 font-bold">
                    Absent Days : {attendanceData?.absentDays || 0}
                  </span>
                  <span
                    className="cursor-pointer p-1 rounded-full hover:bg-gray-100 active:bg-gray-200"
                    onClick={() => setAttendanceDropdown((pre) => !pre)}
                  >
                    <FaAngleDown
                      size={20}
                      className={`${attendanceDropdown && "text-blue-400"}`}
                    />
                  </span>
                </div>

                {attendanceDropdown && (
                  <div className="grid grid-cols-2 max-sm:grid-cols-2 flex-wrap gap-4 justify-center p-2">
                    {/* Overview */}
                    <div className="p-2 max-xs:w-full h-30 shadow shadow-gray-400 rounded-b">
                      <div className="flex gap-1 items-center">
                        <IoTimeOutline size={18} className="text-blue-800" />
                        <p className="text-blue-600">Overview</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p>Present Days</p>
                          <p>Leave Days</p>
                          <p>Absent Days</p>
                        </div>
                        <div>
                          <p>{attendanceData?.presentDays || 0}</p>
                          <p>{attendanceData?.leaveDays || 0}</p>
                          <p>{attendanceData?.absentDays || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Total Duration */}
                    <div className="p-2 max-xs:w-full h-30 shadow shadow-gray-400 rounded-b">
                      <div className="flex gap-1 items-center">
                        <IoTimeOutline size={18} className="text-blue-800" />
                        <p className="text-blue-600">Duration</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p>Total Work Duration</p>
                          <p>Average Work Duration</p>
                        </div>
                        <div>
                          <p>{totalWorkDuration || 0}</p>
                          <p>{averageDuration || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*div-3  */}
          <div className=" space-y-1.5 overflow-x-hidden">
            <div className="border rounded px-4 py-4 bg-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:space-x-2">
                <input
                  className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {/* Dropdown for filtered employees */}
                {dropdownOpen && filteredEmployees.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 min-w-52   mt-10 rounded-md max-h-48 overflow-y-auto">
                    {filteredEmployees.map((employee) => (
                      <li
                        key={employee._id}
                        className="px-4 py-2 text-sm font-normal cursor-pointer hover:bg-gray-100 border-b border-gray-200 "
                        onClick={() => {
                          setSearchTerm(`${employee.firstName}`);
                          setDropdownOpen(false); // Close the dropdown after selection
                        }}
                      >
                        {`${employee.firstName} ${employee.lastName}`}
                      </li>
                    ))}
                  </ul>
                )}

                {dropdownOpen && filteredEmployees.length === 0 && (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
                <div className="flex items-center gap-2">
                  <div className="cursor-pointer hover:bg-gray-600 rounded-full hover:text-white p-2">
                    {showLogDetails ? (
                      <AiFillEye
                        onClick={() => {
                          setShowLogDetails(false);
                        }}
                        size={25}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => {
                          setShowLogDetails(true);
                        }}
                        size={25}
                      />
                    )}
                  </div>
                  <input
                    type="month"
                    id="date"
                    name="date"
                    value={currentMonth}
                    onChange={handleMonthChange}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="flex gap-2 justify-end">
                  <div className="flex flex-col  "></div>
                </div>
                <table className="w-full divide-y divide-gray-100 mt-4  ">
                  <div className="flex items-center sm:justify-end mb-2"></div>
                  <thead className="bg-gray-50">
                    <tr className="text-[17px]  max-sm:text-[1rem] text-left   whitespace-nowrap text-gray-700">
                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        Employee Id
                      </th>
                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        Date
                      </th>
                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        Employee Name
                      </th>

                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        Attendance Status
                      </th>
                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        In Time
                      </th>
                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        Out Time
                      </th>

                      <th className="px-6 py-2 font-medium text-black bg-gray-100">
                        Working hours
                      </th>

                      <th
                        className={`px-6 py-2 font-medium text-black bg-gray-100 ${
                          !showLogDetails && "hidden"
                        } `}
                      >
                        Late By
                      </th>
                      <th
                        className={`px-6 py-2 font-medium text-black bg-gray-100 ${
                          !showLogDetails && "hidden"
                        } `}
                      >
                        Early By
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-300">
                    {attendanceData?.attendance?.map((data, idx) => {
                      return (
                        <tr
                          key={idx}
                          className="rounded-md border border-gray-200 mb-2"
                        >
                          <td className="px-6 py-2 whitespace-nowrap">
                            {selectedEmployee.empId}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {data.date}
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap">
                            {selectedEmployee?.firstName}{" "}
                            {selectedEmployee?.lastName}
                          </td>

                          {/* Updated attendance status logic */}
                          <td className="px-6 py-3">
                            {data.status}
                          </td>

                          <td className="px-6 py-2 whitespace-nowrap">
                            {data.status==="Present"?data.inTime? data.inTime
                              : "No In Time":""}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                          {data.status==="Present"?data.outTime? data.outTime
                              : "No Out Time":""}
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                          {data.status==="Present"?data.workingHours? data.workingHours
                              : "Not Punched Out":""}
                          </td>
                          <td
                            className={`px-6 py-2 whitespace-nowrap ${
                              !showLogDetails && "hidden"
                            }`}
                          >
                            {data.status==="Present"?data.lateBy? data.lateBy
                              : "No late by":""}
                          </td>
                          <td
                            className={`px-6 py-2 whitespace-nowrap ${
                              !showLogDetails && "hidden"
                            }`}
                          >
                            {data.status==="Present"?data.earlyBy? data.earlyBy
                              : "No earlyBy":""}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap relative">
                            {/* Dropdown and other UI elements */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* right-side pop-up  */}
        </div>
      </div>
    </>
  );
}

export default NewAttendance;

// <td className="px-3 py-2 whitespace-nowrap relative">
{
  /*          <>
                            <BsThreeDotsVertical
                              size={33}
                              className="cursor-pointer p-2 rounded-full hover:bg-gray-100  active:bg-gray-200"
                              onClick={() => setTablePopup(idx)}
                            />

  
                              <div className="absolute z-40 top-0 bg-white p-2 right-10 flex flex-col shadow shadow-gray-400 rounded ">
                                
                                <span
                                  className="self-end "
                                  onClick={() => setTablePopup(-1)}
                                >
                                  <RxCross2
                                    size={25}
                                    className="rounded-full hover:bg-gray-100  active:bg-gray-200 p-1 cursor-pointer "
                                  />
                                </span>
                                 <span
                                  className="cursor-pointer hover:bg-gray-200 active:bg-gray-300 p-1"
                                  onClick={() => setclockInReqPop(true)}
                                >
                                  Clock-in
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 active:bg-gray-300 p-1">
                                  View all logs
                                </span>
                                <span className="cursor-pointer hover:bg-gray-200 active:bg-gray-300 p-1">
                                  View Shift & policy info
                                </span> *
                              </div>
                          
                          </>*/
}
// </td>
