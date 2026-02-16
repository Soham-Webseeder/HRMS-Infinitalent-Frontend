import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const NewBenefitReport = () => {
  const [employee, setEmployee] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedEmployeeData = employee.filter(
      (emp) => `${emp.firstName} ${emp.lastName}` === selectedEmployee
    );
    setShowDetails(true);
    setFilteredEmployee(selectedEmployeeData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee(value);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      setEmployee(response.data.data);
      setFilteredEmployee(response.data.data);
    };
    getData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="p-4 md:p-6 lg:p-8">
        <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">
              Benefit Report
            </h1>
            <p className="font-light text-gray-600 mt-4">
              <Link to="/">Home</Link> | <Link to="/app/report">Report</Link> | <Link to="/report/benefit-report"> Benefit Report</Link>
            </p>
          </div>
        </div>
        <div className="border rounded px-4 py-4 bg-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 w-full">
              <div className="relative">
                <div
                  className="px-4 py-1 bg-white border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-20"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="flex-1">{selectedEmployee || "Select Employee"}</span>
                  <svg
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-500 ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {showDropdown && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
                    {employee.length === 0 ? (
                      <li className="p-2 text-gray-500">No options available</li>
                    ) : (
                      employee.map((data) => (
                        <li
                          key={data._id}
                          className="p-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedEmployee(`${data.firstName} ${data.lastName}`);
                            setShowDropdown(false);
                          }}
                        >
                          {`${data.firstName} ${data.lastName}`}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                className="ml-4 bg-blue-700 text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              >
                Search
              </button>
            </form>
          </div>

          {showDetails && (
            <div className="overflow-x-auto w-full mt-4">
              <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-sm font-medium text-black">
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">SL No</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">Name</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">Benefit Type</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">Benefit Description</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">Benefit Start Date</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">Benefit End Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployee.map((emp, i) => (
                    <tr key={emp._id} className="text-gray-600 text-left">
                      <td className="px-2 py-1">{i + 1}</td>
                      <td className="px-2 py-1">{emp.firstName}</td>
                      <td className="px-2 py-1">{emp.benefitType}</td>
                      <td className="px-2 py-1">{emp.benefitDescription}</td>
                      <td className="px-2 py-1">{emp.startDate}</td>
                      <td className="px-2 py-1">{emp.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default NewBenefitReport;
