import { AiOutlineReload } from "react-icons/ai";
import { CiExport } from "react-icons/ci";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const getISTDate = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  const day = istDate.getDate().toString().padStart(2, "0");
  const month = (istDate.getMonth() + 1).toString().padStart(2, "0");
  const year = istDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const SalarySheetExport = ({ fileName, salaryCycle, selectedBusinessUnit, businessUnits }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const exportToExcel = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      // Use getAllPayrollsByMonthAndBusinessUnit API
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/getAllPayrollsByMonthAndBusinessUnit`,
        {
          params: {
            year: salaryCycle.split("-")[0],
            month: salaryCycle.split("-")[1],
            businessUnit: selectedBusinessUnit || "All",
          },
        }
      );

      // Check if the response has the expected structure
      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error("Payroll data is unavailable or in an unexpected format.");
      }

      const payrolls = response.data.data;

      // Filter and format the salary sheet data
      const filteredData = payrolls.map((payroll) => {
        const employee = payroll.employeeName;
        const grossSalary = Number(employee?.salarySetup?.grossSalary) || 0; // Safely access salarySetup
        const extraPay = Number(payroll.extraPay || 0);
        const grossEarnings = grossSalary + extraPay;
      
        const calendarDays = new Date(payroll.year, payroll.month, 0).getDate();
        const lopDays = payroll.lopDays || 0;
        const lopDeduction = Number(((grossSalary / calendarDays) * lopDays).toFixed(2));
      
        const totalDeductions =
          Number(payroll.pfEmployee || 0) +
          Number(payroll.pfEmployer || 0) +
          Number(payroll.esicEmployee || 0) +
          Number(payroll.esicEmployer || 0) +
          Number(payroll.pt || 0) +
          Number(payroll.tds || 0) +
          Number(payroll.extraDeductions || 0) +
          lopDeduction;
      
        const netSalary = grossEarnings - totalDeductions;
      
        const businessUnitName = businessUnits.find(
          (unit) => unit._id === employee?.businessUnit
        )?.name || employee?.businessUnit || 'N/A';

        return {
          "Employee ID": `${employee?.employeeType || 'N/A'} - ${employee?.empId || 'N/A'}`,
          "Employee Name": `${employee?.firstName || ''} ${employee?.lastName || ''}`.trim(),
          "Department": employee?.department || "N/A",
          "Designation": employee?.designation || "N/A",
          "Business Unit": businessUnitName || "N/A",
          "Gross Earnings": grossEarnings,
          "PF Employee": payroll.pfEmployee || 0,
          "PF Employer": payroll.pfEmployer || 0,
          "ESIC Employee": payroll.esicEmployee || 0,
          "ESIC Employer": payroll.esicEmployer || 0,
          "Professional Tax": payroll.pt || 0,
          "TDS": payroll.tds || 0,
          "LOP Deduction": lopDeduction,
          "Extra Deductions": payroll.extraDeductions || 0,
          "Total Deductions": totalDeductions,
          "Net Salary": netSalary,
        };
      });
      

      if (filteredData.length === 0) {
        throw new Error("No salary data available for the selected period.");
      }

      // Convert filtered data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredData);

      // Create a new workbook and add the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SalarySheet");

      // Generate the Excel file and trigger a download with the IST date
      const istDate = getISTDate();
      XLSX.writeFile(workbook, `${fileName}_SalarySheet_${istDate}.xlsx`);
    } catch (error) {
      console.error("Error fetching salary sheet data:", error.message);
      setErrorMessage(error.message || "Failed to export salary sheet. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <button
        onClick={exportToExcel}
        className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={loading}
      >
        {loading ? <AiOutlineReload className="animate-spin" /> : <CiExport />}
      </button>
    </div>
  );
};

export default SalarySheetExport;
