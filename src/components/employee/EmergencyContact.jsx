import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function AdditionalAddress({ formData, setFormData }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Directly update the parent state passed as a prop
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data is already in the parent state; proceed to the next form tab
    dispatch(increment());
  };

  return (
    <div className="bg-zinc-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 pl-5 pr-5 ">
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Emergency Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emrContact"
                value={formData?.emrContact || ""}
                onChange={handleChange}
                required
                placeholder="Emergency Contact"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label className="block text-sm font-medium text-zinc-700 mt-3">
                Emergency Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emrContactName"
                value={formData?.emrContactName || ""}
                onChange={handleChange}
                required
                placeholder="Emergency Contact Name"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label className="block text-sm font-medium text-zinc-700 mt-3">
                Emergency Contact Relation{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="emrContactRelation"
                value={formData?.emrContactRelation || ""}
                onChange={handleChange}
                placeholder="Emergency Contact Relation"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Alternate Emergency Contact
              </label>
              <input
                type="text"
                name="alterEmrContact"
                value={formData?.alterEmrContact || ""}
                onChange={handleChange}
                placeholder="Alternate Emergency Contact"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label className="block text-sm font-medium text-zinc-700 mt-3">
                Alternate Emergency Contact Name
              </label>
              <input
                type="text"
                name="alterEmrContactName"
                value={formData?.alterEmrContactName || ""}
                onChange={handleChange}
                placeholder="Alternate Emergency Contact Name"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <label className="block text-sm font-medium text-zinc-700 mt-3">
                Alternate Emergency Contact Relation
              </label>
              <input
                type="text"
                name="alterEmrRelation"
                value={formData?.alterEmrRelation || ""}
                onChange={handleChange}
                placeholder="Alternate Emergency Contact Relation"
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => dispatch(decrement())}
              className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
            >
              Previous
            </button>
            <button
              type="submit"
              className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
            >
              NEXT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}