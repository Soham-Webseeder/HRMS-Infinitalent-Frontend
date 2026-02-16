import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const DemographicReport = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const fetchData = async (currentPage, perPage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`,
        {
          params: {
            page: currentPage,
            limit: perPage,
          },
        }
      );
      setEmployees(response.data.data);
      setFilteredEmployees(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage, perPage]);


  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setTotalPages(
      Math.ceil(filteredReports.length / parseInt(e.target.value, 10))
    );
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchData(newPage, perPage);
    }
  };

  const filteredEmployeeData = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-2 md:p-6 lg:p-8">
        <h1 className="text-xl md:text-2xl font-bold mb-4">
          Demographic Report
        </h1>

        <div className="flex justify-between items-center">
          {/* Navigation Links */}
          <div className="flex text-sm text-gray-500">
            <Link
              to="/"
              className="pr-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
            >
              Home
            </Link>
            <Link
              to="/app/report"
              className="px-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
            >
              Report
            </Link>
            <Link className="px-1 flex justify-center items-center h-4">
              Demographic Report
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        <div className="border rounded px-4 py-4 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex items-center w-full md:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 w-full"
              />
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
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <label className="text-sm">Per Page</label>
              <select
                onChange={handlePerPageChange}
                value={perPage}
                className="border rounded-full py-2 px-2 text-sm w-full md:w-auto"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-gray-100 divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-sm font-medium text-black">
                  <th className="px-4 py-2">SL</th>
                  <th className="px-4 py-2">IMAGE</th>
                  <th className="px-4 py-2">FIRST NAME</th>
                  <th className="px-4 py-2">LAST NAME</th>
                  <th className="px-4 py-2">MAIDEN NAME</th>
                  <th className="px-4 py-2">PHONE</th>
                  <th className="px-4 py-2">EMAIL ADDRESS</th>
                  <th className="px-4 py-2">COUNTRY</th>
                  <th className="px-4 py-2">CITY</th>
                  <th className="px-4 py-2">ZIPCODE</th>
                  <th className="px-4 py-2">DOB</th>
                  <th className="px-4 py-2">GENDER</th>
                  <th className="px-4 py-2">MARITAL STATUS</th>
                  <th className="px-4 py-2">ETHNIC GROUP</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployeeData.map((emp, index) => (
                  <tr key={emp._id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {currentPage === 1
                        ? index + 1
                        : (currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      <img
                        src={emp.photograph}
                        alt="Employee"
                        className="w-10 h-10"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.firstName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.lastName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.maidenName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.phone}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 truncate">
                      {emp.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.country}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.city}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.zipCode}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(emp.dateOfBirth).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.gender}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.maritalStatus}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {emp.ethnicGroup}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => handlePreviousPage(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &laquo;
              </button>
              <button
                onClick={() => handlePreviousPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &lt;
              </button>
              {totalPages <= 3 ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handleNextPage(page)}
                      className={`px-4 py-2 border rounded-full ${
                        currentPage === page
                          ? "text-blue-500 bg-white border-blue-500"
                          : "text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )
              ) : (
                <>
                  {currentPage > 2 && (
                    <>
                      <button
                        onClick={() => handleNextPage(1)}
                        className="px-4 py-2 border rounded-full text-gray-700 border-gray-300 hover:bg-gray-100"
                      >
                        1
                      </button>
                      {currentPage > 3 && <span className="px-2">...</span>}
                    </>
                  )}
                  {Array.from(
                    { length: 3 },
                    (_, i) => i + Math.max(1, currentPage - 1)
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handleNextPage(page)}
                      className={`px-4 py-2 border rounded-full ${
                        currentPage === page
                          ? "text-blue-500 bg-white border-blue-500"
                          : "text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages - 1 && (
                    <>
                      {currentPage < totalPages - 2 && (
                        <span className="px-2">...</span>
                      )}
                      <button
                        onClick={() => handleNextPage(totalPages)}
                        className="px-4 py-2 border rounded-full text-gray-700 border-gray-300 hover:bg-gray-100"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </>
              )}
              <button
                onClick={() => handleNextPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &gt;
              </button>
              <button
                onClick={() => handleNextPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &raquo;
              </button>
            </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default DemographicReport;
