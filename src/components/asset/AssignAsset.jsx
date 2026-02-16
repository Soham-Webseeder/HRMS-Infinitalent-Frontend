import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AssignAsset() {
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
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/asset/getAllAssetAssign?page=${currentPage}&limit=${perPage}`
      );
      setAssetData(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
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
        console.log("Update Response:", response.data);
        toast.success("Assets Successfully Updated!");
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/createAssetAssign`,
          requestData
        );
        console.log("Create Response:", response.data);
        toast.success("Assets Successfully Assigned!");
      }

      fetchAsset();
      setPopupFormVisible(false);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFieldChange = (index, event) => {
    const values = [...data.fields];
    values[index][event.target.name] = event.target.value;
    setData({ ...data, fields: values });
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

  const filteredAssetType = assetData.filter((asset) => {
    if (asset && asset.employeeName && typeof asset.employeeName === "string") {
      return asset.employeeName
        .toLowerCase()
        .includes(tableSearchTerm.toLowerCase());
    }
    return false;
  });

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

  return (
    <div className="bg-zinc-100 p-6 pl-10">
      <Toaster />
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

      <div className="container mx-auto bg-white p-4 shadow rounded overflow-x-auto">
        <h1 className="text-xl font-bold mb-4 border border-gray-300 rounded-full w-full text-center p-1 shadow-md">Assign List</h1>
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => {
              resetForm();
              setPopupFormVisible(true);
            }}
            className="border-black border px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
          >
            Assign Item
          </button>
        </div>

        <div className="bg-white border-gray-200 border rounded-md shadow-lg px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <label className="mr-2 text-sm">Show:</label>
              <select
                className="border rounded-full py-1 px-2 text-base"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <span className="ml-2 text-sm">entries</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
              <span className="self-center font-bold mb-2 sm:mb-0 sm:mr-2">
                Search:
              </span>
              <input
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                value={tableSearchTerm}
                onChange={(e) => handleTableSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[6%]"
                  >
                    SL No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[20%]"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[20%]"
                  >
                    Equipment Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left w-[20%]"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-left  w-[5%]"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssetType.map((asset, assetIndex) =>
                  asset.fields.map((field, fieldIndex) => (
                    <tr
                      key={fieldIndex}
                      className={
                        fieldIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }
                    >
                      <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                        {assetIndex + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                        {asset.employeeName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                        {equipmentData.find(
                          (equipment) => equipment._id === field.equipment
                        )?.equipmentName || "Unknown Equipment"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap border border-slate-300">
                        {formatDate(field.date)}
                      </td>
                      <td className="whitespace-nowrap text-left text-sm font-medium flex p-1">
                        <div className="w-[50%] border-slate-300 py-3 text-center">
                          <button
                            onClick={() => handleUpdateClick(asset._id)}
                            className="text-indigo-500 hover:text-indigo-900 mr-2"
                          >
                            <FaEdit size={20} />
                          </button>
                        </div>
                        <div className="w-[50%] border-l  py-3 text-center">
                          <button
                            onClick={() => handleDeleteClick(asset._id)}
                            className="text-red-500 hover:text-red-900"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col mt-4 items-center sm:items-end">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2
                      ${currentPage === page
                        ? "bg-blue-600 text-white border rounded-full"
                        : "border rounded-full border-gray-300 font-medium"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
