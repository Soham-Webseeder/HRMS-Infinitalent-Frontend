import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import axios from "axios";

export default function PositionalInformation() {
  const [data, setData] = useState({});

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
        const responseDesignation = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getAllDesignations`
        );
        console.log(responseDesignation, "Desg");
        setDesignation(responseDesignation.data.response);
        const department = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
        );
        console.log(department);
        setDepartment(department.data.response);
        const businnessUnit = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getAllBussinessUnits`
        );

        setBusinessUnit(businnessUnit.data.response);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };
    fetchDivisions();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(data, "dataa");
  return (
    <>
      <div className="bg-zinc-100">
        <div className="bg-white p-5 shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-8 h-[60vh]">
              <div>
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Division <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={data.divisionName}
                    onChange={handleChange}
                    required
                    name="division"
                  >
                    <option value="">Select option</option>
                    {divisions.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.divisionName}
                      </option>
                    ))}
                  </select>
                </div> */}
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
                <div className="mb-6">
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
                </div>
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
                <div className="mb-6">
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
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Salary/CTC
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={data.salary}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Anual Salary"
                  />
                </div>
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Hourly rate2
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="hourlyRate2"
                    value={data.hourlyRate2}
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Hourly Rate2"
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Home Department
                  </label>
                  <input
                    onChange={handleChange}
                    name="homeDepartment"
                    value={data.homeDepartment}
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Home Department"
                  />
                </div> */}
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
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Business Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="businessUnit"
                    onChange={handleChange}
                    value={data.businessUnit}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select business Unit</option>
                    {businessUnit &&
                    Array.isArray(businessUnit) &&
                    businessUnit.length > 0 ? (
                      businessUnit.map((businessUnit) => (
                        <option key={businessUnit.id} value={businessUnit._id}>
                          {businessUnit.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No business Unit Available</option>
                    )}
                  </select>
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
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Termination Date
                  </label>
                  <input
                    name="terminationDate"
                    onChange={handleChange}
                    value={data.terminationDate}
                    type="date"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div> */}
                {/* <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-zinc-700">
                    Voluntary Termination
                  </label>
                  <select
                    onChange={handleChange}
                    value={data.voluntaryTermination}
                    name="voluntaryTermination"
                    className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select option</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div className="mb-6">
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
                <div className="mb-6">
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
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8 ">
              <button
                onClick={() => dispatch(decrement())}
                className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded-l"
              >
                Previous
              </button>
              <button
                type="submit"
                // onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
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
