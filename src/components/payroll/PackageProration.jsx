import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PackageProration = () => {
  const [currentEmployee, setCurrentEmployee] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);

  // Fetch all employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCurrentEmployee(value);
    if (value.trim() === "") {
      setFilteredEmployees([]);
      setDropDownOpen(false);
      setSelectedEmployee(null);
      setEmployeeDetails(null);
      return;
    }
    const emp = employees.filter((employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredEmployees(emp);
    setDropDownOpen(true);
  };

  const handleEmployeeSelect = async (employee) => {
    setCurrentEmployee(`${employee.firstName} ${employee.lastName}`);
    setSelectedEmployee(employee);
    setDropDownOpen(false);
    await fetchEmployeeDetails(employee._id); // Fetch details of the selected employee
  };

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/getEmployeeById/${employeeId}`
      );
      console.log(employeeId, "OD");
      setEmployeeDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  // Calculate monthly and annual proration
  const calculateProration = () => {
    if (employeeDetails && employeeDetails.salarySetup) {
      const {
        basicSalary = 0,
        hra = 0,
        da = 0,
        specialAllowance = 0,
        otherAllowance = 0,
        grossSalary = 0,
        totalDeductions = 0,
        netSalary = 0,
        pfEmployee = 0,
        pfEmployer = 0,
        esicEmployee = 0,
        esicEmployer = 0,
        pt = 0,
      } = employeeDetails.salarySetup;

      const annualProration = {
        basicSalary: (basicSalary * 12).toFixed(2),
        hra: (hra * 12).toFixed(2),
        da: (da * 12).toFixed(2),
        specialAllowance: (specialAllowance * 12).toFixed(2),
        otherAllowance: (otherAllowance * 12).toFixed(2),
        grossSalary: (grossSalary * 12).toFixed(2),
        totalDeductions: (totalDeductions * 12).toFixed(2),
        netSalary: (netSalary * 12).toFixed(2),
        pfEmployee: (pfEmployee * 12).toFixed(2),
        pfEmployer: (pfEmployer * 12).toFixed(2),
        esicEmployee: (esicEmployee * 12).toFixed(2),
        esicEmployer: (esicEmployer * 12).toFixed(2),
        pt: (pt * 12).toFixed(2),
      };

      const monthlyProration = {
        basicSalary: basicSalary.toFixed(2),
        hra: hra.toFixed(2),
        da: da.toFixed(2),
        specialAllowance: specialAllowance.toFixed(2),
        otherAllowance: otherAllowance.toFixed(2),
        grossSalary: grossSalary.toFixed(2),
        totalDeductions: totalDeductions.toFixed(2),
        netSalary: netSalary.toFixed(2),
        pfEmployee: pfEmployee.toFixed(2),
        pfEmployer: pfEmployer.toFixed(2),
        esicEmployee: esicEmployee.toFixed(2),
        esicEmployer: esicEmployer.toFixed(2),
        pt: pt.toFixed(2),
      };

      return { annualProration, monthlyProration };
    }
    return { annualProration: {}, monthlyProration: {} };
  };

  const { annualProration, monthlyProration } = calculateProration();
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Package & Proration</h1>
          <p className="font-light text-gray-600 mt-4">
            <Link to="/">Home</Link> | <Link to="/app/payroll">Payroll</Link> |{" "}
            <Link to="/payroll/package-proration">Package & Proration</Link>
          </p>
        </div>
      </div>

      <div className="border rounded px-4 py-4 bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={currentEmployee}
              className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              onChange={handleSearchChange}
              placeholder="Search employee"
            />
            <span className="absolute z-10 right-0 px-1 top-1/2 transform -translate-y-1/2 border-l-2 border-slate-300 hover:cursor-pointer">
              {/* Arrow Icon */}
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
            </span>

            {/* Dropdown */}
            {dropDownOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
                <ul className="max-h-60 overflow-auto">
                  {filteredEmployees.length > 0 ? (
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
        <div className="flex flex-col lg:flex-row p-4 lg:p-8 mx-auto max-w-7xl">
          {/* Left Section */}
          <div className="lg:w-1/4 bg-white shadow-lg rounded-lg p-4 lg:p-6 mb-6 lg:mb-0 lg:mr-6">
            <div className="bg-blue-500 text-white p-2 text-left rounded-md flex items-center space-x-2">
              {/* Calendar Icon */}
              <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-md">
                <span className="text-lg font-bold">01</span>
              </div>

              {/* Month and Year */}
              <div>
                <p className="text-sm font-semibold">April</p>
                <p className="text-xs">2023</p>
              </div>
            </div>

            {/* Assigned CTC */}
            <div className="mt-4 lg:mt-6">
              <h3 className="text-lg font-semibold">Assigned CTC</h3>
              <p className="text-xl font-semi-bold mt-2">
                ₹ {annualProration.grossSalary}
              </p>
            </div>

            {/* Assigned By */}
            <div className="mt-4 lg:mt-6">
              <h3 className="text-lg font-semibold">Assigned by</h3>
              <div className="flex items-center mt-2">
                {/* Circular image */}
                <img
                  src="image.jpg"
                  alt="Profile Picture"
                  className="w-10 h-10 bg-gray-300 rounded-full object-cover"
                />
                <div className="ml-3 lg:ml-4">
                  <p className="text-md font-semibold">Chandrappa M R</p>
                  <p className="text-sm text-gray-500">MD/CEO</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-3/4 bg-white shadow-lg rounded-lg p-4 lg:p-6">
            <h3 className="text-lg font-semibold mb-4">Pay package details</h3>

            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="text-gray-500 w-1/2">Updated on</td>
                  <td className="font-semibold text-right">05-09-2023</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Effective from</td>
                  <td className="font-semibold text-right">01-04-2023</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Salary structure</td>
                  <td className="font-semibold text-right">
                    Sal with Basic, HRA, Con & Medi
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-500">Designation</td>
                  <td className="font-semibold text-right">MD/CEO</td>
                </tr>
                <tr>
                  <td className="text-gray-500">Assigned on</td>
                  <td className="font-semibold text-right">DOJ</td>
                </tr>
              </tbody>
            </table>

            <hr className="border-dashed border-t-2 border-gray-300 mt-6 mb-6" />

            <h3 className="text-lg font-semibold mt-6">
              Pay package proration
            </h3>

            {/* Proration Tables */}
            <div className="mt-4">
              {/* Income Table */}
              <table className="w-full text-left mb-6">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border-b pb-2">Income component</th>
                    <th className="border-b pb-2">Annual proration</th>
                    <th className="border-b pb-2">Monthly proration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Basic Pay</td>
                    <td>₹{annualProration.basicSalary}</td>
                    <td>₹{monthlyProration.basicSalary}</td>
                  </tr>
                  <tr>
                    <td className="py-2">DA</td>
                    <td>₹ {annualProration.da} </td>
                    <td>₹ {monthlyProration.da} </td>
                  </tr>
                  <tr>
                    <td className="py-2">HRA (Gross)</td>
                    <td>₹ {annualProration.hra} </td>
                    <td>₹ {monthlyProration.hra} </td>
                  </tr>
                  <tr>
                    <td className="py-2">Other Allowance</td>
                    <td>₹ {annualProration.otherAllowance} </td>
                    <td>₹ {monthlyProration.otherAllowance} </td>
                  </tr>
                  <tr>
                    <td className="py-2">Special Allowance</td>
                    <td>₹ {annualProration.specialAllowance} </td>
                    <td>₹ {monthlyProration.specialAllowance} </td>
                  </tr>
                </tbody>
              </table>

              {/* Deduction Table */}
              <table className="w-full text-left mb-6">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border-b pb-2">Deduction component</th>
                    <th className="border-b pb-2">Annual proration</th>
                    <th className="border-b pb-2">Monthly proration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">PF Employee (Gross)</td>
                    <td>₹ {annualProration.pfEmployee}</td>
                    <td>₹{monthlyProration.pfEmployee}</td>
                  </tr>
                  <tr>
                    <td className="py-2">PF employer ded</td>
                    <td>₹{annualProration.pfEmployer}</td>
                    <td>₹ {monthlyProration.pfEmployer}</td>
                  </tr>
                  <tr>
                    <td className="py-2">ESIC Employee (Gross)</td>
                    <td>₹ {annualProration.esicEmployee}</td>
                    <td>₹{monthlyProration.esicEmployee}</td>
                  </tr>
                  <tr>
                    <td className="py-2">ESIC employer ded</td>
                    <td>₹{annualProration.esicEmployer}</td>
                    <td>₹ {monthlyProration.esicEmployer}</td>
                  </tr>
                  <tr>
                    <td className="py-2">PT (Gross)</td>
                    <td>₹{annualProration.pt}</td>
                    <td>₹ {monthlyProration.pt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageProration;
