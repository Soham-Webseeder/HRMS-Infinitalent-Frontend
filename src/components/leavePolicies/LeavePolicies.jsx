import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import React, { useState } from "react";

function LeavePolicies() {
  const [companyName, setCompanyName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Predefined list of companies for the dropdown
  const availableCompanies = [
    "Company 1",
    "Company 2",
    "Company 3",
    "Company 4",
    "Company 5",
  ];

  // Function to add a company to the list
  const addCompany = (company) => {
    if (company && !companies.includes(company)) {
      setCompanies([...companies, company]);
      setCompanyName(""); // Clear input after adding
    }
    setDropdownVisible(false); // Hide the dropdown after selection
  };

  // Function to remove a company from the selected list
  const removeCompany = (companyToRemove) => {
    setCompanies(companies.filter((company) => company !== companyToRemove));
  };

  // Show only companies that match the input and are not already selected
  const filteredCompanies = availableCompanies.filter(
    (company) =>
      company.toLowerCase().includes(companyName.toLowerCase()) &&
      !companies.includes(company)
  );

  const data = [
    {
      companyName: "Company 1",
      leavePolicyName: "Annual Leave",
    },
    { companyName: "Company 2", leavePolicyName: "Sick Leave" },
    {
      companyName: "Company 3",
      leavePolicyName: "Casual Leave",
    },
    {
      companyName: "Company 4",
      leavePolicyName: "Maternity Leave",
    },
  ];

  return (
    <div className="flex flex-col p-6 space-y-4 bg-gray-100 min-h-[100vh]">
      <div className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Employee Leave Policy</h1>
          <p className="text-sm text-gray-500">
            <span className="cursor-pointer hover:text-blue-600">Home</span>{" "}
            | Employee Leave Policy
          </p>
        </div>
        <button className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-full shadow-md hover:bg-blue-500">
          ADD NEW
        </button>
      </div>

      {/* Form Section */}
      <div className="flex bg-white p-6 rounded-lg shadow-md items-center gap-4">

      <div className="w-1/2">
        <label htmlFor="companyInput" className="block text-lg font-medium text-gray-700 mb-2">
          Select Company
        </label>
        <div className="flex flex-wrap items-center border rounded-md p-3 space-x-2 relative">
          {/* Selected Companies */}
          {companies.map((company, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center space-x-2"
            >
              {company}
              <button
                type="button"
                onClick={() => removeCompany(company)}
                className="text-white hover:text-red-400 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}

          {/* Input Field */}
          <input
            type="text"
            id="companyInput"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              setDropdownVisible(true);
            }}
            placeholder="Type or select a company"
            className="flex-grow outline-none text-gray-600"
          />

          {/* Dropdown for available companies */}
          {dropdownVisible && filteredCompanies.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-40 overflow-y-auto z-10">
              {filteredCompanies.map((company, index) => (
                <li
                  key={index}
                  onClick={() => addCompany(company)}
                  className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  {company}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Buttons */}
        
      </div>
      <div className="flex items-center gap-4 mt-8 ">
          <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full shadow hover:bg-blue-500">
            Submit
          </button>
          <button className="bg-gray-400 text-white text-sm px-6 py-2 rounded-full shadow hover:bg-gray-500">
            Clear
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Company Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Leave Policy Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((row, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-gray-100">
                  <td className="py-3 px-4 text-gray-700">{row.companyName}</td>
                  <td className="py-3 px-4 text-gray-700">{row.leavePolicyName}</td>
                  <td className="py-3 px-4 flex items-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <AiOutlineEdit size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeavePolicies;
