import { TbUser, TbUserCheck, TbUserMinus, TbUserOff } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls

function PunchStatus() {
  const [selectedBranch, setSelectedBranch] = useState(""); // Empty string to fetch all departments by default
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [departments, setDepartments] = useState([]);
  const [punchStatusData, setPunchStatusData] = useState({}); // Updated state to hold punch status data

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dashboard/getDashboardData`
        );
        setDepartments(response.data.departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Fetch punch status when branch or date changes
  useEffect(() => {
    const fetchPunchStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dashboard/getPunchStatusByDepartmentAndDate?department=${selectedBranch}&date=${selectedDate}`
        );
        setPunchStatusData(response.data.data || {});
      } catch (error) {
        console.error("Error fetching punch status:", error);
      }
    };

    fetchPunchStatus();
  }, [selectedBranch, selectedDate]);

  return (
    <div className="w-full p-4 rounded bg-gray-100">
      <div className="flex flex-col items-center w-full ">
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-8 space-x-4">
            <h1 className="mb-6 text-2xl font-semibold">PUNCH STATUS</h1>
            {/* Branch Select */}
            <div className="flex gap-4">
              <div className="flex items-center space-y-2">
                <select
                  id="branch"
                  className="p-2 border border-gray-300 rounded-md"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((department) => (
                    <option
                      key={department._id}
                      value={department.department.title}
                    >
                      {department.department.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div className="flex items-center space-y-2">
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  {/* <MdCalendarToday className="absolute top-1/2 right-2 h-5 w-5 text-gray-400 transform -translate-y-1/2" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center p-6 space-y-2 bg-white rounded-lg shadow">
              <TbUser className="h-12 w-12 text-blue-900" />
              <div className="text-lg font-medium">Total Active Employees</div>
              <div className="text-2xl font-bold text-blue-900">
                {punchStatusData.totalActiveEmployees || 0}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 space-y-2 bg-white rounded-lg shadow">
              <TbUserCheck className="h-12 w-12 text-blue-900" />
              <div className="text-lg font-medium">Punched-In</div>
              <div className="text-2xl font-bold text-blue-900">
                {punchStatusData.punchedIn || 0}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 space-y-2 bg-white rounded-lg shadow">
              <TbUserMinus className="h-12 w-12 text-blue-900" />
              <div className="text-lg font-medium">Punched-Out</div>
              <div className="text-2xl font-bold text-blue-900">
                {punchStatusData.punchedOut || 0}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-6 space-y-2 bg-white rounded-lg shadow">
              <TbUserOff className="h-12 w-12 text-blue-900" />
              <div className="text-lg font-medium">Not Punched-In</div>
              <div className="text-2xl font-bold text-blue-900">
                {punchStatusData.notPunchedIn || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PunchStatus;
