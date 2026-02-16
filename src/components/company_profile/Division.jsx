import { AiOutlinePlusCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ManageDivision from "./ManageDivision";

const Division = () => {
  const [showModal, setShowModal] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    axios
      .get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/company/getAllDepartment`
      )
      .then((response) => {
        const departmentsArray = response.data.response;
        console.log(response.data, "departmentAPI");
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

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleDivisionSubmit = (e) => {
    e.preventDefault();
    const divisionData = {
      divisionName: e.target.divisionName.value,
    };
    const companyId = localStorage.getItem("companyId");
    axios
      .post(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/company/createDivision/${selectedDepartment}`,
        divisionData
      )
      .then((response) => {
        console.log("Division created successfully:", response.data);
        toast.success("Division created successfully");
        toggleModal();
        setDivisions((prevDivisions) => [
          ...prevDivisions,
          response.data.response,
        ]);
        location.reload();
      })

      .catch((error) => {
        console.error("Error creating division:", error);
        toast.error("Error creating division");
      });
  };

  return (
    <div className="w-full sm:w-full flex  justify-center mt-3 pt-1">
      <div className="flex flex-col w-[89%]  pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <h1 className="text-3xl font-bold p-1">Divison</h1>
        <div className="flex flex-row justify-between items-center  py-3 bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1">
            Department/Division
          </h1>
          <button
            onClick={toggleModal}
            className="border-black border flex gap-1 items-center text-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base"
          >
            <AiOutlinePlusCircle
              size={25}
              className=" text-white rounded-full"
            />{" "}
            Add New Division
          </button>
        </div>
        
        <div className="p-4">
          <ManageDivision />
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center ">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full">
            <div className="bg-gray-200 px-6 py-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Division Form
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-black hover:text-gray-600 hover:scale-150"
                >
                  <RxCross2 size={20} />
                </button>
              </div>
            </div>
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
                    placeholder="Enter division"
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
                    value={selectedDepartment}
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
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Division;
