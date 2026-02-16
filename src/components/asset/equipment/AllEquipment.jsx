import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddEquipment from "./AddEquipment";


const AllEquipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [itemId, setItemId] = useState("");
  const [showForm, setShowForm] = useState(false);
  

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
              page: page,
              limit: limit,
              name: searchTerm,
            },
          }
        );
        if (response.data.success) {
          setEquipments(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          console.log(response.data.data);
          toast.success("Equipment Fetched Successfully!");

          console.log("Equipment fetched successfully..");
        } else {
          console.error("Error fetching equipment");
        }
      } catch (error) {
        console.error("Error fetching equipment");
      }
    };
    fetchEquipments();
  }, [page, limit, searchTerm]);

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

  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full mx-auto">
        <div className="p-8 bg-white border rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 p-1 border border-gray-300 rounded-full text-center shadow-md">Manage Equipment</h2>
          <div className="flex flex-row justify-end items-center py-1 bg-white rounded-t-sm ">
            <button
              onClick={() => setShowForm(true)} // Show modal when button is clicked
              className="border-black border mr-2 mb-3 px-2 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
            >
              {/* <AiOutlinePlusCircle size={25} className="font-bold text-lg" /> */}
              Add Equipment
            </button>
          </div>

          <div className="border rounded px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-2">
              <div className="relative flex items-center mb-4 sm:mb-0">
                <label className="mr-3 text-sm">Show:</label>
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
              <div className="flex flex-col items-end mb-2">
                <div className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
                  <span className="self-center font-bold mr-2">Search:</span>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                    placeholder="Search by equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full mt-2">
                <thead className="border">
                  <tr>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Equipment Name
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Type Name
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Serial No
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Specification
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="border">
                  {equipments.map((equipment, index) => (
                    <tr key={equipment._id} className="border">
                      <td className="px-4 py-2 border">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="px-4 py-2 border">
                        {equipment.equipmentName}
                      </td>
                      <td className="px-4 py-2 border">{equipment.typeName}</td>
                      <td className="px-4 py-2 border">{equipment.model}</td>
                      <td className="px-4 py-2 border">
                        {equipment.prpductSerialNo}
                      </td>
                      <td className="px-4 py-2 border">
                        {equipment.specification}
                      </td>
                      <td className="whitespace-nowrap text-left text-sm font-medium flex p-1">
                        <div className="w-[50%] border-slate-300 py-2 text-center">
                          <button
                            onClick={() => handleEditClick(equipment._id)}
                            className="text-indigo-500 hover:text-indigo-900 mr-2"
                          >
                            <FaEdit size={20} />
                          </button>
                        </div>
                        <div className="w-[50%] border-l py-2 text-center">
                          <button
                            className="text-red-500 hover:text-red-900"
                            onClick={() => handleDelete(equipment._id)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col mt-4 items-end">
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`px-4 py-2 border rounded-full border-gray-300 ${
                        pageNumber === page
                          ? "bg-blue-600 text-white rounded-full"
                          : "border border-gray-300 rounded-full hover:bg-gray-100"
                      } font-medium`}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
                <button
                  className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
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
                  htmlFor="prpductSerialNo"
                  className="block text-sm font-medium mb-1"
                >
                  Serial No
                </label>
                <input
                  type="text"
                  id="prpductSerialNo"
                  name="prpductSerialNo"
                  value={modalData.prpductSerialNo || ""}
                  onChange={handleModalInputChange}
                  placeholder="Serial No"
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
              {/* <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button> */}
              <AddEquipment onClose={handleCloseForm} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default AllEquipment;
