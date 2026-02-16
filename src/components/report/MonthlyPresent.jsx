import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [department, setDepartment] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const [data, setData] = useState({
    employee: "",
    department: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
      );
      setAttendanceData(response.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const department = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
      );
      setDepartment(department.data.response);

      const employee = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );
      console.log(employee.data.data, "Data");
      setEmployee(employee.data.data);
    };

    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { employee, department, month, year } = data;
    if (!employee || !department || !month || !year) {
      toast.error("Please fill all required fields.");
      return;
    }
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAttendanceByDate`,
        {
          params: {
            employee,
            department,
            month,
            year,
          },
        }
      );
  
      if (response.data.success) {
        setFilteredData(response.data.data);
        setShowDetails(true);
      } else {
        toast.error(response.data.message || "Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      toast.error("Failed to fetch attendance data");
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 overflow-x-hidden flex flex-col w-full mx-auto">
      <Toaster />
      <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5">
        <h2 className="text-xl font-bold mb-2">Monthly Present Report</h2>
        <div>
          <div>
            <label htmlFor="employee">
              Employee Name
              <span className="text-red-500">*</span>
            </label>
            <select
              name="employee"
              id="employee"
              className="w-full border px-4 py-2 mb-2"
              value={data.employee}
              onChange={handleInputChange}
            >
              <option value="">Select Employee</option>
              {employee.map((obj) => (
                <option key={obj.firstName} value={obj.firstName}>
                  {obj.firstName} {obj.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="department">
              Department
              <span className="text-red-500">*</span>
            </label>

            <select
              name="department"
              id="department"
              className="w-full border px-4 py-2 mb-2"
              value={data.department}
              onChange={handleInputChange}
            >
              <option value="">Select department</option>
              {department.map((data) => (
                <option
                  key={data.department?.title}
                  value={data.department?.title}
                >
                  {data.department?.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="month">
              Month
              <span className="text-red-500">*</span>
            </label>
            <select
              name="month"
              id="month"
              className="w-full border px-4 py-2 mb-2"
              onChange={handleInputChange}
            >
              <option>Select Month</option>
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
          <div>
            <label htmlFor="year">
              Year
              <span className="text-red-500">*</span>
            </label>
            <select
              name="year"
              id="year"
              className="w-full border px-4 py-2 mb-2"
              onChange={handleInputChange}
            >
              {" "}
              <option>Select Year</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="overflow-x-auto">
          {filteredData.length > 0 ? (
            <table className="min-w-full border bg-white rounded shadow-md mt-2">
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
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    In Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    Out Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
            {item.employeeName ? `${item.employeeName.firstName} ${item.employeeName.lastName}` : 'Employee Name Not Available'}
                    </td>
                    <td className="px-6 py-4">{item.department}</td>
                    <td className="px-6 py-4">
                      {new Date(item.inTime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.inTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.outTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      {item.inTime ? "Present" : "Absent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Monthly Present Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;
