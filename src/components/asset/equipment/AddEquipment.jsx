import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddEquipment = ({ onClose }) => {
  const [formData, setFormData] = useState({
    equipmentName: "",
    typeName: "",
    model: "",
    prpductSerialNo: "",
    specification: ""
  });
  const [itemId, setItemId] = useState("");
  const [assetType, setAssetType] = useState([]);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/asset/createEquipment/${itemId}`,
        formData
      );
      if (response.data.success) {
        toast.success("Equipment added successfully");
        onClose();
        navigate("/asset/all-equipments");
      } else {
        toast.error("Failed to add equipment");
        console.error("Error Creating Equipment ", response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add equipment");
      console.error("Error adding equipment:", error);
    }
  };

  useEffect(() => {
    const fetchAssetType = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/asset/get-all-assetTypes`
        );
        if (response.data.success) {
          setAssetType(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching asset types:", error);
      }
    };
    fetchAssetType();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="bg-gray-100 h-full overflow-auto flex flex-col w-full max-w-lg md:max-w-2xl mx-auto">
        <Toaster />
        <div className="bg-white   px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Add Equipment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="equipment"
                className="block text-sm font-medium mb-1"
              >
                Equipment Name
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Equipment"
                className="p-2 border w-full form-input rounded mb-5"
                name="equipmentName"
                value={formData.equipmentName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="typeName"
                className="block text-sm font-medium mb-1"
              >
                Type Name
                <span className="text-red-500">*</span>
              </label>
              <select
                name="typeName"
                className="border w-full px-4 py-2 font-medium rounded"
                value={formData.typeName}
                onChange={(event) => {
                  const selectedTypeName = event.target.value;
                  const selectedAsset = assetType.find(
                    (asset) => asset.typeName === selectedTypeName
                  );
                  if (selectedAsset) {
                    setItemId(selectedAsset._id);
                  }
                  handleChange(event);
                }}
              >
                <option value="" disabled>
                  Select Type
                </option>
                {assetType.map((asset) => (
                  <option key={asset._id} value={asset.typeName}>
                    {asset.typeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-1">
                Model
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Model"
                className="p-2 border w-full form-input rounded mb-5"
                value={formData.model}
                onChange={handleChange}
                name="model"
              />
            </div>
            <div>
              <label
                htmlFor="serialNo"
                className="block text-sm font-medium mb-1"
              >
                Serial No
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Serial No"
                className="p-2 border w-full form-input rounded mb-5"
                value={formData.prpductSerialNo}
                onChange={handleChange}
                name="prpductSerialNo"
              />
            </div>
            <div>
              <label
                htmlFor="specification"
                className="block text-sm font-medium mb-1"
              >
                Specification
                <span className="font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Specification"
                className="p-2 border w-full form-input rounded mb-5"
                value={formData.specification}
                onChange={handleChange}
                name="specification"
              />
            </div>
            <div className="flex justify-end gap-3  ">
              <button
                type="submit"
                className="bg-blue-500 py-2 px-6  rounded-md shadow-md text-white hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500  py-2 px-4 rounded-md shadow-md text-white hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddEquipment;
