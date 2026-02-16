import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function SalarySetup2() {
  const [data, setData] = useState({
    salarySetup: {
      income: {
        basicSalary: 0,
        medical: 0,
        specialAllowance: 0,
        conveyanceAllowance: 0,
        hra: 0,
        otherAllowance: 0,
      },
      deduction: {
        pf: 0,
        tax: 0,
      },
      grossSalary: 0,
      netSalary: 0,
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setData(JSON.parse(savedFormData));
    }
  }, []);

  // Handle input changes for nested state (income, deduction)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split("."); // Split to identify the section (income/deduction)

    setData((prev) => ({
      ...prev,
      salarySetup: {
        ...prev.salarySetup,
        [section]: {
          ...prev.salarySetup[section],
          [field]: parseFloat(value) || 0,
        },
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(data)); // Save salary setup data locally
    dispatch(increment()); // Move to the next form section
  };

  return (
    <div className="bg-zinc-100 ">
      <div className="bg-gray-100 rounded-lg p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="income.basicSalary"
                  value={data.salarySetup?.income?.basicSalary}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter basic salary"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  HRA
                </label>
                <input
                  type="number"
                  name="income.hra"
                  value={data.salarySetup?.income?.hra}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter HRA"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Medical Allowance
                </label>
                <input
                  type="number"
                  name="income.medical"
                  value={data.salarySetup?.income?.medical}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter medical allowance"
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Conveyance Allowance
                </label>
                <input
                  type="number"
                  name="income.conveyanceAllowance"
                  value={data.salarySetup?.income?.conveyanceAllowance}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter conveyance allowance"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Special Allowance
                </label>
                <input
                  type="number"
                  name="income.specialAllowance"
                  value={data.salarySetup?.income?.specialAllowance}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter special allowance"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  Other Allowance
                </label>
                <input
                  type="number"
                  name="income.otherAllowance"
                  value={data.salarySetup?.income?.otherAllowance}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter other allowance"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-zinc-700">
                  PF
                </label>
                <input
                  type="number"
                  name="deduction.pf"
                  value={data.salarySetup?.deduction?.pf}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter PF amount"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => dispatch(decrement())}
              className="border-black mb-4 border px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
            >
              Previous
            </button>
            <button
              type="submit"
              className="border-black mb-4 border px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
