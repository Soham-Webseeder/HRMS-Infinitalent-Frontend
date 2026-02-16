import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function ManageAssetType() {
  const [assetType, setAssetType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ typeName: "" }); // Initialize with an empty object
  const [perPage, setPerPage] = useState(10);
  const [itemId, setItemId] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllAssetTypes?page=${currentPage}&limit=${perPage}`
        );
        if (response.data.success) {
          setAssetType(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          toast.success("Asset Type Fetched Successfully....");
        } else {
          console.error("Error Fetching Asset Type ", response.data.message);
        }
      } catch (error) {
        console.error("Error Fetching Asset Type", error);
      }
    };
    fetchAssetTypes();
  }, [currentPage, perPage]);

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/updateAsset/${itemId}`,
        modalData
      );
      if (res.data.success) {
        toast.success("Asset Type Edited Successfully...");
        setShowModal(false);
        const updatedAssetType = assetType.map((asset) =>
          asset._id === itemId ? { ...asset, ...modalData } : asset
        );
        setAssetType(updatedAssetType);
      } else {
        toast.error("Asset Type Edit Unsuccessful");
      }
    } catch (error) {
      console.error("Error editing Asset Type:", error);
      toast.error("Asset Type Edit Unsuccessful!");
    }
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/deleteAsset/${id}`
        );
        if (response.data.success) {
          const updatedAssetType = assetType.filter((asset) => asset._id !== id);
          setAssetType(updatedAssetType);
          toast.success("Asset Type Deleted Successfully");
        } else {
          console.error("Asset Type Not Deleted", response.data.message);
        }
      } catch (error) {
        console.error("Error Deleting Asset Type", error);
      }
    }
  };

  const handleEditClick = (id) => {
    const asset = assetType.find((asset) => asset._id === id);
    setItemId(id);
    setModalData(asset); // Set modalData with the asset data
    setShowModal(true);
  };

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10)); // Convert value to integer
    setCurrentPage(1); // Reset to first page when changing per page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredAssetType = assetType
    .filter((asset) => {
      if (asset && asset.typeName && typeof asset.typeName === "string") {
        return asset.typeName.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });

  return (
    <>
      <div className="bg-gray-100 min-h-screen w-full sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col mx-auto">
        <div className="p-8 bg-white border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Manage Asset Type</h2>
          <div className="border rounded px-10 py-4">
            <span className="self-center font-bold">Show</span>
            <div className="flex space-x-2 justify-between">
              <div className="relative">
                <select
                  name=""
                  id=""
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
              <span className="self-center font-bold">entries</span>
              </div>
              <div className="flex flex-col items-end mb-2">
                  <div className="flex">
                    <span className="self-center font-bold">Search:</span>
                    <input
                      type="text"
                      placeholder="Search By Asset Type.."
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
            </div>
            <table className="w-full">
              <thead className="border">
                <tr>
                  <th className="px-4 py-2 text-left border">SNo</th>
                  <th className="px-4 py-2 text-left border">Asset Type Name</th>
                  <th className="px-4 py-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                {filteredAssetType.map((asset, index) => (
                  <tr key={asset._id} className="border">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{asset.typeName}</td>
                    <td className="border p-2 flex items-center justify-between gap-2 w-full py-6 ">
                      <button
                        onClick={() => handleEditClick(asset._id)}
                        className="text-indigo-500 hover:text-indigo-900 "
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-900"
                        onClick={() => handleDelete(asset._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 rounded-md hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col gap-4 w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Asset Type</h2>
            <div>
              <label htmlFor="assetType" className="block text-sm font-medium mb-1">
                Asset Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="assetType"
                name="typeName"
                value={modalData.typeName || ''}
                onChange={handleModalInputChange}
                placeholder="Asset Type"
                className="p-2 border w-full form-input rounded mb-5"
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
      )}
    </>
  );
}
