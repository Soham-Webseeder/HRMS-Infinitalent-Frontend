import React, { useState } from "react";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";

const ReportingManager = () => {
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ employee: "", type: "" });
  const [showButtons, setShowButtons] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, newField]);
    setNewField({ employee: "", type: "" });
    setShowButtons(true);
  };

  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSave = () => {
    console.log("Fields:", fields);
    setShowButtons(false);
  };

  const handleCancel = () => {
    setFields([]);
    setShowButtons(false);
  };

  return (
    <div className="w-full p-2 pl-3 shadow-xl">
      <div className="flex flex-col w-full">
        <div className="text-xl font-semibold mb-4 ml-1 uppercase border-b  border-gray-700">
          Reporting manager
        </div>
        <div className="flex flex-row gap-5 justify-around items-center mb-2 border-b border-gray-600  p-3">
          <div className="w-1/4">Name</div>
          <div className="w-1/4">Type</div>
          <div className="w-1/4">Department</div>
          <div className="w-1/4">Designation</div>
        </div>
        <div className="flex flex-col border-b border-gray-700 p-3 gap-2">
          <div>No primary manager assigned</div>
          <div>No secondary Manager assigned</div>
        </div>
        {fields.map((field, index) => (
          <div key={index} className="flex items-center gap-2 p-2">
            <input
              type="text"
              name="employee"
              value={field.employee}
              placeholder="Select Employee"
              onChange={(e) => handleChange(index, e)}
              className="w-1/4 px-2 py-1 border border-gray-400 rounded"
            />
            <select
              name="type"
              value={field.type}
              onChange={(e) => handleChange(index, e)}
              className="w-1/4 px-2 py-1 border border-gray-400 rounded"
            >
              <option value="">Type</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            <button
              type="button"
              onClick={() => handleDeleteField(index)}
              className="text-red-600"
            >
              <AiOutlineDelete />
            </button>
          </div>
        ))}

        {showButtons && (
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-600 text-white px-3 py-1 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        )}

        <div className="flex p-2 pl-3 mt-2">
          <button
            type="button"
            onClick={handleAddField}
            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded"
          >
            <AiFillPlusCircle className="mr-1" /> Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportingManager;
