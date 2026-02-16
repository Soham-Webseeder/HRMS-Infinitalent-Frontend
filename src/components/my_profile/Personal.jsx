import { BiPencil } from "react-icons/bi";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import My_address from "./My_address";
import { useDispatch, useSelector } from "react-redux";
import { setOnEdit3 } from "../../redux/slices/MyprofileSlice";
import { Contact } from "./Contact";
import { SocialMediaLinks } from "./SocialMediaLinks";

export const Personal = () => {
  const { onEdit3 } = useSelector((state) => state.myprofile);
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      maritalStatus: "",
    });
    setOnEdit(false);
  };

  const handleEdit = () => {
    setOnEdit(!onEdit);
  };

  const handleEdit3 = () => {
    dispatch(setOnEdit3(!onEdit3));
  };

  return (
    <div className="container mx-auto pt-8 pb-16 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 uppercase">
            Personal Info
          </h1>
          <div
            onClick={handleEdit}
            className="text-xl font-bold cursor-pointer"
          >
            <MdOutlineEdit />
          </div>
        </div>
        {onEdit ? (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dateOfBirth" className="text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  placeholder="Date of Birth"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender" className="text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="trans">Transgender</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="bloodGroup" className="text-gray-700">
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="maritalStatus" className="text-gray-700">
                  Marital Status
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Marital Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                  <option value="committed">Committed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleEdit}
                className="bg-white flex gap-1 items-center justify-center rounded p-2 m-1 border border-gray-300 text-black text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <div className="text-gray-700">First Name:</div>
                <div>{formData.firstName}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-700">Last Name:</div>
                <div>{formData.lastName}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-700">Date of Birth:</div>
                <div>{formData.dateOfBirth}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-700">Gender:</div>
                <div>{formData.gender}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-700">Blood Group:</div>
                <div>{formData.bloodGroup}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-700">Marital Status:</div>
                <div>{formData.maritalStatus}</div>
              </div>
            </div>
          </div>
        )}
        <div className="mb-8">
          <Contact />
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold uppercase">
              Address
            </h1>
            <div onClick={handleEdit3}>
              <BiPencil />
            </div>
          </div>
          {!onEdit3 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-700">Current Address:</div>
                <div>-</div>
              </div>
              <div>
                <div className="text-gray-700">Permanent Address:</div>
                <div>-</div>
              </div>
            </div>
          ) : (
            <My_address />
          )}
        </div>
        <div className="mb-8">
          <SocialMediaLinks />
        </div>
      </div>
    </div>
  );
};
