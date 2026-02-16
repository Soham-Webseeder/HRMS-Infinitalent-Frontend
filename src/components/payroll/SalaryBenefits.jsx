import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const SalaryBenefits = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    salaryBenefit: "",
    benefitsType: "Add",
  });
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async (page,limit) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/getAllSalaryBenefits`,
          {
            params: {
              page: page,
              limit: limit,
            },
          }
        );
        setData(response.data.data);
        setTotalPages(response.data.pagination.totalPages);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData(currentPage,perPage);
  }, [currentPage, perPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEditing) {
        response = await axios.patch(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/salary/updateSalaryBenefit/${isEditing}`,
          formData
        );
        setData(
          data.map((item) =>
            item._id === isEditing ? response.data.data : item
          )
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/createSalaryBenefit`,
          formData
        );
        setData([...data, response.data.data]);
      }
      setOpen(false);
      setFormData({ salaryBenefit: "", benefitsType: "Add" });
      setIsEditing(null);
      alert(
        isEditing
          ? "Salary benefit updated successfully!"
          : "Salary benefit added successfully!"
      );
    } catch (error) {
      console.log(error);
      alert(
        isEditing
          ? "Error updating salary benefit."
          : "Error adding salary benefit."
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this salary benefit?")
    ) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/salary/deleteSalaryBenefit/${id}`
        );
        setData(data.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
        alert("Error deleting salary benefit.");
      }
    }
  };

  const handleEditing = (id) => {
    const benefitToEdit = data.find((item) => item._id === id);
    setFormData({
      salaryBenefit: benefitToEdit.salaryBenefit,
      benefitsType: benefitToEdit.benefitsType,
    });
    setIsEditing(id);
    setOpen(true);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const filteredData = data.filter(
    (salary)=>{
      if(salary.salaryBenefit && salary.salaryBenefit &&  typeof salary.salaryBenefit=== 'string'){
        return salary.salaryBenefit.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false
    }
  )
  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4  py-2 overflow-x-hidden flex flex-col w-full mx-auto">
        <div className="bg-white border-gray-200 border rounded-md shadow-lg px-5 py-5">
          <h2 className="text-xl font-bold mb-4">Payroll Salary Benefits</h2>
          <div className="border rounded p-2">
            <div className="px-16 flex flex-col justify-center items-center gap-4 relative">
              <button
                onClick={() => {
                  setOpen(true);
                  setFormData({ salaryBenefit: "", benefitsType: "Add" });
                  setIsEditing(null);
                }}
                className="text-sm flex justify-center items-center gap-2 p-2 rounded text-white bg-blue-600 uppercase"
              >
                <AiFillPlusCircle size={20} /> Add Salary Benefits
              </button>
              <AddBenefitsPopUp
                open={open}
                setOpen={setOpen}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isEditing={isEditing}
              />
                            <div className="w-full sm:overflow-auto md:overflow-x-auto overflow-auto">

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
                      placeholder="Search By Salary Benefit.."
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
            </div>
              <table className="w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">SL NO.</th>
                    <th className="py-3 px-6 text-left">Salary Benefit</th>
                    <th className="py-3 px-6 text-left">Benefit Type</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredData.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {item.salaryBenefit}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {item.benefitsType}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap flex justify-center items-center gap-4 text-lg">
                        <button
                          className="bg-gray-50 hover:bg-white rounded-full p-2"
                          onClick={() => handleEditing(item._id)}
                        >
                          <FaEdit size={20} className="text-blue-500"/>


                        </button>
                        <button
                          className="bg-gray-50 hover:bg-white rounded-full p-2"
                          onClick={() => handleDelete(item._id)}
                        >
                          <MdDelete size={20}   className="text-red-500"/>

                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-2 space-x-2">
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
      </div>
      </div>
    </>
  );
};

export default SalaryBenefits;

const AddBenefitsPopUp = ({
  open,
  setOpen,
  formData,
  setFormData,
  handleSubmit,
  isEditing,
}) => {
  return (
    <div
      className={`h-screen w-full fixed top-0 left-0 z-50 bg-black bg-opacity-40 flex justify-center items-center duration-200 ${
        open
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
        className={`p-4 rounded w-full max-w-md bg-white flex flex-col justify-center items-center gap-4 -translate-y-10 duration-200 ${
          open
            ? "opacity-100 delay-100 translate-y-0"
            : "-translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-xl uppercase text-center">
          {isEditing ? "Edit Salary Benefit" : "Add Salary Benefit"}
        </h1>
        <div className="space-x-2 text-sm flex justify-between items-center w-full max-w-xs">
          <label className="capitalize text-nowrap" htmlFor="salaryBenefit">
            Benefit name :
          </label>
          <input
            className="p-1 rounded border w-full max-w-52 focus:outline-none"
            id="salaryBenefit"
            placeholder="Enter Benefit Name..."
            value={formData.salaryBenefit}
            onChange={(e) =>
              setFormData({ ...formData, salaryBenefit: e.target.value })
            }
          />
        </div>
        <div className="space-x-2 text-sm flex justify-between items-center w-full max-w-xs">
          <label className="capitalize text-nowrap" htmlFor="benefitsType">
            Benefit Type :
          </label>
          <select
            id="benefitsType"
            className="focus:outline-none border p-1 rounded w-full max-w-52"
            value={formData.benefitsType}
            onChange={(e) =>
              setFormData({ ...formData, benefitsType: e.target.value })
            }
          >
            <option value="Add">Add</option>
            <option value="Deduct">Deduct</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-sm flex justify-center items-center gap-2 p-2 rounded text-white bg-blue-600 uppercase"
        >
          <AiFillPlusCircle size={20} /> {isEditing ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
