import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCheck, AiOutlinePlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ showModal, onClose, onSave, value, onChange }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white px-4 py-6  rounded-lg shadow-lg md:max-w-lg  sm:w-full w-full mx-4">
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
          className="mt-1  focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-md border border-gray-200 sm:text-sm mb-4  rounded-full"
        />
        <div className="flex justify-end gap-3 ">
          <button
            onClick={onSave}
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

export const Designation = () => {
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
  }, [currentPage, perPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/company/getAllDesignations/?page=${currentPage}&limit=${perPage}&name=${searchTerm}`
      );

      // Log the response data for debugging
      console.log("API Response:", response.data);

      // Extract the data from the response
      const { response: data, pagination } = response.data;

      if (Array.isArray(data)) {
        // Map the data to the desired format
        setDesignationFields(
          data.map((designation) => ({
            id: designation._id,
            value: designation.name,
          }))
        );
      } else {
        console.error("Expected an array but received:", data);
      }

      // Set total pages based on the pagination information
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchData()
  }, [searchTerm]);

  // const filteredDesignation = designationFields.filter((dept) =>
  //   dept.value.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (
    <div className="w-full  flex items-center justify-center mt-3 pt-1 flex-col">
      <Toaster />

      <div className="p-1  w-full ">
        <h1 className="text-2xl border rounded-full  p-1 text-center font-bold shadow-md ">Designation</h1>
        </div>
      <div className="flex flex-col w-full p-2 2xl:w-[80%] pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">

        <div className="flex flex-row justify-between items-center py-3 bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1"> </h1>
          <button
            onClick={() => {
              setShowModal(true);
              setEditMode(false);
              setEditId(null);
              setNewFieldInput("");
            }}
            className="border-black border px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
          >
             Add New
          </button>
        </div>

        <Modal
          showModal={showModal}
          onClose={handleCancel}
          onSave={handleAddOrUpdateField}
          value={newFieldInput}
          onChange={setNewFieldInput}
        />

        <div className="border rounded px-4 py-4 ">
          <div className="flex space-x-2 justify-between mb-4">
            <div className="relative">
              <label className="mr-2 text-sm">Show</label>
              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="border rounded p-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
             
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                {/* <IoMdArrowDropdown className="w-4 h-4 text-gray-400" /> */}
              </div>
              {/* <span className="text-sm ml-2">entries</span> */}
            </div>
            <div className="flex">
              <span className="self-center font-bold mr-2">Search:</span>
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <div className=" w-full">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 w-[6%]">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Designation Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 w-[10%]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {designationFields.map((field, index) => (
                  <tr key={field.id}>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                    {currentPage === 1?index+1:(currentPage-1)*perPage+index+1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {field.value}
                    </td>
                    <td className="whitespace-nowrap text-left text-sm font-medium flex">
                      <div className="w-[50%] border-r border-slate-300 py-3 text-center">
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setEditId(field.id);
                            setNewFieldInput(field.value);
                            setShowModal(true);
                          }}
                          className="text-indigo-500 hover:text-indigo-900 mr-2"
                        >
                          <FaEdit size={20} />
                        </button>
                      </div>
                      <div className="w-[50%] py-3 text-center">
                        <button
                          onClick={() => handleDeleteField(field.id)}
                          className="text-red-500 hover:text-red-900"
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
        </div>

        {/* Pagination Component */}
        {designationFields.length > 0 && (
          <div className="flex justify-end mt-2 space-x-2 p-3">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 ${
                  currentPage === page
                    ? "bg-blue-600 text-white rounded-full"
                    : "border border-gray-300 rounded-full hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
