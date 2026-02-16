import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function ManageAssetType() {
  const [assetType, setAssetType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssetType, setNewAssetType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemId, setItemId] = useState(""); // For editing existing asset types
  const [modalData, setModalData] = useState({ typeName: "" });

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/asset/getAllAssetTypes?page=${currentPage}&limit=${perPage}&name=${searchTerm}`
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

  // const handleEditClick = (id) => {
  //   const asset = assetType.find((asset) => asset._id === id);
  //   setItemId(id); // Set the ID of the asset being edited
  //   setModalData(asset); // Populate the form with the asset data
  //   setIsModalOpen(true); // Open the modal
  // };

  const handleAddOrEditAssetType = async (e) => {
    e.preventDefault();
    if (itemId) {
      // Editing existing asset type
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
      // Adding new asset type
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

  const handlePerPageChange = (e) => {
    setCurrentPage(1);
    setPerPage(parseInt(e.target.value, 10));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddAssetType = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/addAssetType`,
        { typeName: newAssetType }
      );
      if (response.data.success) {
        setAssetType([...assetType, response.data.data]);
        toast.success("Asset Type Added Successfully");
        setNewAssetType("");
        toggleModal();
      } else {
        toast.error("Asset Type Addition Unsuccessful");
      }
    } catch (error) {
      console.error("Error Adding Asset Type", error);
      toast.error("Asset Type Addition Unsuccessful");
    }
  };

  return (
    <div className="w-full bg-gray-100  sm:w-full flex items-center justify-center  flex-col ">
      <div className="min-h-screen w-full max-sm:px-2 shadow-md   py-2  flex flex-col 2xl:w-[80%] bg-white   ">
          <h2 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full">
            Asset Type
          </h2>
        <div className="p-4 bg-white border rounded-lg shadow-md mt-4 ">

          <div className="flex flex-row justify-between items-center py-3 bg-white rounded-t-sm">
            <h1 className="text-sm font-semibold text-red-500 px-1"> </h1>
            <button
              onClick={toggleModal}
              className="border-black border px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
            >
              {/* <AiOutlinePlusCircle size={25} className="font-bold text-lg" /> */}
              Add Asset Type
            </button>
          </div>

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
              <div className="flex max-xs:flex-col">
                <span className="max-xs:self-left xs:self-center font-bold mr-2 text-left">
                  Search:
                </span>
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

          <div className="w-full">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="border">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    SNo
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Asset Type Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left  w-[10%]"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assetType.map((asset, index) => (
                  <tr key={asset._id} className="border">
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {currentPage === 1
                        ? index + 1
                        : perPage * (currentPage - 1) + index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {asset.typeName}
                    </td>
                    <td className="px-2.5  whitespace-nowrap text-sm font-medium border border-slate-300">
                      <button
                        className="text-blue-600 hover:text-blue-900 border-r border-gray-300 p-2.5 py-3"
                        onClick={() => handleEditClick(asset._id)}
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 ml-4"
                        onClick={() => handleDelete(asset._id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 ${
                  currentPage === page
                    ? "bg-blue-600 text-white  rounded-full border"
                    : "border border-gray-300 rounded-full hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {itemId ? "Edit Asset Type" : "Add Asset Type"}
            </h2>
            <form onSubmit={handleAddOrEditAssetType}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Asset Type Name:
                </label>
                <input
                  type="text"
                  value={itemId ? modalData.typeName : newAssetType}
                  onChange={(e) =>
                    itemId
                      ? setModalData({ typeName: e.target.value })
                      : setNewAssetType(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  {itemId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
