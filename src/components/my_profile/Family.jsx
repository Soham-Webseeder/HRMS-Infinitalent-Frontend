import React, { useState } from "react";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import { EmergencyContact } from "./family/Emergency";

export const Family = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    dob: "",
    dependent: false,
  });
  const [showInputFields, setShowInputFields] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMember((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddMember = () => {
    setFamilyMembers([...familyMembers, newMember]);
    setNewMember({
      name: "",
      relationship: "",
      dob: "",
      dependent: false,
    });
    setShowInputFields(false);
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };

  const handleShowInputFields = () => {
    setShowInputFields(true);
  };
  const handleCancel = () => {
    setNewMember({
      name: "",
      relationship: "",
      dob: "",
      dependent: false,
    });
    setShowInputFields(false);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="py-4 w-[44%]">
        <div className="shadow-xl p-3">
          <h1 className="text-2xl font-bold mb-4 border-b border-gray-600">
            Family Members
          </h1>
          <div className="flex flex-row justify-around mb-2 border-b border-gray-600">
            <div className="w-1/4">Name</div>
            <div className="w-1/4">Relationship</div>
            <div className="w-1/4">Date of Birth</div>
            <div className="w-1/4">Dependent</div>
            <div className="w-1/4">Actions</div>
          </div>
          {familyMembers.map((member, index) => (
            <div key={index} className="flex flex-row justify-around mb-2">
              <div className="w-1/4">{member.name}</div>
              <div className="w-1/4">{member.relationship}</div>
              <div className="w-1/4">{member.dob}</div>
              <div className="w-1/4">{member.dependent ? "Yes" : "No"}</div>
              <div className="w-1/4">
                <button onClick={() => handleDeleteMember(index)}>
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          {showInputFields && (
            <div className="flex flex-row gap-1  mb-2 ">
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="border border-gray-400 rounded  py-1 w-1/5"
              />
              <input
                type="text"
                name="relationship"
                value={newMember.relationship}
                onChange={handleInputChange}
                placeholder="Enter Relationship"
                className="border border-gray-400 rounded  py-1 w-1/5"
              />
              <input
                type="date"
                name="dob"
                value={newMember.dob}
                onChange={handleInputChange}
                className="border border-gray-400 rounded  py-1 w-1/5"
              />
              <label className="flex items-center ml-4">
                <input
                  type="checkbox"
                  name="dependent"
                  checked={newMember.dependent}
                  onChange={handleInputChange}
                  className="mr-2"
                />
              </label>
            </div>
          )}
          <div className="flex items-center">
            {showInputFields ? (
              <>
                <button
                  onClick={handleAddMember}
                  className="text-3xl font-bold cursor-pointer p-2 text-blue-500"
                >
                  <AiFillPlusCircle />
                </button>

                <button
                  onClick={handleAddMember}
                  className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 ml-4 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleShowInputFields}
                className="text-3xl font-bold cursor-pointer p-2 text-blue-500"
              >
                <AiFillPlusCircle />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-[44%]">
        <EmergencyContact />
      </div>
    </div>
  );
};
