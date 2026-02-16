import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

const generateStars = (numberOfStars) => {
  const stars = [];
  for (let i = 0; i < numberOfStars; i++) {
    stars.push(<span key={i}>&#9733;</span>);
  }
  return stars;
};

const AllEmployeePerformance = () => {
  const [performance, setPerformance] = useState([]);
  const [perPage, setPerPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPerformance = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/getAllEmpPerformance?page=${currentPage}&limit=${perPage}`
      );
      if (response.data.success) {
        setPerformance(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        console.log(
          "Performance Data Fetched Successfully:",
          response.data.message
        );
      } else {
        console.error(
          "Error fetching performance data:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  useEffect(() => {
    fetchPerformance();
  }, [currentPage, perPage]);

  const filteredPerformance = performance.filter((employee) => {
    if (
      employee &&
      employee.employeeName &&
      typeof employee.employeeName === "string"
    ) {
      return employee.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return false;
  });

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen mx-auto sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full">
        <div className="bg-white border-gray-200 border rounded-md shadow-lg px-5 py-5">
          <h2 className="text-xl font-bold mb-4">
            Employee Performance Create
          </h2>
          <div className="border rounded p-2">
            <div className="flex flex-col items-end">
              <div className="flex justify-between mb-4">
                <div className="flex flex-between space-x-4">
                  <button className="bg-blue-700 m-4 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                    <Link to="/employee/add-employee-performance">
                      Add Employee Performance
                    </Link>
                  </button>
                  <div>
                    <button className="m-4 self-start text-black font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                      <Link to="/employee/manage-employee-performance">
                        Manage Employee Performance
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded px-4 py-4">
              <div className="flex space-x-2 justify-between">
                <div className="relative">
                  <label className="mr-2 text-sm">Show</label>

                  <select
                    name=""
                    id=""
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={perPage}
                    onChange={handlePerPageChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <IoMdArrowDropdown className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="self-center ml-2">entries</span>
                </div>
                <div className="flex flex-col items-end mb-2">
                  <div className="flex">
                    <span className="self-center font-bold mr-2">Search:</span>
                    <input
                      type="text"
                      placeholder="Search By Asset Type.."
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-center w-full">
                <div className="overflow-x-auto w-full">
                  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          SL
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          Employee Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          Employee Id
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          Note
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          Number Of Stars
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                          Updated By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPerformance.map((data, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {i + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {data.employeeName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {data.empId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {data.note}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {generateStars(data.numberOfStar)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {data.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                            {data.updatedBy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 rounded-md hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEmployeePerformance;
