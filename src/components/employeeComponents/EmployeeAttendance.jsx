import { BsEyeFill } from "react-icons/bs";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const EmployeeAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    employeeId: "",
    fromDate: "",
    toDate: "",
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user.userAllData.employeeDetails;
  console.log(userId, "atttendance");

  const fetchPresentData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL
        }/attendance/getAttendanceByEmployee/${userId}`
      );
      console.log(res.data.data, "Data")
      setAttendanceData(res.data.data);
    } catch (error) {
      console.error("Error fetching present data:", error);
    }
  };

  useEffect(() => {
    fetchPresentData();
  }, []);


  const handleSearch = () => {
    let filtered = attendanceData;

    if (filters.employeeId) {
      filtered = filtered.filter(
        (record) => record.employeeName?._id === filters.employeeId
      );
    }

    if (filters.fromDate || filters.toDate) {
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.inTime);
        if (isNaN(recordDate.getTime())) {
          console.error("Invalid date format:", record.inTime);
          return false;
        }
        const recordDateString = recordDate.toISOString().split("T")[0];
        if (filters.fromDate && filters.toDate) {
          return (
            recordDateString >= filters.fromDate &&
            recordDateString <= filters.toDate
          );
        }
        if (filters.fromDate) {
          return recordDateString >= filters.fromDate;
        }
        if (filters.toDate) {
          return recordDateString <= filters.toDate;
        }
        return true;
      });
    }
    setFilteredData(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };


  const renderAttendanceTables = () => {

    return attendanceData.map((data, i) =>
      <div className="p-4 flex items-center justify-center w-full" key={data.date}>
        <div className="overflow-x-auto w-full">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex w-full justify-center text-gray-700">
              Attendance History Of {data.date}
            </h2>
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    SL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    In Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Out Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Work Hours
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((record, index) => (
                  <tr key={record._id}>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {record.employeeName?.firstName}{" "}
                      {record.employeeName?.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {lastFourDigits(record.inTime) || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {lastFourDigits(record.outTime) || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {calculateWorkHours(record)}
                    </td>
                    <td className="flex items-center justify-center">
                      {" "}
                      <BsEyeFill
                        onClick={() =>
                          navigate(`/attendance/details/${record._id}`)
                        }
                        className=" text-blue-600 hover:text-blue-900 cursor-pointer text-center text-3xl rounded-md font-bold mt-4"
                        size={25}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  };



  const calculateWorkHours = (record) => {
    const inTime = new Date(record.inTime);
    const outTime = new Date(record.outTime);
    if (isNaN(inTime.getTime()) || isNaN(outTime.getTime())) {
      console.error("Invalid date format:", record.inTime, record.outTime);
      return "Invalid time";
    }

    let diff = outTime - inTime;
    if (diff < 0) {
      // If out time is before in time, add 24 hours to out time
      outTime.setDate(outTime.getDate() + 1);
      diff = outTime - inTime;
    }

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours} hours ${minutes} minutes`;
  };

  const lastFourDigits = (str) => str.substring(str.length - 5);
  return (
    <div className="w-full m-2 flex justify-center mt-3 pt-1">
      <div className="flex flex-col  w-full md:pl-3 sm:p-1 pl-0 h-auto justify-evenly rounded-md bg-white shadow-lg ">
        <h1 className="text-3xl font-bold mb-4 sm:pl-2 pl-2 md:pl-0">
          Attendance Dashboard
        </h1>
        <div className="p-2 bg-slate-50 shadow-md ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center justify-center w-full"
          >
            <div className="flex md:flex-row sm:flex-col flex-col md:w-[60%] sm:w-full items-center md:justify-evenly md:gap-0 sm:justify-center justify-center  sm:gap-3 gap-3">

              <div className="flex items-center justify-center sm:gap-3 md:gap-2 gap-3">
                <label htmlFor="fromDate">From</label>
                <input
                  type="date"
                  name="fromDate"
                  className="w-full border border-gray-300 rounded px-4 sm:ml-7 md:ml-0 ml-7 py-2 outline-none focus:border-blue-400"
                  value={filters.fromDate}
                  onChange={handleInputChange}

                />
              </div>
              <div className="flex items-center justify-center sm:gap-3 md:gap-2 gap-3">
                <label htmlFor="toDate">To</label>
                <input
                  type="date"
                  name="toDate"
                  className="w-full border border-gray-300 rounded px-4 sm:ml-4 ml-12 md:ml-0 py-2 outline-none focus:border-blue-400"
                  value={filters.toDate}
                  onChange={handleInputChange}

                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-2 bg-blue-600 text-white px-4 rounded"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
        {renderAttendanceTables()}
      </div>
    </div>
  );
};

export default EmployeeAttendance;
