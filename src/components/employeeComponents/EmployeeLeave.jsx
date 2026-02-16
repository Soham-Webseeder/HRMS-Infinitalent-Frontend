import React, { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { setShowLeaveModal } from "../../redux/slices/SidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";

const EmployeeLeave = () => {
  const user = useSelector((state) => state.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveApplications, setLeaveApplications] = useState([]);
  const dispatch = useDispatch();
  const { LeaveModal } = useSelector((state) => state.sidebar);
  const userId = user.userAllData.employeeDetails;
  console.log(userId,"empI")

  const fetchEmployeeNameById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${userId}`
      );
      const { firstName, lastName } = response.data.data;
      return `${firstName} ${lastName}`;
    } catch (error) {
      console.error("Error fetching employee name:", error);
      return "Unknown";
    }
  };

  const fetchLeaveTypeById = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getLeaveTypeById/${id}`
      );
      return response.data.data.leaveType;
    } catch (error) {
      console.error("Error fetching leave type:", error);
      return "Unknown";
    }
  };
  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/getAllLeaveApplications?page=${currentPage}&limit=${perPage}`
      );
      const leaveApplicationsData = response.data.data;

      const enrichedApplications = await Promise.all(
        leaveApplicationsData.map(async (application) => {
          const employeeName = await fetchEmployeeNameById(
            application.employeeName
          );
          const leaveType = await fetchLeaveTypeById(application.leaveType);
          return {
            ...application,
            employeeName,
            leaveType,
          };
        })
      );

      setLeaveApplications(enrichedApplications);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    }
  };
  const fetchLeaveApplication = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/getLeaveApplicationsByEmployee/${userId}`
      );
      console.log(res.data.data,"Data")
      setLeaveApplications(res.data.data);
    } catch (error) {
      console.error("Error fetching present data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveApplication();
  }, [currentPage, perPage, showUpdateModal, LeaveModal]);

  const deleteLeaveApplication = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this Leave record?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/leave/deleteLeaveApplication/${id}`
        );
        toast.success("Leave Successfully Deleted!");
        setLeaveApplications(
          leaveApplications.filter((application) => application._id !== id)
        );
      } catch (error) {
        console.error("Error deleting leave application:", error);
      }
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10)); 
    setCurrentPage(1); 
  };

  const filteredApplication = leaveApplications.filter(
    (leaveApplication)=>{
      if (
        leaveApplication &&
        leaveApplication.employeeName &&
        typeof leaveApplication.employeeName === "string"
      ) {
        return leaveApplication.employeeName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
  
      return false;
   
    }
  )
  return (
    <div className="w-full sm:w-full flex justify-center mt-3 pt-1">
      <Toaster />
      <div className="flex flex-col w-[89%] px-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <h1 className="text-3xl font-bold p-1">Leave</h1>
        <div className="flex flex-row justify-between items-center py-1 bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1">
            Leave/Holiday
          </h1>
        </div>
        <div className="flex w-full justify-end md:pr-12 pr-0 mt-2">
          <button
            className="bg-blue-500 text-white flex gap-2 items-center text-center p-2 rounded-md"
            onClick={() => dispatch(setShowLeaveModal(true))}
          >
            <AiFillPlusCircle size={20} /> Add Application
          </button>
        </div>
        <div className="md:p-4 md:px-8 sm:p-1 p-1 flex items-center justify-center">
          <div className="overflow-x-auto w-full">
            <div className="flex space-x-2 justify-between">
              <div className="relative">
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
                <span className="self-center font-bold">entries</span>
              </div>
              <div className="flex flex-col items-end mb-2">
                <div className="flex">
                  <span className="self-center font-bold">Search:</span>
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
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Application Start Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Application End Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Approval Start Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Approval End Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Apply Day
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Approved Day
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveApplications.map((application, index) => (
                  <tr key={application._id}>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.employeeName}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.leaveType}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.applicationStartDate}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.applicationEndDate}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.approveStartDate}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.approvedEndDate}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.applyDay}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.approvedDay}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.status === "Approved" ? (
                        <button className="font-medium p-2 text-green-600 rounded-md">
                          {application.status}
                        </button>
                      ) : (
                        <button className="rounded-md font-medium p-2 text-red-600">
                          {application.status}
                        </button>
                      )}
                    </td>
                    <td className="border border-slate-300 whitespace-nowrap">
                      <div className="flex text-center">
                        <button className="text-green-600 w-[50%] border-r border-slate-300 h-full py-5 flex items-center justify-center">
                          <FaEdit
                            size={20}
                            onClick={() => {
                              setShowUpdateModal(!showUpdateModal);
                              setUpdateId(application._id);
                            }}
                          />
                        </button>
                        <button className="text-red-500 hover:text-red-900 w-[50%] h-full py-5 flex items-center justify-center">
                          <MdDelete
                            size={20}
                            onClick={() => {
                              deleteLeaveApplication(application._id);
                            }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4 space-x-2">
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
  );
};

export default EmployeeLeave;
