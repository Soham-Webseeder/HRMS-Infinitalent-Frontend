import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ReactPrint from "react-to-print";
import { IoMdPrint } from "react-icons/io";
const ReportComponent = () => {
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errors, setErrors] = useState({ department: false, date: false });

  const componentRef = useRef();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
      );
     
      setDepartment(response.data.response);
      console.log(department)
     
    };
    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "department") {
      setSelectedDepartment(value);
      setErrors((prevErrors) => ({ ...prevErrors, department: false }));
    } else if (name === "date") {
      setSelectedDate(value);
      setErrors((prevErrors) => ({ ...prevErrors, date: false }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedDate, "selectdate");
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
      console.log(formattedDate, "date");
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/attendance/getAttendanceByDate/?date=${formattedDate}`
      );

      if (response.data.success) {
        const presentEmployees = response.data.data.filter(
          (employee) => employee.inTime // Assuming employee is present if inTime exists
        );

        // Filter by selected department if it's not empty
        const filteredData = selectedDepartment
          ? presentEmployees.filter(
              (employee) => employee.department === selectedDepartment
            )
          : presentEmployees;

        setReportData(filteredData);
        setShowDetails(true);
      } else {
        console.log("Failed to fetch attendance data:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch attendance data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 overflow-x-hidden flex flex-col w-full mx-auto">
      <Toaster />
      <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5">
        <h2 className="text-xl font-bold mb-2">Present Report</h2>
        <form onSubmit={handleSubmit}>
        <div>
  <label htmlFor="date" className="block text-sm font-medium mb-1">
    Department
    <span className="text-red-500">*</span>
  </label>
  <select
    name="department"
    id="department"
    className="w-full border px-4 py-2 mb-2 rounded"
    onChange={handleInputChange}
    value={selectedDepartment}
  >
    <option value="">Select Option</option>
    {department.length > 0 &&
      department.map((data) => (
        <option key={data._id} value={data.department?.title}>
          {data.department?.title}
        </option>
      ))}
  </select>
</div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="date"
              className="p-2 border w-full form-input rounded mb-5"
              onChange={handleInputChange}
              value={selectedDate}
            />
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
        <div>
          <div className="flex justify-end items-center pt-4 pr-5">
            <ReactPrint
              trigger={() => <IoMdPrint size={25} />}
              content={() => componentRef.current}
              documentTitle={`INVOICE`}
            />
          </div>
          <div className="bg-white border-gray-200 border border-rounded shadow-lg md:px-5 py-5 mt-3 overflow-x-auto sm:px-2 px-2">
            <table ref={componentRef} className="min-w-full divide-y">
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
                {reportData &&
                  reportData.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">
                        {item.employeeName
                          ? item.employeeName.firstName
                          : "N/A"}
                      </td>
                      <td className="px-6 py-3">{item.department}</td>
                      <td className="px-6 py-3">{item.inTime.split("T")[0]}</td>
                      <td className="px-6 py-3">{item.inTime.split("T")[1]}</td>
                      <td className="px-6 py-3">
                        {item.outTime.split("T")[1]}
                      </td>
                      <td className="px-6 py-3">
                        {item.inTime ? "Present" : "Absent"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!showDetails && (
        <div className="flex items-center pt-5 w-full justify-center text-2xl font-medium text-black">
          No Present Found
        </div>
      )}
    </div>
  );
};

export default ReportComponent;
