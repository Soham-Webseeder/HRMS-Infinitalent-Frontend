import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ManagePosition() {
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ position: "", details: "" });
  const [itemId, setItemId] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPositions, setTotalPositions] = useState(0);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/employee/getAllPostions?page=${currentPage}&limit=${perPage}`
        );
        if (response.data.success) {
          setPositions(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          setTotalPositions(response.data.pagination.totalPositions);
        } else {
          console.error("Error fetching positions:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    fetchPositions();
  }, [currentPage, perPage]);

  console.log(positions, "positions");

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/updatePosition/${itemId}`,
        modalData
      );
      if (res) {
        toast.success("Position Edited Successfully!");
        setShowModal(false);
        const updatedPositions = positions.map((pos) =>
          pos._id === itemId ? { ...pos, ...modalData } : pos
        );
        setPositions(updatedPositions);
      } else {
        toast.error("Position Edit Unsuccessful!");
      }
    } catch (error) {
      console.error("Error editing position:", error);
      toast.error("Position Edit Unsuccessful!");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/deletePosition/${id}`
        );
        if (response) {
          const updatedPositions = positions.filter((pos) => pos._id !== id);
          setPositions(updatedPositions);
          console.log("Position Deleted Successfully");
        } else {
          console.error("Error deleting position:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting position:", error);
      }
    }
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEditClick = (id) => {
    const position = positions.find((pos) => pos._id === id);
    if (position) {
      setModalData({ position: position.position, details: position.details });
    }
    setItemId(id);
    setShowModal(true);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value)); // Convert value to integer
  };

  const filteredPositions = positions.filter(
    (position) =>
      position.position &&
      position.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full mx-auto">
        <div className="p-8 bg-white border rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Manage Positions</h2>
          <div className="border rounded px-10 py-4">
            <span className="self-center font-bold">Show</span>
            <div className="flex space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={perPage}
                  onChange={handlePerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <span className="self-center font-bold">entries</span>
            <div className="flex flex-col items-end mb-2">
              <div className="flex">
                <span className="self-center font-bold">Search: </span>
                <input
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="w-full">
              <thead className="border">
                <tr>
                  <th className="px-4 py-2 text-left border">SL</th>
                  <th className="px-4 py-2 text-left border">Position</th>
                  <th className="px-4 py-2 text-left border">Details</th>
                  <th className="px-4 py-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                {filteredPositions.map((position, index) => (
                  <tr key={position._id} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{position.position}</td>
                    <td className="px-4 py-2 border">{position.details}</td>
                    <td className="border p-2 flex items-center justify-between gap-4 w-full py-6 ">
                      <button
                        onClick={() => handleEditClick(position._id)}
                        className="text-indigo-500 hover:text-indigo-900 "
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-900"
                        onClick={() => handleDelete(position._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col mt-4 items-end">
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 border rounded-md border-gray-300 font-medium"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 border rounded-md border-gray-300 ${
                        currentPage === page ? "bg-blue-700 text-white" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  className="px-4 py-2 border rounded-md border-gray-300 font-medium"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col gap-4 w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Position</h2>
            <div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium mb-1"
                >
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={modalData.position}
                  onChange={handleModalInputChange}
                  placeholder="Position"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium mb-1"
                >
                  Details
                </label>
                <input
                  type="text"
                  id="details"
                  name="details"
                  value={modalData.details}
                  onChange={handleModalInputChange}
                  placeholder="Details"
                  className="p-2 border w-full form-input rounded"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
