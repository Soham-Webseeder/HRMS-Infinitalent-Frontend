import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const ManageDivision = () => {
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDivisions = async (page, limit) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getAllDivision`,
          {
            params: {
              page: page,
              limit: limit,
            },
          }
        );
        const divisionsData = response.data.data;
        const divisionsWithDepartments = await Promise.all(
          divisionsData.map(async (division) => {
            const departmentResponse = await axios.get(
              `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartmentById/${
                division.department
              }`
            );
            const department =
              departmentResponse.data.response.department.title;
            return { ...division, department };
          })
        );

        setDivisions(divisionsWithDepartments);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisions(currentPage,perPage);
  }, [currentPage, perPage]);

  const filteredDivison = divisions.filter((dept) =>
    dept.divisionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditDivision = (id) => {
    const selected = divisions.find((division) => division._id === id);
    setSelectedDivision(selected);
    setShowModal(true);
  };

  console.log(divisions, "divisopn");

  const handleDivisionSubmit = async (e) => {
    e.preventDefault();
    const divisionData = {
      divisionName: e.target.divisionName.value,
      department: selectedDepartment,
    };

    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/updateDivision/${
          selectedDivision._id
        }`,
        divisionData
      );
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllDivision`
      );
      const divisionsData = response.data.data;
      const divisionsWithDepartments = await Promise.all(
        divisionsData.map(async (division) => {
          const departmentResponse = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartmentById/${
              division.department
            }`
          );
          const department = departmentResponse.data.response.department.title;
          return { ...division, department };
        })
      );

      setDivisions(divisionsWithDepartments);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating division:", error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/company/getAllDepartment`)
      .then((response) => {
        const departmentsArray = response.data.response;
        const allDepartments = departmentsArray.map((departmentObj) => ({
          id: departmentObj._id,
          title: departmentObj.department.title,
        }));
        setDepartments(allDepartments);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, []);

  const handleDeleteDivision = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this division?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/company/deleteDivision/${id}`
        );
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getAllDivision`
        );
        const divisionsData = response.data.data;
        const divisionsWithDepartments = await Promise.all(
          divisionsData.map(async (division) => {
            const departmentResponse = await axios.get(
              `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartmentById/${
                division.department
              }`
            );
            const department =
              departmentResponse.data.response.department.title;
            return { ...division, department };
          })
        );

        setDivisions(divisionsWithDepartments);
      } catch (error) {
        console.error("Error deleting division:", error);
      }
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  return (
    <div className="w-full p-4 pt-2">
      <div className="flex justify-between">
        <div className="flex items-center justify-end p-4">
          <label className=" text-sm">Show entries:</label>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex">
          <span className="self-center font-bold">Search:</span>
          <input
            type="text"
            placeholder="Search By Divison.."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                S No
              </th>
              <th
                scope="col"
                className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Division Name
              </th>
              <th
                scope="col"
                className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Department Name
              </th>
              <th
                scope="col"
                className="border border-slate-300 px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDivison.map((division, i) => (
              <tr key={division._id}>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    { i + 1}
                  </div>
                </td>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {division.divisionName}
                  </div>
                </td>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {division.department}
                  </div>
                </td>
                <td className="whitespace-nowrap text-left text-sm font-medium flex">
                  <div className="w-[50%] border-r border-slate-300 py-3 text-center">
                    <button
                      onClick={() => handleEditDivision(division._id)}
                      className="text-indigo-500 hover:text-indigo-900"
                    >
                      <FaEdit size={20} />
                    </button>
                  </div>
                  <div className="w-[50%] py-3 text-center">
                    <button
                      onClick={() => handleDeleteDivision(division._id)}
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
      {divisions.length > 0 && (
        <div className="flex justify-end mt-2 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            Next
          </button>
        </div>
      )}
      {showModal && (
        <div className="modal-container fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="modal bg-white rounded-lg shadow-lg w-full md:max-w-screen-lg">
            <div className="modal-content p-2">
              <span
                className="close absolute top-0 right-0 m-4 cursor-pointer"
                onClick={toggleModal}
              >
                &times;
              </span>
              <div className="bg-gray-100 px-6 py-8">
                <form onSubmit={handleDivisionSubmit} className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="divisionName"
                      className="block text-md font-medium text-gray-700"
                    >
                      Division Name
                    </label>
                    <input
                      type="text"
                      name="divisionName"
                      defaultValue={selectedDivision.divisionName}
                      id="divisionName"
                      className="mt-1 focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="departmentSelect"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Select Department:
                    </label>
                    <select
                      id="departmentSelect"
                      name="departmentSelect"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      onChange={handleDepartmentChange}
                      defaultValue={selectedDivision.department}
                    >
                      <option value="">Select...</option>
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDivision;
