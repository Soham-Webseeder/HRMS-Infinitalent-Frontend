import { FaChevronLeft, FaChevronRight, FaEdit, FaTrashAlt, FaCalendar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./Calendar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const AnnualHoliday = () => {
  const user = useSelector((state) => state.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({ id: null, event: "", date: "" });
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateHolidays, setSelectedDateHolidays] = useState([]); 
  const [showCreateForm, setShowCreateForm] = useState(false); 

  const startOfMonth = dayjs(currentDate).startOf("month");
  const endOfMonth = dayjs(currentDate).endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const daysInMonth = () => {
    const days = [];
    let date = startOfWeek;
    while (date.isBefore(endOfWeek)) {
      days.push({
        date: date.toDate(),
        isCurrentMonth: date.isSame(startOfMonth, "month"),
      });
      date = date.add(1, "day");
    }
    return days;
  };

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value, 10);
    setCurrentDate(dayjs(currentDate).month(month).toDate());
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value, 10);
    setCurrentDate(dayjs(currentDate).year(year).toDate());
  };

  const prevMonth = () => {
    setCurrentDate((prev) => dayjs(prev).subtract(1, "month").toDate());
  };

  const nextMonth = () => {
    setCurrentDate((prev) => dayjs(prev).add(1, "month").toDate());
  };

  const getRemindersForDay = (day) => {
    const formattedDate = dayjs(day).format("YYYY-MM-DD");
    return events.filter((event) => event.date === formattedDate);
  };

  const checkCurrentDay = (day) => {
    const date = new Date();
    return dayjs(date).isSame(day, "day");
  };

  const handleDateClick = (date) => {
    const holidays = getRemindersForDay(date);
    setSelectedDate(date); 
    setSelectedDateHolidays(holidays); 
    setShowModal(true); 
    setShowCreateForm(false); 
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/updateAnnualHoliday/${eventData.id}`,
          eventData
        );
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/createAnnualHoliday`,
          eventData
        );
        setEvents((prevEvents) => [...prevEvents, res.data.data]);
      }
      setShowModal(false); 
      setShowCreateForm(false); 
      fetchData(); 
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this holiday?");
    try {
      if (confirmDelete) {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/deleteAnnualHoliday/${id}`
        );
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        setSelectedDateHolidays((prevHolidays) => prevHolidays.filter((holiday) => holiday._id !== id)); 
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleHolidayClick = (holiday) => {
    setEventData({ id: holiday._id, event: holiday.event, date: holiday.date });
    setIsEditing(true); 
    setShowModal(false); 
    setShowCreateForm(true); 
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/leave/getAllAnnualHoliday`);
      setEvents(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentDate]);

  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
  const years = Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i);

  return (
    <>
      <div className="calendar-container bg-white rounded-lg shadow-md border w-full p-3">
        <div className="header-container flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <button
            onClick={() => {
              setIsEditing(false); 
              setEventData({ id: null, event: "", date: "" }); 
              setShowModal(false); 
              setShowCreateForm(true); 
            }}
            className="create-btn border px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Create Holiday
          </button>
        </div>
        <div className="flex text-sm w-fit text-gray-500 mt-4 gap-1">
          <Link to="/" className="cursor-pointer hover:text-slate-800 transition-colors">Home</Link>
          <span>|</span>
          <Link to="/app/companyProfile" className="cursor-pointer hover:text-slate-800 transition-colors">Company Profile</Link>
          <span>|</span>
          <span className="cursor-pointer hover:text-slate-800 transition-colors">Annual Calendar</span>
        </div>
        <div className="border-b border-gray-300 mb-4"></div>

        <div className="calendar-header flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center hover:bg-gray-400"
          >
            <FaChevronLeft />
          </button>
          <div className="flex flex-col items-center">
            <button className="flex items-center px-3 py-2 bg-gray-200 rounded-md">
              <FaCalendar className="mr-2" />
              <select
                value={dayjs(currentDate).month()}
                onChange={handleMonthChange}
                className="bg-transparent outline-none"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <span className="mx-2">/</span>
              <select
                value={dayjs(currentDate).year()}
                onChange={handleYearChange}
                className="bg-transparent outline-none"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </button>
          </div>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center hover:bg-gray-400"
          >
            <FaChevronRight />
          </button>
        </div>

        <table className="table-fixed w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                <th key={index} className="py-2 text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
  {Array.from({ length: Math.ceil(daysInMonth().length / 7) }).map((_, weekIndex) => (
    <tr key={weekIndex}>
      {daysInMonth()
        .slice(weekIndex * 7, weekIndex * 7 + 7)
        .map((dayInfo, index) => (
          <td
            key={index}
            onClick={() => handleDateClick(dayInfo.date)}
            className={`day-cell ${
              dayInfo.isCurrentMonth ? "current-month" : "outside-month"
            } ${checkCurrentDay(dayInfo.date) ? "current-day" : ""}`}
          >
            <div className="day-content">
              {dayjs(dayInfo.date).date()}
              {getRemindersForDay(dayInfo.date)?.length > 0 && (
                <div className="event-indicator">
                  {getRemindersForDay(dayInfo.date)?.length}
                </div>
              )}
            </div>
          </td>
        ))}
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {showModal && selectedDateHolidays.length > 0 && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="relative bg-white p-8 w-[90%] md:w-[50%] max-w-md mx-auto rounded-lg shadow-lg">
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-800 font-semibold text-lg">Holidays on {dayjs(selectedDate).format('MMMM DD, YYYY')}</h3>
              
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Holiday Name</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDateHolidays.map((holiday) => (
                    <tr key={holiday._id}>
                      <td className="py-2 px-4">{holiday.event}</td>
                      <td className="py-2 px-4 flex justify-center gap-4">
                        <FaEdit
                          className="text-gray-500 cursor-pointer"
                          onClick={() => handleHolidayClick(holiday)} // Handle edit click
                        />
                        <FaTrashAlt
                          className="text-gray-500 cursor-pointer"
                          onClick={() => handleDelete(holiday._id)} // Handle delete click
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 p-2 rounded-md shadow-md text-white hover:bg-gray-700 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for create/update form */}
      {showCreateForm && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="relative bg-white p-8 w-[90%] md:w-[50%] max-w-md mx-auto rounded-lg shadow-lg">
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-800 font-semibold text-lg">
                {isEditing ? "Update Holiday" : "Create Holiday"}
              </h3>
              <input
                type="text"
                placeholder="Holiday Name"
                value={eventData.event}
                onChange={(e) => setEventData({ ...eventData, event: e.target.value })}
                className="border rounded-md p-2"
              />
              <input
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="border rounded-md p-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 p-2 rounded-md shadow-md text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 py-2 px-4 rounded-md shadow-md text-white hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnualHoliday;
