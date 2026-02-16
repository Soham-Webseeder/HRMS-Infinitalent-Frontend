import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const AssetInfo = () => {
  const [employees, setEmployees] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [equipmentDetails, setEquipmentDetails] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Function to fetch data based on current page, perPage, and search term
  const fetchData = async (currentPage, perPage, searchTerm) => {
    try {
      // Fetch all employees
      const employeeResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );

      // Fetch all equipment assignments with pagination and search term
      const equipmentResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllAssetAssign`,
        {
          params: {
            page: currentPage,
            limit: perPage,
            search: searchTerm, // Pass the search term as a query parameter
          },
        }
      );

      // Set employee and equipment data
      setEmployees(employeeResponse.data.data);
      setEquipment(equipmentResponse.data.data);

      // Set pagination details
      setTotalPages(equipmentResponse.data.pagination.totalPages);
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  // Fetch initial data when component mounts or page, perPage, or searchTerm changes
  useEffect(() => {
    fetchData(page, perPage, searchTerm);
  }, [page, perPage, searchTerm]);

  // Fetch equipment details by its ID
  const fetchEquipmentById = async (id) => {
    if (!id) {
      console.error("Invalid equipment ID:", id);
      return null;
    }
  
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getEquipmentById/${id}`
      );
      return res.data.data;
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code outside the range of 2xx
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up request:", error.message);
      }
      return null;
    }
  };
  

  // Fetch all equipment details when equipment changes
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

  // Change the number of entries per page
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(1); // Reset to the first page when perPage changes
  };

  // Handle page change for pagination without refreshing
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchData(newPage, perPage, searchTerm); // Fetch new data for the selected page
    }
  };

  // Handle search button click
  const handleSearch = () => {
    setPage(1); // Reset to the first page when a search is performed
    fetchData(1, perPage, searchTerm);
  };

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-4 md:p-6 lg:p-8">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Asset Report</h1>
        <div className="text-xs md:text-sm text-gray-500 mb-4">
          Home | Report | Asset
        </div>
        <hr className="my-4" />
        <div className="border rounded px-4 py-4 bg-gray-100">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <svg
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-500 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm mr-2">Per Page</label>
              <select
                onChange={handlePerPageChange}
                value={perPage}
                className="border rounded-full py-1 px-2 text-sm"
              >
                {[5, 10, 15, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <div className="overflow-hidden">
              <div className="min-w-full bg-gray-100">
                <div className="p-4 flex items-left mt-4">
                  <div className="text-sm font-medium text-black w-[6%]">SL</div>
                  <div className="text-sm font-medium text-black w-[18%]">EMPLOYEE NAME</div>
                  <div className="text-sm font-medium text-black w-[21%]">EQUIPMENT NAME</div>
                  <div className="text-sm font-medium text-black w-[20%]">TYPE</div>
                  <div className="text-sm font-medium text-black w-[20%]">MODEL</div>
                  <div className="text-sm font-medium text-black w-[15%]">SERIAL NO</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {equipment.map((data, index) => {
                    const equipmentId = data.fields[0].equipment;
                    const equipmentDetail = equipmentDetails[equipmentId] || {};
                    return (
                      <div
                        key={data._id}
                        className="bg-white mb-4 p-2 shadow-sm rounded-lg hover:bg-gray-50 flex justify-between items-center"
                      >
                        <div className="text-sm text-gray-500 w-[7%]">
                          {page === 1
                            ? index + 1
                            : (page - 1) * perPage + index + 1}
                        </div>
                        <div className="text-sm text-gray-500 w-[18%]">
                          {data.employeeName}
                        </div>
                        <div className="text-sm text-gray-500 w-[20%]">
                          {equipmentDetail.equipmentName}
                        </div>
                        <div className="text-sm text-gray-500 w-[20%]">
                          {equipmentDetail.typeName}
                        </div>
                        <div className="text-sm text-gray-500 w-[20%]">
                          {equipmentDetail.model}
                        </div>
                        <div className="text-sm text-gray-500 w-[15%]">
                          {equipmentDetail.serialNo}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
            >
              &laquo;
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 ${
                  page === pageNumber ? "bg-blue-500 text-white" : "bg-white text-blue-500"
                } border border-gray-300 rounded-full`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
            >
              &gt;
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AssetInfo;
