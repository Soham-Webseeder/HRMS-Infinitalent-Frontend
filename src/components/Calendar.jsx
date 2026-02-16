import { FaDotCircle } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [dates, setDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [events, setEvents] = useState([]);
  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/leave/getAllAnnualHoliday`
        );
        setEvents(res.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  // Generate the next 7 days starting from the current date
  const generateDates = (startDate) => {
    const daysArray = [];
    for (let i = 0; i < 7; i++) {
      daysArray.push(startDate.add(i, "day"));
    }
    return daysArray;
  };
  // Update the dates whenever the currentDate changes
  useEffect(() => {
    const newDates = generateDates(currentDate);
    setDates(newDates);
  }, [currentDate]);
  // Handle month and year change
  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value, 10);
    setCurrentDate(currentDate.month(month));
  };
  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setCurrentDate(currentDate.year(year));
  };
  // Create an array of years to choose from
  const generateYearOptions = () => {
    const currentYear = dayjs().year();
    return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  };
  // Move to the previous day
  const handlePrevDay = () => {
    setCurrentDate(currentDate.subtract(1, "day"));
  };
  // Move to the next day
  const handleNextDay = () => {
    setCurrentDate(currentDate.add(1, "day"));
  };
  // Handle click on a specific day
  const handleDayClick = (date) => {
    setSelectedDay(date);
  };
  // Get events for a specific day
  const getEventsForDate = (date) => {
    return events.filter((event) => dayjs(event.date).isSame(date, "day"));
  };
  // Get events for the selected day
  const getEventsForSelectedDay = () => {
    return getEventsForDate(selectedDay);
  };
  return (
    <div className="w-full p-4 rounded bg-gray-100">
      <div className="relative w-full flex flex-col  p-6 bg-white rounded shadow-lg h-full">
        <div className="flex justify-between">

        <h2 className="mb-4 text-2xl font-semibold text-gray-900 headingFont uppercase">
          Calendar
        </h2>
        {/* Month and Year Selector */}
        <div className="mb-6 flex items-center space-x-2">
          <select
            value={currentDate.month()}
            onChange={handleMonthChange}
            className="text-lg font-bold text-gray-700 bg-transparent p-2 border rounded-lg"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {dayjs().month(i).format("MMMM")}
              </option>
            ))}
          </select>
          <select
            value={currentDate.year()}
            onChange={handleYearChange}
            className="text-lg font-light text-gray-700 bg-transparent p-2 border rounded-lg"
          >
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        </div>
        {/* Arrows for Date Navigation */}
        <div className="flex justify-center items-center gap-4 mb-6 ">
          <button
            onClick={handlePrevDay}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 h-10 w-10 flex justify-center items-center"
          >
            <TbPlayerTrackPrevFilled />
          </button>
          {/* 7-Day Display */}
          <div className="grid grid-cols-7 gap-4 w-full">
            {dates.map((date, index) => {
              const eventsForDate = getEventsForDate(date);
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center px-4 py-2 cursor-pointer relative rounded-lg ${
                    date.isSame(selectedDay, "day")
                      ? "bg-blue-950 text-white"
                      : "bg-blue-200 text-gray-900"
                  }`}
                  onClick={() => handleDayClick(date)}
                >
                  <span className="text-sm font-medium">
                    {date.format("ddd")}
                  </span>
                  <span className="text-xl font-bold">{date.format("DD")}</span>
                  {/* Event count badge */}
                  {eventsForDate.length > 0 && (
                    <span className="absolute top-0 right-0 -translate-y-1/2 text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-0.5">
                      +{eventsForDate.length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleNextDay}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 h-10 w-10 flex justify-center items-center"
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
        {/* Event List for the Selected Day */}
        <div className="w-full mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Events</h3>
          {getEventsForSelectedDay().length > 0 ? (
            <ul className="mt-2 space-y-2">
              {getEventsForSelectedDay().map((event, index) => (
                <li
                  key={index}
                  className="p-2 bg-white rounded-lg shadow-sm text-gray-800"
                >
                  <span className="font-semibold flex justify-start items-center gap-1">
                    <FaDotCircle className="text-xs" /> {event.event}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500">No events for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Calendar;
