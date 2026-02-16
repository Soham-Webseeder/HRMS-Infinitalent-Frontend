import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Select from "react-select";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const AttendanceForm = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [weeklyHolidays, setWeeklyHolidays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveApplications, setLeaveApplications] = useState([]);

  const [formState, setFormState] = useState({
    selectedEmployees: [],
    selectedDate: dayjs().format("DD-MM-YYYY"),
    dayType: "full", // 'full' or 'half'
    leaveType: "", // 'paid' or 'unpaid'
  });

  useEffect(() => {
    fetchEmployeesAndAttendance();
  }, [currentDate]);

  console.log("employeesData");

  const fetchEmployeesAndAttendance = async () => {
    try {
      // Fetch employees
      const employeesResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      );
      const employeesData = employeesResponse.data.data;
      console.log(employeesData, "employeesData");
      setEmployees(employeesData);

      // Fetch attendance
      const attendanceResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAllAttendance`
      );
      const attendanceData = attendanceResponse.data.data;

      // Fetch weekly holidays
      const weeklyHolidaysResponse = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/getWeeklyHolidayById/663f12e0b226016d8abc6eae`
      );
      const weeklyHolidayResponse = weeklyHolidaysResponse.data.data;

      // Map weekly holidays to day indices
      const weeklyHolidaysData = [];
      if (weeklyHolidayResponse.sunday) weeklyHolidaysData.push(0);
      if (weeklyHolidayResponse.monday) weeklyHolidaysData.push(1);
      if (weeklyHolidayResponse.tuesday) weeklyHolidaysData.push(2);
      if (weeklyHolidayResponse.wednesday) weeklyHolidaysData.push(3);
      if (weeklyHolidayResponse.thursday) weeklyHolidaysData.push(4);
      if (weeklyHolidayResponse.friday) weeklyHolidaysData.push(5);
      if (weeklyHolidayResponse.saturday) weeklyHolidaysData.push(6);
      setWeeklyHolidays(weeklyHolidaysData);

      // Fetch holidays
      const holidaysResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllAnnualHoliday`
      );
      const holidaysData = holidaysResponse.data.data.map((holiday) =>
        dayjs(holiday.date).format("YYYY-MM-DD")
      );
      setHolidays(holidaysData);

      // Initialize attendance data
      const initialAttendance = employeesData.map((employee) => {
        const employeeAttendance = attendanceData.find(
          (entry) =>
            entry.employeeName && entry.employeeName._id === employee._id
        );

        return {
          employeeId: employee._id,
          dates: Array.from({ length: 31 }, (_, index) => {
            const date = index + 1;
            const month = currentDate.month() + 1;
            const year = currentDate.year();
            const currentDateFormatted = dayjs(
              `${date}-${month}-${year}`
            ).format("DD-MM-YYYY");
            const isChecked = employeeAttendance
              ? !!employeeAttendance.attendance.find(
                  (entry) => entry.date === date && entry.checked
                )
              : false;

            return {
              date,
              month,
              year,
              checked: isChecked,
              formattedDate: currentDateFormatted,
            };
          }),
          _id: employeeAttendance?._id,
        };
      });

      setAttendanceData(initialAttendance);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error accordingly
    }
  };

  const handleCheckboxChange = async (employeeId, date, month, year) => {
    try {
      const today = dayjs();
      const selectedDate = dayjs(`${year}-${month}-${date}`);
      const isPastDate = selectedDate.isBefore(today, "day");

      if (isPastDate) {
        console.log("Cannot modify past dates.");
        return;
      }

      const currentDateFormatted = selectedDate.format("YYYY-MM-DD");
      if (
        weeklyHolidays.includes(selectedDate.day()) ||
        holidays.includes(currentDateFormatted)
      ) {
        console.log("Cannot modify holidays or weekly holidays.");
        return;
      }

      const updatedAttendanceData = attendanceData.map((entry) => {
        if (entry.employeeId === employeeId) {
          return {
            ...entry,
            dates: entry.dates.map((d) =>
              d.date === date && d.month === month && d.year === year
                ? { ...d, checked: !d.checked }
                : d
            ),
          };
        }
        return entry;
      });

      setAttendanceData(updatedAttendanceData);

      // Assume you have some way to get the ID of the attendance record
      const entryToUpdate = updatedAttendanceData.find(
        (entry) => entry.employeeId === employeeId
      );
      const dateToUpdate = entryToUpdate.dates.find(
        (d) => d.date === date && d.month === month && d.year === year
      );

      // Simulating a unique ID for attendance record (adjust according to your schema)
      const attendanceId = entryToUpdate ? entryToUpdate._id : null;

      if (attendanceId) {
        if (dateToUpdate.checked) {
          await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/attendance/createAttendance`,
            {
              employeeName: employeeId,
              attendance: [dateToUpdate],
            }
          );
        } else {
          console.log("Deleting Attendance ID:", attendanceId);
          if (attendanceId) {
            await axios.delete(
              `${
                import.meta.env.VITE_APP_BASE_URL
              }/attendance/deleteAttendance/${attendanceId}`
            );
          } else {
            console.log("No attendance record found to delete.");
          }
        }
      } else {
        if (dateToUpdate.checked) {
          await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/attendance/createAttendance`,
            {
              employeeName: employeeId,
              attendance: [dateToUpdate],
            }
          );
        } else {
          console.log("No attendance record exists to delete.");
        }
      }
    } catch (error) {
      console.error("Error updating attendance data:", error);
      setError("Failed to update attendance data. Please try again.");
    }
  };

  const startOfWeek = currentDate.startOf("week");
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    startOfWeek.add(index, "day")
  );

  const isCurrentDate = (date) => {
    return currentDate.isSame(date, "day");
  };

  const goToPreviousWeek = () => {
    setCurrentDate(currentDate.subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentDate(currentDate.add(1, "week"));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const goToPreviousYear = () => {
    setCurrentDate(currentDate.subtract(1, "year"));
  };

  const goToNextYear = () => {
    setCurrentDate(currentDate.add(1, "year"));
  };

  const isDisabled = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const dayOfWeek = dayjs(date).day(); // Day of the week (0 for Sunday, 1 for Monday, etc.)
    return (
      weeklyHolidays.includes(dayOfWeek) || holidays.includes(formattedDate)
    );
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  useEffect(() => {
    if (!isModalOpen) {
      fetchEmployeesAndAttendance(); // Reload attendance data after closing the modal
    }
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmployeeChange = (selectedOptions) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedEmployees: selectedOptions,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        date: formState.selectedDate,
        employees: formState.selectedEmployees.map((option) => option.value),
        dayType: formState.dayType,
        leaveType: formState.leaveType,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/BulkAttendance`,
        requestData
      );

      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
        setFormState({
          selectedEmployees: [],
          selectedDate: dayjs().format("YYYY-MM-DD"),
          dayType: "full",
          leaveType: "",
        });
      } else {
        console.error("Error in form submission:", response.statusText);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
    }
  };

  const MultiSelectDropdown = ({ selectedOptions, setSelectedOptions }) => {
    return (
      <Select
        isMulti
        options={employees.map((employee) => ({
          value: employee._id,
          label: `${employee.firstName} ${employee.lastName}`,
        }))}
        value={selectedOptions}
        onChange={setSelectedOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    );
  };

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllLeaveApplications`
      );
      setLeaveApplications(response.data.data);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  console.log(leaveApplications, "leaveApplications");

  return (
    <div className="w-full flex  flex-col m-2 p-4 rounded-md  shadow-lg ">
      <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-4 w-full ">Attendance Table</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={goToPreviousWeek}
            className="p-2 bg-gray-200 rounded-full"
          >
            Previous Week
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            {currentDate.format("MMMM YYYY")}
          </h2>
          <h3 className="text-lg font-semibold">
            Week: {startOfWeek.format("MMM D")} -{" "}
            {daysOfWeek[6].format("MMM D")}
          </h3>
        </div>
        <div className="flex justify-between gap-5">
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
              bulk Attendance
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={goToNextWeek}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            >
              Next Week
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="border-b border-r border-gray-200">
                Emp<br></br>ID
              </th>
              <th className="px-4 py-2 border-b border-r border-gray-200">
                Employee Name
              </th>
              {daysOfWeek.map((day, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b border-r border-gray-200"
                >
                  {day.format("ddd")}
                  <br />
                  {day.date()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-center border-r border-gray-200">
                  {employee.empId}
                </td>
                <td className="px-4 py-2 text-left border-r border-gray-200">
                  {`${employee.firstName} ${employee.lastName}`}
                </td>
                {
                daysOfWeek.map((day) => {
                  const matchingLeave = leaveApplications.find(
                    (application) => {
                      return (
                        application.employeeName === employee._id &&
                        dayjs(day).isBetween(
                          application.applicationStartDate,
                          application.applicationEndDate,
                          null,
                          "[]"
                        ) &&
                        application.status === "Approved"
                      );
                    }
                  );

                  let displayText = "";
                  if (matchingLeave) {
                    if (
                      matchingLeave.leaveDuration === "Half Day" &&
                      matchingLeave.paidLeaveDays === 1
                    ) {
                      displayText = "H";
                    } else if (
                      matchingLeave.leaveDuration === "Full Day" &&
                      matchingLeave.paidLeaveDays > 1
                    ) {
                      displayText = `PL`;
                    } else if (matchingLeave.leaveDuration !== "Full Day") {
                      displayText = `Partial Leave (${matchingLeave.leaveDuration})`;
                    }
                  }
                  else{
                    displayText="P"
                  }

                  return (
                    <td
                      key={day.date()}
                      className={`px-4 py-2  text-center rounded-md ${
                        displayText === "P" ? "bg-blue-300  text-white border " : ""
                      } ${
                        displayText === "PL" ? "bg-gray-500 text-white border" : ""
                      }
                      ${
                        displayText === "H" ? "bg-yellow-400 text-white border" : ""
                      }`}      
                    >
                      {displayText}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Select Employees</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Select Employees
                </label>
                <MultiSelectDropdown
                  selectedOptions={formState.selectedEmployees}
                  setSelectedOptions={handleEmployeeChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  name="selectedDate"
                  value={formState.selectedDate}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex w-1/2 space-x-3 mb-1">
                <div className="flex align-middle space-x-1">
                  <label className="block text-sm font-medium">Full Day</label>
                  <input
                    type="radio"
                    name="dayType"
                    value="full"
                    checked={formState.dayType === "full"}
                    onChange={handleInputChange}
                    className=" "
                  />
                </div>
                <div className="flex space-x-1">
                  <label className="block text-sm font-medium">Half Day</label>
                  <input
                    type="radio"
                    name="dayType"
                    value="half"
                    checked={formState.dayType === "half"}
                    onChange={handleInputChange}
                    className=" "
                  />
                </div>
              </div>

              {formState.dayType === "half" && (
                <div className="flex w-1/2 space-x-3">
                  <div className="flex align-middle space-x-1">
                    <label className="block text-sm font-medium">
                      Paid Leave
                    </label>
                    <input
                      type="radio"
                      name="leaveType"
                      value="paid"
                      checked={formState.leaveType === "paid"}
                      onChange={handleInputChange}
                      className=" "
                    />
                  </div>
                  <div className="flex space-x-1">
                    <label className="block text-sm font-medium">
                      Leave Without Pay
                    </label>
                    <input
                      type="radio"
                      name="leaveType"
                      value="unpaid"
                      checked={formState.leaveType === "unpaid"}
                      onChange={handleInputChange}
                      className=" "
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded font-semibold"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 p-2 bg-gray-300 text-black font-semibold rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceForm;

{
  /* <input
                      type="checkbox"
                      checked={
                        attendanceData
                          .find((entry) => entry.employeeId === employee._id)
                          ?.dates.find(
                            (d) =>
                              d.date === day.date() &&
                              d.month === day.month() + 1 &&
                              d.year === day.year()
                          )?.checked || false
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          employee._id,
                          day.date(),
                          day.month() + 1,
                          day.year()
                        )
                      }
                      className={`${
                        isCurrentDate(day)
                          ? "border border-blue-500 rounded-full"
                          : ""
                      } ${isDisabled(day) ? "bg-gray-400" : "bg-blue-500"}`}
                      style={{
                        color: "white",
                        cursor: isDisabled(day) ? "not-allowed" : "pointer",
                      }}
                      disabled={isDisabled(day)}
                    /> */
}
