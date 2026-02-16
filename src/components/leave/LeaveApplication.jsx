import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LeaveApplicationModal from "./LeaveApplicationModal";
import axios from "axios";
import { setShowLeaveModal } from "../../redux/slices/SidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";
import dayjs from "dayjs";
import { LeaveUpdate } from "./LeaveUpdate";

const LeaveApplication = () => {
  const user = useSelector((state) => state.user);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusOptions] = useState(["Approved", "Pending", "Declined"]);
  const [leaveDurationOptions] = useState(["Full Day", "Half Day"]);
  const dispatch = useDispatch();
  const { LeaveModal } = useSelector((state) => state.sidebar);

  const approvedBy = user.userAllData
  // Fetch admins from backend
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllAdmins`
      );
      setAdmins(response.data.data); // Assuming response.data.data contains the list of admins
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };
  function calculateMaxDays(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const result = end.diff(start, "day");
    console.log(result, "cajfkjasdkdfjk");
    return end.diff(start, "day");
  }

  // Fetch employee name by ID from backend
  const fetchEmployeeNameById = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${id}`
      );
      const { firstName, lastName } = response.data.data;
      return `${firstName} ${lastName}`;
    } catch (error) {
      console.error("Error fetching employee name:", error);
      return "Unknown";
    }
  };

  // Fetch leave applications from backend based on current page and per page settings
  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/getAllLeaveApplications?page=${currentPage}&limit=${perPage}&admin=${selectedAdmin}&status=${selectedStatus}`
      );
      const leaveApplicationsData = response.data.data;

      // Create a dictionary to map admin IDs to names
      const adminMap = admins.reduce((map, admin) => {
        map[admin._id] = admin.name;
        return map;
      }, {});

      // Enrich leave applications with employee names and admin names
      const enrichedApplications = await Promise.all(
        leaveApplicationsData.map(async (application) => {
          const employeeName = await fetchEmployeeNameById(
            application.employeeName
          );
          return {
            ...application,
            employeeName,
            approvedByName: adminMap[application.approvedBy] || "Unknown",
          };
        })
      );

      setLeaveApplications(enrichedApplications);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    }
  };

  // Delete a leave application by ID
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

  // Handle change in items per page setting
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10)); // Convert value to integer
    setCurrentPage(1); // Reset to first page when changing per page
  };

  // Filter leave applications based on search term
  const filteredApplication = leaveApplications.filter((leaveApplication) => {
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
  });

  // Update leave application field
  const updateField = async (id, field, value, max) => {
    if (value > max) {
      toast.error(`${field} cannot exceed ${max} days!`);
      return;
    }

    try {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/updateLeaveApplication/${id}`,
        { [field]: value }
      );
      toast.success(`${field} Updated Successfully!`);
      fetchLeaveApplications(); // Refresh data
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  // Fetch leave applications initially when component mounts or dependencies change
  useEffect(() => {
    fetchLeaveApplications();
  }, [
    currentPage,
    perPage,
    showUpdateModal,
    LeaveModal,
    selectedAdmin,
    selectedStatus,
  ]);

  // Fetch admins when component mounts
  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className=" w-full flex justify-center ">
 <div className=" items-center justify-center max-w-4xl   flex-col">
      <Toaster />
      <div className="flex flex-col  p-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-4 w-full">Leave</h1>
        <div className="flex flex-row justify-between items-center bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1"> </h1>

          <button
            className="border-black border px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 sm:mr-4 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
            onClick={() => dispatch(setShowLeaveModal(true))}
          >
            {/* <AiOutlinePlusCircle size={20} className="font-bold text-lg" /> */}
             Add
            New 
          </button>
        </div>
        <div className="md:p-4 sm:p-2 p-1 flex flex-col justify-between">
          <div className="border rounded px-2 py-2 sm:px-4 sm:py-4">
            <div className="flex flex-col md:flex-row md:space-x-2 justify-between">
              <div className="relative mb-2 md:mb-0">
                <label className="mr-2 text-sm">Show:</label>
                <select
                  onChange={handlePerPageChange}
                  value={perPage}
                  className="border rounded-full py-1 px-2 text-sm"
                >
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-1">
                <div className="flex flex-wrap items-center">
                  <span className="self-center font-bold mr-2">Search:</span>
                  <input
                    type="text"
                    placeholder="Search By Employee Name..."
                    className="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="flex flex-col md:flex-row md:space-x-2 mt-2">
                <div className="relative mb-2 md:mb-0">
                  <label className="mr-2 text-sm font-medium text-gray-500">
                    Approved By:
                  </label>
                  <select
                    onChange={(e) => setSelectedAdmin(e.target.value)}
                    value={selectedAdmin}
                    className="border rounded-full py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Admins</option>
                    {admins.map((admin) => (
                      <option key={admin._id} value={admin._id}>
                        {admin.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative mb-2 md:mb-0">
                  <label className="mr-2 text-sm font-medium text-gray-500">
                    Status:
                  </label>
                  <select
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    value={selectedStatus}
                    className="border rounded-full py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Statuses</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Leave Start Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Leave End Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Leave Duration
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Paid Leave
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Paid Leave Days
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Approved By
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplication.map((application) => (
                  <tr key={application._id}>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.employeeName}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.applicationStartDate}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.applicationEndDate}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {application.leaveType?.leaveType}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      <select
                        value={application.leaveDuration}
                        onChange={(e) =>
                          updateField(
                            application._id,
                            "leaveDuration",
                            e.target.value
                          )
                        }
                        className="border rounded-full py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {leaveDurationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      <select
                        value={application.paidLeave ? "Yes" : "No"}
                        onChange={(e) =>
                          updateField(
                            application._id,
                            "paidLeave",
                            e.target.value === "Yes"
                          )
                        }
                        className="border rounded-full py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={application.paidLeaveDays || ""}
                        onChange={(e) =>
                          updateField(
                            application._id,
                            "paidLeaveDays",
                            e.target.value,
                            calculateMaxDays(
                              application.applicationStartDate,
                              application.applicationEndDate
                            )
                          )
                        }
                        className="border rounded-full py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        max={calculateMaxDays(
                          application.applicationStartDate,
                          application.applicationEndDate
                        )}
                      />
                    </td>

                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          updateField(application._id, "status", e.target.value)
                        }
                        className="border rounded-full py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {approvedBy.firstName} {approvedBy.lastName}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setUpdateId(application._id);
                          setShowUpdateModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteLeaveApplication(application._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full justify-end mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 ${
                  currentPage === page
                    ? "bg-blue-600 rounded-full text-white"
                    : "border border-gray-300 rounded-full hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
            >
              Next
            </button>
          </div>
        </div>
        {showUpdateModal && (
          <LeaveUpdate
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            updateId={updateId}
          />
        )}
        {LeaveModal && <LeaveApplicationModal />}
      </div>
    </div>
    </div>

   
  );
};

export default LeaveApplication;
