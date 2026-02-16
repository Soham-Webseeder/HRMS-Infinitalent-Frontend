import React from "react";
import { utils, writeFile } from "xlsx";

const LOPExport = ({ lopData, fileName }) => {
  const handleExport = () => {
    const formattedData = lopData.map((item) => ({
      empId: item.employeeName?.empId,
      "Employee Name": `${item.employeeName?.firstName || ""} ${
        item.employeeName?.lastName || ""
      }`.trim(),
      "Annual Package": item.annualPackage,
      Month: item.month,
      Year: item.year,
      "LOP Days": item.lopDays, 
      "Leaves": item.leaves || 0, // <--- ADDED: New field for paid leaves
    }));

    const ws = utils.json_to_sheet(formattedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "LOP Data");

    writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      onClick={handleExport}
    >
      Export LOP
    </button>
  );
};

export default LOPExport;