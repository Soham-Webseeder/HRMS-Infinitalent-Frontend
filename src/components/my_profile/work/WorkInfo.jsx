import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

export const WorkInfo = () => {
  const [formData, setFormData] = useState({
    designation: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const handleOpenForm = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full mt-3 p-2 shadow-xl bg-slate-50">
      <div className="w-full flex justify-between border-b border-gray-600">
        <h1 className="  text-lg uppercase pb-2 font-medium">Work Info</h1>
        <div onClick={handleOpenForm}>
          <BiPencil />
        </div>
      </div>
      {!isOpen ? (
        <div className="flex flex-col w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="designation">Designation</label>
                  <select
                    name="designation"
                    id="designation"
                    onChange={handleChange}
                    value={formData.designation}
                  >
                    <option value="-">-</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="jobTitle">Job Title</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Job Title"
                    className="w-full"
                    onChange={handleChange}
                    value={formData.jobTitle}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="startDate">Department</label>
                  <select
                    name="designation"
                    id="designation"
                    onChange={handleChange}
                    value={formData.designation}
                  >
                    <option value="-">-</option>
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="endDate">SubDepartment</label>
                  <select
                    name="designation"
                    id="designation"
                    onChange={handleChange}
                    value={formData.designation}
                  >
                    <option value="-">-</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <div
                  className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 hover:scale-105 border border-gray-300"
                  onClick={handleOpenForm}
                >
                  <RxCross2 className="text-black text-sm font-semibold" />
                  <button
                    type="button"
                    className="text-black text-sm font-semibold p-0"
                  >
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
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-1/2">
                <label htmlFor="designation">Designation</label>
                <p>-</p>
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="jobTitle">Job Title</label>
                <p>-</p>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-1/2">
                <label htmlFor="department">Department</label>
                <p>-</p>
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="subDepartment">SubDepartment</label>
                <p>-</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
