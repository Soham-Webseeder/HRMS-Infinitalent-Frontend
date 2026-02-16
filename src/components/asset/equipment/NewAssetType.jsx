import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const styles = {
  iconButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0.5rem',
    color: 'inherit',
    transition: 'color 0.2s ease',
  },
  shadowTable: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    marginBottom: '1rem',
    width: '100%',
  },
  table: {
    minWidth: '600px',
    width: '100%', // Ensure table spans full width
  },
  tableCell: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'left',
  },
  tableHeader: {
    padding: '0.75rem 1rem',
    borderBottom: '2px solid #e5e7eb',
    fontWeight: '600',
    backgroundColor: '#f9fafb',
    textAlign: 'left',
  },
  paginationButton: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    color: '#007bff',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '0 0.25rem',
  },
  paginationActive: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },
};

export default function NewAssetType() {
  const [assetType, setAssetType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssetType, setNewAssetType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemId, setItemId] = useState("");
  const [modalData, setModalData] = useState({ typeName: "" });

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllAssetTypes?page=${currentPage}&limit=${perPage}&name=${searchTerm}`
        );
        if (response.data.success) {
          setAssetType(response.data.data);
          setTotalPages(response.data.pagination.totalPages);
          toast.success("Asset Type Fetched Successfully");
        } else {
          console.error("Error Fetching Asset Type", response.data.message);
        }
      } catch (error) {
        console.error("Error Fetching Asset Type", error);
      }
    };
    fetchAssetTypes();
  }, [currentPage, perPage, searchTerm]);

  const handleAddOrEditAssetType = async (e) => {
    e.preventDefault();
    if (itemId) {
      // Edit functionality
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/updateAsset/${itemId}`,
          modalData
        );
        if (res.data.success) {
          toast.success("Asset Type Edited Successfully");
          setIsModalOpen(false);
          const updatedAssetType = assetType.map((asset) =>
            asset._id === itemId ? { ...asset, ...modalData } : asset
          );
          setAssetType(updatedAssetType);
        } else {
          toast.error("Asset Type Edit Unsuccessful");
        }
      } catch (error) {
        console.error("Error editing Asset Type", error);
        toast.error("Asset Type Edit Unsuccessful");
      }
    } else {
      // Add functionality
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/createAssetType`,
          { typeName: newAssetType }
        );
        if (response.data.success) {
          setAssetType([...assetType, response.data.data]);
          toast.success("Asset Type Added Successfully");
          setNewAssetType("");
          setIsModalOpen(false);
        } else {
          toast.error("Asset Type Addition Unsuccessful");
        }
      } catch (error) {
        console.error("Error Adding Asset Type", error);
        toast.error("Asset Type Addition Unsuccessful");
      }
    }
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
          const updatedAssetType = assetType.filter(
            (asset) => asset._id !== id
          );
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
    setModalData(asset);
    setIsModalOpen(true);
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setItemId(""); // Clear the item ID when opening the modal for adding new asset type
      setModalData({ typeName: "" }); // Reset modal data
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Asset Type</h1>
          <nav className="text-xs md:text-sm text-gray-500 mt-1 mb-2">
            <Link to="/" className="hover:text-slate-800">Home</Link>
            <span className="mx-1">|</span>
            <Link to="/app/asset" className="hover:text-slate-800">Asset</Link>
            <span className="mx-1">|</span>
            <span className="text-gray-500 cursor-default hover:text-slate-800 transition-colors">Asset Type</span>
          </nav>
        </div>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Add Asset Type
        </button>
      </div>
      {/* Properly aligned horizontal line */}
      <hr className="border-t border-gray-200 mb-4" />

      {/* Search and Rows Per Page */}
      <div className="border rounded px-4 py-4 bg-gray-100">
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
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
              onChange={handlePerPageChange}
              value={perPage}
              className="border rounded-full py-1 px-2 text-sm"
            >
              {[5, 10, 15, 20].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className=" p-4 flex items-left mt-4">

          <div className="text-sm font-medium text-black  w-[40%]">SNo</div>
          <div className="text-sm font-medium text-black  w-[55%]">Asset Type Name</div>
          <div className="text-sm font-medium text-black  w-[5%]">Action</div>
        </div>

        <div className="divide-y divide-gray-200">

          {assetType.length > 0 ? (
            assetType.map((data, index) => (
              <div key={data._id} className="bg-white mb-4 p-2 shadow-sm rounded-lg hover:bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500 w-[3%]">{currentPage === 1 ? index + 1 : (currentPage - 1) * perPage + index + 1}</div>
                <div className="text-sm text-gray-500 w-[6%]">{data.typeName}</div>

                <div className="flex justify-around items-center w-[10%]">
                  <button
                    onClick={() => handleEditClick(data._id)}
                    className="text-gray-500 p-1"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="text-gray-500 p-1"
                  >
                    <MdDelete size={18} />
                  </button>

                </div>

              </div>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No data found.
              </td>
            </tr>
          )}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {itemId ? "Edit Asset Type" : "Add Asset Type"}
            </h2>
            <form onSubmit={handleAddOrEditAssetType}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Type Name
                </label>
                <input
                  type="text"
                  value={itemId ? modalData.typeName : newAssetType}
                  onChange={(e) =>
                    itemId
                      ? setModalData({ ...modalData, typeName: e.target.value })
                      : setNewAssetType(e.target.value)
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {itemId ? "Save Changes" : "Add Asset Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
