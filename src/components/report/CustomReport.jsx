import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const CustomReport = () => {
  const [employee, setEmployee] = useState([]);
  const [data, setData] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );
      setEmployee(response.data.data);
    };
    getData();
  }, []);
  return (
    <>
      <div className="bg-gray-100 min-h-screen w-full mx-auto sm:px-2 md:px-24 overflow-x-hidden flex flex-col">
        <Toaster />
        <div className="bg-white border-gray-200 border border-rounded shadow-lg px-4 py-2">
          <h2 className="text-xl font-bold">Report</h2>
          <h3>Custom Report</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">
                Search
                <span className="text-red-500">*</span>
              </label>
              <select
                name="employee"
                className="w-full border border-rounded px-4 py-2 mb-2"
                value={data.employee}
                onChange={handleInputChange}
              >
                <option value="">Select Option</option>
                {employee.map((data, i) => (
                  <option value={data.firstName} key={data._id}>
                    {data.firstName} {data.middleName} {data.lastName}
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
          <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5 mt-3">
            <table className="min-w-full divine-y overflow-x-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    SL No
                  </th>
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    Custom Field
                  </th>
                  <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                    Custom Data
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomReport;
