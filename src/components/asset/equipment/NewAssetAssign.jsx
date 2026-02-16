import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function NewAssignAsset() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [data, setData] = useState({
    employeeName: "",
    fields: [{ equipment: "", date: "" }],
  });
  const [equipmentData, setEquipmentData] = useState([]);
  const [assetData, setAssetData] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [popupFormVisible, setPopupFormVisible] = useState(false);
  const [assetTypes, setAssetTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableSearchTerm, setTableSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchAsset();
    fetchEquipmentData();
    fetchAssetTypes();
  }, [currentPage, perPage]);

  useEffect(() => {
    if (popupFormVisible) {
      setFilteredEmployees(
        employees.filter((employee) =>
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [employees, searchTerm, popupFormVisible]);

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllAssetTypes`
      );
      setAssetTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const fetchAsset = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getAllAssetAssign`,
        {
          params: {
            page: currentPage,
            limit: perPage,
            name: searchTerm,
          },
        }
      );
      console.log("Fetched Asset Data:", response.data.data);
      console.log("Pagination Info:", response.data.pagination);

      if (response.data.success) {
        // Check for success in the response
        setAssetData(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        console.error("Error fetching asset data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching asset data:", error);
    }
  };

  const fetchEquipmentData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/get-equipments`
      );
      setEquipmentData(res.data.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
  };

  const [equipmentDataById, setEquipmentDataById] = useState([]);

  const fetchEquipmentDataById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/getEquipmentById/:id`
      );
      setEquipmentDataById(res.data.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
  };

  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchEquipmentDataById();
  }, []);

  const handleUpdateClick = async (assetId) => {
    setSelectedAssetId(assetId);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/asset/getAssetAssignById/${assetId}`
      );
      const asset = response.data.data;
      setData({
        employeeName: asset.employeeName,
        fields: asset.fields.map((field) => ({
          equipment: field.equipment,
          date: new Date(field.date).toISOString().split("T")[0],
        })),
      });

      setPopupFormVisible(true);
      setShowDropdown(false);
    } catch (error) {
      console.error("Error fetching asset data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        employeeName: data.employeeName,
        fields: data.fields.map((field) => ({
          equipment: field.equipment,
          date: new Date(field.date),
        })),
      };

      let response;
      if (selectedAssetId) {
        response = await axios.patch(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/asset/updateAssetAssign/${selectedAssetId}`,
          requestData
        );
        toast.success("Assets Successfully Updated!");
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/createAssetAssign`,
          requestData
        );
        toast.success("Assets Successfully Assigned!");
      }

      fetchAsset();
      setPopupFormVisible(false);
      resetForm();
    } catch (error) {
      toast.error("Error submitting data");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page); // Update current page state
    fetchAsset(); // Fetch data for the new page
  };

  const handleFieldChange = (index, event) => {
    const values = [...data.fields];
    values[index][event.target.name] = event.target.value;
    setData({ ...data, fields: values });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleAddField = () => {
    setData({
      ...data,
      fields: [...data.fields, { equipment: "", date: "" }],
    });
  };

  const handleRemoveField = (index) => {
    const values = [...data.fields];
    values.splice(index, 1);
    setData({ ...data, fields: values });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteClick = async (assetId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/asset/deleteAssetAssign/${assetId}`
        );
        toast.success("Asset successfully deleted!");
        fetchAsset(); // Fetch assets after delete to update table
      } catch (error) {
        toast.error("Error deleting asset: " + error.message);
        console.error("Error deleting asset data:", error);
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(term.toLowerCase())
      );
      setFilteredEmployees(filtered);
      setShowDropdown(true);
    } else {
      setFilteredEmployees(employees);
      setShowDropdown(false);
    }
  };

  const handleTableSearch = (term) => {
    setTableSearchTerm(term);
  };

  const handleSelect = (employee) => {
    setSearchTerm(`${employee.firstName} ${employee.lastName}`);
    setData({
      ...data,
      employeeName: `${employee.firstName} ${employee.lastName}`,
    });
    setShowDropdown(false);
  };

  const resetForm = () => {
    setSelectedAssetId(null);
    setData({
      employeeName: "",
      fields: [{ equipment: "", date: "" }],
    });
  };

  const groupAssetsByEmployee = (assets) => {
    const grouped = {};

    assets.forEach((asset) => {
      const employeeName = asset.employeeName;

      if (!grouped[employeeName]) {
        grouped[employeeName] = {
          employeeName: employeeName,
          equipmentList: [],
          dateList: [],
          fields: asset.fields,
          _id: asset._id,
        };
      }

      // Combine equipment names
      asset.fields.forEach((field) => {
        const equipment = equipmentData.find((e) => e._id === field.equipment);
        if (
          equipment &&
          !grouped[employeeName].equipmentList.includes(equipment.equipmentName)
        ) {
          grouped[employeeName].equipmentList.push(equipment.equipmentName);
        }

        // Format and add the date to the dateList
        if (field.date) {
          const formattedDate = formatDate(field.date);
          if (!grouped[employeeName].dateList.includes(formattedDate)) {
            grouped[employeeName].dateList.push(formattedDate);
          }
        }
      });
    });

    return Object.values(grouped).map((item) => ({
      ...item,
      equipmentNames: item.equipmentList.join(", "),
      formattedDates: item.dateList.join(", "), // Combine dates into a single string
    }));
  };

  // Using the function to prepare filtered assets
  const filteredAssetType = groupAssetsByEmployee(
    assetData.filter((asset) => {
      if (
        asset &&
        asset.employeeName &&
        typeof asset.employeeName === "string"
      ) {
        return asset.employeeName
          .toLowerCase()
          .includes(tableSearchTerm.toLowerCase());
      }
      return false;
    })
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Toaster />
      {/* Header with breadcrumbs and Assign Item button */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold">Asset List</h1>
          <nav className="text-xs md:text-sm text-gray-500 mt-1 mb-0 flex flex-wrap items-center gap-x-1">
            <Link to="/" className="hover:text-slate-800 transition-colors">
              Home
            </Link>
            <span>|</span>
            <Link to="/app/asset" className="hover:text-slate-800 transition-colors">
              Asset
            </Link>
            <span>|</span>
            <span className="text-gray-500 cursor-default hover:text-slate-800 transition-colors">
              Asset List
            </span>
          </nav>
        </div>
        <button
          onClick={() => {
            resetForm();
            setPopupFormVisible(true);
          }}
          className="border px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mt-3 md:mt-0 flex items-center justify-center gap-2"
        >
          Assign Item
        </button>
      </div>
      {/* Properly aligned horizontal line */}
      <hr className="border-t border-gray-200 mb-4" />

      {popupFormVisible && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-md sm:max-w-lg min-w-[300px]">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">
                  {selectedAssetId ? "Update Asset Assignment" : "Assign Asset"}
                </h3>
                <button
                  onClick={() => setPopupFormVisible(false)}
                  className="text-gray-500 hover:text-gray-600"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="px-4 py-6">
              <form className="space-y-4">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="employeeName"
                    className="block text-md font-medium text-gray-700"
                  >
                    Employee Name
                  </label>
                  {selectedAssetId ? (
                    <input
                      type="text"
                      value={data.employeeName}
                      onChange={handleChange}
                      name="employeeName"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white-200"
                    />
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Search employees"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {showDropdown && (
                        <ul className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm bg-white max-h-40 overflow-y-auto">
                          {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                              <li
                                key={employee._id}
                                onClick={() => handleSelect(employee)}
                                className="p-2 hover:bg-blue-100 cursor-pointer"
                              >
                                {`${employee.firstName} ${employee.lastName}`}
                              </li>
                            ))
                          ) : (
                            <li className="p-2 text-gray-500">
                              No matches found
                            </li>
                          )}
                        </ul>
                      )}
                    </>
                  )}
                </div>

                {data.fields.map((field, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`equipment-${index}`}
                      className="block text-md font-medium text-gray-700"
                    >
                      Equipment
                    </label>
                    <select
                      name="equipment"
                      onChange={(event) => handleFieldChange(index, event)}
                      value={field.equipment}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option>Select Equipment</option>
                      {equipmentData.map((equipment, idx) => (
                        <option key={idx} value={equipment._id}>
                          {equipment.equipmentName}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor={`date-${index}`}
                      className="block text-md font-medium text-gray-700 mt-2"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      name="date"
                      onChange={(event) => handleFieldChange(index, event)}
                      value={field.date}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  {selectedAssetId ? "Update" : "Assign"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded px-4 py-4 bg-gray-100">
        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex items-center">
              <input
                className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="Search"
                value={tableSearchTerm}
                onChange={(e) => handleTableSearch(e.target.value)}
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5 text-gray-500"
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

        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
            <thead>
              <tr className="text-sm font-medium text-black">
                <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                  SL No
                </th>
                <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                  Employee Name
                </th>
                <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                  Equipment Name
                </th>
                <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                  Date
                </th>
                <th className="text-left font-medium text-black px-2 py-3 border-b-2 border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assetData.length > 0 ? (
                assetData.map((asset, assetIndex) => (
                  <tr key={asset._id} className="text-gray-600 text-left">
                    <td className="px-2 py-1 text-sm text-gray-500">
                      {(currentPage - 1) * perPage + assetIndex + 1}
                    </td>
                    <td className="px-2 py-1">{asset.employeeName}</td>
                    <td className="px-2 py-1">
                      {/* Map over fields to extract equipment names */}
                      {asset.fields && asset.fields.length > 0
                        ? asset.fields
                            .map((field) => {
                              // Find the matching equipment from equipmentData using the field.equipment ID
                              const equipment = equipmentData.find(
                                (eq) => eq._id === field.equipment
                              );
                              return equipment
                                ? equipment.equipmentName
                                : "Unknown Equipment";
                            })
                            .join(", ")
                        : "No Equipment Assigned"}
                    </td>
                    <td className="px-2 py-1">
                      {/* Map over fields to extract and format dates */}
                      {asset.fields && asset.fields.length > 0
                        ? asset.fields
                            .map((field) => {
                              const date = new Date(field.date);
                              return date.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              });
                            })
                            .join(", ")
                        : "No Date Assigned"}
                    </td>
                    <td className="px-2 py-1 flex space-x-2">
                      <button
                        onClick={() => handleUpdateClick(asset._id)}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(asset._id)}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No assets available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => handlePreviousPage(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &laquo;
              </button>
              <button
                onClick={() => handlePreviousPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &lt;
              </button>
              {totalPages <= 3 ? (
                Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handleNextPage(page)}
                      className={`px-4 py-2 border rounded-full ${
                        currentPage === page
                          ? "text-blue-500 bg-white border-blue-500"
                          : "text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )
              ) : (
                <>
                  {currentPage > 2 && (
                    <>
                      <button
                        onClick={() => handleNextPage(1)}
                        className="px-4 py-2 border rounded-full text-gray-700 border-gray-300 hover:bg-gray-100"
                      >
                        1
                      </button>
                      {currentPage > 3 && <span className="px-2">...</span>}
                    </>
                  )}
                  {Array.from(
                    { length: 3 },
                    (_, i) => i + Math.max(1, currentPage - 1)
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handleNextPage(page)}
                      className={`px-4 py-2 border rounded-full ${
                        currentPage === page
                          ? "text-blue-500 bg-white border-blue-500"
                          : "text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPage < totalPages - 1 && (
                    <>
                      {currentPage < totalPages - 2 && (
                        <span className="px-2">...</span>
                      )}
                      <button
                        onClick={() => handleNextPage(totalPages)}
                        className="px-4 py-2 border rounded-full text-gray-700 border-gray-300 hover:bg-gray-100"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </>
              )}
              <button
                onClick={() => handleNextPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &gt;
              </button>
              <button
                onClick={() => handleNextPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-800 text-white border border-gray-300 rounded-full"
              >
                &raquo;
              </button>
            </div>
      </div>
    </div>
  );
}
