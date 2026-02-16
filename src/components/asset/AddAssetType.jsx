import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { toastSettings } from "../../routes/routes";

export default function AddAssetType() {
  const [assetType, setAssetType] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssetType({ ...assetType, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/createAssetType`,
        assetType
      );
      navigate('/asset/all-AssetType')
      if (response.data.success) {
        toast.success("Asset Type Added Successfully...");
        // console.log("Asset type Added Successfully...", response.data.message);
      } else {
        toast.error("Failed to Add Asset Type");
        // console.log("Error Adding Asset Type", response.data.message);
      }
    } catch (error) {
      toast.error("Failed to Add Asset Type");
      // console.log("Error Adding Asset Type", error);
    }
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4 overflow-x-hidden flex flex-col w-full mx-auto">
        <Toaster {...toastSettings} />
        <div className="bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5">
          <h2 className="text-xl font-bold mb-4">Add Asset Type</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="typeName"
                className="block text-sm font-medium mb-1"
              >
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="typeName"
                name="typeName"
                placeholder="typeName"
                className="p-2 border w-full form-input rounded mb-5"
                value={assetType.assetType}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                className="bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear trasation-all duration-150 mt-4 mb-2"
              >
                Reset
              </button>
              <button
                type="submit"
                className="self-start text-black active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear trasation-all duration-150 mt-4 mb-2"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
