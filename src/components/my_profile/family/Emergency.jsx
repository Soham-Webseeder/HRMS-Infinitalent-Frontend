import React, { useState } from "react";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";

export const EmergencyContact = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phoneNumber: "",
  });
  const [showInputFields, setShowInputFields] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    setEmergencyContacts([...emergencyContacts, newContact]);
    setNewContact({
      name: "",
      relationship: "",
      phoneNumber: "",
    });
    setShowInputFields(false);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
  };

  const handleShowInputFields = () => {
    setShowInputFields(true);
  };

  const handleCancel = () => {
    setNewContact({
      name: "",
      relationship: "",
      phoneNumber: "",
    });
    setShowInputFields(false);
  };

  const handleSave = () => {
    handleAddContact();
    console.log("Emergency contacts saved:", emergencyContacts);
  };

  return (
    <div className="py-4 shadow-xl ">
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-4 border-b border-gray-600">
          Emergency Contacts
        </h1>
        <div className="flex flex-row justify-around mb-2 border-b border-gray-600">
          <div className="w-1/3">Name</div>
          <div className="w-1/3">Relationship</div>
          <div className="w-1/3">Phone Number</div>
          <div className="w-1/3">Actions</div>
        </div>
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="flex flex-row justify-around mb-2">
            <div className="w-1/3">{contact.name}</div>
            <div className="w-1/3">{contact.relationship}</div>
            <div className="w-1/3">{contact.phoneNumber}</div>
            <div className="w-1/3">
              <button onClick={() => handleDeleteContact(index)}>
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}
        {showInputFields && (
          <div className="flex flex-row gap-6 mb-4">
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="border border-gray-400 rounded px-2 py-1 w-1/5"
            />
            <input
              type="text"
              name="relationship"
              value={newContact.relationship}
              onChange={handleInputChange}
              placeholder="Enter Relationship"
              className="border border-gray-400 rounded px-2 py-1 w-1/5"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={newContact.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              className="border border-gray-400 rounded px-2 py-1 w-1/5"
            />
          </div>
        )}
        <div className="flex items-center">
          {showInputFields ? (
            <>
              <button
                onClick={handleAddContact}
                className="text-3xl font-bold cursor-pointer p-2 text-blue-500"
              >
                <AiFillPlusCircle />
              </button>
              <h1 className="text-md font-medium ml-2">Add</h1>
              <button
                onClick={handleSave}
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
  );
};
