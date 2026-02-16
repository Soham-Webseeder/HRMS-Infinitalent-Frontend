import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function Class() {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  const [formData, setFormData] = useState({
    classCode: "",
    classAccrualDate: "",
    classDescription: "",
    classStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    dispatch(increment());
  };

  return (
    <div>
      <div className="bg-white shadow-md">
        <div className="p-4 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label className="block text-zinc-700 text-sm font-medium mb-2">
                Class Code
              </label>
              <input
                type="text"
                name="classCode"
                value={formData.classCode}
                onChange={handleChange}
                placeholder="Class Code"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-zinc-700 text-sm font-medium mb-2">
                Class Accrual Date
              </label>
              <input
                type="text"
                name="classAccrualDate"
                value={formData.classAccrualDate}
                onChange={handleChange}
                placeholder="Class Accrual Date"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-zinc-700 text-sm font-medium mb-2">
                Class Description
              </label>
              <input
                type="text"
                name="classDescription"
                value={formData.classDescription}
                onChange={handleChange}
                placeholder="Class Description"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-zinc-700 text-sm font-medium mb-2">
                Class Status
              </label>
              <input
                type="text"
                name="classStatus"
                value={formData.classStatus}
                onChange={handleChange}
                placeholder="Active"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between mt-8">
            <button
              onClick={() => dispatch(decrement())}
              className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
