import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

export default function NewDepartment() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [department, setDepartment] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState("");
  const [editDepartmentName, setEditDepartmentName] = useState("");
  const [companyId, setCompanyId] = useState(localStorage.getItem("companyId"));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCompanyId = localStorage.getItem("companyId");
      setCompanyId(updatedCompanyId);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllDepartment`,
        {
          params: {
            page: { currentPage },
            limit: { perPage },
            name: searchTerm,
          },
        }
      );

      if (response.data.success) {
        const departmentsArray = response.data.response;
        const allDepartments = departmentsArray?.map((departmentObj) => ({
          id: departmentObj._id,
          department: departmentObj.department.title,
          employeeCount: departmentObj.employeeCount,

          // Access title here
        }));

        // setDepartment(allDepartments);
        setFilteredDepartments(allDepartments); // Initialize filteredDepartments with all departments
        setTotalPages(Math.ceil(allDepartments.length / perPage));

        console.log(
          "Departments Fetched Successfully...",
          response.data.message
        );
      } else {
        console.log("Error Fetching Departments", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching department data:", error);
      // toast.error("Error fetching department data");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [perPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchDepartments();
  }, [searchTerm, department]);

  const toggleModal = () => {
    setShowModal(!showModal);
    setDepartmentName("");
  };

  const handleDepartmentSubmit = (e) => {
    e.preventDefault();
    const departmentData = {
      company: companyId,
      department: {
        title: departmentName,
      },
      division: [],
    };

    axios
      .post(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/company/createDepartment/${companyId}`,
        departmentData
      )
      .then((response) => {
        toast.success("Department Successfully Created!");
        toggleModal();
        fetchDepartments(); // Re-fetch all departments after adding
      })
      .catch((error) => {
        console.error("Error creating department:", error);
        toast.error(error.message); // Display the error message
      });
  };

  const toggleEditModal = (id, name) => {
    setShowEditModal(!showEditModal);
    setEditDepartmentId(id);
    setEditDepartmentName(name);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const departmentData = {
      company: companyId,
      department: {
        title: editDepartmentName,
      },
      division: [],
    };

    axios
      .patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/company/updateDepartment/${editDepartmentId}`,
        departmentData
      )
      .then((response) => {
        toast.success("Department Successfully Updated!");
        toggleEditModal();
        fetchDepartments(); // Re-fetch all departments after updating
      })
      .catch((error) => {
        console.error("Error updating department:", error);
        toast.error(error.message); // Display the error message
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirmDelete) {
      axios
        .delete(
          `${import.meta.env.VITE_APP_BASE_URL}/company/deleteDepartment/${id}`
        )
        .then((response) => {
          toast.success("Department Successfully Deleted!");
          fetchDepartments(); // Re-fetch all departments after deleting
        })
        .catch((error) => {
          toast.error(error.message);
          console.error("Error deleting department:", error);
        });
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
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Paginate filtered departments
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className=" w-full  min-h-screen sm:px-4  overflow-x-hidden flex flex-col relative items-center pt-1">
      <div>
        <Toaster />
      </div>
      <div className="bg-white  p-2  w-full ">
        <h1 className=" text-2xl font-semibold mt-1">Department</h1>

        <div className="flex justify-between items-center ">
          <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
            <NavLink to="/" className="cursor-pointer hover:text-slate-800">
              Home
            </NavLink>
            <span>|</span>
            <NavLink
              to="/app/companyProfile"
              className="cursor-pointer hover:text-slate-800"
            >
              Company Profile
            </NavLink>
            <span>|</span>
            <span className="cursor-default hover:text-slate-800">
              Department
            </span>
          </div>

          <button
            onClick={toggleModal}
            className="border-black  px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 sm:mr-4  max-sm:text-sm md:text-base  gap-2"
          >
            Add New
          </button>
        </div>

        <hr className="my-4  border-gray-300" />

        <div className="flex  flex-col  justify-between border p-4 bg-gray-100 space-y-3  rounded-md ">
          <div className="flex space-x-2 justify-between items-center">
            <div className="flex border  hover:ring-2  border-gray-300 rounded-full bg-white items-center pr-2 hover:ring-blue-500">
              <input
                type="text"
                placeholder="Search By Name"
                value={searchTerm}
                className="px-4 max-xs:w-[9rem] text-sm  py-1 sm:py-1.5 rounded-full outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <IoSearch
                size={30}
                className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 text-gray-500"
              />
            </div>

            <div className="relative text-sm">
              <label className="mr-2 ">Per Page</label>
              <select
                onChange={handlePerPageChange}
                value={perPage}
                className="ring-1 focus:ring-2 ring-gray-300 rounded-full py-1 font-semibold px-2 text-sm outline-none focus:ring-blue-500 cursor-pointer "
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            {filteredDepartments.length > 0 ? (
              <table className=" border-separate border-spacing-y-3 w-full">
                <thead>
                  <tr>
                    <th className=" text-left py-2  font-medium  whitespace-nowrap border-b border-gray-300">
                      Department Name
                    </th>
                    <th
                      scope="col"
                      className="  text-left py-2  font-medium  whitespace-nowrap border-b border-gray-300"
                    >
                      Employees
                    </th>
                    <th
                      scope="col"
                      className="w-16  text-left py-2  font-medium  whitespace-nowrap border-b border-gray-300"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDepartments.map((dept, index) => (
                    <tr
                      key={dept.id}
                      className="text-gray-600 text-left w-full rounded-xl border border-black  "
                    >
                      <td
                        className="pl-2 whitespace-nowrap    bg-white border-y border-l  "
                        rowSpan={1}
                      >
                        {dept.department}
                      </td>

                      <td
                        className="  whitespace-nowrap  bg-white border-y"
                        rowSpan={1}
                      >
                        {dept.employeeCount}
                      </td>

                      <td
                        className="w-16 whitespace-nowrap  flex  items-center gap-3  bg-white border-y border-r py-3 "
                        rowSpan={1}
                      >
                        <FaEdit
                          size={18}
                          onClick={() =>
                            toggleEditModal(dept.id, dept.department)
                          }
                          className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                        />

                        <MdDelete
                          size={18}
                          onClick={() => handleDelete(dept.id)}
                          className="text-gray-500 hover:text-gray-900 active:text-gray-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : companyId ? (
              <div className="px-6 py-4 text-sm text-gray-500">
                No department yet. Please add a department.
              </div>
            ) : (
              <span className="loader"></span>
            )}
          </div>

          {filteredDepartments.length > 0 && (
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

          {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center sm:w-full ">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-lg sm:max-w-3xl sm:w-full mx-4">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl leading-6 font-medium text-gray-900">
                      Department Form
                    </h3>
                    <button
                      onClick={toggleModal}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                </div>
                <div className="px-4 py-6 ">
                  <form onSubmit={handleDepartmentSubmit} className="space-y-4">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="departmentName"
                        className="block text-md font-medium text-gray-700"
                      >
                        Department Name
                      </label>
                      <input
                        type="text"
                        name="departmentName"
                        placeholder="Enter department name"
                        id="departmentName"
                        value={departmentName}
                        required
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="mt-1  focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-md border border-gray-200 sm:text-sm  rounded-full"
                      />
                    </div>
                    <div className="flex justify-end gap-3 ">
                      <button
                        type="submit"
                        className="bg-blue-500 py-2 px-4 rounded-full shadow-md text-white hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={toggleModal}
                        className="bg-gray-500 p-2 rounded-full shadow-md text-white hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center ">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full md:max-w-lg sm:max-w-3xl sm:w-full">
            <div className="bg-gray-200 px-6 py-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Edit Department
                </h3>
                <button
                  onClick={toggleEditModal}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-8">
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="editDepartmentName"
                    className="block text-md font-medium text-gray-700"
                  >
                    Department Name
                  </label>
                  <input
                    type="text"
                    name="editDepartmentName"
                    placeholder="Enter department name"
                    id="editDepartmentName"
                    value={editDepartmentName}
                    onChange={(e) => setEditDepartmentName(e.target.value)}
                    className="mt-1  focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-full"
                  />
                </div>
                <div className="flex justify-end gap-3 ">
                  <button
                    type="button"
                    onClick={toggleEditModal}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Cancel
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
    </div>
  );
}
