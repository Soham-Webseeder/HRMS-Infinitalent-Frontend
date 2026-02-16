import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AllEmployees = () => {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployee`
        );
        setEmployee(response.data.data);
      } catch (error) {
        console.error("Error while Fetching Employee");
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen mx-auto sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full">
        <div className="bg-white border-gray-200 border rounded-md shadow-lg px-5 py-5">
          <h2 className="text-xl font-bold mb-4">
            Employee Create
          </h2>
          <div className="border rounded p-2">
            <div className="flex flex-col items-end">
              <div className="flex justify-between mb-4">
                <div className="flex flex-between space-x-4">
                  <button className="bg-blue-700 m-4 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transation-all duration-150">
                      <Link to="/employee/add-employee">
                      Add Employee
                      </Link>
                  </button>
                  <div>
                    <button className="m-4 self-start text-black  font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                        <Link to="/employee/manage-employee">
                        Manage Employee
                        </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded px-4 py-4">
              <span className="self-center font-bold">Show</span>
              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    name=""
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex-items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <span className="self-center font-bold">entries</span>
              <div className="flex flex-col items-end mb-2">
                <div className="flex">
                  <span className="self-center font-bold">Search :</span>
                  <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by Employee"
                  />
                </div>
              </div>
              <table className="w-full">
                <thead className="border">
                  <tr>
                    <th className="px-4 py-2 text-left border">SL</th>
                    <th className="px-4 py-2 text-left border">
                      Employee Name
                    </th>
                    <th className="px-4 py-2 text-left border">Employee Id</th>
                    <th className="px-4 py-2 text-left border">Note</th>
                    <th className="px-4 py-2 text-left border">
                      Number Of Stars
                    </th>
                    <th className="px-4 py-2 text-left border">Status</th>
                    <th className="px-4 py-2 text-left border">Updated By</th>
                  </tr>0
                </thead>
                <tbody className="border">
                  {performance.map((data, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 border">{i + 1}</td>
                      <td className="px-4 py-2 border">{data.employeeName}</td>
                      <td className="px-4 py-2 border">{data.empId}</td>
                      <td className="px-4 py-2 border">{data.note}</td>
                      <td className="px-4 py-2 border">
                        {generateStars(data.numberOfStar)}
                      </td>
                      <td className="px-4 py-2 border">{data.status}</td>
                      <td className="px-4 py-2 border">{data.updatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col mt-4 items-end">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployees;
