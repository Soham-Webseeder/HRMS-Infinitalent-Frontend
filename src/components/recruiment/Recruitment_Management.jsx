import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Recruitment_Management = () => {
  const [candidates, setCandidates] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(""); // For update status
  const [isEditing, setIsEditing] = useState(false); // For determining edit mode

  // Fetch candidate data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/recruitment/getAllCandidate?page=${currentPage}&limit=${perPage}`
      );
      setCandidates(response.data.data);
      console.log(response.data.data, "candiiiiiiiiiiiiii");
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  // Handle per page change
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  // Open modal and set selected candidate
  const handleView = (candidate) => {
    setSelectedCandidate(candidate);
    setStatus(candidate.status || "Pending");
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setStatus(candidate.status || "Pending");
    setIsEditing(true);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCandidate(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/deleteCandidate/${id}`
      );
      toast.success("Candidate deleted successfully");
      fetchData(); // Refresh data
    } catch (error) {
      toast.error("Error deleting candidate");
    }
  };

  // Handle update
  const handleUpdate = async () => {
    if (!selectedCandidate) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/updateCandidate/${
          selectedCandidate._id
        }`,
        { ...selectedCandidate, status }
      );
      toast.success("Candidate status updated successfully");
      fetchData(); // Refresh data
      closeModal(); // Close modal after update
    } catch (error) {
      toast.error("Error updating candidate");
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle status change
  const handleStatusChange = async (status, id) => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/recruitment/updateCandidate/${id}`,
        { status }
      );
      toast.success("Candidate status updated successfully");
      fetchData(); // Refresh data
    } catch (error) {
      toast.error("Error updating candidate");
    }
  };

  return (
    <div className="bg-gray-100  w-full  min-h-screen sm:px-4  overflow-x-hidden flex flex-col relative items-center">
      <div>
        <Toaster />
      </div>
      <div className="bg-white border-gray-200 border border-rounded shadow-lg px-2 py-2  w-full 2xl:w-[80%]">
        <h1 className=" text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full">
          Recruitment Management
        </h1>

        <div className="md:p-2 md:px-4  p-1 flex  flex-col  justify-between">
          <div className="border rounded px-4 py-4">
            <div className="flex space-x-2 justify-between">
              <div className="relative">
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
              <div className="flex">
                <span className="self-center font-bold mr-2">Search:</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    SNo
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Job Position
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Application Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="border border-slate-300  py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {candidates
                  .filter((candidate) =>
                    candidate.firstName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={item._id} className="text-center">
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {item.jobPosition?.name || "Unknown"}
                      </td>

                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {item.applicationDate}
                      </td>
                      <td className="border border-slate-300 px-4 py-2 whitespace-nowrap">
                        <select
                          className="outline-none px-4 py-2 hover:bg-gray-100 "
                          name="status"
                          value={item?.status}
                          onChange={(e) =>
                            handleStatusChange(e.target.value, item._id)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="border border-slate-300  whitespace-nowrap w-[150px] py-0 ">
                        <button
                          onClick={() => handleView(item)}
                          className="h-full text-indigo-500 hover:text-indigo-900 hover:underline   border-gray-400 border-r"
                        >
                          <AiFillEye size={20} className="m-3" />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className=" text-blue-700 hover:text-blue-900 hover:underline   border-gray-400 border-r"
                        >
                          <FaEdit size={20} className="m-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className=" text-red-500 hover:text-red-900 hover:underline"
                        >
                          <MdDelete size={20} className="m-3" />
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
      </div>

      {/* Modal for viewing and updating candidate details */}
      {showModal && (
        <div className="fixed w-full   h-full z-40 inset-0 flex items-center justify-center bg-black bg-opacity-25  mb-20">
          <div className="bg-white xl:w-[600px] h-full p-4 w-[50%] max-sm:w-[85%] rounded overflow-y-auto shadow-lg ">
            <div className="flex justify-between items-center ">
              <h2 className="text-2xl  font-bold">
                {isEditing ? "Edit Candidate Details" : "Candidate Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-red-500 text-3xl hover:text-red-400"
              >
                &times;
              </button>
            </div>

            <div>
              {selectedCandidate && (
                <div>
                  {isEditing ? (
                    <div className="space-y-4 mt-2 ">
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          First Name:
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={selectedCandidate.firstName}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center ">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={selectedCandidate.lastName}
                          onChange={handleInputChange}
                          className=" p-2 w-full border border-gray-300  rounded-md "
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Phone Number:
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={selectedCandidate.phone}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Alternative Phone:
                        </label>
                        <input
                          type="text"
                          name="alternativePhone"
                          value={selectedCandidate.alternativePhone || ""}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Email:
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={selectedCandidate.email}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Country:
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={selectedCandidate.country}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Present Address:
                        </label>
                        <input
                          type="text"
                          name="presentAddress"
                          value={selectedCandidate.presentAddress}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Permanent Address:
                        </label>
                        <input
                          type="text"
                          name="permanentAddress"
                          value={selectedCandidate.permanentAddress}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          LinkedIn:
                        </label>
                        <input
                          type="text"
                          name="linkedln"
                          value={selectedCandidate.linkedln}
                          onChange={handleInputChange}
                          className=" w-full border p-2 border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Status:
                        </label>
                        <select
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className=" w-full border p-2 border-gray-300 rounded-full"
                        >
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          onClick={closeModal}
                          className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleUpdate}
                          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full">
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Sl No:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate._id}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          First Name:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.firstName}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Last Name:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.lastName}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Phone Number:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.phone}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Alternative Phone:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.alternativePhone || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Email:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.email}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Country:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.country}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Present Address:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.presentAddress}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Permanent Address:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.permanentAddress}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          LinkedIn:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.linkedln}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <label className="block font-medium text-gray-700">
                          Educational Information:
                        </label>
                        {selectedCandidate.educationalInfo.length > 0 ? (
                          selectedCandidate.educationalInfo.map(
                            (edu, index) => (
                              <div
                                key={index}
                                className="mb-2 p-2 border-gray-300 rounded"
                              >
                                <p>
                                  <strong>Degree:</strong> {edu.obtainedDegree}
                                </p>
                                <p>
                                  <strong>University:</strong> {edu.university}
                                </p>
                                <p>
                                  <strong>CGPA:</strong> {edu.CGPA}
                                </p>
                                <p>
                                  <strong>Comments:</strong> {edu.comments}
                                </p>
                              </div>
                            )
                          )
                        ) : (
                          <p>No educational information available</p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label className="block font-medium text-gray-700">
                          Past Experience:
                        </label>
                        {selectedCandidate.pastExperience.length > 0 ? (
                          selectedCandidate.pastExperience.map((exp, index) => (
                            <div
                              key={index}
                              className="mb-2 p-2 border-gray-300 rounded"
                            >
                              <p>
                                <strong>Company Name:</strong> {exp.companyName}
                              </p>
                              <p>
                                <strong>Working Period:</strong>{" "}
                                {exp.workingPeriod} years
                              </p>
                              <p>
                                <strong>Designation:</strong> {exp.designation}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No past experience available</p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <label className="block font-medium text-gray-700 w-1/3">
                          Status:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.status || "Not Specified"}
                        </p>
                      </div>
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          onClick={closeModal}
                          className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recruitment_Management;
