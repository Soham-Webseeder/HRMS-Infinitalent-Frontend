import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEmployeePerformance = ({ setShowModal }) => {
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const currentDate = new Date();
  const currentMonthYear = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/employee/createEmployeePerformance`,
        formData
      );

      if (response) {
        toast.success("Employee Performance Added Successfully..");

        // Reset the form and close the modal
        setFormData({});
        setShowModal(false);
        window.location.reload();
        // Optionally, navigate or refresh the page
        navigate("/employee/manage-employee-performance");
      } else {
        toast.error("Error While Creating Employee Performance");
        console.error(
          "Error While Creating Employee Performance",
          response.data.message
        );
      }
    } catch (error) {
      toast.error("Failed to add Employee Performance");
      console.error("Error adding Employee Performance:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "employeeName") {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          empId: "",
          employeeName: "",
          employeeId: "",
        }));
      } else {
        const selectedEmployee = employee.find(
          (employee) => employee._id === value
        );

        if (selectedEmployee) {
          setFormData((prev) => ({
            ...prev,
            empId: selectedEmployee.empId,
            employeeName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
            employeeId: selectedEmployee._id,
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      setEmployee(response.data.data);
    };
    getData();
  }, []);

  return (
    <div className="fixed  inset-0 z-40 overflow-y-auto  backdrop-blur-sm flex items-center justify-center">
         <div className="overflow-x-auto w-1/2 p-4 bg-gray-100 ">
      {/* Ensure Toaster is placed here to catch all toasts */}
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-semibold p-2 text-center  text-slate-700">
        Add Employee Performance
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employee" className="block font-medium mb-2">
            Employee Name
            <span className="text-red-500">*</span>
          </label>
          <select
            name="employeeName"
            id="employee"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 mb-5"
            onChange={handleInputChange}
            value={formData.employeeId || ""}
          >
            <option value="">Select Employee</option>
            {Array.isArray(employee) &&
              employee.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="note" className="block font-medium mb-2">
            Note
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="note"
            className="p-2 border w-full form-input rounded mb-5"
            value={formData.note || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="numberOfStar" className="block font-medium mb-2">
            Number of Stars
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="numberOfStar"
            className="p-2 border w-full form-input rounded mb-5"
            value={formData.numberOfStar || ""}
            onChange={handleInputChange}
            min="1"
            max="5"
          />
        </div>
        <div>
          <label htmlFor="year" className="block font-medium mb-2">
            Month & Year
            <span className="text-red-500">*</span>
          </label>
          <input
            type="month"
            name="year"
            className="p-2 border w-full form-input rounded mb-5"
            value={formData.year || currentMonthYear}
            onChange={handleInputChange}
            min={currentMonthYear}
            max={currentMonthYear}
          />
        </div>
        <div className="flex justify-end">
        <button
            type="button"
            className="border bg-gray-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear trasation-all duration-150 mt-4 mb-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="border bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear trasation-all duration-150 mt-4 mb-2"
            onClick={() => setFormData({})}
          >
            Reset
          </button>
         
          <button
            type="submit"
            className="border bg-green-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear trasation-all duration-150 mt-4 mb-2"
          >
            Add
          </button>
        </div>
      </form>
    </div>

    </div>
 
  );
};

export default AddEmployeePerformance;
