import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExcelExport from "./ExcelExport"; // Adjust path as per your project structure

const MonthlyAttendance = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
  });
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAllToggled, setShowAllToggled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const { employeeId, month } = formData;

      if (!employeeId || !month) {
        return; // Exit early if either employeeId or month is not selected
      }

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
      );

      const allAttendance = response.data.data;

      // Filter attendance based on employeeId and month
      const filteredAttendance = allAttendance.filter((attendance) => {
        const isSameEmployee = attendance.employeeName?._id === employeeId;
        const isSameMonth =
          new Date(attendance.date).getMonth() === new Date(month).getMonth() &&
          new Date(attendance.date).getFullYear() === new Date(month).getFullYear();
        return isSameEmployee && isSameMonth;
      });

      setAttendanceData(filteredAttendance);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setLoading(false);
    }
  };

  const fetchAllAttendance = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
      );

      setAttendanceData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all attendance:", error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAttendance();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setDropdownOpen(true);
  };

  const handleEmployeeSelect = (employee) => {
    setFormData({ ...formData, employeeId: employee._id });
    setSearchTerm(`${employee.firstName} ${employee.lastName}`);
    setDropdownOpen(false);
  };

  const handleExportAll = async () => {
    if (showAllToggled) {
      setAttendanceData([]);
      setShowAllToggled(false);
    } else {
      await fetchAllAttendance();
      setShowAllToggled(true);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex justify-center mt-3 pt-1">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-5 bg-white rounded-lg shadow-md">
        <div className=" mb-4">
          <h2 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2">
            Monthly Attendance
          </h2>
        </div>

        <div className="flex justify-end mb-6 space-x-4">
          <ExcelExport
            data={attendanceData}
            classes="bg-[#232323] text-white px-4 py-2 rounded-full flex items-center gap-2"
            filename="Attendance.xlsx"
          />
          <button
            type="button"
            onClick={handleExportAll}
            className={`bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 ${
              showAllToggled ? "bg-red-600 hover:bg-red-700" : ""
            }`}
          >
            {showAllToggled ? "Hide All" : "Show All"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative flex flex-col sm:flex-row items-center mb-4 w-full min-w-0">
            <label
              htmlFor="employeeId"
              className="w-full sm:w-1/3 text-gray-700 font-medium text-center sm:text-left"
            >
              Employee Name:
            </label>
            <div className="w-full sm:w-2/3 min-w-0 relative" ref={dropdownRef}>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Employee..."
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
                  <ul className="max-h-60 overflow-auto">
                    {filteredEmployees.length ? (
                      filteredEmployees.map((employee) => (
                        <li
                          key={employee._id}
                          onClick={() => handleEmployeeSelect(employee)}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {employee.firstName} {employee.lastName}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-700">
                        No employees found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-4">
            <label
              htmlFor="month"
              className="w-full sm:w-1/3 text-gray-700 font-medium text-center sm:text-left"
            >
              Month & Year:
            </label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full sm:w-2/3 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 mt-2 sm:mt-0"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Details
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <h1 className="text-2xl font-medium text-gray-700">Loading...</h1>
          </div>
        ) : attendanceData.length > 0 ? (
          <div className="overflow-x-auto mt-6 border border-gray-300 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Attendance Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((attendance) => (
                  <tr key={attendance._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 border-r">
                      {attendance.employeeName
                        ? `${attendance.employeeName.firstName} ${attendance.employeeName.lastName}`
                        : "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {attendance.attendance.map((day) => (
                          <li key={day.date}>
                            {`${day.date}: ${
                              day.checked ? "Present" : "Absent"
                            }`}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <h1 className="text-2xl font-medium text-gray-700">No data found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyAttendance;
