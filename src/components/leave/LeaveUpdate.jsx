import React, { useState, useEffect } from "react";
import axios from "axios";

export const LeaveUpdate = ({
  showUpdateModal,
  setShowUpdateModal,
  updateId,
  toast,
}) => {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [paidLeaveOptions] = useState([
    { value: "paid", label: "Paid Leave" },
    { value: "lwp", label: "Leave Without Pay (LWP)" },
  ]);
  const [dayTypeOptions] = useState([
    { value: "full", label: "Full Day" },
    { value: "half", label: "Half Day" },
  ]);

  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    applicationStartDate: "",
    applicationEndDate: "",
    applyDay: 0,
    applicationHardCopy: "",
    leaveRequestDate: "",
    approvedDay: "",
    approvedBy: "",
    reason: "",
    status: "Approved",
    leaveOption: "paid",
    dayType: "full",
  });

  useEffect(() => {
    if (showUpdateModal) {
      fetchEmployees();
      fetchLeaveTypes();
      fetchLeaveApplicationById();
      fetchAdmin();
    }
  }, [showUpdateModal]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllAdmins`
      );
      setAdmins(response.data.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllLeaveType`
      );
      setLeaveTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const fetchLeaveApplicationById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getLeaveApplicationById/${updateId}`
      );
      const data = response.data.data;
      setFormData({
        employeeName: data.employeeName,
        leaveType: data.leaveType,
        applicationStartDate: data.applicationStartDate,
        applicationEndDate: data.applicationEndDate,
        applyDay: data.applyDay,
        applicationHardCopy: data.applicationHardCopy,
        leaveRequestDate: data.leaveRequestDate,
        approvedDay: data.approvedDay,
        approvedBy: data.approvedBy,
        reason: data.reason,
        status: data.status,
        leaveOption: data.leaveOption || "paid",
        dayType: data.dayType || "full",
      });
    } catch (error) {
      console.error("Error fetching leave application:", error);
    }
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };

  const calculatePaidDays = (days) => {
    const isHalfDay = formData.dayType === "half";
    return isHalfDay ? days / 2 : days;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = { ...formData, [name]: files ? files[0] : value };

    if (name === "applicationStartDate" || name === "applicationEndDate") {
      const applyDay = calculateDaysDifference(
        updatedFormData.applicationStartDate,
        updatedFormData.applicationEndDate
      );
      setFormData({
        ...updatedFormData,
        applyDay,
        paidDays: calculatePaidDays(applyDay),
      });
    } else {
      setFormData(updatedFormData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/updateLeaveApplication/${updateId}`,
        formData
      );

      if (response.data.success) {
        toast.success("Leave Updated Successfully");
        setShowUpdateModal(false);
      } else {
        console.error("Failed to submit form:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {showUpdateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="bg-white md:w-1/2 sm:w-full w-full p-4 rounded-lg relative z-20">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <h2 className="text-2xl font-bold mb-4 col-span-2">Update Leave Application</h2>
              <div className="mb-4">
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="leaveRequestDate" className="block text-sm font-medium text-gray-700">
                  Leave Request Date
                </label>
                <input
                  type="date"
                  id="leaveRequestDate"
                  name="leaveRequestDate"
                  value={formData.leaveRequestDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="applicationStartDate" className="block text-sm font-medium text-gray-700">
                  Leave Start Date
                </label>
                <input
                  type="date"
                  id="applicationStartDate"
                  name="applicationStartDate"
                  value={formData.applicationStartDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="applicationEndDate" className="block text-sm font-medium text-gray-700">
                  Leave End Date
                </label>
                <input
                  type="date"
                  id="applicationEndDate"
                  name="applicationEndDate"
                  value={formData.applicationEndDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="applyDay" className="block text-sm font-medium text-gray-700">
                  Apply Days
                </label>
                <input
                  type="text"
                  id="applyDay"
                  name="applyDay"
                  value={formData.applyDay}
                  readOnly
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="leaveOption" className="block text-sm font-medium text-gray-700">
                  Leave Option
                </label>
                <select
                  id="leaveOption"
                  name="leaveOption"
                  value={formData.leaveOption}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {paidLeaveOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="dayType" className="block text-sm font-medium text-gray-700">
                  Day Type
                </label>
                <select
                  id="dayType"
                  name="dayType"
                  value={formData.dayType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {dayTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">
                  Leave Type
                </label>
                <select
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="approvedBy" className="block text-sm font-medium text-gray-700">
                  Approved By
                </label>
                <select
                  id="approvedBy"
                  name="approvedBy"
                  value={formData.approvedBy}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Admin</option>
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4 col-span-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="4"
                />
              </div>
              <div className="flex justify-end col-span-2 space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
