import React, { useEffect, useState } from "react";
import axios from "axios";
import LOPExport from "./LopExport";
import LOPImport from "./LopImport";
import { useNavigate } from "react-router-dom";

const LOP = () => {
  const now = new Date();
  now.setMonth(now.getMonth() - 1); // Set to last month
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const lastYear = now.getFullYear();
  const [lopData, setLopData] = useState([]);
  const [months, setMonths] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search input
  const [businessUnits,setBusinessUnits] = useState([]);
  const [selectedBusinessUnit,setSelectedBusinessUnit] = useState("All");
  const [salaryCycle, setSalaryCycle] = useState(`${lastYear}-${lastMonth}`);

  const navigate = useNavigate()

  // Fetch employee LOP data
  useEffect(() => {
    const fetchLopData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/getAllLOPByMonthAndBusinessUnit`,
          {
            params:{
              businessUnit:selectedBusinessUnit,
              month:salaryCycle.split("-")[1],
              year:salaryCycle.split("-")[0]
            }
          }
        );

        const data = response.data.data;

        const uniqueMonths = new Set();
        data.forEach((item) => {
          uniqueMonths.add(`${item.month}-${item.year}`);
        });

        setLopData(data);
        setMonths([...uniqueMonths].sort()); // Sorting the months by date
      } catch (error) {
        console.error("Error fetching LOP data:", error);
      }
    };

    fetchLopData();
  }, [selectedBusinessUnit,salaryCycle]);


  useEffect(() => {
    const fetchBusinessUnits = async () => {
      try {
        const businessUnitResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
        );

        if (businessUnitResponse.data) {
          setBusinessUnits(businessUnitResponse.data.response || []);
        }
      } catch (error) {
        console.error("Error fetching business units:", error);
      }
    };

    fetchBusinessUnits();
  }, []);

  const handleSalaryCycleChange = async (event) => {
      setSalaryCycle(event.target.value);
    };
    

  // Handle search query filtering
  const filteredLopData = lopData.filter((item) => {
    const fullName = `${item.employeeName?.firstName || ""} ${
      item.employeeName?.lastName || ""
    }`.trim();
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log("filtered", filteredLopData);

  const handleSave = async () => {
    try {
      // await axios.post(
      //   `${import.meta.env.VITE_APP_BASE_URL}/salary/updateLops`,
      //   { updatedLopData: lopData }
      // );

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/salary/importLopData`,
        {
          lops: lopData,
        }
      );
      alert("LOP data has been updated successfully.");
    } catch (error) {
      console.error("Error saving LOP data:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">3.1 File arrears and LOP</h1>

      <div className="flex items-center space-x-2 mb-2">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
          />

          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <LOPExport lopData={lopData} fileName="Employee_Lop_Data" />
        <LOPImport setLopData={setLopData} />
        <div className="flex gap-2 items-center flex-wrap">
          <div class="flex gap-2 employees-center">
                  <label
                    for="salary-cycle"
                    class="block text-medium font-medium mb-2 text-blue-600"
                  >
                    Salary Cycle:
                  </label>
                  <input
                    type="month"
                    id="salary-cycle"
                    name="salary-cycle"
                    value={salaryCycle}
                    onChange={handleSalaryCycleChange}
                    class="border border-gray-300 rounded-md p-2 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
          </div>

            {/* Business Unit Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="business-unit"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Business Unit
              </label>
              <select
                id="business-unit"
                value={selectedBusinessUnit}
                onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                {businessUnits.map((unit) => (
                  <option key={unit._id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Employee ID</th>
              <th className="px-4 py-2 border">Employee</th>
              <th className="px-4 py-2 border">Annual Package</th>
              {/* Dynamically setting the table heading based on the first item in filteredLopData */}

              {filteredLopData.length > 0 ? (
                <th className="px-4 py-2 border">
                  LOP for{" "}
                  {new Date(
                    filteredLopData[0].year,
                    filteredLopData[0].month - 1
                  ).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </th>
              ) : (
                <th className="px-4 py-2 border">LOP For</th> // Default heading if no data is present
              )}
            </tr>
          </thead>
          <tbody>
            {filteredLopData.length > 0 ? (
              filteredLopData.map((item, index) => {
                const fullName = `${item.employeeName?.firstName || ""} ${
                  item.employeeName?.lastName || ""
                }`.trim();
                const monthYear = `${item.month}-${item.year}`;
                return (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                    {item.employeeName?.employeeType}-{item.employeeName?.empId}
                    </td>
                    <td className="px-4 py-2 border">
                      {fullName || "Unnamed Employee"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.annualPackage || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.lopDays || "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center px-4 py-2 border">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-2">
        
      <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          onClick={()=>navigate('/payroll/run-payroll')}
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LOP;
