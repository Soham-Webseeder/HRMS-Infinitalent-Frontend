import { AiFillEye } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import AddEmployee from "./AddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/slices/SidebarSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function ManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [empDetails, setEmpDetails] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const { editEmployeeModal } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, perPage, searchTerm]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`,
        {
          params: {
            page: currentPage,
            limit: perPage,
            search: searchTerm, // Pass the search term to the backend
          },
        }
      );
      if (response.data.success) {
        const data = response.data.data;
        setEmployees(data);
        setTotalPages(response.data.pagination.totalPages); // Handle total pages based on server response
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
        fetchEmployees(); // Refresh employee list after deletion
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
    setCurrentPage(1); // Reset to first page on per page change
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

    // Update total pages based on the filtered data
    const totalFilteredPages = Math.ceil(filtered.length / perPage);
    setTotalPages(totalFilteredPages);
    setCurrentPage(1); // Reset to first page on search
  };


  // const paginatedEmployees = filteredEmployees.length > 0
  // ? filteredEmployees.slice((currentPage - 1) * perPage, currentPage * perPage)
  // : employees.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setFilteredEmployees(employees); // Reset to the original data when search term is cleared
    }
  }, [searchTerm, employees]); // Trigger on search term or employees data change


  return (
    <>
      {editEmployeeModal ? (
        <AddEmployee
          type={"update"}
          updateId={updateId}
          setUpdateId={setUpdateId}
        />
      ) : (
        <div className="bg-zinc-100 p-2 pl-10">
          <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full bg-white">Employee</h1>
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
                    {[5, 10, 15, 20].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
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
            {/* Employee list table */}
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400 text-base">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    SL No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    Email Address
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300  text-left w-[6%]"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary-100 divide-y divide-gray-200">
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      <img
                        src={`${import.meta.env.VITE_APP_IMG_URL}/${employee.photograph}`}
                        alt="Photograph"
                        height={40}
                        width={40}
                        className="object-cover rounded-full" // Added rounded-full for better UI
                        onError={(e) => {
                          e.target.src = "/default-avatar.png"; // Fallback image if the server path fails
                        }}
                      />
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {employee.firstName}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {employee.lastName}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {employee.phone}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {employee.email}
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap border border-slate-300">
                      {employee.country}
                    </td>
                    <td className="whitespace-nowrap text-left text-sm font-medium flex p-1">
                      <div className="w-[33.33%] py-3 border-r border-slate-300 flex justify-center items-center">
                        <button
                          className="text-indigo-500 hover:text-indigo-900"
                          onClick={() => handleEdit(employee._id)}
                        >
                          <FaEdit size={20} />
                        </button>
                      </div>
                      <div className="w-[33.33%] py-3 border-r border-slate-300 flex justify-center items-center">
                        <button
                          className="text-indigo-400 hover:text-indigo-600"
                          onClick={() => handleView(employee._id)}
                        >
                          <AiFillEye size={20} />
                        </button>
                      </div>
                      <div className="w-[33.33%] py-3 flex justify-center items-center">
                        <button
                          className="text-red-500 hover:text-red-900"
                          onClick={() => handleDelete(employee._id)}
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
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
                  className={`px-4 py-2 ${currentPage === page
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
          </div>
        </div>
      )}

      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <div className="bg-white max-h-[90vh] p-6 rounded overflow-y-auto shadow-lg w-1/3">
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
                  src={empDetails.photograph || "path/to/placeholder/image.png"}
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
