import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export const Certifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [certificationTitle, setCertificationTitle] = useState("");
  const [certificationType, setCertificationType] = useState("graduation");
  const [certificateFile, setCertificateFile] = useState(null);
  const [certifications, setCertifications] = useState([]);

  const handleSave = () => {
    console.log("Certification Title:", certificationTitle);
    console.log("Certification Type:", certificationType);
    console.log("Certificate File:", certificateFile);
    setCertifications([
      ...certifications,
      {
        title: certificationTitle,
        type: certificationType,
        file: certificateFile,
      },
    ]);

    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setCertificationTitle("");
    setCertificationType("graduation");
    setCertificateFile(null);
  };

  return (
    <div>
      <div className="flex flex-row justify-around border-b border-gray-600 p-2">
        <div>Type</div>
        <div>Id</div>
        <div>uploadedby</div>
        <div>varification</div>
        <div>action</div>
      </div>
      <div className="flex flex-col">
        {certifications.map((certification, index) => (
          <div key={index} className="flex flex-row justify-around p-2">
            <div>{certification.type}</div>
            <div>{index}</div>
            <div>Uploaded By</div>
            <div>Verification</div>
            <div>Action</div>
          </div>
        ))}
      </div>

      <div className="flex items-center pl-2">
        <button
          onClick={() => setIsOpen(true)}
          className=" font-bold cursor-pointer p-2 text-blue-500 flex flex-row items-center"
        >
          <AiFillPlusCircle size={30} /> <div>ADD</div>
        </button>
      </div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Add Certification
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="certificationTitle"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Certification Title:
                      </label>
                      <input
                        type="text"
                        id="certificationTitle"
                        value={certificationTitle}
                        onChange={(e) => setCertificationTitle(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="certificationType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Certification Type:
                      </label>
                      <select
                        id="certificationType"
                        value={certificationType}
                        onChange={(e) => setCertificationType(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      >
                        <option value="graduation">Graduation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="certificateFile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Certificate:
                      </label>
                      <input
                        type="file"
                        id="certificateFile"
                        onChange={(e) => setCertificateFile(e.target.files[0])}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
