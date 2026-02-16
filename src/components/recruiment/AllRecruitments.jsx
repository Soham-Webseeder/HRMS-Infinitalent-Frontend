import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";

const AllRecruitments = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecruitment, setSelectedRecruitment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch candidate data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/recruitment/getAllRecruitments?page=${currentPage}&limit=${perPage}`
      );
      setRecruitments(response.data.data);
      console.log(response.data.data,"res")
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
  const handleView = (recruitment) => {
    setSelectedRecruitment(recruitment);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (recruitment) => {
    setSelectedRecruitment(recruitment);
    setIsEditing(true);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRecruitment(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/recruitment/deleteRecruitment/${id}`
      );
      toast.success("Recruitment deleted successfully");
      fetchData(); // Refresh data
    } catch (error) {
      toast.error("Error deleting recruitment");
    }
  };

  // Handle update
  const handleUpdate = async () => {
    if (!selectedRecruitment) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/updateRecruitment/${
          selectedRecruitment._id
        }`,
        { status: selectedRecruitment.status }
      );
      toast.success("Recruitment status updated successfully");
      fetchData(); // Refresh data
      closeModal(); // Close modal after update
    } catch (error) {
      toast.error("Error updating recruitment");
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRecruitment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-100 w-full mx-auto min-h-screen sm:px-4 md:px-24 overflow-x-hidden flex flex-col">
      <Toaster />
      <div className="bg-white border-gray-200 border border-rounded shadow-lg px-4 py-2">
        <div className="pl-8">
          <h1 className="text-xl font-bold">All Recruitment</h1>
        </div>
        <div className="md:p-4 md:px-8 sm:p-1 p-1 flex items-center justify-center">
          <div className="overflow-x-auto w-full">
            <div className="flex space-x-2 justify-between">
              <div className="relative">
                <label className="mr-2 text-sm">Show</label>

                <select
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
                <span className="text-sm ml-2">entries</span>
              </div>
              <div className="flex flex-col items-end mb-2">
                <div className="flex">
                  <span className="self-center font-bold">Search:</span>
                  <input
                    type="text"
                    placeholder="Search By Department Name.."
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
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    SNo
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recruitments
                  .filter((recruitment) =>
                    recruitment.from
                      ? recruitment.from
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      : false
                  )
                  .map((item, index) => (
                    <tr key={item._id} className="text-center">
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {item.from}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleView(item)}
                          className="text-blue-500 hover:underline"
                        >
                          <AiFillEye size={20} />
                        </button>
                        {/* <button
                          onClick={() => handleEdit(item)}
                          className="ml-2 text-green-500 hover:underline"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="ml-2 text-red-500 hover:underline"
                        >
                          <MdDelete size={20} />
                        </button> */}
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <div className="bg-white max-h-[90vh] p-8 rounded overflow-y-auto shadow-lg w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold mb-4">Recruitment Details</h2>
              <button onClick={closeModal} className="text-red-500 text-xl">
                &times;
              </button>
            </div>
            {selectedRecruitment && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Department Name:
                  </label>
                  <span className=" rounded-md p-2">
                    {selectedRecruitment.from}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">Date:</label>
                  <span className=" rounded-md p-2">
                    {selectedRecruitment.date}
                  </span>
                </div>
                {/* <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-1">To:</label>
            <p className="border border-gray-300 rounded-md p-2">{selectedRecruitment.to}</p>
          </div> */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Prepared By:
                  </label>
                  <span className=" rounded-md p-2">
                    {selectedRecruitment.preparedBy}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Approved By:
                  </label>
                  <span className=" rounded-md p-2">
                    {selectedRecruitment.approvedBy}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold">
                    Job Description:
                  </label>
                  {selectedRecruitment.jobDescription.map((job, index) => (
                    <div key={job._id} className="border-b mb-2 pb-2">
                      <p>
                        <strong>Designation:</strong> {job.designation}
                      </p>
                      <p>
                        <strong>Purpose:</strong> {job.purpose}
                      </p>
                      <p>
                        <strong>Number of Employees:</strong> {job.NoOfEmployee}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  {/* <button
                          onClick={handleUpdate}
                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                          Update
                        </button> */}
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRecruitments;
