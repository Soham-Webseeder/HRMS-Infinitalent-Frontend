import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const NewAssetInfo = () => {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [equipmentDetails, setEquipmentDetails] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [showDetails, setShowDetails] = useState(false); 

  const fetchData = async (currentPage, perPage) => {
    try {
      const employeeResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      const equipmentResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllAssetAssign`,
        {
          params: {
            page: currentPage,
            limit: perPage,
          },
        }
      );

      setEmployees(employeeResponse.data.data);
      setEquipment(equipmentResponse.data.data);
      setTotalPages(equipmentResponse.data.pagination.totalPages);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page, perPage);
  }, [page, perPage]);

  const fetchEquipmentById = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getEquipmentById/${id}`
      );
      return res.data.data;
    } catch (error) {
      console.error("Error fetching equipment details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllEquipmentDetails = async () => {
      const details = {};
      for (let item of equipment) {
        const id = item.fields[0].equipment;
        const equipmentDetail = await fetchEquipmentById(id);
        if (equipmentDetail) {
          details[id] = equipmentDetail;
        }
      }
      setEquipmentDetails(details);
    };
    if (equipment.length > 0) fetchAllEquipmentDetails();
  }, [equipment]);

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchData(newPage, perPage);
    }
  };

  const handleSearch = () => {
    const filtered = equipment.filter((equip) =>
      equip.employeeName === selectedEmployee
    );
    setFilteredEquipment(filtered);
    setShowDetails(filtered.length > 0); 
  };

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Assets</h1>
            <p className="font-light text-gray-600 mt-4">
              <Link to="/">Home</Link> | <Link to="/app/report">Report</Link> | <Link to="/report/asset-info"> Assets </Link>
            </p>
          </div>
        </div>
        <div className="border rounded px-4 py-4 bg-gray-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div
                  className="px-4 py-1 bg-white border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-20"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="flex-1">{selectedEmployee || "Select Employee"}</span>
                  <svg
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-500 ${showDropdown ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {showDropdown && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
                    {employees.length === 0 ? (
                      <li className="p-2 text-gray-500">No options available</li>
                    ) : (
                      employees.map((data) => (
                        <li
                          key={data._id}
                          className="p-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedEmployee(`${data.firstName} ${data.lastName}`);
                            setShowDropdown(false);
                          }}
                        >
                          {`${data.firstName} ${data.lastName}`}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="ml-4 bg-blue-700 text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Search
            </button>
          </div>

          {showDetails && (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-sm font-medium text-black">
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">SL</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">EMPLOYEE NAME</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">EQUIPMENT NAME</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">TYPE</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">MODEL</th>
                    <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">SERIAL NO</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEquipment.map((data, index) => {
                    const equipmentId = data.fields[0].equipment;
                    const equipmentDetail = equipmentDetails[equipmentId] || {};
                    return (
                      <tr key={data._id} className="text-gray-600 text-left">
                        <td className="px-2 py-1">
                          {page === 1 ? index + 1 : (page - 1) * perPage + index + 1}
                        </td>
                        <td className="px-2 py-1">{data.employeeName}</td>
                        <td className="px-2 py-1">{equipmentDetail.equipmentName}</td>
                        <td className="px-2 py-1">{equipmentDetail.typeName}</td>
                        <td className="px-2 py-1">{equipmentDetail.model}</td>
                        <td className="px-2 py-1">{equipmentDetail.serialNo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default NewAssetInfo;
