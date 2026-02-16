import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Designation } from "./Designation";

export const Department = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [department, setDepartment] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [editDepartmentId, setEditDepartmentId] = useState("");
  const [editDepartmentName, setEditDepartmentName] = useState("");
  
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
            page: {currentPage},
            limit: {perPage},
            name:searchTerm
          },
        }
      );

      if (response.data.success) {
        const departmentsArray = response.data.response;
        const allDepartments = departmentsArray?.map((departmentObj) => ({
          id: departmentObj._id,
          department: departmentObj.department.title, // Access title here
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

  

  const handlePerPageChange = (e) => {
    setCurrentPage(1);
    setPerPage(parseInt(e.target.value),10);
  };

  // Paginate filtered departments
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="w-full sm:w-full flex items-center justify-center mt-3 pt-1 flex-col">
        <div className="p-1  w-full ">
        <h1 className="text-2xl border rounded-full  p-1 text-center font-bold shadow-md ">Department</h1>
        </div>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col w-full 2xl:w-[80%] px-3 h-auto justify-evenly rounded-full bg-white ">
        <div className="flex flex-row justify-between items-center py-3 bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1"> </h1>
          <button
            onClick={toggleModal}
            className="border-black border px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
          >
            Add New
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
            <div className="flex">
              <span className="self-center font-bold mr-2">Search:</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          {filteredDepartments.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
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
                    Department Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left  w-[10%]"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDepartments.map((dept, index) => (
                  <tr key={dept.id}>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {currentPage === 1?index+1:(currentPage-1)*perPage+index+1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                      {dept.department}
                    </td>
                    <td className="whitespace-nowrap text-left text-sm font-medium flex p-1">
                      <div className="w-[50%] border-slate-300 py-3 text-center">
                        <button
                          onClick={() =>
                            toggleEditModal(dept.id, dept.department)
                          }
                          className="text-indigo-500 hover:text-indigo-900 mr-2"
                        >
                          <FaEdit size={20} />
                        </button>
                      </div>
                      <div className="w-[50%] border-l  py-3 text-center">
                        <button
                          onClick={() => handleDelete(dept.id)}
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
          ) : companyId ? (
            <div className="px-6 py-4 text-sm text-gray-500">
              No department yet. Please add a department.
            </div>
          ) : (
            <span className="loader"></span>
          )}
        </div>
        {filteredDepartments.length > 0 && (
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

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center sm:w-full ">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
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

      <Designation />
    </div>
  );
};
