import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function Benefit({ formData, setFormData }) {
  const dispatch = useDispatch();
  
  // Use the benefits array from the parent formData
  const formFields = formData.benefits || [
    {
      benefitType: "",
      startDate: "",
      benefitDescription: "",
      endDate: "",
    },
  ];

  // Handle input change for dynamic fields
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...formFields];
    newFields[index] = {
      ...newFields[index],
      [name]: value,
    };
    
    // Update the parent state directly
    setFormData((prev) => ({
      ...prev,
      benefits: newFields,
    }));
  };

  const handleAddField = () => {
    const newFields = [
      ...formFields,
      {
        benefitType: "",
        startDate: "",
        benefitDescription: "",
        endDate: "",
      },
    ];
    
    setFormData((prev) => ({
      ...prev,
      benefits: newFields,
    }));
  };

  const handleRemoveField = (index) => {
    const newFields = formFields.filter((_, i) => i !== index);
    
    setFormData((prev) => ({
      ...prev,
      benefits: newFields,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data is already managed in the parent state; proceed to the next tab
    dispatch(increment());
  };

  return (
    <div className="bg-zinc-100">
      <div className="bg-gray-100 pl-5 pr-5 ">
        <div className="mt-4 grid gap-4 overflow-auto">
          {Array.isArray(formFields) &&
            formFields.map((field, index) => (
              <div
                key={index}
                className="p-4  border-zinc-300 rounded-md shadow-sm"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`benefitType-${index}`}
                      className="block text-zinc-700 text-sm font-medium mb-2"
                    >
                      Benefit Type
                    </label>
                    <input
                      type="text"
                      id={`benefitType-${index}`}
                      name="benefitType"
                      value={field.benefitType || ""}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="Benefit Class Code"
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <label
                      htmlFor={`startDate-${index}`}
                      className="block text-zinc-700 text-sm font-medium mb-2 mt-4"
                    >
                      Benefit Start Date
                    </label>
                    <input
                      type="date"
                      id={`startDate-${index}`}
                      name="startDate"
                      value={field.startDate || ""}
                      onChange={(e) => handleInputChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`benefitDescription-${index}`}
                      className="block text-zinc-700 text-sm font-medium mb-2"
                    >
                      Benefit Description
                    </label>
                    <input
                      type="text"
                      id={`benefitDescription-${index}`}
                      name="benefitDescription"
                      value={field.benefitDescription || ""}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="Benefit Description"
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <label
                      htmlFor={`endDate-${index}`}
                      className="block text-zinc-700 text-sm font-medium mb-2 mt-4"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id={`endDate-${index}`}
                      name="endDate"
                      value={field.endDate || ""}
                      onChange={(e) => handleInputChange(index, e)}
                      className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                {index > 0 && (
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
        <button
          type="button"
          onClick={handleAddField}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Add More
        </button>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => dispatch(decrement())}
            className="border-black mb-4 border px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border-black mb-4 border px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}