import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BirthdayCalendar() {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [birthdayData, setBirthdayData] = useState({
    yesterday: [],
    today: [],
    tomorrow: [],
  });

  useEffect(() => {
    const fetchBirthdayData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dashboard/getDashboardData`
        );

        // 1. Destructure "birthdays" (matches your new backend response)
        const { birthdays } = response.data;

        // Helper to get MM-DD format for comparison
        const getMMDD = (offset = 0) => {
          const d = new Date();
          d.setDate(d.getDate() + offset);
          return `${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
        };

        const yesterdayStr = getMMDD(-1);
        const todayStr = getMMDD(0);
        const tomorrowStr = getMMDD(1);

        // 2. Filter the flat array into categories
        // Assumes dateOfBirth is "YYYY-MM-DD"
        setBirthdayData({
          yesterday: birthdays.filter(emp => emp.dateOfBirth?.slice(5, 10) === yesterdayStr),
          today: birthdays.filter(emp => emp.dateOfBirth?.slice(5, 10) === todayStr),
          tomorrow: birthdays.filter(emp => emp.dateOfBirth?.slice(5, 10) === tomorrowStr),
        });

      } catch (error) {
        console.error('Error fetching birthday data:', error);
      }
    };

    fetchBirthdayData();
  }, []);

  const getBirthdaysForDay = () => {
    switch (selectedDay) {
      case 'Yesterday': return birthdayData.yesterday;
      case 'Today': return birthdayData.today;
      case 'Tomorrow': return birthdayData.tomorrow;
      default: return [];
    }
  };

  const birthdaysToDisplay = getBirthdaysForDay();

  return (
    <div className="w-full p-4 rounded bg-gray-100">
      <div className="w-full p-6 bg-white rounded shadow-lg h-full">
        <div className="flex justify-between">
          <div className="mb-4 text-2xl font-semibold text-gray-900 headingFont uppercase">
            Birthdays
          </div>
          <div className="flex gap-4">
            {['Yesterday', 'Today', 'Tomorrow'].map((day) => (
              <div key={day} className="flex flex-col items-center">
                <button
                  className={`px-4 py-2 ${selectedDay === day ? 'text-blue-800 font-bold' : 'text-gray-500'}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
                {selectedDay === day && <div className="w-full h-1 bg-blue-800"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="h-40 mt-4 overflow-y-auto">
          {birthdaysToDisplay.length > 0 ? (
            birthdaysToDisplay.map((employee, index) => (
              <div key={employee._id || index} className="py-2 border-b last:border-0">
                <p className="font-medium text-gray-800">
                  {employee.firstName} {employee.lastName}
                </p>
                <p className="text-xs text-gray-500">Turns another year older today!</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">No birthdays on this day.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BirthdayCalendar;