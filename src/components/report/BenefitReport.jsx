import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const BenefitReport = () => {
  const [employee, setEmployee] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);

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
      <div className="bg-gray-100 w-full mx-auto sm:px-2 md:px-24 min-h-screen overflow-x-hidden flex flex-col">
        <Toaster />
        <div className="bg-white border-gray-200 border border-rounded shadow-lg px-4 py-2">
          <h2 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full">Benefit Report</h2>
          {/* <h3>Benefit Report</h3> */}
          <form onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="" className="block text-sm font-medium mb-2">
                Search
                <span className="text-red-500">*</span>
              </label> */}
              <select
                name="employee"
                className="w-full border border-rounded px-4 py-2 mb-2"
                value={selectedEmployee}
                onChange={handleInputChange}
              >
                <option value="">Select Option</option>
                {employee.map((data, i) => (
                  <option
                    value={`${data.firstName} ${data.lastName}`}
                    key={data._id}
                  >{`${data.firstName} ${data.lastName}`}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transation-all duration-150 mt-4 mb-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {showDetails && (
          <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5 mt-3">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    SL No
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Benefit Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Benefit Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Benefit Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Benefit End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployee.map((emp, i) => (
                  <tr key={emp._id}>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {emp.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {emp.benefitType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {emp.benefitDescription}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {emp.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {emp.endDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BenefitReport;
