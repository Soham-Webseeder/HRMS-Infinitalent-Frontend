import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";

const Holiday = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [from, setFromDate] = useState("");
  const [to, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [holidays, setHolidays] = useState([]);
  const [editHolidayId, setEditHolidayId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    fetchHolidays();
  }, [currentPage,perPage]);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllHolidays?page=${currentPage}&limit=${perPage}`
      );
      setHolidays(response.data.data);
      setTotalPages(response.data.pagination.totalPages);

    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleEditModal = (holiday) => {
    if (holiday) {
      setEditHolidayId(holiday._id);
      setHolidayName(holiday.holidayName);
      setFromDate(holiday.from);
      setToDate(holiday.to);
      setNumberOfDays(holiday.numberOfDays);
    }
    setShowEditModal(!showEditModal);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    calculateNumberOfDays(e.target.value, to);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    calculateNumberOfDays(from, e.target.value);
  };

  const calculateNumberOfDays = (from, to) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
    setNumberOfDays(differenceInDays);
  };

  const handleReset = () => {
    setHolidayName("");
    setFromDate("");
    setToDate("");
    setNumberOfDays(0);
    setEditHolidayId(null);
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHoliday = {
      holidayName,
      from,
      to,
      numberOfDays,
    };


    try {
      if (editHolidayId) {
        await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/updateHoliday/${editHolidayId}`,
          newHoliday
        );
        toast.success("Holiday Successfully Updated!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/createHoliday`,
          newHoliday
        );
        toast.success("Holiday Successfully Created!");
      }
      fetchHolidays();
      handleReset();
    } catch (error) {
      console.error("Error submitting holiday:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/deleteHoliday/${id}`
      );
      fetchHolidays();
      toast.success("Holiday Successfully Deleted!");
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10)); // Convert value to integer
    setCurrentPage(1); // Reset to first page when changing per page
  };

  const filteredHoliday = holidays.filter(
    (holiday)=>{
      if (
        holiday &&
        holiday.holidayName &&
        typeof holiday.holidayName === "string"
      ) {
        return holiday.holidayName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
  
      return false;
   
    }
  )

  return (
    <div className="w-full sm:w-full flex justify-center mt-3 pt-1">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col md:w-[89%] w-[98%] sm:px-3 px-3 sm:w-[98%] pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <h1 className="text-3xl font-bold p-1">Leave</h1>
        <div className="flex flex-row justify-between items-center py-3 bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1">
            Leave/Holiday
          </h1>
        </div>
        <div className="flex w-full justify-end md:pr-12 sm:pr-5 pr-8 mt-2 ">
          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white flex gap-2 items-center text-center p-2 rounded-md"
          >
            <AiFillPlusCircle size={20} /> Add more Holiday
          </button>
        </div>
        <div className="p-4 px-8 flex items-center justify-center overflow-x-auto mt-2">
          <div className="overflow-x-auto w-full">
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
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Holiday Name
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    TO
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Number of Days
                  </th>
                  <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHoliday.map((holiday, index) => (
                  <tr key={holiday._id}>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {holiday.holidayName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {holiday.from}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {holiday.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {Math.abs(holiday.numberOfDays)}
                    </td>

                    <td className="border p-2 flex items-center gap-4 w-full py-6 ">
                        <button
                          onClick={() => toggleEditModal(holiday)}
                          className="text-indigo-500 hover:text-indigo-900 "
                          >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(holiday._id)}
                          className="text-red-500 hover:text-red-900"
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
        <div className="modal-container fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="modal bg-white rounded-lg shadow-lg w-full md:max-w-lg">
            <div className="modal-content p-6">
              <span
                className="close absolute top-0 right-0 m-4 cursor-pointer"
                onClick={toggleModal}
              >
                &times;
              </span>
              <h2 className="text-2xl font-bold mb-4">Add Holiday</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="holidayName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Holiday Name
                  </label>
                  <input
                    type="text"
                    id="holidayName"
                    name="holidayName"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="from"
                    className="text-sm font-medium text-gray-700"
                  >
                    From
                  </label>
                  <input
                    type="date"
                    id="from"
                    name="from"
                    value={from}
                    onChange={handleFromDateChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="to"
                    className="text-sm font-medium text-gray-700"
                  >
                    To
                  </label>
                  <input
                    type="date"
                    id="to"
                    name="to"
                    value={to}
                    onChange={handleToDateChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="numberOfDays"
                    className="text-sm font-medium text-gray-700"
                  >
                    Number of Days
                  </label>
                  <input
                    type="text"
                    id="numberOfDays"
                    name="numberOfDays"
                    value={numberOfDays}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal-container fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="modal bg-white rounded-lg shadow-lg w-full md:max-w-md">
            <div className="modal-content p-6">
              <span
                className="close absolute top-0 right-0 m-4 cursor-pointer"
                onClick={toggleEditModal}
              >
                &times;
              </span>
              <h2 className="text-2xl font-bold mb-4">Update Holiday</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="holidayName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Holiday Name
                  </label>
                  <input
                    type="text"
                    id="holidayName"
                    name="holidayName"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="from"
                    className="text-sm font-medium text-gray-700"
                  >
                    From
                  </label>
                  <input
                    type="date"
                    id="from"
                    name="from"
                    value={from}
                    onChange={handleFromDateChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="to"
                    className="text-sm font-medium text-gray-700"
                  >
                    To
                  </label>
                  <input
                    type="date"
                    id="to"
                    name="to"
                    value={to}
                    onChange={handleToDateChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="numberOfDays"
                    className="text-sm font-medium text-gray-700"
                  >
                    Number of Days
                  </label>
                  <input
                    type="text"
                    id="numberOfDays"
                    name="numberOfDays"
                    value={numberOfDays}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    readOnly
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holiday;
