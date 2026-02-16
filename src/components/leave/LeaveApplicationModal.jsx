import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setShowLeaveModal } from "../../redux/slices/SidebarSlice";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { data } from "autoprefixer";
const LeaveApplicationModal = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    applicationStartDate: "",
    applicationEndDate: "",
    applyDay: "",
    applicationHardCopy: "",
    leaveRequestDate:"",
    // approveStartDate: "",
    // approvedEndDate: "",
    approvedDay: "",
    // approvedBy: "",
    reason: "",
    department: "",
  });
  const dispatch = useDispatch();
  const { LeaveModal } = useSelector((state) => state.sidebar);
  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
      console.error("Error fetching Admins:", error);
    }
  };


  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllLeaveType`
      );
      setLeaveTypes(response.data.data);
      console.log(leaveTypes, "leaveTypes");
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  useEffect(() => {
    if (LeaveModal) {
      fetchEmployees();
      fetchAdmin()
     fetchLeaveTypes();

      const currentDate = new Date().toISOString().split("T")[0];
      setFormData((prevData) => ({
        ...prevData,
        applyDay: currentDate,
      }));
    }
  }, [LeaveModal]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "applicationStartDate" || name === "applicationEndDate") {
      const diffDays = calculateDaysDifference(
        formData.applicationStartDate,
        value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        applyDay: diffDays,
      }));
    // } else if (name === "approveStartDate" || name === "approvedEndDate") {
    //   const diffDays = calculateDaysDifference(
    //     formData.approveStartDate,
    //     value
    //   );
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //     approvedDay: diffDays,
    //   }));
    } else if (name === "employeeName") {
      const selectedEmployee = employees.find(
        (employee) => employee._id === value
      );

      console.log(selectedEmployee, "selectedEmployee");
      setFormData((prevState) => ({
        ...prevState,
        employeeId: value,
        employeeName: value,
        department: selectedEmployee ? selectedEmployee.department : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }));
    }
  };

  console.log(formData, "formdata");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObject.append(key, formData[key]);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/createLeaveApplication`,
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);

        setFormData({
          employeeName: "",
          leaveType: "",
          applicationStartDate: "",
          applicationEndDate: "",
          applyDay: "",
          applicationHardCopy: "",
          leaveRequestDate:"",
          // approveStartDate: "",
          // approvedEndDate: "",
          approvedDay: "",
          // approvedBy: "",
          reason: "",
        });
        toast.success("Leave Application Successfully Created!");
        dispatch(setShowLeaveModal(!LeaveModal));
        console.log(LeaveModal, "modal status");
      } else {
        console.error("Failed to submit form:", response.statusText);
        toast.success("All fields require");
        dispatch(setShowLeaveModal(!LeaveModal));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="">
        {LeaveModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="  bg-white md:w-1/2 w-full sm:w-full p-4 rounded-lg relative z-20 max-h-80vh">
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-0">
                <h2 className="text-2xl font-bold mb-4 col-span-2 ">
                  Leave Application Form
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="employeeName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee
                  </label>
                  <select
                    id="employeeName"
                    name="employeeName"
                    required
                    value={formData.employeeName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Employee</option>
                    {Array.isArray(employees) &&
                      employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstName} {employee.lastName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="applicationStartDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Leave Request Date
                  </label>
                  <input
                    type="date"
                    id="leaveRequestDate"
                    name="leaveRequestDate"
                    required
                    value={formData.leaveRequestDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                <label
                  htmlFor="leaveType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leave Type
                </label>
                <select
                  id="leaveType"
                  name="leaveType"
                  required
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Leave Type</option>
                  {leaveTypes.map((leave) => (
                    <option key={leave._id} value={leave._id} className="gap-2">
                      {leave.leaveType}
                      <div className="text-red-600 font-medium ml-3">
                        {"  - Upto " + leave.numberOfLeaveDays + "days"}
                      </div>
                    </option>
                  ))}
                </select>
              </div>
                <div className="mb-4">
                  <label
                    htmlFor="applicationStartDate"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="applicationEndDate"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="applyDay"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <label
                    htmlFor="applicationHardCopy"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hard Copy
                  </label>
                  <input
                    type="file"
                    id="applicationHardCopy"
                    name="applicationHardCopy"
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* <div className="mb-4">
                <label
                  htmlFor="approveStartDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Approval Start Date
                </label>
                <input
                  type="date"
                  id="approveStartDate"
                  name="approveStartDate"
                  value={formData.approveStartDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="approvedEndDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Approval End Date
                </label>
                <input
                  type="date"
                  id="approvedEndDate"
                  name="approvedEndDate"
                  value={formData.approvedEndDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div> */}
                <div className="mb-4">
                  <label
                    htmlFor="approvedDay"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Approved Day
                  </label>
                  <input
                    type="date"
                    id="approvedDay"
                    name="approvedDay"
                    value={formData.approvedDay}
                    onChange={handleInputChange}

                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
{/* 
                <div className="mb-4">
                  <label
                    htmlFor="approvedBy"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Approved By
                  </label>
                  <select
                    id="approvedBy"
                    name="approvedBy"
                    value={formData.approvedBy}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Approver</option>
                    {admins.map((admin) => (
                      <option key={admin._id} value={admin._id}>
                        {admin.name}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end col-span-2">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(setShowLeaveModal(false))}
                    className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LeaveApplicationModal;
