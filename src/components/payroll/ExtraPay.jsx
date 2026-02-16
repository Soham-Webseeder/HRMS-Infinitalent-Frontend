import { utils, writeFile } from "xlsx";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const ExtraPayImport = ({ setExtraPayData }) => {
  const [importStatus, setImportStatus] = useState({ success: [], errors: [] });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const parseExcelFile = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    console.log(parsedData);
    return parsedData;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const newData = await parseExcelFile(file);

      setExtraPayData((prevData) => {
        // 1. Map through the current payroll list
        return prevData.map((existingRecord) => {
          // 2. Extract the number from the Excel string (e.g., "ICPLNAPS-1123" -> 1123)
          const importedRecord = newData.find((row) => {
            const rawId = String(row.empId || "");
            const numericPart = rawId.includes("-")
              ? Number(rawId.split("-")[1].trim())
              : Number(rawId.trim());

            return numericPart === Number(existingRecord.employeeName?.empId);
          });

          // 3. If a match is found, update ONLY the extra pay fields
          if (importedRecord) {
            return {
              ...existingRecord, // PRESERVES: firstName, lastName, employeeType, _id
              extraPay: Number(importedRecord["Extra Pay"]) || 0,
              extraPayReason: importedRecord["Reason"] || "",
            };
          }

          // 4. If no match in Excel, keep the existing record unchanged
          return existingRecord;
        });
      });

      alert("Extra Pay successfully merged. Names and Headers preserved.");
    } catch (error) {
      console.error("Import Error:", error);
    } finally {
      setLoading(false);
      e.target.value = null;
    }
  };


  return (
    <div className="ml-2">
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={loading}
      >
        {loading ? "Importing..." : "Import Extra Pay Data"}
      </button>
    </div>
  );
};



const ExtraPayExport = ({ data, fileName }) => {
  const handleExport = () => {
    const formattedData = data.map((item) => ({
      empId: `${item.employeeName?.employeeType}-${item.employeeName?.empId}`,
      "Employee Name": `${item.employeeName?.firstName || ""} ${item.employeeName?.lastName || ""
        }`.trim(),
      "Monthly Gross Salary": item.grossPay,
      Month: item.month,
      Year: item.year,
      "Extra Pay": item.extraPay, // Export LOP days instead of LOP amount
      "Reason": item.extraPayReason
    }));

    const ws = utils.json_to_sheet(formattedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Extra Pay Data");

    writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      onClick={handleExport}
    >
      Export Extra Pay
    </button>
  );
};

const ExtraPay = () => {
  const now = new Date();
  now.setMonth(now.getMonth() - 1); // Set to last month
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const lastYear = now.getFullYear();
  const [extraPayData, setExtraPayData] = useState([]);
  const [months, setMonths] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search input
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [salaryCycle, setSalaryCycle] = useState(`${lastYear}-${lastMonth}`);

  const navigate = useNavigate()

  // Fetch employee LOP data
  useEffect(() => {
    const fetchExtraPayData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/payroll/getAllPayrollsByMonthAndBusinessUnit`,
          {
            params: {
              businessUnit: selectedBusinessUnit,
              month: salaryCycle.split("-")[1],
              year: salaryCycle.split("-")[0]
            }
          }
        );
        const data = response.data.data;
        console.log(data.data)
        const uniqueMonths = new Set();
        data.forEach((item) => {
          uniqueMonths.add(`${item.month}-${item.year}`);
        });

        setExtraPayData(data);
        setMonths([...uniqueMonths].sort()); // Sorting the months by date
      } catch (error) {
        console.error("Error fetching LOP data:", error);
      }
    };

    fetchExtraPayData();
  }, [selectedBusinessUnit, salaryCycle]);

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

  // Handle search query filtering
  const filteredExtraPayData = extraPayData.filter((item) => {
    const fullName = `${item.employeeName?.firstName || ""} ${item.employeeName?.lastName || ""
      }`.trim();
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log("filtered", filteredExtraPayData);

  const handleSalaryCycleChange = async (event) => {
    setSalaryCycle(event.target.value);
  };

  const handleSave = async () => {
    try {
      // await axios.post(
      //   `${import.meta.env.VITE_APP_BASE_URL}/salary/updateLops`,
      //   { updatedLopData: lopData }
      // );

      console.log(extraPayData)
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/importExtraPayData`,
        {
          payrolls: extraPayData,
        }
      );
      alert("Extra Pay data has been updated successfully.");
    } catch (error) {
      console.error("Error saving Extra Pay data:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Extra Pay</h1>

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

        <ExtraPayExport data={extraPayData} fileName="Employee_Extra_Pay_Data" />
        <ExtraPayImport setExtraPayData={setExtraPayData} />
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
              <th className="px-4 py-2 border">Monthly Gross Salary</th>
              {/* Dynamically setting the table heading based on the first item in filteredLopData */}

              {filteredExtraPayData.length > 0 ? (
                <th className="px-4 py-2 border">
                  Extra Pay for{" "}
                  {new Date(
                    filteredExtraPayData[0].year,
                    filteredExtraPayData[0].month - 1
                  ).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </th>
              ) : (
                <th className="px-4 py-2 border">Extra Pay For</th> // Default heading if no data is present
              )}
              <th className="px-4 py-2 border">Extra Pay Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredExtraPayData.length > 0 ? (
              filteredExtraPayData.map((item, index) => {
                const fullName = `${item.employeeName?.firstName || ""} ${item.employeeName?.lastName || ""
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
                      {item.grossPay || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.extraPay || 0}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.extraPayReason || "-"}
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
          onClick={() => navigate('/payroll/run-payroll')}
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
}

export default ExtraPay;