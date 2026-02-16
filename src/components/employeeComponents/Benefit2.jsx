import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function Benefit() {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  // Initialize state as an array with one object
  const [formFields, setFormFields] = useState([
    {
      benefitType: "",
      startDate: "",
      benefitDescription: "",
      endDate: "",
    },
  ]);

  // Handle input change for dynamic fields
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...formFields];
    newFields[index] = {
      ...newFields[index],
      [name]: value,
    };
    setFormFields(newFields);
  };

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      {
        benefitType: "",
        startDate: "",
        benefitDescription: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const newFields = formFields.filter((_, i) => i !== index);
    setFormFields(newFields);
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        // Ensure the parsed data is an array
        if (Array.isArray(parsedData)) {
          setFormFields(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse form data from localStorage", error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedFormData = localStorage.getItem("formData");
    let formData = savedFormData ? JSON.parse(savedFormData) : {};

    formData = {
      ...formData, // Spread the existing form data
      benefits: formFields, // Add the benefits array
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    dispatch(increment());
  };

  console.log(formFields, "formFields");

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
                      value={field.benefitType}
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
                      value={field.startDate}
                      onChange={(e) => handleInputChange(index, e)}
                      placeholder="Benefit Accrual Date"
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
                      value={field.benefitDescription}
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
                      value={field.endDate}
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
            onClick={() => dispatch(decrement())}
            className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
