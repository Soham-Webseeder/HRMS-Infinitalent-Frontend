import { utils, writeFile } from "xlsx";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const ExtraDeductionsImport = ({ setExtraDeductionsData }) => {
  const [importStatus, setImportStatus] = useState({ success: [], errors: [] });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger file input click when button is clicked
    fileInputRef.current.click();
  };

  const parseExcelFile = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    // Transform parsed data to the format required by the API
    return parsedData;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const newData = await parseExcelFile(file);

      setExtraDeductionsData((prevData) => {
        // Use .map to ensure we only update existing payroll records
        return prevData.map((existingRecord) => {
          // 1. Find the matching row in the imported Excel data
          const importedRow = newData.find((row) => {
            const rawId = String(row.empId || "");
            // Split at hyphen and TRIM to handle "ICPLNAPS- 1203"
            const numericPart = rawId.includes("-")
              ? Number(rawId.split("-")[1].trim())
              : Number(rawId.trim());

            return numericPart === Number(existingRecord.employeeName?.empId);
          });

          // 2. If matched, merge only the deduction fields
          if (importedRow) {
            return {
              ...existingRecord, // KEEPS: firstName, lastName, employeeType, and _id
              extraDeductions: Number(importedRow["Extra Deductions"]) || 0,
              extraDeductionsReason: importedRow["Reason"] || "",
            };
          }

          // 3. If no match in Excel, return the original record as is
          return existingRecord;
        });
      });

      alert("Extra Deductions merged successfully. Headers and names preserved.");
    } catch (error) {
      console.error("Import Error:", error);
      alert("An error occurred during import.");
    } finally {
      setLoading(false);
      e.target.value = null; // Reset input
    }
  };

  const calculateGrossEarnings = (payslip, employee) => {
    if (!payslip || !employee) return 0;

    // Base gross salary
    const grossSalary = Number(employee.salarySetup?.grossSalary) || 0;

    // Add extra pay to gross earnings
    const extraPay = Number(payslip.extraPay || 0);

    return grossSalary + extraPay;
  };

  const calculateNetPay = (payslip, employee) => {
    const grossEarnings = calculateGrossEarnings(payslip, employee);
    const totalDeductions = calculateTotalDeductions(payslip, employee);
    return grossEarnings - totalDeductions;
  };

  return (
    <div className="ml-2">
      {/* Hidden file input */}
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Import Button */}
      <button
        onClick={handleButtonClick}
        className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={loading}
      >
        {loading ? "Importing..." : "Import Extra Deductions Data"}
      </button>

      {/* Success Message */}
      {importStatus.success.length > 0 && (
        <div className="mt-4 text-green-500">
          <p>
            Successfully imported Extra Deductions data for {importStatus.success.length}{" "}
            entries.
          </p>
        </div>
      )}

      {/* Error Message */}
      {importStatus.errors.length > 0 && (
        <div className="mt-4 text-red-500">
          <p>Errors occurred during import:</p>
          <ul>
            {importStatus.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


const ExtraDeductionsExport = ({ data, fileName }) => {
  const handleExport = () => {
    const formattedData = data.map((item) => ({
      empId: `${item.employeeName?.employeeType}-${item.employeeName?.empId}`,
      "Employee Name": `${item.employeeName?.firstName || ""} ${item.employeeName?.lastName || ""
        }`.trim(),
      "Monthly Gross Salary": item.grossPay,
      Month: item.month,
      Year: item.year,
      "Extra Deductions": item.extraDeductions || 0, // Export LOP days instead of LOP amount
      "Reason": item.extraDeductionsReason
    }));

    const ws = utils.json_to_sheet(formattedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Extra Deductions Data");

    writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      onClick={handleExport}
    >
      Export Extra Deductions
    </button>
  );
};

const ExtraDeductions = () => {
  const now = new Date();
  now.setMonth(now.getMonth() - 1); // Set to last month
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const lastYear = now.getFullYear();
  const [extraDeductionsData, setExtraDeductionsData] = useState([]);
  const [months, setMonths] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search input
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [salaryCycle, setSalaryCycle] = useState(`${lastYear}-${lastMonth}`);
  const navigate = useNavigate()

  // Fetch employee LOP data
  useEffect(() => {
    const fetchExtraDeductionsData = async () => {
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

        setExtraDeductionsData(data);
        setMonths([...uniqueMonths].sort()); // Sorting the months by date
      } catch (error) {
        console.error("Error fetching LOP data:", error);
      }
    };

    fetchExtraDeductionsData();
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
  const filteredExtraDeductionsData = extraDeductionsData.filter((item) => {
    const fullName = `${item.employeeName?.firstName || ""} ${item.employeeName?.lastName || ""
      }`.trim();
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  console.log("filtered", filteredExtraDeductionsData);

  const handleSalaryCycleChange = async (event) => {
    setSalaryCycle(event.target.value);
  };

  const handleSave = async () => {
    try {
      // await axios.post(
      //   `${import.meta.env.VITE_APP_BASE_URL}/salary/updateLops`,
      //   { updatedLopData: lopData }
      // );

      console.log(extraDeductionsData)
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/importExtraDeductionsData`,
        {
          payrolls: extraDeductionsData,
        }
      );
      alert("Extra Deductions data has been updated successfully.");
    } catch (error) {
      console.error("Error saving Extra Deductions data:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Extra Deductions</h1>

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

        <ExtraDeductionsExport data={extraDeductionsData} fileName="Employee_Extra_Deductions_Data" />
        <ExtraDeductionsImport setExtraDeductionsData={setExtraDeductionsData} />


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

              {filteredExtraDeductionsData.length > 0 ? (
                <th className="px-4 py-2 border">
                  Extra Deductions for{" "}
                  {new Date(
                    filteredExtraDeductionsData[0].year,
                    filteredExtraDeductionsData[0].month - 1
                  ).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </th>
              ) : (
                <th className="px-4 py-2 border">Extra Deductions For</th> // Default heading if no data is present
              )}
              <th className="px-4 py-2 border">Extra Deductions Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredExtraDeductionsData.length > 0 ? (
              filteredExtraDeductionsData.map((item, index) => {
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
                      {item.extraDeductions || 0}
                    </td>
                    <td className="px-4 py-2 border">
                      {item.extraDeductionsReason || "-"}
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

export default ExtraDeductions;