import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const EmployeeUpdate = () => {
  const [changeRequests, setChangeRequests] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(""); // For update status
  const [isEditing, setIsEditing] = useState(false); // For determining edit mode
  const IMG_URL = import.meta.env.VITE_APP_IMG_URL;
  const navigate = useNavigate();

  const getDisplayUrl = (path) => {
    if (!path) return null;
    // If it's already a full URL (like from Cloudinary or an external link), return as is
    if (path.startsWith("http")) return path;
    // Prepend your server URL to the local path stored in the DB
    return `${IMG_URL}/${path}`;
  };

  // Fetch employee change requests
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL
        }/employee/getAllEmployeeChangeRequest`,
        {
          params: {
            page: currentPage,
            limit: perPage,
            name: searchTerm,
          },
        }
      );
      setChangeRequests(response.data.data); // Make sure this is set correctly
      setTotalPages(response.data.pagination.totalPages);

      console.log(response.data.data, "Employee Change Requests");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage, searchTerm]);

  // Handle per page change
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  // Open modal and set selected request
  const handleView = (request) => {
    setSelectedRequest(request);
    setStatus(request.status || "Pending");
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setStatus(request.status || "Pending");
    setIsEditing(true);
    setShowModal(true);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const handleStatusChange = async (newStatus, id) => {
    try {
      // Update the status in the backend
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL
        }/employee/updateEmployeeChangeRequestStatusById`,
        { id, status: newStatus } // Sending the request ID and new status to the backend
      );

      // Show success toast
      toast.success("Change request status updated successfully!");

      // Fetch updated data to reflect changes in the UI
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item !"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL
          }/employee/deleteChangeRequest/${id}`
        );
        fetchData();
      } catch (error) {
        console.error("Error deleting employee change request:", error);
      }
    }
  };

  return (
    <div className=" md:p-6 lg:p-8 bg-white p-2 w-full">
      <div>
        <Toaster />
      </div>

      <h1 className=" text-xl md:text-2xl font-bold mb-2">
        Employee Management
      </h1>

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
            Employee Changes
          </Link>
        </div>
      </div>

      <div className="  flex  flex-col  justify-between border p-4  bg-gray-100 space-y-3  rounded-md">
        <div>
          <div className="flex space-x-2 justify-between items-center">
            <div className="flex  border-2 border-gray-300 rounded-full bg-white items-center pr-2 hover:border-blue-500">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-1 pr-1.5 max-xs:w-[5rem]  rounded-full outline-none text-sm"
              />

              <IoSearch
                size={25}
                className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 text-gray-500"
              />
            </div>

            <div className="relative">
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
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="max-xs:text-sm sm:text-sm">
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  SNo
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  Employee Name
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  Profile
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  Date of Birth
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  Nationality
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  Aadhar/Pan Card
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  10th/12th Certificates
                </th>
                <th className="px-2 text-left font-medium whitespace-nowrap">
                  Extra Documents
                </th>
                <th className="w-20 text-left font-medium whitespace-nowrap pl-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {changeRequests.map((item, index) => (
                <tr
                  key={item._id}
                  className="text-gray-600 text-left w-full rounded-xl border border-black sm:text-sm"
                >
                  <td className="px-2 py-2 whitespace-nowrap bg-white border-y-2 border-l-2 rounded-l-md">
                    {index + 1}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap bg-white border-y-2">
                    {item.employeeName?.firstName}{" "}
                    {item.employeeName?.lastName}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap bg-white border-y-2">
                    {item.changes?.photograph && (
                      <div>
                        <img
                          src={getDisplayUrl(item.changes.photograph)} // Use the helper here
                          alt="Profile"
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                      </div>
                    )}
                    {!item.changes?.photograph && <div>-</div>}
                  </td>
                  <td className="px-2 py-2 bg-white text-left border-y-2 font-medium whitespace-nowrap">
                    {item.changes?.dateOfBirth && (
                      <div>{item.changes.dateOfBirth}</div>
                    )}

                    {!item.changes?.dateOfBirth && <div>-</div>}
                  </td>
                  <td className="px-2 bg-white py-2  text-left border-y-2 font-medium whitespace-nowrap">
                    {item.changes?.country && (
                      <div>{item.changes.country}</div>
                    )}

                    {!item.changes?.country && <div>-</div>}
                  </td>
                  <td className="px-2 bg-white py-2 text-left border-y-2 font-medium whitespace-nowrap">
                    {(item.changes?.aadharCard || item.changes?.panCard) ? (
                      <>
                        {item.changes?.aadharCard && (
                          <div>
                            <a
                              href={getDisplayUrl(item.changes.aadharCard)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Aadhar Card (PDF)
                            </a>
                          </div>
                        )}
                        {item.changes?.panCard && (
                          <div>
                            <a
                              href={getDisplayUrl(item.changes.panCard)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View Pan Card (PDF)
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className="px-2 bg-white py-2 text-left border-y-2 font-medium whitespace-nowrap">
                    {(item.changes?.SSC || item.changes?.HSC) ? (
                      <>
                        {item.changes?.SSC && (
                          <div>
                            <a
                              href={getDisplayUrl(item.changes.SSC)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View 10th Certificate (PDF)
                            </a>
                          </div>
                        )}
                        {item.changes?.HSC && (
                          <div>
                            <a
                              href={getDisplayUrl(item.changes.HSC)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View 12th Certificate (PDF)
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className="px-2 bg-white py-2 text-left border-y-2 font-medium whitespace-nowrap">
                    {item.changes?.documents && item.changes.documents.length > 0 ? (
                      item.changes.documents.map((doc, index) => (
                        doc?.docDocument && (
                          <div key={index}>
                            <a
                              href={getDisplayUrl(doc.docDocument)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View {doc.docName || 'Document'} (PDF)
                            </a>
                          </div>
                        )
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className="whitespace-nowrap bg-white border-y-2">
                    <select
                      className={`outline-none px-1 py-1 cursor-pointer active:bg-white rounded-md border bg-${item.status === "Pending"
                        ? "yellow"
                        : item.status === "Approved"
                          ? "green"
                          : "red"
                        }-400 text-white hover:bg-${item.status === "Pending"
                          ? "yellow"
                          : item.status === "Approved"
                            ? "green"
                            : "red"
                        }-600`}
                      name="status"
                      value={item.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(e.target.value, item._id)
                      } // Call handleStatusChange when status changes
                      disabled={item.status === "Approved"} // Disable the dropdown when the status is Approved
                    >
                      <option
                        className="bg-yellow-400"
                        value="Pending"
                        disabled={item.status === "Approved"}
                      >
                        Pending
                      </option>
                      <option className="bg-green-400" value="Approved">
                        Approved
                      </option>
                      <option
                        className="bg-red-400"
                        value="Rejected"
                        disabled={item.status === "Approved"}
                      >
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap bg-white border-y-2 border-l-2 rounded-l-md">
                    {item.status === "Pending" ||
                      item.status === "Rejected" ? (
                      <MdDelete
                        size={18}
                        onClick={() => handleDelete(item._id)}
                        className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                      />
                    ) : (
                      <MdDelete
                        size={18}
                        className="text-gray-300 cursor-not-allowed"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleNextPage(page)}
                className={`px-4 py-2 border rounded-full ${currentPage === page
                  ? "text-blue-500 bg-white border-blue-500"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            ))
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
                  className={`px-4 py-2 border rounded-full ${currentPage === page
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
  );
};

export default EmployeeUpdate;
