import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EmployeeAsset = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [assetData, setAssetData] = useState([]);

  const user = useSelector((state) => state.user);
  const id = user.userAllData.employeeDetails;

  const fetchEmployeeData = async () => {
    const employeeResponse = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${id}`
    );
    setEmployeeData(employeeResponse.data.data);

    const assetResponse = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/asset/getAssetByEmployee/${id}`
    );
    console.log(assetResponse.data.data, "emp");

    setAssetData(assetResponse.data.data);
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              SL No
            </th>
            <th
              scope="col"
              className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Employee Name
            </th>
            <th
              scope="col"
              className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipment Name
            </th>
            <th
              scope="col"
              className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assetData &&
            assetData.map(
              (asset, assetIndex) =>
                asset.fields &&
                asset.fields.map((field, fieldIndex) => (
                  <tr
                    key={fieldIndex}
                    className={
                      fieldIndex % 2 === 0
                        ? 'className="border border-slate-300 px-6 py-4 whitespace-nowrap"'
                        : ""
                    }
                  >
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {assetIndex + 1}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {asset.employeeName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {equipmentData.find(
                        (equipment) => equipment._id === field.equipment
                      )?.equipmentName || "Unknown Equipment"}
                      {/* Access equipment from field */}
                    </td>
                    <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                      {formatDate(field.date)}
                    </td>
                    {/* <td className="border border-slate-300 px-6 py-4 whitespace-nowrap flex">
                        <div className="w-[50%] border-r border-slate-300 py-3 text-center">
                          <button
                            className="text-indigo-500 hover:text-indigo-900 "
                            onClick={() => handleUpdateClick(asset._id)}
                          >
                            <FaEdit size={20} />
                          </button>
                        </div>
                        <div className="w-[50%] py-3 text-center">
                          <button
                            className="text-red-500 hover:text-red-900"
                            onClick={() => handleDeleteClick(asset._id)}
                          >
                            {" "}
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td> */}
                  </tr>
                ))
            )}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeAsset;
