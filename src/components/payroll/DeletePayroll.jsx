import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Loader from "./Loader";

// Payroll type options
const payrollTypes = [
  { value: "PFESI", label: "Regular Payroll" },
  { value: "CTC Payroll", label: "CTC Payroll" },
  { value: "NAPS Stipend", label: "NAPS Stipend" }
];

// Filter type options
const filterTypes = [
  { value: "employees", label: "Employees" },
  { value: "businessUnits", label: "Business Units" },
  { value: "departments", label: "Departments" }
];

export default function DeletePayroll() {
  const [payrollType, setPayrollType] = useState("");
  const [businessUnits, setBusinessUnits] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilterType, setSelectedFilterType] = useState("");
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0");
  const lastYear = now.getFullYear();
  const [salaryCycle, setSalaryCycle] = useState(`${lastYear}-${lastMonth}`);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const businessUnitResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
        );

        const departmentsResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
        );

        if (businessUnitResponse.data) {
          setBusinessUnits(businessUnitResponse.data.response || []);
        }

        if (departmentsResponse.data) {
          setDepartments(departmentsResponse.data.response || []);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        alert("Failed to fetch initial data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchEmployees = async () => {
    try {
      if (!payrollType || !salaryCycle) {
        alert("Please select both payroll type and cycle.");
        return;
      }

      setIsLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployeesByPayroll`,
        {
          params: {
            salaryType: payrollType,
            date: salaryCycle,
          },
        }
      );

      // FIX: The backend returns "data", not "employees"
      const rawEmployees = response.data.data || [];

      if (rawEmployees.length > 0) {
        let filteredEmps = rawEmployees.filter(emp => {
          if (selectedFilterType === 'businessUnits') {
            // Note: Ensure businessUnit is actually returned by the API
            return (emp?.businessUnit && selectedBusinessUnits?.includes(emp.businessUnit));
          } else if (selectedFilterType === 'departments') {
            // Changed emp.company to emp.department to match your logic
            return (emp?.department && selectedDepartments.includes(emp.department));
          }
          return true;
        }).map(emp => ({
          ...emp,
          // Standardize the ID field
          _id: emp._id || emp.id || emp.empId
        }));

        setEmployees(rawEmployees);
        setFilteredEmployees(filteredEmps);
      } else {
        setEmployees([]);
        setFilteredEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert(`Failed to fetch employees: ${error.message}`);
      setEmployees([]);
      setFilteredEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (payrollType && salaryCycle) {
      const isFilterValid =
        (selectedFilterType === 'employees' && selectedEmployees.length > 0) ||
        (selectedFilterType === 'businessUnits' && selectedBusinessUnits.length > 0) ||
        (selectedFilterType === 'departments' && selectedDepartments.length > 0);

      if (isFilterValid) {
        fetchEmployees();
      }
    }
  }, [selectedFilterType, selectedBusinessUnits, selectedDepartments, payrollType, salaryCycle]);

  const getSearchedEmployees = () => {
    if (!searchTerm) return filteredEmployees;

    const searchTermLower = searchTerm.toLowerCase().trim();
    return filteredEmployees.filter(emp =>
      `${emp.firstName || ''} ${emp.lastName || ''}`.toLowerCase().includes(searchTermLower) ||
      (emp.employeeId && emp.employeeId.toLowerCase().includes(searchTermLower))
    );
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployees(prev =>
      prev.includes(id)
        ? prev.filter(empId => empId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e._id));
    }
  };

  const handleBusinessUnitSelection = (businessUnitId) => {
    setSelectedBusinessUnits(prev =>
      prev.includes(businessUnitId)
        ? prev.filter(id => id !== businessUnitId)
        : [...prev, businessUnitId]
    );
  };

  const removeBusinessUnit = (businessUnitId) => {
    setSelectedBusinessUnits(prev =>
      prev.filter(id => id !== businessUnitId)
    );
  };

  const handleDepartmentSelection = (departmentId) => {
    setSelectedDepartments(prev =>
      prev.includes(departmentId)
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const removeDepartment = (departmentId) => {
    setSelectedDepartments(prev =>
      prev.filter(id => id !== departmentId)
    );
  };


  const handleDeletePayroll = async () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Deleting payrolls for:", {
        salaryType: payrollType,
        employeeIds: selectedEmployees,
        salaryCycle
      });

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/deleteBulkPayroll`,
        {
          salaryType: payrollType,
          employeeIds: selectedEmployees,
          salaryCycle
        }
      )

      console.log(response.data)

      alert(` Deletion for ${selectedEmployees.length} employees`);

      setSelectedEmployees([]);
    } catch (error) {
      console.error("Error deleting payrolls:", error);
      alert("Failed to delete payrolls");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 space-y-4 bg-gray-100 min-h-screen">
      {isLoading && <Loader />}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Delete Payroll</h1>

        {/* Payroll Type Selection */}
        <div className="mb-4">
          <label
            htmlFor="payroll-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Payroll Type
          </label>
          <select
            id="payroll-type"
            value={payrollType}
            onChange={(e) => setPayrollType(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Payroll Type</option>
            {payrollTypes.map((payroll) => (
              <option key={payroll.value} value={payroll.value}>
                {payroll.label}
              </option>
            ))}
          </select>
        </div>

        {/* Salary Cycle Selection */}
        <div className="mb-4">
          <label
            htmlFor="salary-cycle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Salary Cycle
          </label>
          <input
            type="month"
            id="salary-cycle"
            value={salaryCycle}
            onChange={(e) => setSalaryCycle(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Filter Type Selection */}
        <div className="mb-4">
          <label
            htmlFor="filter-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Filter Type
          </label>
          <select
            id="filter-type"
            value={selectedFilterType}
            onChange={(e) => {
              setSelectedFilterType(e.target.value);
              setSelectedBusinessUnits([]);
              setSelectedDepartments('');
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Filter Type</option>
            {filterTypes.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
        {selectedFilterType === 'businessUnits' && (
          <div className="mb-4">
            <label
              htmlFor="business-unit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Business Units
            </label>
            <select
              id="business-unit"
              onChange={(e) => {
                const selectedId = e.target.value;
                if (selectedId && !selectedBusinessUnits.includes(selectedId)) {
                  handleBusinessUnitSelection(selectedId);
                }
                e.target.selectedIndex = 0;
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Add Business Unit</option>
              {businessUnits
                .filter(unit => !selectedBusinessUnits.includes(unit._id))
                .map((unit) => (
                  <option key={unit._id} value={unit._id}>
                    {unit.name}
                  </option>
                ))
              }
            </select>
            {selectedBusinessUnits.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedBusinessUnits.map(unitId => {
                  const unit = businessUnits.find(u => u._id === unitId);
                  return (
                    <div
                      key={unitId}
                      className="flex items-center bg-blue-100 px-2 py-1 rounded-full text-sm"
                    >
                      {unit ? unit.name : 'Unknown Unit'}
                      <button
                        onClick={() => removeBusinessUnit(unitId)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {selectedFilterType === 'departments' && (
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Departments
            </label>
            <select
              id="department"
              onChange={(e) => {
                const selectedId = e.target.value;
                if (selectedId && !selectedDepartments.includes(selectedId)) {
                  handleDepartmentSelection(selectedId);
                }
                e.target.selectedIndex = 0;
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Add Department</option>
              {departments
                .filter(dept => !selectedDepartments.includes(dept._id))
                .map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.department.title}
                  </option>
                ))
              }
            </select>
            {selectedDepartments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedDepartments.map(deptId => {
                  const dept = departments.find(d => d._id === deptId);
                  return (
                    <div
                      key={deptId}
                      className="flex items-center bg-blue-100 px-2 py-1 rounded-full text-sm"
                    >
                      {dept ? dept.department.title : 'Unknown Department'}
                      <button
                        onClick={() => removeDepartment(deptId)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Fetch Employees Button */}
        <button
          onClick={fetchEmployees}
          disabled={!payrollType || !salaryCycle ||
            (selectedFilterType === 'businessUnits' && selectedBusinessUnits.length === 0) ||
            (selectedFilterType === 'departments' && selectedDepartments.length === 0)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Fetch Employees"}
        </button>

        {filteredEmployees.length > 0 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="employee-search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Employees
              </label>
              <input
                type="text"
                id="employee-search"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Employee List */}
            <div className="border rounded-md">
              <div className="flex bg-gray-100 p-2 font-semibold">
                <div className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedEmployees.length === filteredEmployees.length
                    }
                    onChange={handleSelectAll}
                    className="mr-2"
                  />
                  <span>Select All</span>
                </div>
                <div>Showing {filteredEmployees.length} Employees</div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {getSearchedEmployees().map((emp) => (
                  <div
                    key={emp._id || emp.id || emp.employeeId}
                    className="flex items-center p-2 hover:bg-gray-50 border-b"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id || emp.id || emp.employeeId)}
                      onChange={() => handleSelectEmployee(emp._id || emp.id || emp.employeeId)}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <div>{emp.firstName} {emp.lastName}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delete Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDeletePayroll}
                disabled={selectedEmployees.length === 0}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
              >
                Delete Payroll for {selectedEmployees.length} Employees
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}