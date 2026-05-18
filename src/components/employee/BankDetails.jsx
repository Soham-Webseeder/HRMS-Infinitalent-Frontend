import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

const BankDetails = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the parent state directly using the provided setFormData function
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data persistence is managed by the parent component AddEmployee2.jsx
    dispatch(increment());
  };

  return (
    <div className="bg-zinc-100">
      <div className="bg-gray-100 rounded-lg pl-5 pr-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="bankName"
                >
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="bankName"
                  name="bankName"
                  type="text"
                  required
                  value={formData.bankName || ""}
                  onChange={handleInputChange}
                  placeholder="Bank Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="branchName"
                >
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="branchName"
                  name="branchName"
                  type="text"
                  required
                  value={formData.branchName || ""}
                  onChange={handleInputChange}
                  placeholder="Branch Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="accountNo"
                >
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="accountNo"
                  name="accountNo"
                  type="number"
                  required
                  value={formData.accountNo || ""}
                  onChange={handleInputChange}
                  placeholder="Account Number"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="acHolderName"
                >
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="acHolderName"
                  name="acHolderName"
                  type="text"
                  required
                  value={formData.acHolderName || ""}
                  onChange={handleInputChange}
                  placeholder="Account Holder Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="accountType"
                >
                  Account Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="accountType"
                  name="accountType"
                  value={formData.accountType || ""}
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Select Account Type</option>
                  <option value="Saving">Saving</option>
                  <option value="Salary">Salary</option>
                  <option value="Current">Current</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="ifscCode"
                >
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="ifscCode"
                  name="ifscCode"
                  type="text"
                  required
                  value={formData.ifscCode || ""}
                  onChange={handleInputChange}
                  placeholder="IFSC Code"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => dispatch(decrement())}
              type="button"
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
  );
};

export default BankDetails;