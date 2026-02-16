import React from "react";
import { FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

// Helper function to convert AM/PM time to 24-hour format and Date object
const convertTo24HourFormat = (time) => {
  if (!time) return null;

  const [rawTime, modifier] = time.split(" ");
  let [hours, minutes] = rawTime.split(":").map(Number);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0; 
  }

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes || 0);
  date.setSeconds(0);

  return date;
};

// Helper function to format date to dd-mm-yyyy
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

// Helper function to calculate overtime
const calculateOvertime = (outTime) => {
  if (!outTime) return "N/A";

  const outTimeDate = convertTo24HourFormat(outTime);
  const fivePM = new Date();
  fivePM.setHours(17, 0, 0); 

  const diffMs = outTimeDate - fivePM;
  if (isNaN(diffMs) || diffMs <= 0) return "0h 0m";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours}h ${minutes}m`;
};

// Helper function to calculate time differences (Late/Early)
const calculateTimeDifference = (time, referenceTime) => {
  if (!time) return "N/A";

  const timeDate = convertTo24HourFormat(time);
  const referenceDate = convertTo24HourFormat(referenceTime);

  const diffMs = timeDate - referenceDate;
  if (isNaN(diffMs)) return "N/A";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return diffMs > 0 ? `${hours}h ${minutes}m` : "N/A";
};

// Helper function to calculate working hours
const calculateWorkingHours = (inTime, outTime) => {
  if (!inTime || !outTime) return "N/A";

  const inTimeDate = convertTo24HourFormat(inTime);
  const outTimeDate = convertTo24HourFormat(outTime);

  const diffMs = outTimeDate - inTimeDate;
  if (isNaN(diffMs) || diffMs <= 0) return "N/A";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

const ExcelExport = ({ data, filename, classes }) => {
  const exportToExcel = () => {
    
    const formattedData = data.map((item, index) => ({
      SrNo: index + 1,
      Emp_ID: item?.employeeName?._id || "N/A",
      First_Name: item?.employeeName?.firstName || "Unknown",
      Last_Name: item?.employeeName?.lastName || "",
      Date: formatDate(item?.date),
      Status:
        item?.attendanceStatus === "Present" || item?.attendanceStatus === "P"
          ? "Present"
          : "Absent",
      InTime: item?.inTime || "N/A",
      OutTime: item?.outTime || "N/A",
      LateBy: calculateTimeDifference(item?.inTime, "09:00 AM"),
      EarlyBy: calculateTimeDifference("09:00 AM", item?.inTime),
      Break: "1h", 
      Overtime: calculateOvertime(item?.outTime), // 
      WorkingHours: calculateWorkingHours(item?.inTime, item?.outTime),
    }));

    // Create a worksheet with the formatted data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    // Generate Excel file in memory
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create Blob object and initiate download
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // For IE browser
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // For other browsers
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className={
        classes
          ? classes
          : "p-2 bg-gray-950 text-white flex gap-2 justify-center items-center"
      }
    >
      <FaFileDownload /> Export
    </button>
  );
};

export default ExcelExport;
