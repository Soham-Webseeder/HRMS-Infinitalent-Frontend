import React, { useState, useRef } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ReactPrint from "react-to-print";
import { IoMdPrint } from "react-icons/io";

const AbsenteesComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [absenteesData, setAbsenteesData] = useState([]);
  const componentRef = useRef();

  const handleInputChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/attendance/getAbsenteesByDate/?date=${formattedDate}`,
      );
       console.log(response.data.data,"resss")
      if (response.data.success) {
        setAbsenteesData(response.data.data);
        setShowDetails(true);
        console.log(absenteesData,"absenteedataaaa")
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch absentee data:", error);
      setAbsenteesData([]);
      setShowDetails(false);
      // Show error toast
   
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 overflow-x-hidden flex flex-col w-full mx-auto">
      <Toaster />
      <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5">
        <h2 className="text-xl font-bold mb-2">Absentees Report</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              Date
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="date"
              className="p-2 border w-full form-input rounded mb-5"
              onChange={handleInputChange}
              value={selectedDate}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-4 mb-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {showDetails && (
        <div>
          <div className="flex justify-end items-center pt-4 pr-5">
            <ReactPrint
              trigger={() => <IoMdPrint size={25} />}
              content={() => componentRef.current}
              documentTitle={`Absentees Report`}
            />
          </div>
          <div className="bg-white border-gray-200 border border-rounded shadow-lg md:px-5 py-5 mt-3 overflow-x-auto sm:px-2 px-2">
            <table ref={componentRef} className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Sl
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {absenteesData.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{item.firstName} {item.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!showDetails && (
        <div className="flex items-center pt-5 w-full justify-center text-2xl font-medium text-black">
          No Absentees Found
        </div>
      )}
    </div>
  );
};

export default AbsenteesComponent;
