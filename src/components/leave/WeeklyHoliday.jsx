import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

export const WeeklyHoliday = () => {
  const [showModal, setShowModal] = useState(false);
  const [holidays, setHolidays] = useState({});
  const [selectedHoliday, setSelectedHoliday] = useState({});
  const [holidayId, setHolidayId] = useState("");

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/leave/getWeeklyHolidayById/66c9dca38413c811951c447a`
        );
        setHolidays(response.data.data);
        setHolidayId(response.data.data._id);
        // console.log(response.data.data._id,"id")
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditClick = () => {
    setSelectedHoliday({ ...holidays });
    toggleModal();
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/leave/updateWeeklyHoliday/${holidayId}`,
        selectedHoliday
      );
      setHolidays(response.data.data);
      toast.success("Weekly Holiday Successfully Updated!");
      toggleModal();
    } catch (error) {
      console.error("Error saving holidays:", error);
    }
  };

  const handleCheckboxChange = (day) => {
    setSelectedHoliday((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  return (
    <div className="w-full sm:w-full flex justify-center mt-3 pt-1">
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col w-[89%] pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <h1 className="text-3xl font-bold p-1">Leave</h1>
        <div className="flex flex-row justify-between items-center py-3 bg-white rounded-t-sm">
          <h1 className="text-sm font-semibold text-red-500 px-1">
            Leave/Weekly
          </h1>
        </div>
        <div className="p-4 px-8 flex items-center justify-center overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                  SL
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                  Weekly Leave Days
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm border border-slate-300">
                  1
                </td>
                <td className="px-6 py-4 whitespace-wrap text-sm border border-slate-300">
                  {Object.entries(holidays)
                    .filter(([day, isHoliday]) => isHoliday && day !== "_id")
                    .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                    .join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                  <button
                    onClick={handleEditClick}
                    className="text-indigo-500 hover:text-indigo-900 "
                  >
                    <FaEdit size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-screen-lg">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Edit Weekly Leave
              </h2>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {[
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ].map((day, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`day-${index}`}
                      name={`day-${index}`}
                      checked={selectedHoliday[day] || false}
                      onChange={() => handleCheckboxChange(day)}
                      className="mr-2 h-8 w-8"
                    />
                    <label htmlFor={`day-${index}`}>
                      {getWeekdayName(index)}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getWeekdayName = (index) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[index];
};
