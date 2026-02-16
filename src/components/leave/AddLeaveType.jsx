import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const AddLeaveType = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [numberOfLeaveDays, setNumberOfLeaveDays] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [editLeaveTypeId, setEditLeaveTypeId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [duration, setDuration] = useState("Full Day");
  const [reason, setReason] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchLeaveTypes();
  }, [currentPage, perPage]);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/getAllLeaveType?page=${currentPage}&limit=${perPage}`
      );
      setLeaveTypes(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    if (showEditModal) {
      setShowEditModal(false);
      handleReset();
    }
  };

  const toggleEditModal = (leaveType) => {
    if (leaveType) {
      setEditLeaveTypeId(leaveType._id);
      setLeaveType(leaveType.leaveType);
      setNumberOfLeaveDays(leaveType.numberOfLeaveDays);
    }
    setShowEditModal(!showEditModal);
    setShowModal(false); 
  };

  const handleReset = () => {
    setLeaveType("");
    setNumberOfLeaveDays("");
    setEditLeaveTypeId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLeaveType = {
      leaveType,
      fromDate,
      toDate,
      duration,
      reason,
      employeeCode,
      employeeName,
      phoneNumber,
    };

    console.log(newLeaveType, "oiiohih");

    try {
      if (editLeaveTypeId) {
        await axios.patch(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/leave/updateLeaveType/${editLeaveTypeId}`,
          newLeaveType
        );
        toast.success("LeaveType Successfully Updated!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/createLeaveType`,
          newLeaveType
        );
        toast.success("LeaveType Successfully Created!");
      }
      fetchLeaveTypes();
      handleReset();
      setShowModal(false);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error submitting leave type:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave type ?"
    );
    try {
      if (confirmDelete) {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/deleteLeaveType/${id}`
        );
        fetchLeaveTypes();
        toast.success("LeaveType Successfully deleted!");
      }
    } catch (error) {
      console.error("Error deleting leave type:", error);
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
  
  const filterdLeaveType = leaveTypes.filter((leave) => {
    if (leave && leave.leaveType && typeof leave.leaveType === "string") {
      return leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className=" md:p-6 lg:p-8 bg-white p-2 w-full">
      <div>
        <Toaster />
      </div>

      <h1 className="text-xl md:text-2xl font-bold">Leave Type</h1>
      <div className="flex justify-between items-center mt-1 mb-2">
  {/* Breadcrumbs */}
  <div className="flex text-sm w-fit text-gray-500 gap-1">
    <Link to="/" className="cursor-pointer hover:text-slate-800">
      Home
    </Link>
    <span>|</span>
    <Link to="/app/attendance" className="cursor-pointer hover:text-slate-800">
      Leave
    </Link>
    <span>|</span>
    <span className="cursor-default text-gray-500 hover:text-slate-800">
      Leave Type
    </span>
  </div>
  {/* Add New Leave Type Button */}
  <button
    onClick={toggleModal}
    className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 text-sm md:text-base"
    style={{ minWidth: "150px" }}
  >
    Add New Leave Type
  </button>
</div>
<hr className="mb-3 border-t-2 border-gray-300" />

      <div className="border rounded px-4 py-4 bg-gray-100">
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

        <div className="overflow-x-auto w-full">
          {filterdLeaveType.length > 0 ? (
            <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
              <thead>
                <tr className="text-sm font-medium text-black">
                  <th
                    scope="col"
                    className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                  >
                    SNo
                  </th>
                  <th
                    scope="col"
                    className="text-center font-medium text-black pr-2 py-3 border-b-2 border-gray-300"
                  >
                    Type Name
                  </th>
                  <th
                    scope="col"
                    className="text-left font-medium text-black py-3 border-b-2 border-gray-300 flex justify-end px-8"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterdLeaveType.map((leaveType, index) => (
                  <tr key={leaveType._id} className="text-gray-600 text-left">
                    <td className="px-2 py-1">{index + 1}</td>
                    <td className="px-2 py-1 text-center">
                      {leaveType.leaveType}
                    </td>
                    <td className="px-2 py-3 flex justify-end items-center">
                      <button
                        onClick={() => toggleEditModal(leaveType)}
                        className="text-gray-500 hover:text-gray-900 mr-8"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(leaveType._id)}
                        className="text-gray-500 hover:text-gray-900 mr-4"
                      >
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-4 text-sm text-gray-500">
              No leave types available. Please add a leave type.
            </div>
          )}
        </div>
        {filterdLeaveType.length > 0 && (
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
        )}
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-lg sm:max-w-3xl">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Add Leave Type
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="px-4 py-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="leaveType"
                    className="block text-md font-medium text-gray-700"
                  >
                    Leave Type
                  </label>
                  <input
                    type="text"
                    id="leaveType"
                    name="leaveType"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm border border-gray-300 rounded-md"
                    required
                  />
                </div>
                {/* <div className="flex flex-col gap-3">
                  <label
                    htmlFor="numberOfLeaveDays"
                    className="block text-md font-medium text-gray-700"
                  >
                   
                    <option value="Sick">Sick Leave</option>
                    <option value="Casual">Casual Leave</option>
                    <option value="Annual">Annual Leave</option>
                  </select>

                </div>
                <div className="flex flex-row justify-between">
                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">From Date</label>
                    <input
                      type="date"
                      className="block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2">To Date</label>
                    <input
                      type="date"
                      className="block w-full bg-white border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
                <div >
                  <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
                  <div className="flex justify-between  ">
                    <button
                      type="button"
                      className={`w-1/3 py-2 ${duration === 'Full Day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-s-full border border-gray-300 rounded-l focus:outline-none`}
                      onClick={() => setDuration('Full Day')}
                    >
                      Full Day
                    </button>
                    <button
                      type="button"
                      className={`w-1/3 py-2 ${duration === 'Half Day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}  border-t border-b border-gray-300 focus:outline-none`}
                      onClick={() => setDuration('Half Day')}
                    >
                      Half Day
                    </button>
                    <button
                      type="button"
                      className={`w-1/3 py-2 ${duration === 'None' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}  rounded-e-full border border-gray-300  focus:outline-none`}
                      onClick={() => setDuration('None')}
                    >
                      None
                    </button>
                  </div>
                </div>
                <div className="mb-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Reason for Leave</label>
                  <input
                    type="number"
                    id="numberOfLeaveDays"
                    name="numberOfLeaveDays"
                    value={numberOfLeaveDays}
                    onChange={(e) => setNumberOfLeaveDays(e.target.value)}
                    className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm border border-gray-300 rounded-md"
                    required
                  />
                </div> */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-gray-500 p-2 rounded-md shadow-md text-white hover:bg-gray-700"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 p-2 rounded-md shadow-md text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-lg sm:max-w-3xl">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Edit Leave Type
                </h3>
                <button
                  onClick={toggleEditModal}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="px-4 py-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="leaveType"
                    className="block text-md font-medium text-gray-700"
                  >
                    Leave Type
                  </label>
                  <input
                    type="text"
                    id="leaveType"
                    name="leaveType"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm border border-gray-300 rounded-md"
                    required
                  />
                </div>
                {/* <div className="flex flex-col gap-3">
                  <label
                    htmlFor="numberOfLeaveDays"
                    className="block text-md font-medium text-gray-700"
                  >
                    Number of Leave Days
                  </label>
                  <input
                    type="number"
                    id="numberOfLeaveDays"
                    name="numberOfLeaveDays"
                    value={numberOfLeaveDays}
                    onChange={(e) => setNumberOfLeaveDays(e.target.value)}
                    className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm border border-gray-300 rounded-md"
                    required
                  />
                </div> */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="bg-gray-500 p-2 rounded-md shadow-md text-white hover:bg-gray-700"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 p-2 rounded-md shadow-md text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLeaveType;
