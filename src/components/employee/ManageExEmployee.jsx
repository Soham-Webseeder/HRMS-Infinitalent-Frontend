import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/slices/SidebarSlice";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddEmployee2 from "../employeeComponents/AddEmployee2";
import ExcelExport from "../ExcelExport";
import EmployeeImport from "../EmployeeImport";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageExEmployee() {
  const [employees, setEmployees] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [empDetails, setEmpDetails] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showAddEmployee2, setShowAddEmployee2] = useState(false);
  const [statusOptions, setStatusOptions] = useState([
    "Active",
    "Terminated",
    "Resigned",
    "Notice Period",
  ]);

  const { editEmployeeModal } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, perPage, searchTerm]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-ex-employees`,
        {
          params: {
            page: currentPage,
            limit: perPage,
            name: searchTerm,
          },
        }
      );
      if (response.data.success) {
        const data = response.data.data;
        console.log(data)
        setEmployees(data);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        console.error("Error fetching employees:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEdit = (id) => {
    setUpdateId(id);
    dispatch(setModal(true));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/deleteEmployee/${id}`
        );
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(
        ` ${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${id}`
      );
      setEmpDetails(response.data.data);
      setShowModel(true);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (data = employees) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((emp) =>
      emp.firstName?.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredEmployees(filtered);

    const totalFilteredPages = Math.ceil(filtered.length / perPage);
    setTotalPages(totalFilteredPages);
    setCurrentPage(1);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Update the status in the backend
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/updateEmploymentStatus/${id}`,
        { employmentStatus: newStatus }
      );

      // Check if the API response indicates success
      if (response.data) {
        // Update local state immutably
        const updatedEmployees = employees.map((employee) =>
          employee._id === id
            ? { ...employee, employmentStatus: newStatus }
            : employee
        );

        // Log the updated state for debugging
        console.log("Updated Employees:", updatedEmployees);

        setEmployees(updatedEmployees);
        fetchEmployees();
        toast.success(`Status Updated Successfully!`);
      } else {
        console.error(
          "Error updating employment status:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(
        "Error updating employment status:",
        error.response?.data || error.message || "Unknown error"
      );
    }
  };

  // const paginatedEmployees = filteredEmployees.length > 0
  // ? filteredEmployees.slice((currentPage - 1) * perPage, currentPage * perPage)
  // : employees.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/updateUserRole/${userId}`, // Assuming the employee ID is passed
        { newRole } // Sending the new role in the request body
      );
      if (response.data.success) {
        alert("User role updated successfully.");
        // Optionally, update the local state to reflect the change
        const updatedEmployees = employees.map((employee) =>
          employee._id === userId ? { ...employee, role: newRole } : employee
        );
        setEmployees(updatedEmployees);
      } else {
        alert("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Server error. Could not update role.");
    }
  };

  return (
    <>
      {editEmployeeModal ? (
        <AddEmployee
          type={"update"}
          updateId={updateId}
          setUpdateId={setUpdateId}
        />
      ) : showAddEmployee2 ? (
        <AddEmployee2 onClose={() => setShowAddEmployee2(false)} />
      ) : (
        <div className="p-4 md:p-6 lg:p-8">
          <h1 className=" text-xl md:text-2xl font-bold mb-2">
            Ex Employee Management
          </h1>
          <div className="w-full mb-4 pb-4 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between">
            <div className="flex text-sm text-gray-500 mb-3">
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
                Ex Employee Management
              </Link>
            </div>
            {/* <button
              onClick={() => setShowAddEmployee2(true)}
              className="bg-blue-500 mr-2 text-white px-6 py-2 rounded-full hover:bg-blue-600 ml-auto"
            >
              Add Employee
            </button>
            <ExcelExport fileName="Employee_Data" />
            <EmployeeImport /> */}
            <hr className="my-4" />
          </div>

          <div className="border rounded px-4 py-4 bg-gray-100">
            <div className="flex justify-between items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                  {[50, 100, 150, 200].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-sm font-medium text-black">
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      SL
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Image
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Employee Id
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Employee Name
                    </th>
                    {/* <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Last Name
                    </th> */}
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Phone
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Email Address
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Country
                    </th>

                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Role
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Status
                    </th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((data, index) => (
                    <tr key={data._id} className="text-gray-600 text-left">
                      <td className="px-2 py-1">
                        {currentPage === 1
                          ? index + 1
                          : (currentPage - 1) * perPage + index + 1}
                      </td>
                      <td className="px-2 py-1">
                        {data.photograph ? (
                          <img
                            src={data.photograph}
                            alt="Employee"
                            className="h-8 w-8 object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 bg-gray-300"></div>
                        )}
                      </td>
                      <td className="px-2 py-1">{data.employeeType}-{data.empId}</td>

                      <td className="px-2 py-1">{data.firstName} {data.lastName}</td>
                      <td className="px-2 py-1">{data.phone}</td>
                      <td className="px-2 py-1">{data.email}</td>
                      <td className="px-2 py-1">{data.country}</td>
                      <td className="px-2 py-1">
                        <select
                          value={data.role}
                          onChange={(e) =>
                            handleRoleChange(data._id, e.target.value)
                          }
                          className="border border-gray-300 rounded p-1"
                        >
                          {["employee", "hr", "admin"].map((roleOption) => (
                            <option key={roleOption} value={roleOption}>
                              {roleOption}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-1">
                        <select
                          key={data._id + data.employmentStatus} // Unique key for re-rendering
                          value={data.employmentStatus}
                          onChange={(e) =>
                            handleStatusChange(data._id, e.target.value)
                          }
                          className="border border-gray-300 rounded p-1"
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-1 flex justify-around items-center">
                        <button
                          onClick={() => handleEdit(data._id)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleView(data._id)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <FaEye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <MdDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </div>
      )}
      {showModel && (
        <div
          className="fixed inset-0 mt-12 flex items-center justify-center bg-black bg-opacity-25"
          onClick={() => setShowModel(false)} // Close when clicking outside
        >
          <div
            className="bg-white max-h-[90vh] p-6 rounded overflow-y-auto shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Employee Details</h2>
              <button
                onClick={() => setShowModel(false)}
                className="text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={
                    empDetails.photograph ||
                    "https://www.w3schools.com/w3images/avatar2.png"
                  }
                  alt="Employee"
                  className="w-32 h-32 mx-auto rounded-full border-2 border-gray-300 mb-4 object-cover"
                />
              </div>

              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-1/3 text-base">
                  Sl no :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {/* Employee serial number if available */}
                </p>
              </div>

              <div className="flex items-center">
                <label className="block font-medium text-gray-700 w-1/3 text-base">
                  First Name :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {empDetails.firstName}
                </p>
              </div>

              <div className="flex items-center">
                <label className="block font-medium text-gray-700 w-1/3 text-base">
                  Last Name :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {empDetails.lastName}
                </p>
              </div>

              <div className="flex items-center">
                <label className="block font-medium text-gray-700 w-1/3 text-base">
                  Email :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {empDetails.email}
                </p>
              </div>

              <div className="flex items-center">
                <label className="block font-medium text-gray-700 w-1/3 text-base">
                  Phone :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {empDetails.phone}
                </p>
              </div>

              <div className="flex items-center">
                <label className="block font-medium text-gray-700 w-1/3 text-base">
                  Country :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {empDetails.country}
                </p>
              </div>

              <div className="flex items-center">
                <label className="block font-medium text-gray-700 w-1/3 text-base">
                  Address :
                </label>
                <p className="w-2/3 p-2 border-gray-300 rounded text-base">
                  {empDetails.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
