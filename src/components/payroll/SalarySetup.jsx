
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SalarySetup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    salaryType: "",
    addition: {
      basic: "",
      health: "",
      houseRent: "",
      sdsd: "",
    },
    deduction: {
      pf: "",
      healthCare: "",
      tax: "",
    },
    grossSalary: "",
  });
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salaryDetails, setSalaryDetails] = useState([]);
  const [showModel, setShowModel] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/payroll/salaryGenerate/${id}`);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "employeeName") {
      const selectedEmployee = employees.find(
        (employee) => employee._id === value
      );

      if (selectedEmployee) {
        setFormData((prevData) => ({
          ...prevData,
          employeeName: selectedEmployee._id,
          salaryType: selectedEmployee.rateType,
          addition: {
            ...prevData.addition,
            basic: selectedEmployee.rate,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          employeeName: value,
          salaryType: "",
          addition: {
            ...prevData.addition,
            basic: "",
          },
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const calculateGrossSalary = (addition, deduction) => {
    const basicSalary = parseFloat(addition.basic) || 0;
    const additionAmount =
      ((parseFloat(addition.health) || 0) * basicSalary) / 100 +
      ((parseFloat(addition.houseRent) || 0) * basicSalary) / 100 +
      ((parseFloat(addition.sdsd) || 0) * basicSalary) / 100;

    const deductionAmount =
      ((parseFloat(deduction.pf) || 0) * basicSalary) / 100 +
      ((parseFloat(deduction.healthCare) || 0) * basicSalary) / 100 +
      ((parseFloat(deduction.tax) || 0) * basicSalary) / 100;

    return basicSalary + additionAmount - deductionAmount;
  };

  const handleAdditionChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => {
      const newAddition = {
        ...prevData.addition,
        [id]: value,
      };
      const newGrossSalary = calculateGrossSalary(
        newAddition,
        prevData.deduction
      );

      return {
        ...prevData,
        addition: newAddition,
        grossSalary: newGrossSalary,
      };
    });
  };

  const handleDeductionChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => {
      const newDeduction = {
        ...prevData.deduction,
        [id]: value,
      };
      const newGrossSalary = calculateGrossSalary(
        prevData.addition,
        newDeduction
      );

      return {
        ...prevData,
        deduction: newDeduction,
        grossSalary: newGrossSalary,
      };
    });
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );
      console.log(response.data.data, "response.data.data");
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalarySetup = async (page, limit) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/salary/getAllSalarySetups`,
        {
          params: {
            page: page,
            limit: limit,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data)
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    getSalarySetup(currentPage, perPage);
  }, [currentPage, perPage]);

  const handleEditing = async (id) => {
    console.log("Editing item with ID:", id);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/salary/getSalarySetupById/${id}`
      );
      const selectedData = response.data.data;
      console.log(selectedData, "selectedDataaaaaaaaaa");

      // Find the employee object from the employees list using the employee ID
      const selectedEmployee = employees.find(
        (employee) => employee._id === selectedData.employeeName
      );

      setFormData({
        _id: selectedData._id,
        employeeName: selectedEmployee
          ? selectedEmployee._id
          : selectedData.employeeName,
        salaryType: selectedData.salaryType,
        addition: {
          basic: selectedData.addition[0]?.basic || "",
          health: selectedData.addition[0]?.health || "",
          houseRent: selectedData.addition[0]?.houseRent || "",
          sdsd: selectedData.addition[0]?.sdsd || "",
        },
        deduction: {
          pf: selectedData.deduction[0]?.pf || "",
          healthCare: selectedData.deduction[0]?.healthCare || "",
          tax: selectedData.deduction[0]?.tax || "",
        },
        grossSalary: selectedData.grossSalary,
      });

      setOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleView = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_APP_BASE_URL}/salary/getSalarySetupById/${id}`
  //     );
  //     console.log(response.data.data, "SalaryDetails");
  //     setSalaryDetails(response.data.data);
  //     setShowModel(true);
  //   } catch (error) {
  //     console.error("Error fetching SalaryDetails:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData._id) {
        const response = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/updateSalarySetup/${formData._id
          }`,
          formData
        );
        console.log(response.data, "Salary updated...");
        setFormData({
          employeeName: "",
          salaryType: "",
          addition: {
            basic: "",
            health: "",
            houseRent: "",
            sdsd: "",
          },
          deduction: {
            pf: "",
            healthCare: "",
            tax: "",
          },
          grossSalary: "",
        });
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/createSalarySetup`,
          formData
        );
        console.log(response.data, "Salary created...");
        setFormData({
          employeeName: "",
          salaryType: "",
          addition: {
            basic: "",
            health: "",
            houseRent: "",
            sdsd: "",
          },
          deduction: {
            pf: "",
            healthCare: "",
            tax: "",
          },
          grossSalary: "",
        });
      }
      setOpen(false);
      getSalarySetup();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/deleteSalarySetup/${id}`
        );
        if (response) {
          const updatedSalary = data.filter((salary) => salary._id !== id);
          setData(updatedSalary);
          console.log("Salary Setup Deleted Successfully..");
        } else {
          console.error("Error while deleting", response.data.message);
        }
      } catch (error) {
        console.error(error, "Error while deleting Salary Setup");
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const filteredData = data.filter((employee) => {
    if (
      employee.empName &&
      employee.empName &&
      typeof employee.empName === "string"
    ) {
      return employee.empName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
  return (
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">
              Salary Setup
            </h1>
            <p className="font-light text-gray-600 mt-4">
              <Link to="/">Home</Link> | <Link to="/app/payroll">Payroll</Link> | <Link to="/payroll/salary-setup">Salary Setup</Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 py-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Salary Setup
            </button>
          </div>
        </div>

        <div className="container mx-auto bg-white overflow-x-auto">
          <div className="px-2 py-4">
            <div className="flex flex-col justify-center items-center gap-4 relative">
              <AddSalarySetupPopUp
                open={open}
                setOpen={setOpen}
                formData={formData}
                setFormData={setFormData}
                employees={employees}
                handleInputChange={handleInputChange}
                handleAdditionChange={handleAdditionChange}
                handleDeductionChange={handleDeductionChange}
                handleSubmit={handleSubmit}
              />

              {
                filteredData?.length > 0 ? (
                  <div className="w-full pt-2">
                    <div className="border rounded px-4 py-4 bg-gray-100">
                      <div className="w-full flex justify-between items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              placeholder="Search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
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
                            {[5, 10, 15, 20].map(size => (
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
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                SNo
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Employee Name
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Position
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Department
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Salary Type
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Net Salary
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Gross Salary
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300"
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredData?.map((data, index) => (
                              <tr key={data._id} className="text-gray-600 text-left">
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {index + 1}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {data.empName}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {data.Position}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {data.Department}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {data.salaryType}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {JSON.stringify(data.addition[0].basic)}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {JSON.stringify(data.grossSalary)}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1">
                                  {new Date(data.createdAt).toLocaleDateString()}
                                </td>
                                <td
                                  scope="col"
                                  className="px-2 py-1 flex justify-around items-center">
                                  <button
                                    className="text-gray-500 hover:text-gray-900"
                                    onClick={() => handleEditing(data?._id)}
                                  >
                                    <FaEdit size={18} className="text-gray-500" />
                                  </button>
                                  <Link to={`/payroll/salaryGenerate/${data?._id}`}>
                                    <button
                                      className="text-gray-500 hover:text-gray-900"
                                      onClick={() => handleView(data?._id)}
                                    >
                                      <AiFillEye size={15} />
                                    </button>
                                  </Link>
                                  <button
                                    className="text-gray-500 hover:text-gray-900"
                                    onClick={() => handleDelete(data?._id)}
                                  >
                                    <MdDelete size={18} className="text-gray-500" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

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
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border rounded-full ${currentPage === page
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
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <h1 className="text-2xl font-medium text-gray-700">No data found</h1>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
          <div className="bg-white max-h-[90vh] p-8 rounded overflow-y-auto shadow-lg w-full sm:w-3/4 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Salary Details</h2>
              <button
                onClick={() => setShowModel(false)}
                className="text-red-500 text-xl"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Employee Name:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {salaryDetails.empName}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Position:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {salaryDetails.Position}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Department:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {salaryDetails.Department}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Salary Type:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {salaryDetails.salaryType}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Net Salary:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {JSON.stringify(salaryDetails.addition[0].basic)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Gross Salary:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {JSON.stringify(salaryDetails.grossSalary)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <label className="block font-medium text-gray-700 w-full md:w-1/3">
                  Date:
                </label>
                <p className="w-full md:w-2/3 p-2 border-gray-300 rounded">
                  {new Date(salaryDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AddSalarySetupPopUp = ({
  open,
  setOpen,
  formData,
  setFormData,
  employees,
  handleInputChange,
  handleAdditionChange,
  handleDeductionChange,
  handleSubmit,
  handleFetch,
}) => {
  return (
    <div
      className={`h-screen w-full fixed top-0 left-0 z-50 bg-black bg-opacity-40 flex justify-center items-center duration-200 ${open
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-4 pt-48 rounded w-full max-w-md max-h-[80%] bg-white flex flex-col justify-center items-center gap-4 transform transition-transform duration-200 py-5 overflow-y-auto ${open
          ? "opacity-100 delay-100 translate-y-0"
          : "-translate-y-10 opacity-0"
          }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <ImCross size={20} />
        </button>
        <div className="w-full  bg-white p-6 pt-16 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Salary SetUp</h2>
          <div>
            <div className="mb-4">
              <label
                className="block text-zinc-700 font-medium mb-2"
                htmlFor="employeeName"
              >
                Employee Name *
              </label>
              <select
                name="employeeName"
                id="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                className="w-full border border-zinc-300 rounded-lg p-2"
              >
                <option>Select option</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-zinc-700 font-medium mb-2"
                htmlFor="salaryType"
              >
                Salary Type *
              </label>
              <input
                name="salaryType"
                id="salaryType"
                type="text"
                value={formData.salaryType}
                onChange={handleInputChange}
                className="w-full border border-zinc-300 rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-zinc-700 font-medium mb-2">Addition</h3>
                <div className="mb-2">
                  <label className="block text-zinc-700 mb-1" htmlFor="basic">
                    Basic (%)
                  </label>
                  <input
                    name="basic"
                    id="basic"
                    type="number"
                    value={formData.addition.basic}
                    onChange={handleAdditionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-zinc-700 mb-1" htmlFor="health">
                    Health (%)
                  </label>
                  <input
                    name="health"
                    id="health"
                    type="number"
                    value={formData.addition.health}
                    onChange={handleAdditionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-zinc-700 mb-1"
                    htmlFor="houseRent"
                  >
                    House Rent (%)
                  </label>
                  <input
                    name="houseRent"
                    id="houseRent"
                    type="number"
                    value={formData.addition.houseRent}
                    onChange={handleAdditionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-zinc-700 mb-1" htmlFor="sdsd">
                    SDSD (%)
                  </label>
                  <input
                    name="sdsd"
                    id="sdsd"
                    type="number"
                    value={formData.addition.sdsd}
                    onChange={handleAdditionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-zinc-700 font-medium mb-2">Deduction</h3>
                <div className="mb-2">
                  <label className="block text-zinc-700 mb-1" htmlFor="pf">
                    PF (%)
                  </label>
                  <input
                    name="pf"
                    id="pf"
                    type="number"
                    value={formData.deduction.pf}
                    onChange={handleDeductionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-zinc-700 mb-1"
                    htmlFor="healthCare"
                  >
                    Health Care (%)
                  </label>
                  <input
                    name="healthCare"
                    id="healthCare"
                    type="number"
                    value={formData.deduction.healthCare}
                    onChange={handleDeductionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-zinc-700 mb-1" htmlFor="tax">
                    Tax (%)
                  </label>
                  <input
                    name="tax"
                    id="tax"
                    type="number"
                    value={formData.deduction.tax}
                    onChange={handleDeductionChange}
                    className="w-full border border-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-2 flex items-center">
                  <input id="taxManager" type="checkbox" className="mr-2" />
                  <label
                    className="block text-zinc-700 mb-1"
                    htmlFor="taxManager"
                  >
                    Tax Manager
                  </label>
                </div>
                <div
                  onClick={handleFetch}
                  className="text-blue-500 cursor-pointer"
                >
                  Fetch
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-zinc-700 font-medium mb-2"
                htmlFor="grossSalary"
              >
                Gross Salary
              </label>
              <input
                name="grossSalary"
                id="grossSalary"
                type="number"
                value={formData.grossSalary}
                onChange={handleInputChange}
                className="w-full border border-zinc-300 rounded-lg p-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="reset"
                className="bg-blue-500 text-white px-2 py-2 rounded-lg mr-2"
                onClick={() => {
                  setFormData({
                    employeeName: "",
                    salaryType: "",
                    addition: {
                      basic: "",
                      health: "",
                      houseRent: "",
                      sdsd: "",
                    },
                    deduction: {
                      pf: "",
                      healthCare: "",
                      tax: "",
                    },
                    grossSalary: "",
                  });
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-2 py-2 rounded-lg"
              >
                {formData._id ? "Update" : "Set"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

  );
};

export default SalarySetup;
