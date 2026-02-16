import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

export const ResignationInfo = () => {
  const [formData, setFormData] = useState({
    resignationDate: "",
    resignationStatus: "",
    noticePeriod: "",
    lastWorkingDay: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
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
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-row w-full mb-4">
            <div className="flex flex-col w-1/3">
              <label htmlFor="resignationDate">Resignation Date</label>
              <input
                type="date"
                id="resignationDate"
                name="resignationDate"
                value={formData.resignationDate}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-1/3 ml-4">
              <label htmlFor="resignationStatus">Resignation Status</label>
              <input
                type="text"
                id="resignationStatus"
                name="resignationStatus"
                placeholder="Enter Resignation Status"
                value={formData.resignationStatus}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-1/3 ml-4">
              <label htmlFor="noticePeriod">Notice Period</label>
              <input
                type="text"
                id="noticePeriod"
                name="noticePeriod"
                placeholder="Enter Notice Period"
                value={formData.noticePeriod}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lastWorkingDay">Last Working Day</label>
            <input
              type="date"
              id="lastWorkingDay"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end mt-4">
            <div
              className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 hover:scale-105 border border-gray-300"
              onClick={handleCancel}
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
        </form>
      ) : (
        <div className="w-full">
          <div className="flex flex-row w-full mb-4">
            <div className="flex flex-col w-1/3">
              <label htmlFor="resignationDate">Resignation Date</label>
              <p>{formData.resignationDate}</p>
            </div>
            <div className="flex flex-col w-1/3 ml-4">
              <label htmlFor="resignationStatus">Resignation Status</label>
              <p>{formData.resignationStatus}</p>
            </div>
            <div className="flex flex-col w-1/3 ml-4">
              <label htmlFor="noticePeriod">Notice Period</label>
              <p>{formData.noticePeriod}</p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="lastWorkingDay">Last Working Day</label>
            <p>{formData.lastWorkingDay}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResignationInfo;
