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

const CandidateExport = ({ fileName }) => {
  const [loading, setLoading] = useState(false);

  const exportToExcel = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate`
      );
      const data = await response.json();

      // Process and flatten data
      const filteredData = data.data.map((item) => {
        const {
          __v,
          _id,
          resume,
          document,
          educationalInfo,
          pastExperience,
          jobPosition, // extract job position
          ...rest
        } = item;

        // Flatten educationalInfo and pastExperience arrays
        const educationDetails = educationalInfo
          .map(
            (edu) =>
              `Degree: ${edu.obtainedDegree}, University: ${edu.university}, CGPA: ${edu.CGPA}, Comments: ${edu.comments}`
          )
          .join("; ");

        const experienceDetails = pastExperience
          .map(
            (exp) =>
              `Company: ${exp.companyName}, Period: ${exp.workingPeriod} months, Designation: ${exp.designation}`
          )
          .join("; ");

        // Extract job position name or set to 'Unknown' if not available
        const jobPositionName = jobPosition ? jobPosition.name : "Unknown";

        return {
          ...rest,
          jobPositionName, // Add job position name to export data
          educationDetails, // Add flattened educational info
          experienceDetails, // Add flattened past experience
        };
      });

      // Convert filtered data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredData);

      // Create a new workbook and add the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

      // Generate the Excel file and trigger a download with the IST date
      const istDate = getISTDate();
      XLSX.writeFile(workbook, `${fileName}_Candidate_Data_${istDate}.xlsx`);
    } catch (error) {
      console.error("Error fetching candidate data:", error);
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

export default CandidateExport;
