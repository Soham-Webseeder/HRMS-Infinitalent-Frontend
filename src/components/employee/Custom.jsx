import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function Custom() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.counter);
  const [localFormData, setLocalFormData] = useState(formData);
  const [additionalFields, setAdditionalFields] = useState([]);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setLocalFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const handleAddField = () => {
    setAdditionalFields([
      ...additionalFields,
      { customFieldName: "", customFieldType: "", customValue: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...additionalFields];
    newFields.splice(index, 1);
    setAdditionalFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(localFormData));
    dispatch(increment());
  };
  const handleChangeAdditional = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...additionalFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [name]: value,
    };
    setAdditionalFields(updatedFields);
  };
  console.log();
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="customFieldName"
            className="block text-sm font-medium text-zinc-700"
          >
            Custom Field Name
          </label>
          <input
            type="text"
            id="customFieldName"
            name="customFieldName"
            value={localFormData.customFieldName || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Custom Field Name"
          />
        </div>
        <div>
          <label
            htmlFor="customFieldType"
            className="block text-sm font-medium text-zinc-700"
          >
            Custom Field Type
          </label>
          <select
            id="customFieldType"
            name="customFieldType"
            value={localFormData.customFieldType || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Text</option>
            <option>Number</option>
            <option>Date</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="customValue"
            className="block text-sm font-medium text-zinc-700"
          >
            Custom Value
          </label>
          <input
            type="text"
            id="customValue"
            name="customValue"
            value={localFormData.customValue || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Custom Value"
          />
        </div>
      </div>

      {additionalFields.map((field, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <input
              type="text"
              name="customFieldName"
              value={field.customFieldName || ""}
              onChange={(e) => handleChangeAdditional(index, e)}
              placeholder="Custom Field Name"
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="customFieldType"
              className="block text-sm font-medium text-zinc-700"
            >
              Custom Field Type
            </label>
            <select
              id="customFieldType"
              name="customFieldType"
              value={field.customFieldType || ""}
              onChange={(e) => handleChangeAdditional(index, e)}
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Text</option>
              <option>Number</option>
              <option>Date</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="customValue"
              value={field.customValue || ""}
              onChange={(e) => handleChangeAdditional(index, e)}
              placeholder="Custom Value"
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="bg-red-500 text-white px-4 py-2 rounded shadow"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={handleAddField}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Add More
        </button>
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          NEXT
        </button>
      </div>
    </form>
  );
}
