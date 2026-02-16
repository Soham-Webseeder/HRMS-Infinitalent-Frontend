import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const ManageEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [itemId, setItemId] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/asset/getAllEquipment?page=${currentPage}&limit=${perPage}`
        );
        if (response.data.success) {
          setEquipments(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          toast.success("Equipment Fetched Successfully!");
        } else {
          console.error("Error fetching Equipment:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching Equipment:", error);
      }
    };
    fetchEquipment();
  }, [currentPage, perPage]);

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/updateEquipment/${itemId}`,
        modalData
      );
      if (res.data.success) {
        toast.success("Equipment Edited Successfully!");
        setShowModal(false);
        setIsAdding(false);
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

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/createEquipment`,
        modalData
      );
      if (res.data.success) {
        toast.success("Equipment Added Successfully!");
        setShowModal(false);
        setIsAdding(false);
        setEquipments([...equipments, res.data.data]);
      } else {
        toast.error("Failed to Add Equipment!");
      }
    } catch (error) {
      console.error("Error adding Equipment:", error);
      toast.error("Failed to Add Equipment!");
    }
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

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEditClick = (id) => {
    const equipment = equipments.find((eq) => eq._id === id);
    setItemId(id);
    setModalData(equipment);
    setShowModal(true);
  };

  const handleAddClick = () => {
    setModalData({});
    setShowModal(true);
    setIsAdding(true);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const filteredEquipments = equipments.filter((equipment) => {
    if (
      equipment &&
      equipment.equipmentName &&
      typeof equipment.equipmentName === "string"
    ) {
      return equipment.equipmentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full mx-auto">
        <div className="p-8 bg-white border rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 p-1">Manage Equipment</h2>
          <button
            onClick={handleAddClick}
            className="border-black border mb-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
          >
            <AiOutlinePlusCircle size={25} />
            Add Equipment
          </button>
          <div className="border rounded px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-2">
              <div className="relative flex items-center mb-4 sm:mb-0">
                <label className="mr-3 text-sm">Show:</label>
                <select
                  onChange={handlePerPageChange}
                  value={perPage}
                  className="border rounded-md py-1 px-2 text-sm"
                >
                  {[5, 10, 15, 20].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center sm:justify-end mb-2">
                <span className="font-bold text-sm mr-2">Search:</span>
                <input
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by Equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-gray-500 text-sm font-medium uppercase">
                    <th className="px-4 py-2 text-left border">SL</th>
                    <th className="px-4 py-2 text-left border">Equipment Name</th>
                    <th className="px-4 py-2 text-left border">Type Name</th>
                    <th className="px-4 py-2 text-left border">Model</th>
                    <th className="px-4 py-2 text-left border">Serial No</th>
                    <th className="px-4 py-2 text-left border">Action</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {filteredEquipments.map((equipment, index) => (
                    <tr key={equipment._id} className="border">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {equipment.equipmentName}
                      </td>
                      <td className="px-4 py-2 border">{equipment.typeName}</td>
                      <td className="px-4 py-2 border">{equipment.model}</td>
                      <td className="px-4 py-2 border">{equipment.serialNo}</td>
                      <td className="whitespace-nowrap text-left text-sm font-medium flex p-1">
                        <div className="w-[50%] border-slate-300 py-3 text-center">
                          <button
                            onClick={() => handleEditClick(equipment._id)}
                            className="text-indigo-500 hover:text-indigo-900 mr-2"
                          >
                            <FaEdit size={20} />
                          </button>
                        </div>
                        <div className="w-[50%] border-l py-3 text-center">
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
            <div className="flex justify-end mt-2 space-x-2 p-3">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="px-2 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {isAdding ? "Add Equipment" : "Edit Equipment"}
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="equipmentName">
                Equipment Name:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="equipmentName"
                name="equipmentName"
                value={modalData.equipmentName || ""}
                onChange={handleModalInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="typeName">
                Type Name:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="typeName"
                name="typeName"
                value={modalData.typeName || ""}
                onChange={handleModalInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="model">
                Model:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="model"
                name="model"
                value={modalData.model || ""}
                onChange={handleModalInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold" htmlFor="serialNo">
                Serial No:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                id="serialNo"
                name="serialNo"
                value={modalData.serialNo || ""}
                onChange={handleModalInputChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={isAdding ? handleAdd : handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {isAdding ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageEquipments;