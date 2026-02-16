import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const EmployeeResignations = () => {
  const [changeRequests, setChangeRequests] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Fetch employee resignation requests
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployeeResignation`
      );
      const data = response.data.data || [];
      setChangeRequests(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, perPage]);

  // Handle per page change
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  // Open modal and set selected request
  const handleView = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Accept/Reject handler
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedRequest) return;
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/updateEmployeeResignation/${selectedRequest._id}`,
        { status: newStatus }
      );
      toast.success(`Resignation ${newStatus === "Approved" ? "accepted" : "rejected"} successfully`);
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to update resignation status");
      console.error("Error updating resignation status:", error);
    }
  };

  return (
    <div className="md:p-6 lg:p-8 bg-white p-2 w-full">
      <Toaster />
      <h1 className="text-xl md:text-2xl font-bold mb-2">Employee Resignations</h1>

      <div className="w-full mb-4 pb-4 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between">
        <div className="flex text-sm text-gray-500 mb-3">
          <Link
            to="/"
            className="pr-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
          >
            Home
          </Link>
          <Link
            to="/app/employee"
            className="px-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
          >
            Employee
          </Link>
          <Link className="px-1 flex justify-center items-center h-4">
            Employee Resignations
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between border p-4 bg-gray-100 space-y-3 rounded-md">
        <div>
          <div className="flex space-x-2 justify-between items-center">
            <div className="flex border-2 border-gray-300 rounded-full bg-white items-center pr-2 hover:border-blue-500">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-1 pr-1.5 max-xs:w-[5rem] rounded-full outline-none text-sm"
              />
              <IoSearch
                size={25}
                className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 text-gray-500"
              />
            </div>
            <div className="relative">
              <label className="mr-2 text-[1rem] text-sm">Per Page</label>
              <select
                onChange={handlePerPageChange}
                value={perPage}
                className="border-2 ml-1.5 sm:py-1 border-300 rounded-full py-1 px-2 text-sm outline-none focus:border-blue-500 cursor-pointer text-[1.1rem]"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="max-xs:text-sm sm:text-sm">
                <th className="px-2 text-left font-medium whitespace-nowrap">SNo</th>
                <th className="px-2 text-left font-medium whitespace-nowrap">Employee Name</th>
                <th className="px-2 text-left font-medium whitespace-nowrap">Resignation Date</th>
                <th className="px-2 text-left font-medium whitespace-nowrap">Reason</th>
                <th className="px-2 text-left font-medium whitespace-nowrap">Resignation Letter</th>
                <th className="px-2 text-left font-medium whitespace-nowrap">Status</th>
                <th className="px-2 text-left font-medium whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {changeRequests.length > 0 ? (
                changeRequests
                  .filter((request) =>
                    request.employeeId?.firstName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((request, index) => (
                    <tr key={request._id} className="bg-white border-b">
                      <td className="px-2 py-2">{index + 1}</td>
                      <td className="px-2 py-2">
                        {request.employeeId.firstName} {request.employeeId.lastName}
                      </td>
                      <td className="px-2 py-2">
                        {new Date(request.resignationDate).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-2">{request.reason}</td>
                      <td className="px-2 py-2">
                        {request.image ? (
                          <a
                            href={request.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View Resignation Letter
                          </a>
                        ) : (
                          <span className="text-gray-500">No Document</span>
                        )}
                      </td>
                      <td className="px-2 py-2">
                        <span
                          className={
                            request.status === "Approved"
                              ? "text-green-600"
                              : request.status === "Rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleView(request)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No employee resignation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal code */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Employee Details</h2>
            <div>
              {selectedRequest.employeeId.photograph && (
                <img
                  src={selectedRequest.employeeId.photograph}
                  alt={selectedRequest.employeeId.firstName}
                  className="w-24 h-24 mb-4 rounded-full object-cover"
                />
              )}
              <p>
                <b>Name:</b> {selectedRequest.employeeId.firstName}{" "}
                {selectedRequest.employeeId.lastName}
              </p>
              <p>
                <b>Email:</b> {selectedRequest.employeeId.email}
              </p>
              <p>
                <b>Resignation Reason:</b> {selectedRequest.reason}
              </p>
              <p>
                <b>Resignation Date:</b>{" "}
                {new Date(selectedRequest.resignationDate).toLocaleDateString()}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    selectedRequest.status === "Approved"
                      ? "text-green-600"
                      : selectedRequest.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {selectedRequest.status}
                </span>
              </p>
              <p>
                <b>Resignation Letter:</b>{" "}
                {selectedRequest.image ? (
                  <a
                    href={selectedRequest.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                ) : (
                  <span className="text-gray-500">No Document</span>
                )}
              </p>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={() =>
                  navigate(`/employee/edit/${selectedRequest.employeeId._id}`)
                }
              >
                Edit
              </button>
              {selectedRequest.status === "Pending" && (
                <>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                    onClick={() => handleUpdateStatus("Approved")}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                    onClick={() => handleUpdateStatus("Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeResignations;
