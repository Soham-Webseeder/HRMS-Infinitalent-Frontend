import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOnEdit3 } from "../../redux/slices/MyprofileSlice";

export const My_address = () => {
  const { onEdit3 } = useSelector((state) => state.myprofile);
  const dispatch = useDispatch();
  const [currentAddress, setCurrentAddress] = useState({
    currentAddressLine1: "",
    currentAddressLine2: "",
    currentCountry: "",
    currentState: "",
    currentCity: "",
    currentPincode: "",
    houseType: "",
    stayingSince: "",
    livingSince: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    permanentAddressLine1: "",
    permanentAddressLine2: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentPincode: "",
  });

  const [sameAsCurrent, setSameAsCurrent] = useState(false);

  const handleChangeCurrentAddress = (e) => {
    setCurrentAddress({
      ...currentAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePermanentAddress = (e) => {
    setPermanentAddress({
      ...permanentAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setSameAsCurrent(!sameAsCurrent);
    if (!sameAsCurrent) {
      setPermanentAddress({
        ...currentAddress,
      });
    } else {
      setPermanentAddress({
        permanentAddressLine1: "",
        permanentAddressLine2: "",
        permanentCountry: "",
        permanentState: "",
        permanentCity: "",
        permanentPincode: "",
      });
    }
  };

  const handleSave = () => {
    console.log("Saving...");
  };
  const handleEdit = () => {
    dispatch(setOnEdit3(!onEdit3));
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-50 pb-2 shadow rounded-md">
      <div className="grid grid-cols-2 ">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Current Address <span className="text-red-500">*</span>
          </h3>
          <input
            type="text"
            name="currentAddressLine1"
            placeholder="Address Line 1"
            value={currentAddress.currentAddressLine1}
            onChange={handleChangeCurrentAddress}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
          />
          <input
            type="text"
            name="currentAddressLine2"
            placeholder="Address Line 2"
            value={currentAddress.currentAddressLine2}
            onChange={handleChangeCurrentAddress}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="currentCountry"
              placeholder="Country"
              value={currentAddress.currentCountry}
              onChange={handleChangeCurrentAddress}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              type="text"
              name="currentState"
              placeholder="State"
              value={currentAddress.currentState}
              onChange={handleChangeCurrentAddress}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="currentCity"
              placeholder="City"
              value={currentAddress.currentCity}
              onChange={handleChangeCurrentAddress}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              type="number"
              name="currentPincode"
              placeholder="Pincode"
              value={currentAddress.currentPincode}
              onChange={handleChangeCurrentAddress}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <select
            name="houseType"
            value={currentAddress.houseType}
            onChange={handleChangeCurrentAddress}
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
          >
            <option value="">House Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
          <div>
            <label
              htmlFor="stayingSince"
              className="pl-2 text-gray-700 pt-1 text-center"
            >
              Living Since
            </label>
            <input
              type="date"
              name="stayingSince"
              placeholder="Staying Since"
              value={currentAddress.stayingSince}
              onChange={handleChangeCurrentAddress}
              onFocus={(e) => (e.target.value = "")}
              className="border border-gray-300 rounded-md p-2 w-full mt-2"
            />
          </div>
          <input
            type="text"
            name="livingSince"
            placeholder="Living in Current City Since"
            value={currentAddress.livingSince}
            onChange={handleChangeCurrentAddress}
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
          />
        </div>
        {!sameAsCurrent && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Permanent Address</h3>
            <input
              type="text"
              name="permanentAddressLine1"
              placeholder="Address Line 1"
              value={permanentAddress.permanentAddressLine1}
              onChange={handleChangePermanentAddress}
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <input
              type="text"
              name="permanentAddressLine2"
              placeholder="Address Line 2"
              value={permanentAddress.permanentAddressLine2}
              onChange={handleChangePermanentAddress}
              className="border border-gray-300 rounded-md p-2 w-full mb-2"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="permanentCountry"
                placeholder="Country"
                value={permanentAddress.permanentCountry}
                onChange={handleChangePermanentAddress}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                type="text"
                name="permanentState"
                placeholder="State"
                value={permanentAddress.permanentState}
                onChange={handleChangePermanentAddress}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="permanentCity"
                placeholder="City"
                value={permanentAddress.permanentCity}
                onChange={handleChangePermanentAddress}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                type="number"
                name="permanentPincode"
                placeholder="Pincode"
                value={permanentAddress.permanentPincode}
                onChange={handleChangePermanentAddress}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          id="same-address"
          checked={sameAsCurrent}
          onChange={handleCheckboxChange}
          className="h-4 w-4 mr-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="same-address" className="text-sm font-medium">
          Permanent address is the same as current address
        </label>
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleEdit}
          className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300 text-black text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default My_address;
