import React, { useState } from "react";
import * as XLSX from "xlsx";

// Helper function to get today's date in IST format
const getISTDate = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
  const istDate = new Date(now.getTime() + istOffset);
  const day = istDate.getDate().toString().padStart(2, "0");
  const month = (istDate.getMonth() + 1).toString().padStart(2, "0");
  const year = istDate.getFullYear();

  return `${day}-${month}-${year}`;
};

const ExcelExport = ({ fileName }) => {
  const [loading, setLoading] = useState(false);

  const exportToExcel = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees-for-export`
      );
      const data = await response.json();

      // Map through the employee data and filter out sensitive/unwanted fields
      const filteredData = data.data.map((item) => {
        const {
          _id,
          photograph,
          resume,
          password,
          empId,
          salarySetup,
          employeeType, // Ensure employeeType is available
          __v,
          ...rest
        } = item;

        // Create a new field employeeId that combines empId and employeeType
        const employeeId = `${employeeType || ''}-${empId}`; // Format employeeId as needed

        // Safely handle salarySetup fields if they exist
        const basicSalary = salarySetup?.basicSalary || "";
        const hra = salarySetup?.hra || "";
        const specialAllowance = salarySetup?.specialAllowance || "";
        const otherAllowance = salarySetup?.otherAllowance || "";
        const grossSalary = salarySetup?.grossSalary || "";
        const netSalary = salarySetup?.netSalary || "";
        const pfEmployee = salarySetup?.pfEmployee || "";
        const pfEmployer = salarySetup?.pfEmployer || "";
        const esicEmployee = salarySetup?.esicEmployee || "";
        const esicEmployer = salarySetup?.esicEmployer || "";
        const pt = salarySetup?.pt || "";

        return {
          employeeId,  // Add the new employeeId field to the returned object

          ...rest,
          basicSalary,
          hra,
          specialAllowance,
          otherAllowance,
          grossSalary,
          netSalary,
          pfEmployee,
          pfEmployer,
          esicEmployee,
          esicEmployer,
          pt,
        };
      });

      // Convert filtered data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredData);

      // Create a new workbook and add the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

      // Generate the Excel file and trigger a download with the IST date
      const istDate = getISTDate();
      XLSX.writeFile(workbook, `${fileName}_Employee_Data_${istDate}.xlsx`);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? "Exporting..." : "Export to Excel"}
    </button>
  );
};

export default ExcelExport;
