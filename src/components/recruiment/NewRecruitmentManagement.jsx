import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CandidateExport from "./CandidateExport";
import CandidateImport from "./CandidateImport";

const NewRecruitmentManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(""); // For update status
  const [isEditing, setIsEditing] = useState(false); // For determining edit mode

  const navigate = useNavigate();

  // Fetch candidate data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate`,
        {
          params: {
            page: currentPage,
            limit: perPage,
          },
        }
      );
      setCandidates(response.data.data);
      setTotalPages(response.data.pagination.totalPages); // Set total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

 

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


  // Fetch data when currentPage or perPage changes
  useEffect(() => {
    fetchData();
  }, [currentPage, perPage]);

  // Handle per page change

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    try {
      if (confirmDelete) {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/recruitment/deleteCandidate/${id}`
        );
        toast.success("Candidate deleted successfully");
        fetchData(); // Refresh data
      }
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
        {
          ...selectedCandidate,
          status, // Ensure status is updated
          educationalInfo: selectedCandidate.educationalInfo,
          pastExperience: selectedCandidate.pastExperience,
        }
      );
      toast.success("Candidate details updated successfully");
      fetchData(); // Refresh data
      closeModal(); // Close modal after update
    } catch (error) {
      toast.error("Error updating candidate");
    }
  };

  // Handle educational info input change
  const handleEducationalInfoChange = (e, eduId) => {
    const { name, value } = e.target;
    setSelectedCandidate((prev) => ({
      ...prev,
      educationalInfo: prev.educationalInfo.map((edu) =>
        edu._id === eduId ? { ...edu, [name]: value } : edu
      ),
    }));
  };

  // Handle past experience input change
  const handlePastExperienceChange = (e, expId) => {
    const { name, value } = e.target;
    setSelectedCandidate((prev) => ({
      ...prev,
      pastExperience: prev.pastExperience.map((exp) =>
        exp._id === expId ? { ...exp, [name]: value } : exp
      ),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div className=" md:p-6 lg:p-8 bg-white p-2 w-full">
      <div>
        <Toaster />
      </div>

      <h1 className=" text-xl md:text-2xl font-bold mb-2">
        Recruitment Management
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
            Recruitment
          </Link>
          <Link className="px-1 flex justify-center items-center h-4">
            Recruitment Management
          </Link>
        </div>

        <button
          className="bg-blue-500 mr-2 text-white px-6 py-2 rounded-full hover:bg-blue-600 ml-auto"
          onClick={() => navigate("/recruitment/add-candidate")}
        >
          Add Candidate
        </button>

        <CandidateExport fileName="Candidate_Data" />
        <CandidateImport />
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
                <th className=" pl-1 text-left font-medium whitespace-nowrap">
                  SNo
                </th>
                <th className="pl-10 text-left font-medium whitespace-nowrap">
                  Candidate Name
                </th>
                <th className="pl-4  text-left font-medium whitespace-nowrap">
                  Job Position
                </th>
                <th className="pl-2 text-left font-medium whitespace-nowrap">
                  Application Date
                </th>
                <th className="pl-8 text-left font-medium whitespace-nowrap">
                  Status
                </th>
                <th className="w-20 text-left font-medium whitespace-nowrap pl-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-transparent py-0" colSpan="100%">
                  <hr className="w-full bg-gray-300 h-0.5 my-0" />
                </td>
              </tr>

              {candidates
                .filter((candidate) =>
                  candidate.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <tr
                    key={item._id}
                    className="text-gray-600 text-left w-full rounded-xl border border-black sm:text-sm"
                  >
                    <td className="pl-2 whitespace-nowrap bg-white border-y-2 border-l-2 rounded-l-md">
                      {index + 1}
                    </td>
                    <td className="pl-12 whitespace-nowrap bg-white border-y-2">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-6 whitespace-nowrap bg-white border-y-2">
                      {item.jobPosition ? item.jobPosition.name : "Unknown"}
                    </td>
                    <td className="px-6 whitespace-nowrap bg-white border-y-2">
                      {item.applicationDate}
                    </td>
                    <td className="pl-4 pr-6 py-1 whitespace-nowrap bg-white border-y-2">
                      <select
                        className="outline-none px-1 py-1 hover:bg-gray-100 cursor-pointer active:bg-white rounded-md border"
                        name="status"
                        value={item.status || "Pending"} // Default value if status is undefined
                        onChange={(e) =>
                          handleStatusChange(e.target.value, item._id)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="w-25 whitespace-nowrap flex justify-between items-center pr-3 bg-white border-y-2 rounded-r-md border-r-2 py-2.5 gap-4">
                      <FaEdit
                        size={18}
                        onClick={() => handleEdit(item)}
                        className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                        aria-label="Edit"
                      />
                      <AiFillEye
                        size={16}
                        onClick={() => handleView(item)}
                        className="text-gray-500 hover:text-gray-900 active:text-gray-500 mr-1.5 cursor-pointer"
                        aria-label="View"
                      />
                      <MdDelete
                        size={18}
                        onClick={() => handleDelete(item._id)}
                        className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                        aria-label="Delete"
                      />
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

      {/* Modal for viewing and updating candidate details */}
      {showModal && (
        <div className="fixed w-full h-full z-40 inset-0 flex items-center justify-center bg-black bg-opacity-25 mb-20">
          <div className="bg-gray-100 xl:w-[800px] h-full px-4 pt-4 w-[70%] max-sm:w-[85%] rounded overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                {isEditing ? "Edit Candidate Details" : "Candidate Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-red-500 text-3xl hover:text-red-600"
              >
                &times;
              </button>
            </div>
            <hr className="my-4 border-t-2 border-gray-300" />
            <div>
              {selectedCandidate && (
                <div>
                  {isEditing ? (
                    <div className="space-y-4 mt-2">
                      {/* All Input Fields for Editing */}
                      {[
                        "firstName",
                        "lastName",
                        "phone",
                        "alternativePhone",
                        "email",
                        "country",
                        "presentAddress",
                        "permanentAddress",
                        "linkedln",
                        "applicationDate",
                        "interviewDate",
                      ].map((field) => (
                        <div className="flex items-center" key={field}>
                          <label className="block text-gray-700 font-medium w-1/3">
                            {field
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            :
                          </label>
                          <input
                            type={field.includes("Date") ? "date" : "text"}
                            name={field}
                            value={selectedCandidate[field] || ""}
                            onChange={handleInputChange}
                            className="w-full border p-2 border-gray-300 rounded-md"
                          />
                        </div>
                      ))}
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Status:
                        </label>
                        <select
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full border p-2 border-gray-300 rounded-md"
                        >
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>

                      {/* Educational Info Section */}
                      <h3 className="text-xl font-semibold mt-4">
                        Educational Info
                      </h3>
                      {selectedCandidate.educationalInfo.length > 0 ? (
                        selectedCandidate.educationalInfo.map((edu) => (
                          <div className="space-y-2" key={edu._id}>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                Obtained Degree:
                              </label>
                              <input
                                type="text"
                                name="obtainedDegree"
                                value={edu.obtainedDegree || ""}
                                onChange={(e) =>
                                  handleEducationalInfoChange(e, edu._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                University:
                              </label>
                              <input
                                type="text"
                                name="university"
                                value={edu.university || ""}
                                onChange={(e) =>
                                  handleEducationalInfoChange(e, edu._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                CGPA:
                              </label>
                              <input
                                type="text"
                                name="CGPA"
                                value={edu.CGPA || ""}
                                onChange={(e) =>
                                  handleEducationalInfoChange(e, edu._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                Comments:
                              </label>
                              <input
                                type="text"
                                name="comments"
                                value={edu.comments || ""}
                                onChange={(e) =>
                                  handleEducationalInfoChange(e, edu._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        // Empty fields for educational info
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              Obtained Degree:
                            </label>
                            <input
                              type="text"
                              name="obtainedDegree"
                              onChange={(e) =>
                                handleEducationalInfoChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              University:
                            </label>
                            <input
                              type="text"
                              name="university"
                              onChange={(e) =>
                                handleEducationalInfoChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              CGPA:
                            </label>
                            <input
                              type="text"
                              name="CGPA"
                              onChange={(e) =>
                                handleEducationalInfoChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              Comments:
                            </label>
                            <input
                              type="text"
                              name="comments"
                              onChange={(e) =>
                                handleEducationalInfoChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      )}

                      {/* Past Experience Section */}
                      <h3 className="text-xl font-semibold mt-4">
                        Past Experience
                      </h3>
                      {selectedCandidate.pastExperience.length > 0 ? (
                        selectedCandidate.pastExperience.map((exp) => (
                          <div className="space-y-2" key={exp._id}>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                Company Name:
                              </label>
                              <input
                                type="text"
                                name="companyName"
                                value={exp.companyName || ""}
                                onChange={(e) =>
                                  handlePastExperienceChange(e, exp._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                Working Period (months):
                              </label>
                              <input
                                type="number"
                                name="workingPeriod"
                                value={exp.workingPeriod || ""}
                                onChange={(e) =>
                                  handlePastExperienceChange(e, exp._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="flex items-center">
                              <label className="block text-gray-700 font-medium w-1/3">
                                Designation:
                              </label>
                              <input
                                type="text"
                                name="designation"
                                value={exp.designation || ""}
                                onChange={(e) =>
                                  handlePastExperienceChange(e, exp._id)
                                }
                                className="w-full border p-2 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        // Empty fields for past experience
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              Company Name:
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              onChange={(e) =>
                                handlePastExperienceChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              Working Period (months):
                            </label>
                            <input
                              type="number"
                              name="workingPeriod"
                              onChange={(e) =>
                                handlePastExperienceChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="block text-gray-700 font-medium w-1/3">
                              Designation:
                            </label>
                            <input
                              type="text"
                              name="designation"
                              onChange={(e) =>
                                handlePastExperienceChange(e, null)
                              }
                              className="w-full border p-2 border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full">
                      <div className="flex items-center">
                        <label className="block text-gray-700 font-medium w-1/3">
                          Sl No:
                        </label>
                        <p className="w-2/3 p-2 border-gray-300 rounded">
                          {selectedCandidate.candidateId}
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
            <div className="flex justify-end mt-4">
              {isEditing && (
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              )}
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRecruitmentManagement;
