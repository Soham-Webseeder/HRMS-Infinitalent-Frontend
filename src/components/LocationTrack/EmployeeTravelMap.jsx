import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { IoArrowBack, IoLocation, IoWalk, IoStopwatch } from "react-icons/io5";
import { format, parseISO, isSameDay } from "date-fns";

// --- Custom Pin Icon Setup ---
const simplePinIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [32, 50], // Slightly larger for visibility
  iconAnchor: [16, 50],
  popupAnchor: [0, -46],
  shadowSize: [50, 50],
});

// --- FitBounds Helper ---
const FitBounds = ({ logs }) => {
  const map = useMap();
  useEffect(() => {
    if (logs.length > 0) {
      const bounds = logs.map(log => [log.coordinates[1], log.coordinates[0]]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [logs, map]);
  return null;
};

const EmployeeTravelMap = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [allLogs, setAllLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const navigate = useNavigate();

  // Group logs by day for timeline
  const logsByDay = allLogs.reduce((acc, log) => {
    const day = format(parseISO(log.timestamp), 'yyyy-MM-dd');
    if (!acc[day]) acc[day] = [];
    acc[day].push(log);
    return acc;
  }, {});

  const toUTCISOString = (local) => {
    if (!local) return null;
    const localDate = new Date(local);
    return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (startDateTime) params.from = toUTCISOString(startDateTime);
      if (endDateTime) params.to = toUTCISOString(endDateTime);

      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getLocationLogs/${employeeId}`,
        { params }
      );
      setAllLogs(res.data?.logs || []);
      setFilteredLogs(res.data?.logs || []);
      if (res.data?.logs?.length > 0) {
        const firstDay = format(parseISO(res.data.logs[0].timestamp), 'yyyy-MM-dd');
        setSelectedDay(firstDay);
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
      setAllLogs([]);
      setFilteredLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`,
          { params: { page: 1, limit: 1, _id: employeeId } }
        );
        const emp = (res.data?.data || []).find(e => e._id === employeeId);
        setEmployee(emp || null);
      } catch {
        setEmployee(null);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, [employeeId]);

  // Filter logs when day selection changes
  useEffect(() => {
    if (selectedDay) {
      const dayLogs = allLogs.filter(log =>
        isSameDay(parseISO(log.timestamp), new Date(selectedDay))
      );
      setFilteredLogs(dayLogs);
      setSelectedLog(null);
    } else {
      setFilteredLogs(allLogs);
      setSelectedLog(null);
    }
  }, [selectedDay, allLogs]);

  const handleReset = () => {
    setStartDateTime("");
    setEndDateTime("");
    setSelectedDay("");
    fetchLogs();
  };

  const formatTime = (timestamp) => {
    return format(parseISO(timestamp), 'HH:mm:ss');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r p-4 flex flex-col">
        {/* Employee Header */}
        <div className="flex items-center gap-3 border-b pb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <IoArrowBack size={22} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-lg truncate">
              {employee ? `${employee.firstName} ${employee.lastName}` : "Employee"}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {employee?.email || ""}
            </div>
          </div>
        </div>

        {/* Employee Details */}
        <div className="text-sm text-gray-600 py-3 border-b">
          <div className="flex justify-between mb-1">
            <span className="font-medium">Designation:</span>
            <span>{employee?.designation || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Department:</span>
            <span>{employee?.department || "-"}</span>
          </div>
        </div>

        {/* Date Filter */}
        <div className="space-y-3 py-4 border-b">
          <h3 className="font-medium">Time Filter</h3>
          <div>
            <label className="block text-sm mb-1">Start (IST)</label>
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={e => setStartDateTime(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">End (IST)</label>
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={e => setEndDateTime(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={fetchLogs}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 flex-1"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Day Selector Timeline */}
        <div className="py-4 border-b">
          <h3 className="font-medium mb-3">Daily Timeline</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(logsByDay).sort().reverse().map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  selectedDay === day
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {format(new Date(day), 'MMM dd')}
              </button>
            ))}
          </div>
        </div>

        {/* Log List */}
        <div className="flex-1 overflow-y-auto py-4">
          <h3 className="font-medium mb-3">Location Logs</h3>
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Loading logs...
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No location logs found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log, index) => (
                <div
                  key={log._id || index}
                  className={`border rounded-lg p-3 cursor-pointer hover:bg-blue-50 transition ${
                    selectedLog?._id === log._id ? "bg-blue-50 border-blue-300" : ""
                  }`}
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        log.motionStatus === 'moving' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="font-medium">
                        {formatTime(log.timestamp)}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      log.geofenceStatus === 'inside'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {log.geofenceStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <IoLocation className="text-blue-500" />
                    <span className="truncate">{log.areaName || "Unknown location"}</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-1">
                      <IoWalk />
                      <span>{log.motionStatus}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoStopwatch />
                      <span>Acc: {log.accuracy}m</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Display */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-lg font-semibold">Travel Path</h2>
          <p className="text-sm text-gray-600">
            {selectedDay ? format(new Date(selectedDay), 'MMMM d, yyyy') : 'All time'} •
            {filteredLogs.length} location points
          </p>
        </div>
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Loading location logs...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            No location logs found for this employee.
          </div>
        ) : (
          <div className="flex-1 rounded-lg shadow overflow-hidden">
            <MapContainer
              center={[filteredLogs[0].coordinates[1], filteredLogs[0].coordinates[0]]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FitBounds logs={filteredLogs} />

              {/* Path */}
              <Polyline
                positions={filteredLogs.map(log => [log.coordinates[1], log.coordinates[0]])}
                color="#3b82f6"
                weight={4}
              />

              {/* Pin Markers */}
              {filteredLogs.map((log, idx) => (
                <Marker
                  key={idx}
                  position={[log.coordinates[1], log.coordinates[0]]}
                  icon={simplePinIcon}
                  eventHandlers={{
                    click: () => setSelectedLog(log)
                  }}
                  zIndexOffset={selectedLog?._id === log._id ? 1000 : 0}
                  opacity={selectedLog?._id && selectedLog._id !== log._id ? 0.7 : 1}
                >
                  <Popup>
                    <div className="font-medium">
                      {format(parseISO(log.timestamp), 'MMM d, yyyy HH:mm:ss')}
                    </div>
                    <div className="mt-1">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded ${
                        log.motionStatus === 'moving'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.motionStatus}
                      </span>
                      <span className={`inline-block px-2 py-0.5 text-xs rounded ml-1 ${
                        log.geofenceStatus === 'inside'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {log.geofenceStatus}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <div className="flex items-start">
                        <IoLocation className="mt-0.5 mr-1 flex-shrink-0" />
                        <span>{log.areaName || "Unknown location"}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span>Accuracy: {log.accuracy}m</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Highlight selected marker by increasing zIndex */}
              {selectedLog && (
                <Marker
                  position={[selectedLog.coordinates[1], selectedLog.coordinates[0]]}
                  icon={simplePinIcon}
                  zIndexOffset={2000}
                >
                  <Popup>
                    <div className="font-bold">Selected Location</div>
                    <div>{format(parseISO(selectedLog.timestamp), 'MMM d, yyyy HH:mm:ss')}</div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTravelMap;
