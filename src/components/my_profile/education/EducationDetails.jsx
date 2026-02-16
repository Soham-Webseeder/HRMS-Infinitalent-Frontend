import { MdTempleBuddhist } from "react-icons/md";
import React, { useEffect, useState } from "react";

import axios from "axios";

export const EducationDetails = () => {
  const [educationData, setEducationData] = useState(null);

  useEffect(() => {
    axios
      .get("your-api-endpoint")
      .then((response) => {
        setEducationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching education details:", error);
      });
  }, []);

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4">Qualification</h2>
        <div className="flex justify-between">
          <div className="w-1/2  bg-slate-400 flex items-center justify-center">
            <MdTempleBuddhist className="text-blue-500" size={100} />
          </div>
          <div className="w-1/2 pl-4">
            {educationData && (
              <div>
                <p className="text-lg font-semibold mb-2">
                  College Name: {educationData.collegeName}
                </p>
                <p className="text-lg font-semibold mb-2">
                  Course Name: {educationData.courseName}
                </p>
                <p className="text-lg font-semibold mb-2">
                  Course Start Date: {educationData.courseStartDate}
                </p>
                <p className="text-lg font-semibold mb-2">
                  Course End Date: {educationData.courseEndDate}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
