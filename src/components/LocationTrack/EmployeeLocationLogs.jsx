import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EmployeeLocationLogs = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [geofence, setGeofence] = useState({ latitude: "", longitude: "", radius: "" });
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`,
        {
          params: { page: currentPage, limit: limit, name: searchQuery }
        }
      );
      setEmployees(response.data?.data || []);
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setTotalEmployees(response.data?.pagination?.totalEmployees || 0);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchQuery, limit]);

  const openModal = (emp) => {
    setSelectedEmployee(emp);
    // Extract existing data (geofenceCenter is [longitude, latitude] in MongoDB)
    const existingCenter = emp.geofenceCenter;
    const existingRadius = emp.geofenceRadius;

    // Initialize geofence state using existing data, defaulting to empty strings
    setGeofence({
      // MongoDB stores coordinates as [longitude, latitude]
      longitude: existingCenter && existingCenter[0] !== undefined ? existingCenter[0] : "",
      latitude: existingCenter && existingCenter[1] !== undefined ? existingCenter[1] : "",
      radius: existingRadius !== undefined ? existingRadius : ""
    });
    setModalOpen(true);
  };

  const handleGeofenceChange = (e) => {
    const { name, value } = e.target;
    setGeofence(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { longitude, latitude, radius } = geofence;
      const center = [parseFloat(longitude), parseFloat(latitude)];
      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/company/createEmployeeGeofence/${selectedEmployee._id}`, {
        center,
        radius: parseFloat(radius),
      });
      alert("Geofence updated successfully");
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to update geofence", err);
      alert("Failed to update geofence");
    }
  };

  return (
    <div className="flex flex-col px-6 py-2 space-y-2 rounded-lg shadow bg-white">
      <div className="flex flex-col gap-2 border-b border-gray-300 py-2">
        <div className="text-2xl font-medium">Employee Location Logs</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
          <div className="flex items-center gap-4">
            <div className="flex w-fit border-2 border-gray-300 rounded-full bg-white items-center hover:border-blue-500">
              <input
                type="text"
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <IoSearch size={25} className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 text-gray-500" />
            </div>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setCurrentPage(1); // reset page on limit change
              }}
              className="border border-gray-300 text-sm rounded px-2 py-1"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 text-left font-medium">Name</th>
                <th className="p-2 text-left font-medium">Email</th>
                <th className="p-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="p-2">{emp.firstName} {emp.lastName}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/app/location-tracking/map/${emp._id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Locations
                    </button>
                    <button
                      onClick={() => openModal(emp)}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Update Geofence
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {employees.length === 0 && (
            <div className="text-center py-4 text-gray-500">No employees found</div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalEmployees)} of {totalEmployees} entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Geofence Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Update Geofence for {selectedEmployee?.firstName}</h2>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                name="longitude"
                value={geofence.longitude}
                onChange={handleGeofenceChange}
                placeholder="Longitude"
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                name="latitude"
                value={geofence.latitude}
                onChange={handleGeofenceChange}
                placeholder="Latitude"
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                name="radius"
                value={geofence.radius}
                onChange={handleGeofenceChange}
                placeholder="Radius in meters"
                className="border px-3 py-2 rounded-md"
              />
              <div className="flex justify-end gap-3 mt-2">
                <button onClick={() => setModalOpen(false)} className="text-gray-600 hover:underline">
                  Cancel
                </button>
                <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLocationLogs;
