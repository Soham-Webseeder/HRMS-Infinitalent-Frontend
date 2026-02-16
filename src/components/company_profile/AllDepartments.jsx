import React, { useState, useEffect } from "react";
import axios from "axios";

export const AllDepartments = () => {
  const companyId = localStorage.getItem("companyId");
  const [depData, setDepData] = useState([]);
    console.log(companyId,"companyIdddd")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/company/getAllDepartment`
        );

        // Extract department data from the response and update state
        const departments = response.data.response
          .map((item) => item.department)
          .flat();
        setDepData(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchData();
  }, [companyId]); // Include companyId in the dependency array to trigger effect when it changes

  return (
    <div className="w-[100%]">
      {depData.map((department) => (
        <div
          key={department._id}
          className="border-b border-gray-200 flex items-center justify-between px-4 pr-5"
        >
          <div className="p-4 pl-5">{department.title}</div>
          <div className="list-disc list-inside">
            {department.subDepartments.map((subDepartment) => (
              <div key={subDepartment._id} className="p-4 pl-5 text-gray-600">
                {subDepartment.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default AllDepartments;
