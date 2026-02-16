import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const ManageEmployeePerformance = () => {
  const [performance, setPerformance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [itemId, setItemId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmpPerformance, setTotalEmpPerformance] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [calendarData, setCalendarData] = useState({});

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/employee/deleteEmpPerformance/${id}`);
        if (response.data.success) {
          const updatedPerformance = performance.filter(emp => emp._id !== id);
          setPerformance(updatedPerformance);
          toast.success("Employee Performance Deleted Successfully");
        } else {
          console.error("Error deleting Employee Performance:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting Employee Performance:", error);
      }
    }
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleEditClick = (id) => {
    const selectedPerformance = performance.find(perf => perf._id === id);
    setModalData(selectedPerformance);
    setItemId(id);
    setShowModal(true);
  };

  const handleEdit = async () => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/employee/updateEmpPerformance/${itemId}`, modalData);
      if (res.data.success) {
        toast.success("Employee Performance Edited Successfully");
        setShowModal(false);
        const updatedPerformance = performance.map(perf =>
          perf._id === itemId ? { ...perf, ...modalData } : perf
        );
        setPerformance(updatedPerformance);
      } else {
        toast.error("Employee Performance Edit Unsuccessful");
      }
    } catch (error) {
      console.error("Error editing Employee Performance:", error);
      toast.error("Employee Performance Edit Unsuccessful");
    }
  };

  const handleCalendarClick = (id) => {
    setCalendarData({
      ...performance.find(perf => perf._id === id),
      id
    });
    setShowCalendarModal(true);
  };

  const handleCalendarInputChange = (e) => {
    setCalendarData({
      ...calendarData,
      year: e.target.value
    });
  };

  const handleCalendarSave = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_APP_BASE_URL}/employee/updateEmpPerformance/${calendarData._id}`, {
        year: calendarData.year,
      });
      toast.success("Date Updated Successfully");
      setShowCalendarModal(false);
      const updatedPerformance = performance.map(perf =>
        perf._id === calendarData._id ? { ...perf, year: calendarData.year } : perf
      );
      setPerformance(updatedPerformance);
    } catch (error) {
      console.error("Error saving calendar date:", error);
      toast.error("Error updating date");
    }
  };

  const fetchEmployeeData = async (search = "") => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`, {
        params: {
          page: currentPage,
          limit: perPage,
          search: search,
        },
      });
      console.log('Employee Data:', response.data);
      setEmployees(response.data.data);
      // if (response.data.success) {
      //   setEmployees(response.data.data);
      // } else {
      //   console.error("Error fetching employees:", response.data.message);
      // }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmpPerformance`, {
        params: {
          page: currentPage,
          limit: perPage,
        },
      });
      console.log('Performance Data:', response.data);
      if (response.data.success) {
        setPerformance(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalEmpPerformance(response.data.pagination.totalEmpPerformance);
        toast.success("Employee Performance Fetched Successfully");
      } else {
        console.error("Error Fetching Employee Performance:", response.data.message);
      }
    } catch (error) {
      console.error("Error Fetching Employee Performance:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData(searchTerm);
    fetchPerformanceData();
  }, [currentPage, perPage, searchTerm]);

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredPerformance = performance.filter(emp =>
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log('Filtered Performance:', filteredPerformance);

  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full mx-auto">
          <h1 className="text-2xl bg-white font-semibold mb-4 p-1 rounded-full shadow-lg w-full text-center ">
            Manage Employee Performance
          </h1>
        <div className="container mx-auto bg-white p-4 shadow rounded overflow-x-auto">
          <div className="border rounded px-4 py-4">
            <div className="flex space-x-2 justify-between">
              <div className="relative">
                <label className="mr-2 text-sm">Show:</label>
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
                <span className="text-sm ml-2">entries</span>
              </div>
              <div className="flex">
                <span className="self-center font-bold mr-2">Search:</span>
                <input
                  type="text"
                  placeholder="Search by Employee Performance"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[3%]">SL</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[6%]">First Name</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[6%]">Last Name</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[6%]">Employee Id</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[6%]">Note</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[10%]">Number Of Stars</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[6%]">Month & Year</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[3%]">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((data, index) => {
                const employee = employees.find(emp => emp._id === data.empId.toString()) || {};
                return (
                  <tr key={data._id}>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {index + 1}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {data.firstName}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {data.lastName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {data.empId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {data.note}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {data.numberOfStar}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {data.year}
                    </td>
                    <td className="whitespace-nowrap text-left text-sm font-medium flex p-1">
                      <div className="w-[33%] border-slate-300 py-3 text-center">
                        <button
                          onClick={() => handleEditClick(data._id)}
                          className="text-indigo-500 hover:text-indigo-900 mr-2"
                        >
                          <FaEdit size={20} />
                        </button>
                      </div>
                      <div className="w-[33%] border-l border-slate-300 py-3 text-center">
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="text-red-500 hover:text-red-900 mr-2"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                      <div className="w-[33%] border-l border-slate-300 py-3 text-center">
                        <button
                          onClick={() => handleCalendarClick(data._id)}
                          className="text-green-500 hover:text-green-900"
                        >
                          <FaCalendarAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 ${currentPage === page
                  ? "bg-blue-600 border rounded-full text-white"
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

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-lg sm:max-w-3xl sm:w-full mx-4">
            <div className="bg-gray-200 px-4 sm:px-6 py-6 sm:py-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900">
                  Select Date
                </h3>
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 px-4 sm:px-6 py-6 sm:py-8">
              <form onSubmit={handleCalendarSave} className="space-y-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="calendar-date"
                    className="block text-sm sm:text-md font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="calendar-date"
                    className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                    value={calendarData.year || ''}
                    onChange={handleCalendarInputChange}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCalendarModal(false)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Save Date
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-lg sm:max-w-3xl sm:w-full max-h-[80vh]">
            <div className="bg-gray-200 px-4 py-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Employee Performance
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-6 overflow-y-auto">
              <form onSubmit={handleEdit} className="space-y-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    onChange={handleModalInputChange}
                    placeholder="First Name"
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    onChange={handleModalInputChange}
                    placeholder="Last Name"
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="empId" className="block text-sm font-medium text-gray-700">
                    Employee Id <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="empId"
                    name="empId"
                    onChange={handleModalInputChange}
                    placeholder="Employee Id"
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    Note <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="note"
                    name="note"
                    onChange={handleModalInputChange}
                    placeholder="Note"
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="numberOfStar" className="block text-sm font-medium text-gray-700">
                    Number of Stars <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="numberOfStar"
                    name="numberOfStar"
                    onChange={handleModalInputChange}
                    placeholder="Number Of Stars"
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                    Month & Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="year"
                    name="year"
                    onChange={handleModalInputChange}
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageEmployeePerformance;

