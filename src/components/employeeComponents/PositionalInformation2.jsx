import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import axios from "axios";

export default function PositionalInformation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [empExistsMessage, setEmpExistsMessage] = useState("")

  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setData(JSON.parse(savedFormData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(data));
    dispatch(increment());
  };

  const [divisions, setDivisions] = useState([]);
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
        // 3. Fetch Business Units (Changed variable name to avoid typos)
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
    console.log(name, value)

    if (name === "empId" && value !== "") {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/empIdExists?employeeName=${data._id}&empId=${value}`)
      // console.log(response.data)
      if (response.data.exists || !response.data.success) {
        setEmpExistsMessage("(Employee ID already assigned)")
        return;
      }
      setEmpExistsMessage("")
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(data, "dataa");
  return (
    <>
      <div className="bg-zinc-100 ">
        <div className="bg-gray-100  rounded-lg pl-5 pr-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Department
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    id=""
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={data.department}
                    onChange={handleChange}
                  >
                    <option value=""> Select Department</option>
                    {department.map((data) =>
                      data && data.department && data.department.title ? (
                        <option
                          key={data.department.title}
                          value={data.department.title}
                        >
                          {data.department.title}
                        </option>
                      ) : null
                    )}
                  </select>
                </div>
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Duty Type
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Full Time"
                    name="dutyType"
                    value={data.dutyType}
                    onChange={handleChange}
                  />
                </div> */}
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Original Hire Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    name="originalHireDate"
                    value={data.originalHireDate}
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div> */}
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Termination Reason
                  </label>
                  <input
                    onChange={handleChange}
                    name="terminationReason"
                    type="text"
                    value={data.terminationReason}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Termination Reason"
                  />
                </div> */}
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Rate Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    name="rateType"
                    value={data.rateType}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select option</option>
                    <option>Hourly</option>
                    <option>Salary</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Pay Frequency <span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    name="payFrequency"
                    value={data.payFrequency}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select option</option>
                    <option>Weekly</option>
                    <option>Biweekly</option>
                    <option>Monthly</option>
                    <option>Annual</option>
                  </select>
                </div> */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Gross Salary
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={data.salary}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Monthly Salary"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Esic Number
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="esicNo"
                    value={data.esicNo}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Esic Register No"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    UAN No{" "}
                  </label>
                  <input
                    onChange={handleChange}
                    name="uanNo"
                    value={data.uanNo}
                    type="Number"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="UAN No"
                  />
                </div>
                {data._id && <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Employee ID <span className="text-red-500">{empExistsMessage}</span>
                  </label>
                  <input
                    name="empId"
                    onChange={handleChange}
                    value={data.empId}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>}
              </div>
              <div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="designation"
                    onChange={handleChange}
                    value={data.designation}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select Designation</option>
                    {designation &&
                      Array.isArray(designation) &&
                      designation.length > 0 ? (
                      designation.map((designation) => (
                        <option key={designation.id} value={designation.id}>
                          {designation.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No Designations Available</option>
                    )}
                  </select>
                </div>
                <div className="mb-6 relative">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Business Unit <span className="text-red-500">*</span>
                  </label>

                  {/* Search Input Field */}
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

                  {/* Dropdown List */}
                  {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-300 rounded-md shadow-lg max-height-60 overflow-y-auto max-h-48">
                      {filteredBUs.length > 0 ? (
                        filteredBUs.map((bu) => (
                          <div
                            key={bu._id}
                            className="px-4 py-2 cursor-pointer hover:bg-indigo-600 hover:text-white text-sm"
                            onClick={() => {
                              // Manually trigger your existing handleChange logic
                              handleChange({ target: { name: "businessUnit", value: bu._id } });
                              setSearchTerm(bu.name); // Show the selected name in the box
                              setIsOpen(false);      // Close the dropdown
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

                  {/* Hidden Input for Form Validation */}
                  <input type="hidden" name="businessUnit" value={data.businessUnit} required />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Hire Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="hireDate"
                    onChange={handleChange}
                    value={data.hireDate}
                    type="date"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    PAN Number
                  </label>
                  <input
                    name="panNo"
                    onChange={handleChange}
                    value={data.panNo}
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Employee Type
                  </label>
                  <select
                    onChange={handleChange}
                    value={data.employeeType} // Update to use employeeType
                    name="employeeType" // Update name to employeeType
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select option</option>
                    <option value="ICPL">ICPL</option>
                    <option value="ICPLOS">ICPLOS</option>
                    <option value="ICPLNAPS">ICPLNAPS</option>
                  </select>
                </div>

                {/*  <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Re Hire Date
                  </label>
                  <input
                    onChange={handleChange}
                    name="reHireDate"
                    type="date"
                    value={data.reHireDate}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div> */}
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Rate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="rate"
                    onChange={handleChange}
                    value={data.rate}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Rate"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Pay Frequency Text<span className="text-red-500">*</span>
                  </label>
                  <input
                    name="payFrequencyText"
                    onChange={handleChange}
                    value={data.payFrequencyText}
                    required
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Pay Frequency Text"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    name="hourlyRate"
                    value={data.hourlyRate}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Hourly Rate"
                  />
                </div> */}
              </div>
            </div>
            <div className="flex justify-between mt-8  ">
              <button
                onClick={() => dispatch(decrement())}
                className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
              >
                Previous
              </button>
              <button
                type="submit"
                // onClick={handleSubmit}
                className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
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
