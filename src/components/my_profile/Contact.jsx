import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

export const Contact = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    officialEmail: "",
    personalEmail: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
  });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" shadow-xl  bg-slate-50 pb-2">
      <div className="flex justify-between items-center pl-2 border-b-[0.7px] border-gray-500 ">
        <h1 className="text-xl font-semibold mb-6 ">Contact</h1>
        {!editMode && (
          <div className="pr-3" onClick={handleEdit}>
            <BiPencil />
          </div>
        )}
      </div>
      <div className="pl-2 pt-2">
        {editMode ? (
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              <div className="flex flex-col">
                <label htmlFor="officialEmail" className="font-semibold">
                  Official Email ID:
                </label>
                <input
                  type="email"
                  name="officialEmail"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="personalEmail" className="font-semibold">
                  Personal Email ID:
                </label>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="font-semibold">
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="alternatePhoneNumber" className="font-semibold">
                  Alternate Phone Number:
                </label>
                <input
                  type="text"
                  name="alternatePhoneNumber"
                  value={formData.alternatePhoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div
                className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 hover:scale-105 border border-gray-300"
                onClick={() => setEditMode(false)}
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
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              <div className="flex flex-col">
                <label htmlFor="officialEmail" className="font-semibold">
                  Official Email ID
                </label>
                <div>{formData.officialEmail}</div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="personalEmail" className="font-semibold">
                  Personal Email ID
                </label>
                <div>{formData.personalEmail}</div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="font-semibold">
                  Phone Number
                </label>
                <div>{formData.phoneNumber}</div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="alternatePhoneNumber" className="font-semibold">
                  Alternate Phone Number
                </label>
                <div>{formData.alternatePhoneNumber}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
