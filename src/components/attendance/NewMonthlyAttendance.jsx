import React, { useEffect, useState } from "react";
import axios from "axios";
import ExcelExport from "./ExcelExport";
import { Link } from "react-router-dom";

const NewMonthlyAttendance = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
  });
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllToggled, setShowAllToggled] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);

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
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const { employeeId, month } = formData;

      if (!employeeId || !month) {
        return;
      }

      setLoading(true);
      setSearchPerformed(true);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
      );

      const allAttendance = response.data.response;

      // Split month and year from the input
      const [selectedYear, selectedMonth] = month.split("-").map(Number);

      // Filter attendance by employeeId, month, and year
      const filteredAttendance = allAttendance?.filter((attendance) => {
        const [day, month, year] = attendance.date.split("-").map(Number);
        const attendanceDate = new Date(year, month - 1, day);
        const isSameEmployee = attendance.employeeName?._id === employeeId;
        const isSameMonthYear =
          attendanceDate.getMonth() + 1 === selectedMonth &&
          attendanceDate.getFullYear() === selectedYear;

        return isSameEmployee && isSameMonthYear;
      });

      if (filteredAttendance.length === 0) {
        setAttendanceData([]);
        setTotalPages(1);
      } else {
        const extra = filteredAttendance.length % perPage > 0 ? 1 : 0;
        setTotalPages(Math.floor(filteredAttendance.length / perPage + extra));
        setAttendanceData(filteredAttendance);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setLoading(false);
    }
  };

  const fetchAllAttendance = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
      );

      const allAttendance = response.data?.response?.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setAttendanceData(allAttendance);

      const extra = response.data.response.length % perPage > 0 ? 1 : 0;
      setTotalPages(
        Math.floor(response.data.response.length / perPage + extra)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all attendance:", error);
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAttendance();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmployeeId = e.target.value;
    setFormData({ ...formData, employeeId: selectedEmployeeId });
  };

  const handleExportAll = async () => {
    if (showAllToggled) {
      setAttendanceData([]);
      setShowAllToggled(false);
    } else {
      await fetchAllAttendance();
      setShowAllToggled(true);
    }
  };

  // const handlePerPageChange = (e) => {
  //   setPerPage(e.target.value);
  //   const extra = attendanceData.length % e.target.value > 0 ? 1 : 0;
  //   setTotalPages(Math.floor(attendanceData.length / e.target.value + extra));
  //   setCurrentPage(1);
  // };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="md:p-6 lg:p-8 bg-white p-4 w-full">
      <h1 className="text-xl md:text-2xl font-bold">Monthly Attendance</h1>
      <div className="flex justify-between items-center">
        {/* Breadcrumbs */}
        <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
          <Link to="/" className="cursor-pointer hover:text-slate-800">
            Home
          </Link>
          <span>|</span>
          <Link to="/app/attendance" className="cursor-pointer hover:text-slate-800">
            Attendance
          </Link>
          <span>|</span>
          <span className="cursor-default text-gray-500 hover:text-slate-800">
            Monthly Attendance
          </span>
        </div>
        {/* Export and Show All Buttons */}
        <div className="flex justify-end space-x-4">
          <ExcelExport
            data={attendanceData}
            classes="border-black border py-1.5 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm flex items-center justify-end"
            filename="Attendance.xlsx"
          />
          <button
            type="button"
            onClick={handleExportAll}
            disabled={loading}
            className={`border-black border py-1.5 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-end gap-2 text-sm ${
              showAllToggled ? "bg-blue-600 hover:bg-blue-700" : ""
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading..." : showAllToggled ? "Hide All" : "Show All"}
          </button>
        </div>
      </div>

      <hr className="my-4 border-t-2 border-gray-300" />

      <div className="bg-gray-100 px-10 py-5 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-gray-100 rounded-lg p-4 flex flex-col items-center mb-4"
        >
          <div className="flex flex-col items-center mb-4 w-3/4">
            {" "}
            <label
              htmlFor="employeeId"
              className="w-full text-gray-700 font-medium text-center"
            >
              Employee Name:
            </label>
            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleEmployeeSelect}
              className="block w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center mb-4 w-3/4">
            {" "}
            <label
              htmlFor="month"
              className="w-full text-gray-700 font-medium text-center"
            >
              Month & Year:
            </label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
            />
          </div>

          <div className="flex items-center justify-center w-3/4 mb-4">
            {" "}
            <button
              type="submit"
              className={`w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 ${
                loading ? "opacity-50" : ""
              }`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <span className="text-blue-600">Loading...</span>
          </div>
        )}

        {!loading && searchPerformed && attendanceData.length === 0 && (
          <div className="flex justify-center items-center mt-4">
            <span className="text-gray-600">No records found</span>
          </div>
        )}

        {attendanceData.length > 0 && !loading && (
          <>
            <div className="w-full bg-gray-100 p-4 rounded-lg">
              <div className="relative flex justify-end">
                <label className="mr-2 text-[1rem] text-sm">Per Page</label>
                <select
                  onChange={handlePerPageChange}
                  value={perPage}
                  className="border-2 ml-1.5 sm:py-1 border-300 rounded-full py-1  px-2 text-sm outline-none focus:border-blue-500 cursor-pointer text-[1.1rem]"
                >
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="max-xs:text-sm sm:text-sm">
                      <th className="pl-3 text-left font-medium whitespace-nowrap w-1/6">
                        Date
                      </th>
                      <th className="pl-3 text-left font-medium whitespace-nowrap w-1/6">
                        Name
                      </th>
                      <th className="pl-3 text-left font-medium whitespace-nowrap w-1/6">
                        In Time
                      </th>
                      <th className="pl-3 text-left font-medium whitespace-nowrap w-1/6">
                        Out Time
                      </th>
                      <th className="pl-3 text-left font-medium whitespace-nowrap w-1/6 ">
                        Present/Absent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bg-transparent py-0" colSpan="100%">
                        <hr className="w-full bg-gray-300 h-0.5 my-0" />
                      </td>
                    </tr>
                    {attendanceData
                      .slice((currentPage - 1) * perPage, currentPage * perPage)
                      .map((attendance) => (
                        <tr
                          key={attendance._id}
                          className="text-gray-600 text-left w-full rounded-xl border border-black sm:text-sm"
                        >
                          <td className="py-3 pl-3 whitespace-nowrap bg-white border-y-2 border-l-2 rounded-l-md w-1/6">
                            {attendance?.date
                              ? formatDate(attendance.date)
                              : "N/A"}
                          </td>
                          <td className="pl-3 whitespace-nowrap bg-white border-y-2 w-1/6">
                            {attendance.employeeName
                              ? `${attendance.employeeName.firstName} ${attendance.employeeName.lastName}`
                              : "Unknown"}
                          </td>
                          <td className="pl-3 whitespace-nowrap bg-white border-y-2 w-1/6">
                            {attendance?.inTime || "N/A"}
                          </td>
                          <td className="pl-3 whitespace-nowrap bg-white border-y-2 w-1/6">
                            {attendance?.outTime || "N/A"}
                          </td>
                          <td className="pl-3 whitespace-nowrap bg-white border-y-2 border-r-2 rounded text-center r-md w-1/6">
                            {attendance.attendanceStatus === "Present" ||
                            attendance.attendanceStatus === "P"
                              ? "Present"
                              : "Absent"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default NewMonthlyAttendance;
