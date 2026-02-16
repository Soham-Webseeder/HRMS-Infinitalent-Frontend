import { IoMdPrint } from "react-icons/io";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPrint from "react-to-print";
import axios from "axios";

export const AttendanceDetails = () => {
  const componentRef = useRef();
  const { id } = useParams(); // Get attendance ID from URL
  const [attendanceData, setAttendanceData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [allDayData, setAllDayData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const attendanceResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/attendance/getAttendanceById/${id}`
        );
        const attendance = attendanceResponse.data.data;
        setAttendanceData(attendance);
        console.log(attendance);

        if (attendance.employeeName) {
          const employeeResponse = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${
              attendance.employeeName
            }`
          );
          setEmployeeData(employeeResponse.data.data);
        }

        const allEmployeesResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
        );
        setEmployees(allEmployeesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fatchallDayDetails = async () => {
      try {
        const attendanceResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
        );
        const attendance = attendanceResponse.data;
        setAllDayData([attendance]);
        console.log(attendance);
        if (attendance.employeeName) {
          const employeeResponse = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${
              attendance.employeeName
            }`
          );
          setEmployeeData(employeeResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAttendanceDetails();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData({
      ...attendanceData,
      [name]: value,
    });
  };

  const handleCheckIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/attendance/updateAttendance/${id}`,
        attendanceData
      );
      console.log("Attendance data updated successfully:", response.data);
      setEditModal(false);
      navigate("/attendance/logs");
    } catch (error) {
      console.error("Error updating attendance data:", error);
    }
  };

  if (!attendanceData || !employeeData) {
    return <div>Loading...</div>;
  }

  const calculateTotalTime = (inTime, outTime) => {
    if (!outTime) return "0:00:00";
    const inDate = new Date(inTime);
    const outDate = new Date(outTime);
    const diff = outDate - inDate;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };
  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/attendance/deleteAttendance/${id}`
        );
        navigate("/attendance/logs");
      } catch (error) {
        console.error("Error deleting attendance:", error);
      }
    }
  };

  return (
    <div className="w-full flex justify-center mt-3 pt-1">
      <div className="flex flex-col w-full max-w-[80%] p-3 mt-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <div className="flex justify-end items-center">
          <ReactPrint
            trigger={() => <IoMdPrint size={25} />}
            content={() => componentRef.current}
            documentTitle={`INVOICE`}
          />
        </div>
        <h2 className="text-xl font-bold mb-4 w-full text-center">{`${employeeData.firstName} ${employeeData.lastName}`}</h2>
        <div>
          <p className="pl-5 text-xl">
            Date - {formatDate(attendanceData.inTime)}
          </p>
          <div className="p-2 bg-slate-50 shadow-md overflow-x-auto print-area">
            <table
              ref={componentRef}
              className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400"
            >
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    SL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Punch Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-center px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                    {new Date(attendanceData.inTime).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                    IN
                  </td>
                  <td className="whitespace-nowrap md:gap-5 sm:gap-1 gap-1 text-sm font-medium justify-center pb-3 flex items-center text-center border border-slate-300">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                      onClick={handleEdit}
                    >
                      EDIT
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded mt-3">
                      DELETE
                    </button>
                  </td>
                </tr>
                {attendanceData.outTime && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      {new Date(attendanceData.outTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                      OUT
                    </td>
                    <td className="whitespace-nowrap md:gap-5 sm:gap-1 gap-1 text-sm font-medium justify-center pb-3 flex items-center text-center border border-slate-300">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                        onClick={handleEdit}
                      >
                        EDIT
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-2 rounded mt-3"
                        onClick={handleDelete}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <p className="text-xl font-medium py-3 px-4">
              You spent{" "}
              {calculateTotalTime(
                attendanceData.inTime,
                attendanceData.outTime
              )}{" "}
              hours out of working hours
            </p>
          </div>
        </div>
      </div>

      {editModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
            <h1 className="text-3xl font-bold p-4">Attendance</h1>
            <div className="p-4 flex items-center justify-center w-full">
              <form className="w-full" onSubmit={handleCheckIn}>
                <div className="mb-4">
                  <label htmlFor="employee" className="block font-bold mb-1">
                    Employee Name
                  </label>
                  <select
                    name="employeeName"
                    id="employee"
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400"
                    onChange={handleInputChange}
                    value={attendanceData.employeeName}
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
                  <label htmlFor="inTime" className="block font-bold mb-1">
                    In Time
                  </label>
                  <input
                    type="datetime-local"
                    name="inTime"
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400"
                    onChange={handleInputChange}
                    value={attendanceData.inTime}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="outTime" className="block font-bold mb-1">
                    Out Time
                  </label>
                  <input
                    type="datetime-local"
                    name="outTime"
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400"
                    onChange={handleInputChange}
                    value={attendanceData.outTime}
                  />
                </div>
                <div className="flex justify-end p-3">
                  <button
                    type="submit"
                    className="p-2 bg-green-600 text-white font-medium text-lg rounded-sm"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="p-2 bg-gray-600 text-white font-medium text-lg rounded-sm ml-2"
                    onClick={() => setEditModal(false)}
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
  );
};

export default AttendanceDetails;
