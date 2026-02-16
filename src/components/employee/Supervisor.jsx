import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function Supervisor() {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  const [formData, setFormData] = useState({
    supervisorName: "",
    supervisorReport: "",
    isSupervisor: "Yes",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="supervisorName"
                  className="block text-zinc-700 text-sm font-medium mb-2"
                >
                  Supervisor Name
                </label>
                <select
                  id="supervisorName"
                  name="supervisorName"
                  value={formData.supervisorName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select option</option>
                  <option value="Supervisor 1">Supervisor 1</option>
                  <option value="Supervisor 2">Supervisor 2</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="supervisorReport"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Supervisor Report
                </label>
                <input
                  type="text"
                  id="supervisorReport"
                  name="supervisorReport"
                  value={formData.supervisorReport}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Reports"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="isSupervisor"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Is Supervisor
                </label>
                <select
                  id="isSupervisor"
                  name="isSupervisor"
                  value={formData.isSupervisor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => dispatch(decrement())}
              type="button"
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
      </div>
    </div>
  );
}
