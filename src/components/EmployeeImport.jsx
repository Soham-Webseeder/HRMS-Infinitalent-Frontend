import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const EmployeeImport = () => {
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
    return parsedData;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setImportStatus({ success: [], errors: [] });

    try {
      const employeesData = await parseExcelFile(file);

      console.log(employeesData)
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/importEmployees`,
        {
          employees: employeesData,
        }
      );
      console.log(response.data)
      location.reload();
      setImportStatus(response.data.result);
      alert("Employee data has been successfully imported.");
    } catch (error) {
      console.error("Error importing data:", error);
      alert("An error occurred while importing the data.");
    } finally {
      setLoading(false);
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
        className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Importing..." : "Import Employees"}
      </button>
    </div>
  );
};

export default EmployeeImport;
