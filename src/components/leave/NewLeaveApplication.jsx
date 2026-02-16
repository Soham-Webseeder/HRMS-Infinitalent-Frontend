import { useState, useEffect } from "react";
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
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import { LeaveUpdate } from "./LeaveUpdate";
import { useNavigate } from "react-router-dom";

const NewLeaveApplication = () => {
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
  const navigate = useNavigate();
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllLeaveType`
      );
      setLeaveTypeOptions(response.data.data); // Assuming response data contains leave type objects
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const handleEditClick = (id) => {
    setUpdateId(id); // Set the ID of the leave application to edit
    setShowUpdateModal(true); // Open the modal
  };

  const approvedBy = user.userAllData;
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
  
      // Enrich leave applications with admin names only (since employeeName already exists)
      const enrichedApplications = leaveApplicationsData.map((application) => {
        return {
          ...application,
          approvedByName: adminMap[application.approvedBy] || "Unknown",  // Map admin name
        };
      });
  
      // Update state with enriched applications
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
  // const updateField = async (id, field, value, max) => {
  //   if (value > max) {
  //     toast.error(`${field} cannot exceed ${max} days!`);
  //     return;
  //   }

  //   try {
  //     await axios.patch(
  //       `${
  //         import.meta.env.VITE_APP_BASE_URL
  //       }/leave/updateLeaveApplication/${id}`,
  //       { [field]: value }
  //     );
  //     toast.success(`${field} Updated Successfully!`);
  //     fetchLeaveApplications(); // Refresh data
  //   } catch (error) {
  //     console.error(`Error updating ${field}:`, error);
  //   }
  // };

  const updateField = async (id, field, value, max) => {
    if (field === "paidLeaveDays" && (value > max || value < 0)) {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  console.log(filteredApplication, "filteredApplication");

  return (
    <div className="w-full flex justify-center  p-4  lg:p-8  ">
      <div className="  top-0">
        <Toaster />
      </div>

      <div className="w-full max-w-[170vh] mb-4 overflow-hidden rounded-lg">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-black mb-2">Leave</h1>
        {/* Breadcrumbs and Add New Button */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex text-sm w-fit text-gray-500 gap-1">
            <span className="cursor-pointer hover:text-slate-800 transition-colors" onClick={() => navigate("/")}>
              Home
            </span>
            <span>|</span>
            <span
              className="cursor-pointer hover:text-slate-800 transition-colors"
              onClick={() => navigate("/app/attendance")}
            >
              Leave
            </span>
            <span>|</span>
            <span className="cursor-default text-gray-500 hover:text-slate-800">
              Management Employee Leave
            </span>
          </div>
          <button
            className="border-blue-600 border px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2"
            onClick={() => dispatch(setShowLeaveModal(true))}
          >
            Add New
          </button>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="flex  flex-col  justify-between border p-4 bg-gray-100 space-y-3  rounded-md">
          {/* <div className=" py-2 ">
            <div className="flex space-x-2 justify-between items-center">
              <div className="flex  border-2 border-gray-300 rounded-full bg-white items-center pr-2 hover:border-blue-500">
                <input
                  type="text"
                  placeholder="Search By Name"
                  className="px-4 max-xs:w-[9rem]  py-1 sm:py-1.5 rounded-full outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />


                <IoSearch size={30} className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 text-gray-500" />
              </div>



              <div className="relative">
                <label className="mr-2 text-[1.1rem]">Per Page</label>
                <select
                  onChange={handlePerPageChange}
                  value={perPage}
                  className="border-2 border-gray-300 rounded-full py-1 font-semibold px-2 text-sm outline-none focus:border-blue-500 cursor-pointer  sm:py-1.5 "
                >
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div> */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-x-4 sm:space-y-0 ">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal  pr-10"
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
          </div>
          <div className="w-full mt-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                  <thead className="bg-gray-100">
                    <tr className="text-gray-600 text-left sm:text-lg border-b-2 ">
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Employee Name
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Leave Start Date
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Leave End Date
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Leave Type
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Leave Duration
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Paid Leave
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Paid Leave Days
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Status
                      </th>
                      <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Approved By
                      </th>
                      {/* <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplication.map((application, idx) => (
                      <tr
                        key={idx}
                        className="text-gray-600 text-left sm:text-lg"
                      >
                        <td className="py-2 px-4 whitespace-nowrap">
                          {application.employeeName}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          {application?.applicationStartDate
                            ? formatDate(application.applicationStartDate)
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          {application?.applicationEndDate
                            ? formatDate(application.applicationEndDate)
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          <select
                            value={application.leaveType?._id || ""} // use leaveType._id for the selected value
                            onChange={(e) =>
                              updateField(
                                application._id,
                                "leaveType",
                                e.target.value
                              )
                            } // update leaveType on change
                            className="outline-none px-1 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-md border"
                          >
                            <option value="">Select Leave Type</option>
                            {leaveTypeOptions.map((type) => (
                              <option key={type._id} value={type._id}>
                                {type.leaveType}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          <select
                            value={application.leaveDuration}
                            onChange={(e) =>
                              updateField(
                                application._id,
                                "leaveDuration",
                                e.target.value
                              )
                            }
                            className="outline-none px-1 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-md border"
                          >
                            {leaveDurationOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          <select
                            value={application.paidLeave ? "Yes" : "No"}
                            onChange={(e) => {
                              const isPaidLeave = e.target.value === "Yes";
                              updateField(
                                application._id,
                                "paidLeave",
                                isPaidLeave
                              );
                              if (!isPaidLeave) {
                                updateField(
                                  application._id,
                                  "paidLeaveDays",
                                  0
                                );
                              }
                            }}
                            className="outline-none px-1 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-md border"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td className="py-2 px-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={application.paidLeaveDays || 0}
                            onChange={(e) => {
                              if (application.paidLeave) {
                                const newValue = parseFloat(e.target.value);
                                if (
                                  !isNaN(newValue) &&
                                  newValue % 0.5 === 0 &&
                                  newValue >= 0 &&
                                  newValue <= 2
                                ) {
                                  updateField(
                                    application._id,
                                    "paidLeaveDays",
                                    newValue,
                                    calculateMaxDays(
                                      application.applicationStartDate,
                                      application.applicationEndDate
                                    )
                                  );
                                }
                              }
                            }}
                            disabled={!application.paidLeave}
                            className={`outline-none px-1 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-md border ${
                              !application.paidLeave
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : ""
                            }`}
                            max={calculateMaxDays(
                              application.applicationStartDate,
                              application.applicationEndDate
                            )}
                            step="0.5" // Allows values in increments of 0.5
                          />
                        </td>

                        <td className="text-sm text-gray-500 p-2">
                          <select
                            value={application.status}
                            onChange={(e) =>
                              updateField(
                                application._id,
                                "status",
                                e.target.value
                              )
                            }
                            className="outline-none px-1 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-md border"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="text-sm text-gray-500 p-2">
                          {approvedBy?.firstName} {approvedBy?.lastName}
                        </td>
                        {/* <td className="py-2 px-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleEditClick(application._id)}
                            className="text-gray-500 hover:text-gray-900"
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={() =>
                              deleteLeaveApplication(application._id)
                            }
                            className="text-gray-500 hover:text-gray-900"
                          >
                            <MdDelete size={20} />
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
      </div>

      {showUpdateModal && (
        <LeaveUpdate
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={() => setShowUpdateModal(false)}
          updateId={updateId}
        />
      )}
      {LeaveModal && <LeaveApplicationModal />}
    </div>
  );
};

export default NewLeaveApplication;
