import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const LopImport = ({ setLopData }) => {
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
    setImportStatus({ success: [], errors: [] });

    try {
      const lopData = await parseExcelFile(file);
      
      // The actual API call to exports.bulkImportLOP should happen here 
      // using the transformed lopData, but we update local state as per your structure:

      setLopData((prevData) => {
        const updatedData = [...prevData];
        lopData.forEach((newRecord) => {
          const recordIndex = updatedData.findIndex(
            (record) => record.employeeName?.empId === newRecord.empId
          );

          const newLOPDays = newRecord["LOP Days"];
          const newLeaves = newRecord["Leaves"]; // <--- ADDED: Read Leaves column

          if (recordIndex !== -1) {
            // Update the existing record
            updatedData[recordIndex] = {
              ...updatedData[recordIndex],
              lopDays: newLOPDays,
              leaves: newLeaves, // <--- ADDED: Update leaves field
            };
          } else {
            // Add the new record
            // Ensure new records also have the new fields
            updatedData.push({
                ...newRecord,
                lopDays: newLOPDays,
                leaves: newLeaves
            });
          }
        });

        return updatedData;
      });

      alert("LOP data has been successfully imported.");
    } catch (error) {
      console.error("Error importing data:", error);

      // Handle any import errors
      setImportStatus((prev) => ({
        success: prev.success,
        errors: [...prev.errors, error.message || "Import failed"],
      }));
      alert("An error occurred while importing the LOP data.");
    } finally {
      setLoading(false);
    }
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
        className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Importing..." : "Import LOP Data"}
      </button>

      {/* Success Message */}
      {importStatus.success.length > 0 && (
        <div className="mt-4 text-green-500">
          <p>
            Successfully imported LOP data for {importStatus.success.length}{" "}
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

export default LopImport;