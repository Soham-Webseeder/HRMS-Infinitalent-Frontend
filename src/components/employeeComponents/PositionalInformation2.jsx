import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import axios from "axios";

export default function PositionalInformation({ formData, setFormData, updateId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [empExistsMessage, setEmpExistsMessage] = useState("");

  const dispatch = useDispatch();

  const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [businessUnit, setBusinessUnit] = useState([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        // 1. Fetch Designations
        const resDesg = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/company/get-designations`);
        setDesignation(resDesg.data.response);
      } catch (err) { console.error("Designation failed", err); }

      try {
        // 2. Fetch Departments
        const resDept = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`);
        setDepartment(resDept.data.response);
      } catch (err) { console.error("Department failed", err); }

      try {
        // 3. Fetch Business Units
        const resBU = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`);
        setBusinessUnit(resBU.data.response);
      } catch (err) { console.error("Business Unit failed", err); }
    };

    fetchDivisions();
  }, []);

  const filteredBUs = businessUnit.filter((bu) =>
    bu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    // Update the parent state directly
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check uniqueness for manual Employee ID entry (only during creation)
    if (name === "empId" && value !== "" && !updateId) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/checkEmpId?empId=${value}`);
        if (res.data.data?.exist) {
          setEmpExistsMessage("(ID Already Taken)");
        } else {
          setEmpExistsMessage("");
        }
      } catch (err) {
        console.error("EmpId check failed", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data is already in parent state via setFormData
    dispatch(increment());
  };

  return (
    <>
      <div className="bg-zinc-100 ">
        <div className="bg-gray-100 rounded-lg pl-5 pr-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.department || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {department.map((item) =>
                      item?.department?.title ? (
                        <option key={item.department.title} value={item.department.title}>
                          {item.department.title}
                        </option>
                      ) : null
                    )}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Gross Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Monthly Salary"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    ESIC Number
                  </label>
                  <input
                    type="number"
                    name="esicNo"
                    value={formData.esicNo || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="ESIC Registration No"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    UAN Number
                  </label>
                  <input
                    type="number"
                    name="uanNo"
                    value={formData.uanNo || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="UAN Number"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Employee ID <span className="text-red-500">{empExistsMessage}</span>
                  </label>
                  <input
                    name="empId"
                    value={formData.empId || ""}
                    onChange={handleChange}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Manual ID"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="designation"
                    value={formData.designation || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Designation</option>
                    {designation && Array.isArray(designation) && designation.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6 relative">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Business Unit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search Business Unit..."
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                  />
                  {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {filteredBUs.length > 0 ? (
                        filteredBUs.map((bu) => (
                          <div
                            key={bu._id}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white text-sm"
                            onClick={() => {
                              handleChange({ target: { name: "businessUnit", value: bu._id } });
                              setSearchTerm(bu.name);
                              setIsOpen(false);
                            }}
                          >
                            {bu.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-zinc-500 text-sm">No results found</div>
                      )}
                    </div>
                  )}
                  <input type="hidden" name="businessUnit" value={formData.businessUnit || ""} required />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Hire Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="hireDate"
                    type="date"
                    value={formData.hireDate || ""}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Employee Type
                  </label>
                  <select
                    name="employeeType"
                    value={formData.employeeType || "ICPL"}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="ICPL">ICPL</option>
                    <option value="ICPLOS">ICPLOS</option>
                    <option value="ICPLNAPS">ICPLNAPS</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Employment Status
                  </label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus || "Active"}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Resigned">Resigned</option>
                    <option value="Notice Period">Notice Period</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => dispatch(decrement())}
                className="border-black mb-4 border px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                className="border-black mb-4 border px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                NEXT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}