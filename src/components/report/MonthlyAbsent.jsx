import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const MonthlyAbsent = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [absenteesData, setAbsenteesData] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    month: "",
    year: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employee, department, month, year } = formData;
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/attendance/getMonthlyAbsentees/?employee=${employee}&department=${department}&month=${month}&year=${year}`
      );
      if (response.data.success) {
        setAbsenteesData(response.data.data);
        setShowDetails(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch monthly absentee data:", error);
      setAbsenteesData([]);
      setShowDetails(false);
    }
  };

  // Fetch employee and department data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
        );
        setEmployeeList(employeesResponse.data.data);

        const departmentsResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
        );
        setDepartmentList(departmentsResponse.data.response);
      } catch (error) {
        console.error("Failed to fetch employee or department data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 overflow-x-hidden flex flex-col w-full mx-auto">
      <Toaster />
      <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5">
        <h2 className="text-xl font-bold mb-2">Absentees Report</h2>
        <h3 className="font-medium mb-3">Monthly Absent</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="employee"
              className="block text-sm font-medium mb-1"
            >
              Employee Name
              <span className="text-red-500">*</span>
            </label>
            <select
              id="employee"
              name="employee"
              value={formData.employee}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 mb-2"
            >
              <option value="">Select Employee</option>
              {employeeList.map((emp) => (
                <option key={emp._id} value={emp.firstName}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm font-medium mb-1"
            >
              Department
              <span className="text-red-500">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 mb-2"
            >
              <option value="">Select Department</option>
              {departmentList.map((dept) => (
                <option key={dept._id} value={dept.department?.title}>
                  {dept.department?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium mb-1">
              Month
              <span className="text-red-500">*</span>
            </label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 mb-2"
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium mb-1">
              Year
              <span className="text-red-500">*</span>
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full border px-4 py-2 mb-2"
            >
              <option value="">Select Year</option>
              {Array.from(
                { length: 12 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {showDetails && (
        <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5 mt-3 overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                  Sl
                </th>
                <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(absenteesData) &&
                absenteesData &&
                absenteesData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {!showDetails && (
        <div className="flex items-center pt-5 w-full justify-center text-2xl font-medium text-black">
          No Absentees Found
        </div>
      )}
    </div>
  );
};

export default MonthlyAbsent;
