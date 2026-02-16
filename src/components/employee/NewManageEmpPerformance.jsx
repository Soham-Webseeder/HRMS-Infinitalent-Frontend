import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar, FaEdit, FaCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import AddEmployeePerformance from "./AddEmployeePerformance";

const NewManageEmployeePerformance = () => {
  const [performance, setPerformance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [itemId, setItemId] = useState("");
  const [totalEmpPerformance, setTotalEmpPerformance] = useState(0);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [calendarData, setCalendarData] = useState({});
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth || "");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/employee/deleteEmpPerformance/${id}`
        );
        if (response.data.success) {
          const updatedPerformance = performance.filter(
            (emp) => emp._id !== id
          );
          setPerformance(updatedPerformance);
          toast.success("Employee Performance Deleted Successfully");
        } else {
          console.error(
            "Error deleting Employee Performance:",
            response.data.message
          );
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
    const selectedPerformance = performance.find((perf) => perf._id === id);
    setEditData(selectedPerformance);
    setItemId(id);
    setShowEditModal(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending edit data:", editData);
      const res = await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/updateEmpPerformance/${itemId}`,
        editData
      );
      if (res.data.success) {
        toast.success("Employee Performance Edited Successfully");
        setShowEditModal(false);
        fetchPerformanceData();
      } else {
        toast.error(
          `Edit Unsuccessful: ${res.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error editing Employee Performance:", error);
      toast.error(
        `Edit Failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );

      if (response.data.success) {
        setEmployees(response.data.data);
        setTotalEmpPerformance(response.data.pagination.totalEmpPerformance);
      } else {
        console.error("Error fetching employees:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // const fetchPerformanceData = async () => {
  //   try {

  //     console.log(selectedMonth.split("-")[0],selectedMonth.split("-")[1])
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmpPerformanceByMonthAndYear`,
  //       {
  //         params: {
  //           page: currentPage,
  //           limit: perPage,
  //           month:selectedMonth.split("-")[1],
  //           year:selectedMonth.split("-")[0]
  //         },
  //       }
  //     );
  //     console.log("Performance Data:", response.data);
  //     if (response.data.success) {
  //       setPerformance(response.data.data);
  //       console.log("Test",response.data)
  //       setTotalPages(response.data.pagination.totalPages);
  //       setTotalEmpPerformance(response.data.pagination.totalEmpPerformance);
  //       toast.success("Employee Performance Fetched Successfully");
  //     } else {
  //       console.error(
  //         "Error Fetching Employee Performance:",
  //         response.data.message
  //       );
  //       setTotalPages(0);
  //       setPerformance([])
  //       setTotalEmpPerformance(0);
  //     }
  //   } catch (error) {
  //     console.error("Error Fetching Employee Performance:", error);
  //     setTotalPages(0);
  //       setPerformance([])
  //       setTotalEmpPerformance(0);
  //   }
  // };

  const fetchPerformanceData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/getAllEmpPerformanceByMonthAndYear`,
        {
          params: {
            page: isSearchActive ? 1 : currentPage, // When search is active, ignore pagination and reset to page 1
            limit: isSearchActive ? totalEmpPerformance : perPage, // If search is active, fetch all data
            month: selectedMonth.split("-")[1],
            year: selectedMonth.split("-")[0],
          },
        }
      );

      console.log("Performance Data:", response.data);
      if (response.data.success) {
        setPerformance(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalEmpPerformance(response.data.pagination.totalEmpPerformance);

        if (!isSearchActive) {
          toast.success("Employee Performance Fetched Successfully");
        }
      } else {
        console.error(
          "Error Fetching Employee Performance:",
          response.data.message
        );
        setTotalPages(0);
        setPerformance([]);
        setTotalEmpPerformance(0);
      }
    } catch (error) {
      console.error("Error Fetching Employee Performance:", error);
      setTotalPages(0);
      setPerformance([]);
      setTotalEmpPerformance(0);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchPerformanceData();
  }, [currentPage, perPage, searchTerm, selectedMonth]);

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


  console.log("Performance Data:", performance);
  console.log("Search Term:", searchTerm);

  // const filteredPerformance = performance.filter((emp) => {
  //   // Check if employeeName is valid and filter based on search term
  //   if (typeof emp.employeeName === "string") {
  //     const nameMatch = emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase());

  //     // Use 'createdAt' to filter by month, converting 'createdAt' to 'YYYY-MM' format
  //     const createdAtDate = new Date(emp.createdAt); // Convert 'createdAt' to a Date object
  //     const empDate = `${createdAtDate.getFullYear()}-${String(createdAtDate.getMonth() + 1).padStart(2, '0')}`; // Format as 'YYYY-MM'

  //     // If selectedMonth is provided, match the 'createdAt' date with selectedMonth
  //     const monthMatch = selectedMonth ? empDate === selectedMonth : true;

  //     // Return true only if both name and month match
  //     return nameMatch && monthMatch;
  //   } else {
  //     console.warn("Invalid employeeName:", emp.employeeName);
  //     return false;
  //   }
  // });

  const filteredPerformance = performance.filter((emp) => {
    if (typeof emp.employeeName === "string") {
      const nameMatch = emp.employeeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const createdAtDate = new Date(emp.createdAt);
      const empDate = `${createdAtDate.getFullYear()}-${String(
        createdAtDate.getMonth() + 1
      ).padStart(2, "0")}`;

      const monthMatch = selectedMonth ? empDate === selectedMonth : true;

      return nameMatch && monthMatch;
    } else {
      console.warn("Invalid employeeName:", emp.employeeName);
      return false;
    }
  });

  console.log("Filtered Performance:", filteredPerformance);
  console.log("Performance:", performance);

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    fetchPerformanceData(); // Re-fetch data with default pagination
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setItemId(""); // Clear the item ID when opening the modal for adding new asset type
      setModalData({ typeName: "" }); // Reset modal data
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Enable search mode
    if (term.trim() !== "") {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  };

  return (
    <>
      <div className=" md:p-6 lg:p-8 bg-white  p-4 w-full">
        <h1 className=" text-xl md:text-2xl font-bold ">Employee</h1>
        <div className="flex justify-between items-center">
          {/* Navigation Links */}
          <div className="flex text-sm text-gray-500">
            <Link
              to="/"
              className="pr-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
            >
              Home
            </Link>
            <Link
              to="/app/employee"
              className="px-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
            >
              Employee
            </Link>
            <Link className="px-1 flex justify-center items-center h-4">
              Manage Employee Performance
            </Link>
          </div>

          {/* Export Button */}
          <button
            className="float-right text-white border-black rounded-full bg-blue-600 px-8 py-1  hover:bg-blue-700 active:bg-white shadow shadow-gray-500"
            onClick={toggleModal}
          >
            Add Employee Performance
          </button>
        </div>

        <Modal isOpen={showModal} onClose={toggleModal}>
          <AddEmployeePerformance setShowModal={setShowModal} />
        </Modal>
        <hr className="mb-4 mt-4 border-t-2 border-gray-300" />
        <div className="border rounded px-4 py-4 bg-gray-100">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
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
              <input
                type="month"
                id="date"
                name="date"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border-2 border-gray-300 rounded-md py-0.5 pl-2 outline-none focus:border-blue-400 w-25% "
              />
            </div>
          </div>

          <div className="overflow-x-auto w-full bg-gray-100">
            <div className="py-4">
              <table className="min-w-full border-separate border-spacing-y-3 bg-gray-100">
                <thead>
                  <tr className="text-sm font-medium text-black">
                    <th className="pl-1 text-left whitespace-nowrap">
                      Employee Id
                    </th>
                    <th className="pl-10 text-left whitespace-nowrap">
                      Employee Name
                    </th>
                    <th className="pl-6 text-left whitespace-nowrap">Note</th>
                    <th className=" text-center whitespace-nowrap">
                      Number Of Stars
                    </th>
                    <th className="pl-15 pr-8 text-end whitespace-nowrap">
                      Action
                    </th>{" "}
                    {/* Adjusted alignment */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-transparent py-0" colSpan="100%">
                      <hr className="w-full bg-gray-300 h-0.5 my-0" />
                    </td>
                  </tr>
                  {filteredPerformance
                    .sort((a, b) => a.empId - b.empId)
                    .map((data) => (
                      <tr
                        key={data._id}
                        className="text-gray-600 text-left w-full bg-white border border-black rounded-lg"
                      >
                        <td className="pl-2 whitespace-nowrap bg-white border-y-2 border-l-2 rounded-l-md text-sm">
                          {data.empId}
                        </td>
                        <td className="pl-12 whitespace-nowrap bg-white border-y-2 text-sm">
                          {data.employeeName}
                        </td>
                        <td className="px-6 whitespace-nowrap bg-white border-y-2 text-sm">
                          {data.note}
                        </td>
                        <td className="px-6 whitespace-nowrap bg-white border-y-2 text-sm">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center">
                              {Array.from(
                                { length: data.numberOfStar },
                                (_, index) => (
                                  <FaStar
                                    key={index}
                                    className="text-yellow-500 inline-block"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="w-25 whitespace-nowrap flex justify-end items-center bg-white border-y-2 rounded-r-md border-r-2 py-2.5 gap-2">
                          <button
                            onClick={() => handleEditClick(data._id)}
                            className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer mr-2"
                            aria-label="Edit"
                          >
                            <FaEdit size={18} />
                          </button>
                          {/* <button
                            onClick={() => handleCalendarClick(data._id)}
                            className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer mr-2"
                            aria-label="Calendar"
                          >
                            <FaCalendarAlt size={15} />
                          </button> */}
                          <button
                            onClick={() => handleDelete(data._id)}
                            className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer mr-2"
                            aria-label="Delete"
                          >
                            <MdDelete size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full"
            >
              &laquo;
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === page
                    ? "text-blue-500 bg-white border-blue-500"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full "
            >
              &gt;
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2  bg-blue-800 text-white border border-gray-300 rounded-full "
            >
              &raquo;
            </button>
          </div> */}
          {!isSearchActive && (
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

      {/* Calendar Modal */}
      {/* {showCalendarModal && (
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
                    value={calendarData.year || ""}
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
      )} */}

      {/* Edit Modal */}
      {showEditModal && (
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
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-6 overflow-y-auto">
              <form onSubmit={handleEdit} className="space-y-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editData.employeeName || ""}
                    onChange={handleEditInputChange}
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editData.lastName || ""}
                    onChange={handleEditInputChange}
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div> */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="empId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee Id <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="empId"
                    name="empId"
                    value={editData.empId || ""}
                    onChange={handleEditInputChange}
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="note"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Note <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="note"
                    name="note"
                    value={editData.note || ""}
                    onChange={handleEditInputChange}
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="numberOfStar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Stars <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="numberOfStar"
                    name="numberOfStar"
                    value={editData.numberOfStar || ""}
                    onChange={handleEditInputChange}
                    min="1"
                    max="5"
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Month & Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="year"
                    name="year"
                    value={editData.year || ""}
                    onChange={handleEditInputChange}
                    className="focus:ring-blue-500 p-1.5 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
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
      <div id="modal-root"></div>
    </>
  );
};

export default NewManageEmployeePerformance;
