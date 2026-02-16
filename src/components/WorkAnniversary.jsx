import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkAnniversary() {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [anniversaryData, setAnniversaryData] = useState({
    today: [],
    yesterday: [],
    tomorrow: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnniversaryEmployees = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dashboard/getDashboardData`
        );
        
        // Destructure "anniversaries" from the new backend response format
        const { anniversaries } = response.data;

        // Helper to get MM-DD format for string comparison
        const getMMDD = (offset = 0) => {
          const d = new Date();
          d.setDate(d.getDate() + offset);
          return `${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
        };

        const yesterdayStr = getMMDD(-1);
        const todayStr = getMMDD(0);
        const tomorrowStr = getMMDD(1);

        // Filter the flat array into categories based on hireDate (YYYY-MM-DD)
        setAnniversaryData({
          yesterday: anniversaries.filter(emp => emp.hireDate?.slice(5, 10) === yesterdayStr),
          today: anniversaries.filter(emp => emp.hireDate?.slice(5, 10) === todayStr),
          tomorrow: anniversaries.filter(emp => emp.hireDate?.slice(5, 10) === tomorrowStr),
        });
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnniversaryEmployees();
  }, []);

  const getEmployees = () => {
    return anniversaryData[selectedDay.toLowerCase()] || [];
  };

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="w-full p-4 rounded bg-gray-100">
      <div className="w-full p-6 bg-white rounded shadow-lg h-full">
        <div className="flex justify-between">
          <div className="mb-4 text-2xl font-semibold text-gray-900 headingFont uppercase">
            Anniversary
          </div>
          <div className="flex gap-4">
            {['Yesterday', 'Today', 'Tomorrow'].map((day) => (
              <div className="flex flex-col items-center" key={day}>
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
          {getEmployees().length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {getEmployees().map((employee) => (
                <li key={employee._id} className="py-2">
                  <p className="font-medium text-gray-800">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-xs text-blue-600 italic">Happy Work Anniversary!</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No anniversaries for {selectedDay.toLowerCase()}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkAnniversary;