import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function BiographicalInfo() {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    maritalStatus: "Single",
    religion: "",
    citizenship: "",
    gender: "",
    photograph: "",
    resume: "",
  });

  console.log(formData.photograph, "photograph");

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
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
    <div className="bg-zinc-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6  h-[60vh]">
            <div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  placeholder="Date of Birth"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="maritalStatus"
                >
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  required
                  onChange={handleInputChange}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="religion"
                >
                  Religion
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="religion"
                  name="religion"
                  type="text"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="religion"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="citizenship"
                >
                  Citizenship
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="citizenship"
                  name="citizenship"
                  type="text"
                  value={formData.citizenship}
                  onChange={handleInputChange}
                  placeholder="Citizen"
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="gender"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  required
                  onChange={handleInputChange}
                >
                  <option value="">Select option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="photograph"
                >
                  Photograph
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="photograph"
                  name="photograph"
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result;
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          photograph: base64String,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-medium mb-2"
                  htmlFor="photograph"
                >
                  Resume
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result;
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          resume: base64String,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  accept="image/*"
                />
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
