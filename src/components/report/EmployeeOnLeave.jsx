import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const EmployeeOnLeave = () => {
  const [department, setDepartment] = useState([]);
  const [leaveType, setLeaveType] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState({});
  const [allLeave, setAllLeave] = useState([]);
  const [filteredLeave, setFilteredLeave] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    filterLeaves(data);
    setShowDetails(true);
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
      const departmentResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
      );
      setDepartment(departmentResponse.data.response);

      const leaveResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllLeaveType`
      );
      setLeaveType(leaveResponse.data.data);

      const allLeaveResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllLeaveApplications`
      );
      setAllLeave(allLeaveResponse.data.data);
    };
    getData();
  }, []);

  const filterLeaves = ({ department, fromDate, leave, toDate }) => {
    const filtered = allLeave.filter((leaveApplication) => {
      return (
        (department ? leaveApplication.department === department : true) &&
        (fromDate ? leaveApplication.approveStartDate === fromDate : true) &&
        (leave ? leaveApplication.leaveType === leave : true) &&
        (toDate ? leaveApplication.applicationEndDate === toDate : true)
      );
    });
    setFilteredLeave(filtered);
  };

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const employeeIds = filteredLeave.map((leave) => leave.employeeName);
        const uniqueEmployeeIds = [...new Set(employeeIds)];

        const employeeDataPromises = uniqueEmployeeIds.map((id) =>
          axios.get(
            `${
              import.meta.env.VITE_APP_BASE_URL
            }/employee/getEmployeeById/${id}`
          )
        );

        const employeeDataResponses = await Promise.all(employeeDataPromises);
        const employeeDataMap = employeeDataResponses.reduce(
          (acc, response) => {
            const empData = response.data.data;
            acc[empData._id] = empData;
            return acc;
          },
          {}
        );

        setEmployeeData(employeeDataMap);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    getEmployeeData();
  }, [filteredLeave]);

  return (
    <>
      <div className="md:p-6 lg:p-8 bg-white p-2 w-full">
        <div>
          <Toaster />
        </div>
        <h1 className=" text-xl md:text-2xl font-bold mb-2">
          Employee On Leave
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
              Employee On Leave
            </Link>
          </div>
        </div>

        <hr className="my-4 mt-6 border-t-2 border-gray-300" />

        <div className="bg-gray-100 px-10 py-5 shadow-md">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fromDate"
                className="block text-sm font-medium mb-2"
              >
                From Date
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="fromDate"
                name="fromDate"
                placeholder="date"
                className="p-2 border w-full form-input rounded mb-5"
                value={data.fromDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="toDate"
                className="block text-sm font-medium mb-2"
              >
                To Date
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="toDate"
                name="toDate"
                placeholder="date"
                className="p-2 border w-full form-input rounded mb-5"
                value={data.toDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium mb-2"
              >
                Department
                <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                id="department"
                className="w-full border px-4 py-2 mb-5"
                value={data.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                {department.map((dept) => (
                  <option
                    value={dept.department ? dept.department.title : ""}
                    key={dept._id}
                  >
                    {dept.department ? dept.department.title : "Unknown"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="leave" className="block text-sm font-medium mb-2">
                Leave Type
                <span className="text-red-500">*</span>
              </label>
              <select
                name="leave"
                id="leave"
                className="w-full border px-4 py-2 mb-5"
                value={data.leave}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Leave Type</option>
                {leaveType.map((type) => (
                  <option value={type.leaveType} key={type._id}>
                    {type.leaveType}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="rounded-full bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2  shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {showDetails && (
        <div className="p-4 md:p-6 lg:p-8">
          <hr className="my-4" />
          <div className="border rounded px-4 py-4 bg-gray-100">
            <div className="flex justify-between items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    //  value={searchTerm}
                    //  onChange={handleSearchChange}
                    className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
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
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm mr-2">Per Page</label>
                <select
                  //  onChange={handlePerPageChange}
                  //  value={perPage}
                  className="border rounded-full py-1 px-2 text-sm"
                >
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-100">
                  <thead>
                    <tr>
                      <th className="p-4 text-sm font-medium text-black w-[8%]">
                        SL
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[14%]">
                        EMPLOYEE ID
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[10%]">
                        NAME
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[14%]">
                        DEPARTMENT
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[14%]">
                        LEAVE TYPE
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[14%]">
                        START DATE
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[14%]">
                        END DATE
                      </th>
                      <th className="p-4 text-sm font-medium text-black w-[14%]">
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="bg-transparent py-0" colSpan="100%">
                      <hr className="w-full bg-gray-300 h-0.5 my-0" />
                    </td>
                  </tr>
                    {filteredLeave.map((data, index) => (
                      <tr
                        key={data._id}
                        className="bg-white shadow-sm hover:bg-gray-50"
                      >
                        <td className="text-sm text-gray-500 p-2">
                          {currentPage === 1
                            ? index + 1
                            : (currentPage - 1) * perPage + index + 1}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {employeeData[data.employeeName]
                            ? employeeData[data.employeeName].empId
                            : "Loading..."}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {data.firstName}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {data.department}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {data.leaveType}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {data.approveStartDate}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {data.applicationEndDate}
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {data.status}
                        </td>
                        {/* 
            <td className="flex justify-around items-center p-2">
              <button
                onClick={() => handleEdit(data._id)}
                className="text-gray-500 p-1"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => handleView(data._id)}
                className="text-gray-500 p-1"
              >
                <FaEye size={15} />
              </button>
              <button
                onClick={() => handleDelete(data._id)}
                className="text-gray-500 p-1"
              >
                <MdDelete size={18} />
              </button>
            </td>
            */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              <button
                //  onClick={() => handlePreviousPage(1)}
                //  disabled={currentPage === 1}
                className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &laquo;
              </button>
              <button
                //  onClick={() => handlePreviousPage(currentPage - 1)}
                //  disabled={currentPage === 1}
                className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &lt;
              </button>
              {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
             <button
               key={page}
              //  onClick={() => handleNextPage(page)}
               className={`px-4 py-2 border rounded-full ${currentPage === page
                 ? "text-blue-500 bg-white border-blue-500"
                 : "text-gray-700 border-gray-300 hover:bg-gray-100"
                 }`}
             >
               {page}
             </button>

           ))} */}
              <button
                //  onClick={() => handleNextPage(currentPage + 1)}
                //  disabled={currentPage === totalPages}
                className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full "
              >
                &gt;
              </button>
              <button
                //  onClick={() => handleNextPage(totalPages)}
                //  disabled={currentPage === totalPages}
                className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full "
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeOnLeave;

// {filteredLeave.map((leave, index) => (
//   <tr key={leave._id}>
//     <td className="px-4 py-2 border border-slate-300">{index + 1}</td>
//     <td className="px-4 py-2 text-center border border-slate-300">
//       {employeeData[leave.employeeName]
//         ? employeeData[leave.employeeName].empId
//         : "Loading..."}
//     </td>
//     <td className="px-4 py-2 border border-slate-300">
//       {employeeData[leave.employeeName]
//         ? employeeData[leave.employeeName].fullName
//         : "Loading..."}
//     </td>
//     <td className="px-4 py-2 border border-slate-300">{leave.department}</td>
//     <td className="px-4 py-2 border border-slate-300">{leave.leaveType}</td>
//     <td className="px-4 py-2 border border-slate-300">{leave.approveStartDate}</td>
//     <td className="px-4 py-2 border border-slate-300">{leave.applicationEndDate}</td>
//     <td className="px-4 py-2 border border-slate-300">
//       {leave.status}
//     </td>
//   </tr>
// ))}
