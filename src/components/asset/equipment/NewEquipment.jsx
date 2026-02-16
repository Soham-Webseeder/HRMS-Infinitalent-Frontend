import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddEquipment from "./AddEquipment";
import { Link, useNavigate } from "react-router-dom";

const NewAllEquipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [itemId, setItemId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  const handleCloseForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllEquipment`,
          {
            params: {
              page: currentPage,
              limit: limit,
              name: searchTerm,
            },
          }
        );

        if (response.data.success) {
          setEquipments(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          toast.success("Equipment Fetched Successfully!");
        } else {
          console.error("Error fetching equipment");
        }
      } catch (error) {
        console.error("Error fetching equipment");
      }
    };

    fetchEquipments();
  }, [currentPage, limit, searchTerm]);

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/updateEquipment/${itemId}`,
        modalData
      );

      if (res.data.success) {
        toast.success("Equipment Edited Successfully!");
        setShowModal(false);
        const updatedEquipments = equipments.map((eq) =>
          eq._id === itemId ? { ...eq, ...modalData } : eq
        );
        setEquipments(updatedEquipments);
      } else {
        toast.error("Equipment Edit Unsuccessful!");
      }
    } catch (error) {
      console.error("Error editing Equipment:", error);
      toast.error("Equipment Edit Unsuccessful!");
    }
  };

  const handleEditClick = (id) => {
    const equipment = equipments.find((eq) => eq._id === id);
    setItemId(id);
    setModalData(equipment);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/deleteEquipment/${id}`
        );

        if (response.data.success) {
          const updatedEquipments = equipments.filter((pos) => pos._id !== id);
          setEquipments(updatedEquipments);
          toast.success("Equipment Deleted Successfully");
        } else {
          console.error("Error deleting Equipment:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting Equipment:", error);
      }
    }
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
    <>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header with breadcrumbs and Add Equipment button */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-2">
          <div>
            <h1 className="text-xl md:text-2xl font-medium mb-1">
              Manage Equipment
            </h1>
            <nav className="text-xs md:text-sm text-gray-500 mt-1 mb-0 flex flex-wrap items-center gap-x-1">
              <Link to="/" className="hover:text-slate-800 transition-colors">Home</Link>
              <span>|</span>
              <Link to="/app/asset" className="hover:text-slate-800 transition-colors">Asset</Link>
              <span>|</span>
              <span className="text-gray-500 cursor-default hover:text-slate-800 transition-colors">Manage Equipment</span>
            </nav>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="border px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mt-3 md:mt-0 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
          >
            Add Equipment
          </button>
        </div>
        {/* Properly aligned horizontal line */}
        <hr className="border-t border-gray-200 mb-4" />

        <div className="border rounded px-4 py-4 bg-gray-100">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                className="border rounded-full py-1 px-2 text-sm"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
              <thead>
                <tr className="text-sm font-medium text-black">
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    SL
                  </th>
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    Equipment Name
                  </th>
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    Type Name
                  </th>
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    Model
                  </th>
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    Serial No
                  </th>
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    Specification
                  </th>
                  <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {equipments.length ? (
                  equipments.map((equipment, index) => (
                    <tr key={equipment._id} className="text-gray-600 text-left">
                      <td className="px-2 py-1">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="px-2 py-1">{equipment.equipmentName}</td>
                      <td className="px-2 py-1">{equipment.typeName}</td>
                      <td className="px-2 py-1">{equipment.model}</td>
                      <td className="px-2 py-1">
                        {equipment.prpductSerialNo || "-"}
                      </td>{" "}
                      {}
                      <td className="px-2 py-1">{equipment.specification}</td>
                      <td className="px-2 py-1 flex space-x-2">
                        <button
                          onClick={() => handleEditClick(equipment._id)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(equipment._id)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <MdDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No equipment found
                    </td>
                  </tr>
                )}
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

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg md:max-w-2xl mx-4 md:mx-auto p-4 rounded-lg shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">Edit Equipment</h2>
              <div>
                <label
                  htmlFor="equipment"
                  className="block text-sm font-medium mb-1"
                >
                  Equipment Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="equipment"
                  name="equipmentName"
                  value={modalData.equipmentName || ""}
                  onChange={handleModalInputChange}
                  placeholder="Equipment Name"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              <div>
                <label
                  htmlFor="typeName"
                  className="block text-sm font-medium mb-1"
                >
                  Type Name
                </label>
                <input
                  type="text"
                  id="typeName"
                  name="typeName"
                  value={modalData.typeName || ""}
                  onChange={handleModalInputChange}
                  placeholder="Type Name"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium mb-1"
                >
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={modalData.model || ""}
                  onChange={handleModalInputChange}
                  placeholder="Model"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Serial No
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="prpductSerialNo"
                  value={modalData.prpductSerialNo || ""}
                  onChange={handleModalInputChange}
                  placeholder="Serial No"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              
              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Specification
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="specification"
                  value={modalData.specification || ""}
                  onChange={handleModalInputChange}
                  placeholder="specification"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg md:max-w-2xl mx-4 md:mx-auto p-4 rounded-lg shadow-lg relative">
              <AddEquipment onClose={handleCloseForm} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewAllEquipment;
