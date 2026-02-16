import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

export const BasicInfo = () => {
  const [formData, setFormData] = useState({
    employeeID: "",
    employeeType: "",
    dateOfJoining: "",
    workLocation: "",
    workExperienceYears: "",
    workExperienceMonths: "",
    probationPeriod: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Posting data:", formData);
    setFormData({
      employeeID: "",
      employeeType: "",
      dateOfJoining: "",
      workLocation: "",
      workExperienceYears: "",
      workExperienceMonths: "",
      probationPeriod: "",
    });
    setShowForm(false);
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  return (
    <div className="w-full p-1 shadow-xl">
      <div className="flex flex-row items-center justify-between px-1 border-b border-gray-600">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="flex justify-end pr-3">
          <button type="button" onClick={handleEdit} className="btn-edit">
            <BiPencil />
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="px-1">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-3">
              <div className="flex flex-col">
                <label className="input-label">Employee ID</label>
                <input
                  type="text"
                  name="employeeID"
                  placeholder="Employee ID"
                  className="input-field"
                  value={formData.employeeID}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="input-label">Employee Type</label>
                <input
                  type="text"
                  name="employeeType"
                  placeholder="Employee Type"
                  className="input-field"
                  value={formData.employeeType}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="input-label">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  placeholder="Date of Joining"
                  className="input-field"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="input-label">Work Location</label>
                <input
                  type="text"
                  name="workLocation"
                  placeholder="Work Location"
                  className="input-field"
                  value={formData.workLocation}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label className="input-label">Work Experience</label>
                <div className="flex flex-row w-[40%] gap-2">
                  <input
                    type="text"
                    name="workExperienceYears"
                    placeholder="Years"
                    className="input-field w-20"
                    value={formData.workExperienceYears}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="workExperienceMonths"
                    placeholder="Months"
                    className="input-field w-20"
                    value={formData.workExperienceMonths}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="input-label">Probation Period</label>
                <input
                  type="text"
                  name="probationPeriod"
                  placeholder="Probation Period"
                  className="input-field"
                  value={formData.probationPeriod}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <div
                className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 hover:scale-105 border border-gray-300"
                onClick={() => setShowForm(false)}
              >
                <RxCross2 className="text-black text-sm font-semibold" />
                <button className="text-black text-sm font-semibold p-0">
                  CANCEL
                </button>
              </div>
              <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                <AiOutlineCheck className="text-xl" />
                <button
                  type="submit"
                  className="text-white text-sm font-semibold pl-3 pr-3"
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-1">
          <div className="data-item">
            <span className="data-label">Employee ID:</span>
            <span className="data-value">{formData.employeeID}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Employee Type:</span>
            <span className="data-value">{formData.employeeType}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Date of Joining:</span>
            <span className="data-value">{formData.dateOfJoining}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Work Location:</span>
            <span className="data-value">{formData.workLocation}</span>
          </div>
          <div className="data-item">
            <span className="data-label">Work Experience:</span>
            <span className="data-value">
              {formData.workExperienceYears} years{" "}
              {formData.workExperienceMonths} months
            </span>
          </div>
          <div className="data-item">
            <span className="data-label">Probation Period:</span>
            <span className="data-value">{formData.probationPeriod}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;
