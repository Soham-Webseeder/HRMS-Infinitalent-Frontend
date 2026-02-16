import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaBolt, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PaySlipStep2 from "./PaySlipStep2";
import Loader from "./Loader";

export default function RunPayroll() {
  const [showModal, setShowModal] = useState(false);
  const [businessUnits, setBusinessUnits] = useState([]); // Store business units
  const [employees, setEmployees] = useState([]); // Store employee data
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered results
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility
  const [selectedItems, setSelectedItems] = useState([]); // Store selected items
  const [showStep2, setShowStep2] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to track the dropdown container
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEmployeesAfterSearch, setFilteredEmployeesAfterSearch] =
    useState([]);

  // Date range variables
  const [customDateRange, setCustomDateRange] = useState(false);
  const [startDay, setStartDay] = useState("1");
  const [endDay, setEndDay] = useState("28");
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [activeBuForDateRange, setActiveBuForDateRange] = useState(null);

  const now = new Date();
  now.setMonth(now.getMonth() - 1); // Set to last month
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const lastYear = now.getFullYear();

  const [salaryCycle, setSalaryCycle] = useState(`${lastYear}-${lastMonth}`);

  const loading = () => {
    return new Promise((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        resolve(); // Resolve after 2 seconds
      }, 2000);
    });
  };

  // Fetch both business units and employees when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessUnitResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
        );
        const employeeResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
        );

        if (businessUnitResponse.data) {
          setBusinessUnits(businessUnitResponse.data.response || []);
        }
        if (employeeResponse.data) {
          setEmployees(employeeResponse.data.data || []);
        }

        // Combine employees and business units for the initial dropdown
        const combinedData = [
          ...businessUnitResponse.data.response.map((unit) => ({
            _id: unit._id,
            name: unit.name,
            type: "Business Unit",
            dateRange: null, // Initialize date range property
          })),
          ...employeeResponse.data.data.map((emp) => ({
            _id: emp._id,
            name: `${emp.firstName} ${emp.lastName}`, // Construct full name from first and last names
            type: "Employee",
          })),
        ];
        setFilteredItems(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter items based on the search term
  useEffect(() => {
    const combinedData = [
      ...businessUnits.map((unit) => ({
        _id: unit._id,
        name: unit.name,
        type: "Business Unit",
        dateRange: unit.dateRange,
      })),
    ];

    if (searchTerm === "") {
      setFilteredItems(combinedData); // Show all when there's no search term
    } else {
      const filtered = combinedData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, businessUnits, employees]);

  // Open date range modal before selecting a business unit
  const handleBusinessUnitPreselect = (item) => {
    if (item.type === "Business Unit") {
      setActiveBuForDateRange(item);
      // Reset to default values or use existing values if the item already has a date range
      if (item.dateRange) {
        setStartDay(item.dateRange.startDay.toString());
        setEndDay(item.dateRange.endDay.toString());
        setCustomDateRange(item.dateRange.customRange);
      } else {
        setStartDay("1");
        setEndDay("28");
        setCustomDateRange(false);
      }
      setShowDateRangeModal(true);
    } else {
      handleSelectItem(item);
    }
  };

  // Handle changes in start day input
  const handleStartDayChange = (e) => {
    const value = e.target.value;
    // Validate input: must be a number between 1 and 31
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
      setStartDay(value);
    }
  };

  // Handle changes in end day input
  const handleEndDayChange = (e) => {
    const value = e.target.value;
    // Validate input: must be a number between 1 and 31
    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
      setEndDay(value);
    }
  };

  // Apply date range and select business unit
  const handleApplyDateRange = () => {
    if (activeBuForDateRange) {
      // Ensure start and end day are valid numbers
      const startDayNum = parseInt(startDay) || 1;
      const endDayNum = parseInt(endDay) || 28;

      const itemWithDateRange = {
        ...activeBuForDateRange,
        dateRange: {
          startDay: startDayNum,
          endDay: endDayNum,
          customRange: customDateRange,
        },
      };

      // Update existing item or add new one
      const itemIndex = selectedItems.findIndex(item => item._id === itemWithDateRange._id);
      if (itemIndex >= 0) {
        // Update existing item
        const updatedItems = [...selectedItems];
        updatedItems[itemIndex] = itemWithDateRange;
        setSelectedItems(updatedItems);
      } else {
        // Add new item
        setSelectedItems([...selectedItems, itemWithDateRange]);
      }

      // Close modals and reset active business unit
      setShowDateRangeModal(false);
      setActiveBuForDateRange(null);
      setDropdownOpen(false);

      fetchitemsData();
    }
  };

  // Handle selecting an item (business unit or employee)
  const handleSelectItem = (item) => {
    if (item === "all Employee") {
      setSelectedItems([...selectedItems, { name: "All Employees" }]);
    } else {
      // Add individual item to the selection
      if (!selectedItems.some((selected) => selected._id === item._id)) {
        setSelectedItems([...selectedItems, item]);
      }
    }
    fetchitemsData();
    setDropdownOpen(false); // Close the dropdown after selecting an item
  };

  // Remove selected item
  const handleRemoveItem = (item) => {
    if (item.name === "All Employees") {
      setSelectedItems((prev) =>
        prev.filter((selected) => selected.name !== "All Employees")
      );
    } else {
      setSelectedItems((prev) =>
        prev.filter((selected) => selected._id !== item._id)
      );
    }
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGeneratePayrollData = async () => {
    await loading(); // Wait for the loading to complete
    if (selectedItems.length > 0) {
      setShowModal(true);
    } else {
      alert("Please select at least one employee to generate payroll data");
    }
  };

  const [searchTermInside, setSearchTermInside] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const navigate = useNavigate();

  const fetchData = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      const employees = res.data.data;

      if (!Array.isArray(employees)) {
        throw new Error("Expected an array of employees");
      }

      const filtered = employees.filter((employee) => {
        // FIX: Check if businessUnit is an object and compare its _id
        const buId = employee.businessUnit?._id || employee.businessUnit;
        return buId === id;
      });

      setFilteredEmployees((prevFiltered) => {
        const combined = [...prevFiltered, ...filtered];
        const uniqueEmployees = combined.filter(
          (employee, index, self) =>
            index === self.findIndex((e) => e._id === employee._id)
        );
        return uniqueEmployees;
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      const employees = res.data.data;
      if (!Array.isArray(employees)) {
        throw new Error("Expected an array of employees");
      }

      setFilteredEmployees((prevFiltered) => {
        // Optionally, remove duplicates
        const combined = [...prevFiltered, ...employees];
        const uniqueEmployees = combined.filter(
          (employee, index, self) =>
            index === self.findIndex((e) => e._id === employee._id) // Ensuring no duplicates
        );
        return uniqueEmployees; // Return the unique list of employees
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchitemsData();
  }, [selectedItems]);

  const fetchitemsData = () => {
    setFilteredEmployees([]);
    setSelectedEmployees([]);
    selectedItems.forEach((item) => {
      if (item.type === "Business Unit") {
        fetchData(item._id); // Call fetchData function with the Business Unit ID
      } else if (item.name === "All Employees") {
        fetchAllEmployees();
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]); // Deselect all
    } else {
      setSelectedEmployees(filteredEmployees.map((e) => e._id)); // Select all filtered
    }
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((eId) => eId !== id) : [...prev, id]
    );
  };

  const handleClick = () => {
    setShowStep2(true);
    setShowModal(false);
  };

  const handleSaveClick = async () => {
    setIsLoading(true); // Start loading immediately
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (selectedEmployees.length > 0) {
      setShowModal(false); // Show modal
      setShowStep2(true);
    } else {
      alert("Please select at least one employee to generate payroll data");
    }
    setIsLoading(false);
  };

  const handleSalaryCycleChange = async (event) => {
    setSalaryCycle(event.target.value);
  };

  useEffect(() => {
    setFilteredEmployeesAfterSearch(
      filteredEmployees.filter((emp) =>
        `${emp.firstName} ${emp.lastName}`
          .toLowerCase()
          .includes(searchTermInside.toLowerCase())
      )
    );
  }, [filteredEmployees, searchTermInside]);

  return (
    <div className="flex flex-col p-6 space-y-2 rounded-lg shadow bg-gray-100 min-h-[100vh]">
      {isLoading && <Loader />}
      {!showStep2 && (
        <div>
          <div className="flex flex-col gap-4 border-b border-gray-300 py-2">
            <div className="text-2xl font-medium">Payroll</div>
            <div>
              <p className="font-light text-gray-600">
                <span className="cursor-pointer">Home</span> |{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/app/payroll");
                  }}
                >
                  Payroll | Run Payroll
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-blue-600">Run Payroll</h1>
              <div className="text-gray-600">
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="salary-cycle"
                    className="block text-medium font-medium mb-2 text-blue-600"
                  >
                    Salary Cycle:
                  </label>
                  <input
                    type="month"
                    id="salary-cycle"
                    name="salary-cycle"
                    value={salaryCycle}
                    onChange={handleSalaryCycleChange}
                    className="border border-gray-300 rounded-md p-2 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                Welcome to your run payroll dashboard, you can generate payroll
                data along with salary slips for all your employees, all in a
                few clicks.{" "}
                <FaBolt className="inline-block w-4 h-4 text-yellow-400" />
              </p>

              <div className="mt-4 relative" ref={dropdownRef}>
                <label
                  htmlFor="search-select"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Business Units and Employees
                </label>

                {/* Selected Items (tags) */}
                <div className="mb-2 flex flex-wrap gap-2">
                  {selectedItems.map((item) => (
                    <div
                      key={item._id || item.name}
                      className="bg-blue-200 px-2 py-1 rounded flex items-center space-x-1"
                    >
                      <span>
                        {item.type === "Business Unit" && item.dateRange
                          ? `${item.name} (${item.dateRange.startDay}-${item.dateRange.endDay})`
                          : `${item.name}`}
                        {item.type && !item.dateRange ? ` (${item.type})` : ''}
                      </span>
                      <FaTimes
                        className="cursor-pointer"
                        onClick={() => handleRemoveItem(item)}
                      />
                    </div>
                  ))}
                </div>

                {/* Search & Select Input */}
                <input
                  type="text"
                  placeholder="Search or select business unit/employee..."
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setDropdownOpen(true)} // Open dropdown when focused
                />

                {/* Dropdown */}
                {dropdownOpen && filteredItems.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-y-auto mt-1 rounded-md shadow-lg">
                    <li
                      onClick={() => handleSelectItem("all Employee")}
                      className="cursor-pointer py-2 px-4 hover:bg-blue-100"
                    >
                      All Employee
                    </li>
                    {filteredItems.map((item) => (
                      <li
                        key={item._id}
                        onClick={() => handleBusinessUnitPreselect(item)}
                        className="cursor-pointer py-2 px-4 hover:bg-blue-100 flex justify-between items-center"
                      >
                        <span>{item.name} ({item.type})</span>
                        {item.type === "Business Unit" && (
                          <FaCalendarAlt className="text-blue-500" title="Set date range" />
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end items-end">
              <button
                onClick={handleGeneratePayrollData}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Generate Payroll Data
              </button>
            </div>
          </div>
        </div>
      )}

      {showStep2 && (
        <>
          <div className="absolute w-[90%]">
            <PaySlipStep2
              selectedEmployees={selectedEmployees}
              setShowStep2={setShowStep2}
              salaryCycleDate={salaryCycle}
              startDay={startDay}
              endDay={endDay}
              dateRanges={selectedItems.reduce((acc, item) => {
                if (item.type === "Business Unit" && item.dateRange) {
                  acc[item._id] = item.dateRange;
                }
                return acc;
              }, {})}
            />
          </div>
        </>
      )}

      {/* Date Range Modal */}
      {showDateRangeModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Set Payroll Date Range for {activeBuForDateRange?.name}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDateRangeModal(false)}
              >
                <div className="w-5 h-5 bg-gray-300 text-center rounded-full">
                  &#x2715;
                </div>
              </button>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={customDateRange}
                  onChange={() => setCustomDateRange(!customDateRange)}
                  className="form-checkbox"
                />
                <span>Custom date range</span>
              </label>

              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Day
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={startDay}
                    onChange={handleStartDayChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Day
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={endDay}
                    onChange={handleEndDayChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Show examples for clarity */}
              <div className="mt-3 text-xs text-gray-500">
                <p>Examples:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>20-20: Payroll from 20th of previous month to 20th of current month</li>
                  <li>28-28: Payroll from 28th of previous month to 28th of current month</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDateRangeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyDateRange}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end z-40">
          <div className="bg-white p-6 w-full max-w-md h-full">
            {/* PayrollDataGenerator component */}
            <div className="bg-white shadow-lg rounded-lg max-w-md mx-auto p-2 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Generate payroll data for {selectedItems.length} employee(s)
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  <div className="w-5 h-5 bg-gray-300 text-center rounded-full">
                    &#x2715;
                  </div>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Select employees to generate payroll data.
              </p>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  value={searchTermInside}
                  onChange={(e) => setSearchTermInside(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="selectAll"
                  className="mr-2"
                  checked={
                    selectedEmployees.length === filteredEmployees.length &&
                    filteredEmployees.length > 0
                  }
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAll" className="text-sm font-medium">
                  Select all
                </label>
              </div>

              <div className="h-[45vh] overflow-y-auto mb-4">
                {filteredEmployeesAfterSearch.map((employee) => (
                  <div
                    key={employee._id}
                    className="flex items-center py-2 border-b last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      id={`employee-${employee._id}`}
                      className="mr-3"
                      checked={selectedEmployees.includes(employee._id)}
                      onChange={() => handleSelectEmployee(employee._id)}
                    />
                    <label
                      htmlFor={`employee-${employee._id}`}
                      className="flex-grow"
                    >
                      <div className="text-sm font-medium">
                        {employee.firstName || ""} {employee.lastName || ""}
                      </div>
                      <div className="text-xs text-gray-500">
                        {employee.position}
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}