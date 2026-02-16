import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Modal = ({ showModal, onClose, onSave, value, onChange }) => {
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (value.trim() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    setError(false);
    onSave();
    toast.success("Designation saved successfully!");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-4 py-6 rounded-lg shadow-lg md:max-w-lg sm:w-full w-full mx-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            Designation Form
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-600"
          >
            <RxCross2 />
          </button>
        </div>
        <label
          htmlFor="departmentName"
          className="block text-md font-medium text-gray-700 mb-4 mt-8"
        >
          Designation Name
        </label>
        <input
          type="text"
          placeholder="Designation Name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-md border border-gray-200 sm:text-sm mb-4 rounded-full"
          required
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">
            Designation Name is required
          </p>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-500 py-2 px-4 rounded-full shadow-md text-white hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 p-2 rounded-full shadow-md text-white hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function NewDesignation() {
  const [designationFields, setDesignationFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newFieldInput, setNewFieldInput] = useState("");
  const companyId = localStorage.getItem("companyId");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/company/getAllDesignations/?page=${currentPage}&limit=${perPage}&name=${searchTerm}`
      );

      const { response: data, pagination } = response.data;

      if (Array.isArray(data)) {
        setDesignationFields(
          data.map((designation) => ({
            id: designation._id,
            value: designation.name,
          }))
        );
      } else {
        console.error("Expected an array but received:", data);
      }

      setTotalPages(pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddOrUpdateField = async () => {
    let apiUrl, requestData;

    if (editMode) {
      apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/company/updateDesignation/${editId}`;
      requestData = { name: newFieldInput.trim() };
    } else {
      apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/company/createDesignation/${companyId}`;
      requestData = { name: newFieldInput.trim() };
    }

    try {
      await axios({
        method: editMode ? "patch" : "post",
        url: apiUrl,
        data: requestData,
      });

      setShowModal(false);
      setEditMode(false);
      setEditId(null);
      setNewFieldInput("");
      fetchData();
    } catch (error) {
      console.error(
        `Error ${editMode ? "updating" : "adding"} designation:`,
        error
      );
      toast.error(`Error ${editMode ? "updating" : "adding"} designation`);
    }
  };

  const handleDeleteField = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this designation?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/company/deleteDesignation/${id}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting designation:", error);
      toast.error("Error deleting designation");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setNewFieldInput("");
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

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Toaster />

      {/* Header Section */}
      <div className="w-full mb-4 pb-4 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Designation</h1>
          <div className="flex text-sm w-fit text-gray-500 mt-4 gap-1">
            <Link
              to="/"
              className="cursor-pointer hover:text-slate-800 transition-colors"
            >
              Home
            </Link>
            <span>|</span>
            <Link
              to="/app/companyProfile"
              className="cursor-pointer hover:text-slate-800 transition-colors"
            >
              Company Profile
            </Link>
            <span>|</span>
            <span className="cursor-pointer hover:text-slate-800 transition-colors">
              Designation
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            setShowModal(true);
            setEditMode(false);
            setEditId(null);
            setNewFieldInput("");
          }}
          className="border-blue-600 px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 sm:text-xs text-xs md:text-base flex items-center gap-2"
        >
          Add New
        </button>
      </div>

      <hr className="my-4" />

      <div className="border rounded px-4 py-4 bg-gray-100">
        <Modal
          showModal={showModal}
          onClose={handleCancel}
          onSave={handleAddOrUpdateField}
          value={newFieldInput}
          onChange={setNewFieldInput}
        />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-x-4 sm:space-y-0 overflow-auto">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal pr-10"
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
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="overflow-x-auto">
            <table className="border-separate border-spacing-y-3 w-full bg-gray-100">
              <thead>
                <tr className="text-gray-600 text-left sm:text-lg border-b-2 border-gray-300">
                  <th className="text-left font-medium whitespace-nowrap border-b-2 border-gray-300">
                    SL No
                  </th>
                  <th className="text-left font-medium whitespace-nowrap border-b-2 border-gray-300">
                    Designation Name
                  </th>
                  <th className="w-16 text-left font-medium whitespace-nowrap border-b-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {designationFields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="text-gray-600 text-left sm:text-lg"
                  >
                    <td className="pl-2 whitespace-nowrap bg-white border-y-2 border-l-2 rounded-l-md">
                      {currentPage === 1
                        ? index + 1
                        : (currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="whitespace-nowrap bg-white border-y-2">
                      {field.value}
                    </td>
                    <td className="w-16 whitespace-nowrap flex items-center gap-3 bg-white border-y-2 rounded-r-md border-r-2 py-3">
                      <FaEdit
                        size={20}
                        onClick={() => {
                          setEditMode(true);
                          setEditId(field.id);
                          setNewFieldInput(field.value);
                          setShowModal(true);
                        }}
                        className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                      />
                      <MdDelete
                        size={20}
                        onClick={() => handleDeleteField(field.id)}
                        className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Component */}
        {designationFields.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
