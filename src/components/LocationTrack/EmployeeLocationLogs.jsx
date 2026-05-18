import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// --- Custom Leaflet Pin Icon ---
const simplePinIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// --- Map Click Handler ---
const MapClickHandler = ({ setGeofence }) => {
  useMapEvents({
    click: (e) => {
      setGeofence((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });
  return null;
};

// --- Map View Updater (Pans map when searching) ---
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center[0] && center[1]) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
};

const EmployeeLocationLogs = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Geofence & Map State
  const [geofence, setGeofence] = useState({ latitude: "", longitude: "", radius: 100 });
  const [locationSearch, setLocationSearch] = useState("");
  
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`,
        {
          params: { page: currentPage, limit: limit, name: searchQuery },
          headers: { Authorization: `Bearer ${token}` } // Automatically applies BU filtering in backend
        }
      );
      
      // Explicitly filter out HRs and Admins from the tracking list
      const filteredList = (response.data?.data || []).filter(
        emp => emp.role !== "hr" && emp.role !== "admin"
      );

      setEmployees(filteredList);
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setTotalEmployees(response.data?.pagination?.totalEmployees || 0);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, limit, searchQuery]);

  // --- Location Search (Geocoding via OpenStreetMap) ---
  const handleMapSearch = async () => {
    if (!locationSearch.trim()) return;
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationSearch}`);
      if (res.data && res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setGeofence(prev => ({
          ...prev,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        }));
      } else {
        alert("Location not found. Try a broader search (e.g., 'City Name').");
      }
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const handleOpenGeofenceModal = (employee) => {
    setSelectedEmployee(employee);
    setGeofence({
      longitude: employee.geofenceCenter?.[0] || "",
      latitude: employee.geofenceCenter?.[1] || "",
      radius: employee.geofenceRadius || 100,
    });
    setLocationSearch("");
    setModalOpen(true);
  };

  const handleGeofenceChange = (e) => {
    setGeofence({ ...geofence, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!geofence.latitude || !geofence.longitude || !geofence.radius) {
      alert("Please set a location and radius.");
      return;
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/company/createEmployeeGeofence/${selectedEmployee._id}`,
        {
          center: [Number(geofence.longitude), Number(geofence.latitude)],
          radius: Number(geofence.radius),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to update geofence", err);
    }
  };

  const handleClearGeofence = async () => {
    const confirmClear = window.confirm("Are you sure you want to remove the geofence for this employee?");
    if (!confirmClear) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/company/createEmployeeGeofence/${selectedEmployee._id}`,
        {
          center: [0, 0], // Dummy coordinates
          radius: 0,      // Radius 0 disables the check
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to clear geofence", err);
    }
  };

  const mapCenter = geofence.latitude && geofence.longitude 
    ? [geofence.latitude, geofence.longitude] 
    : [20.5937, 78.9629]; // Default to India Center if no geofence exists

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Employee Geofence Tracking</h1>
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search employee..."
            className="pl-10 pr-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Geofence Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const hasGeofence = emp.geofenceRadius && emp.geofenceRadius > 0;
              return (
                <tr key={emp._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4">
                    {hasGeofence ? (
                      <span className="text-green-600 font-medium">Active ({emp.geofenceRadius}m)</span>
                    ) : (
                      <span className="text-gray-400 font-medium">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/app/location-tracking/map/${emp._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      View Logs
                    </button>
                    <button
                      onClick={() => handleOpenGeofenceModal(emp)}
                      className="text-indigo-600 hover:underline border-l pl-3 ml-1"
                    >
                      Set Geofence
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Pagination Details */}
        <div className="p-4 flex justify-between items-center text-sm text-gray-600 border-t">
            <span>Showing Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >Prev</button>
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >Next</button>
            </div>
        </div>
      </div>

      {/* Geofence Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              Configure Geofence for {selectedEmployee?.firstName} {selectedEmployee?.lastName}
            </h2>

            {/* Location Search Bar */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search a city, area, or address..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="border px-3 py-2 rounded-md flex-grow focus:outline-none focus:border-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleMapSearch()}
              />
              <button 
                onClick={handleMapSearch} 
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 font-medium"
              >
                Search
              </button>
            </div>

            <div className="text-sm text-gray-500 italic">
              * Click anywhere on the map to place the center pin for this employee's geofence.
            </div>

            {/* Interactive Map Area */}
            <div className="w-full h-80 rounded-md overflow-hidden border">
              <MapContainer 
                center={mapCenter} 
                zoom={10} 
                scrollWheelZoom={true} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapUpdater center={mapCenter} />
                <MapClickHandler setGeofence={setGeofence} />
                
                {geofence.latitude && geofence.longitude && (
                  <>
                    <Marker position={[geofence.latitude, geofence.longitude]} icon={simplePinIcon} />
                    <Circle 
                      center={[geofence.latitude, geofence.longitude]} 
                      radius={Number(geofence.radius) || 0}
                      pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
                    />
                  </>
                )}
              </MapContainer>
            </div>

            {/* Radius and Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
              <div className="flex flex-col w-full md:w-1/3">
                <label className="text-sm font-medium text-gray-700 mb-1">Geofence Radius (Meters)</label>
                <input
                  type="number"
                  name="radius"
                  value={geofence.radius}
                  onChange={handleGeofenceChange}
                  min="10"
                  className="border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 w-full md:w-auto">
                <button 
                  onClick={handleClearGeofence} 
                  className="text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-md hover:bg-red-100 font-medium"
                  title="Removes the geofence logic for this employee"
                >
                  Clear Geofence
                </button>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="text-gray-600 bg-gray-100 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium shadow-sm"
                >
                  Save Map Geofence
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