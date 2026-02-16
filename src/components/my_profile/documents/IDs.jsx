import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export const IDs = () => {
  const [showModal, setShowModal] = useState(false);
  const [photoID, setPhotoID] = useState("");
  const [dob, setDOB] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    console.log("Form data saved:", {
      photoID,
      dob,
      currentAddress,
      permanentAddress,
    });
    closeModal();
  };

  return (
    <div className="p-3 bg-slate-50 border-[.5px] border-gray-400]">
      <div className="text-lg font-medium">Proofs</div>
      <div className="flex border-slate-800 border">
        <div className="w-[25%] flex flex-col ">
          <div className="border border-slate-800">Photo ID</div>
          <div className="border border-slate-800">Date of Birth</div>
          <div className="border border-slate-800">Current Address</div>
          <div className="border border-slate-800">Permanent Address</div>
        </div>
        <div className="w-[75%] flex flex-col">
          <div className="border w-full h-[1.63rem] border-slate-800">
            {photoID}
          </div>
          <div className="border w-full h-[1.63rem] border-slate-800">
            {dob}
          </div>
          <div className="border w-full h-[1.63rem] border-slate-800">
            {currentAddress}
          </div>
          <div className="border w-full h-[1.63rem] border-slate-800">
            {permanentAddress}
          </div>
        </div>
      </div>
      <div className="text-lg font-medium border-b border-gray-600">
        Uploaded Documents
      </div>
      <div className="flex flex-row justify-around border-b border-gray-600">
        <div>Type</div>
        <div>Id</div>
        <div>uploadedby</div>
        <div>varification</div>
        <div>action</div>
      </div>
      <div className="flex items-center">
        <button
          onClick={openModal}
          className=" font-bold cursor-pointer p-2 text-blue-500 flex flex-row items-center"
        >
          <AiFillPlusCircle size={30} /> <div>ADD</div>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 gap-5 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add Document</h2>
            <div>
              <label>
                Select ID Type
                <select name="" id="">
                  <option value="">---</option>
                  <option value="panCard">PAN CARD</option>
                  <option value="aadharCard">Aadhaar Card</option>
                  <option value="passport">Passport</option>
                  <option value="drivingLicence">Driving Licence</option>
                  <option value="voterId">Voter ID</option>
                  <option value="electricityBill">ElectricityBill</option>
                  <option value="phoneBill">Phone Bill</option>
                  <option value="bankPassbook">Bank Passbook</option>
                  <option value="rentalAgreement">Rental Agreement</option>
                </select>
              </label>
            </div>

            <label htmlFor="">
              {" "}
              Photo ID
              <input
                type="file"
                value={photoID}
                onChange={(e) => setPhotoID(e.target.value)}
                placeholder="Photo ID"
                className="border border-gray-400 rounded px-2 py-1 mb-2 w-full"
              />
            </label>
            <input
              type="text"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              placeholder="Date of Birth"
              className="border border-gray-400 rounded px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              placeholder="Current Address"
              className="border border-gray-400 rounded px-2 py-1 mb-2 w-full"
            />
            <input
              type="text"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              placeholder="Permanent Address"
              className="border border-gray-400 rounded px-2 py-1 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
