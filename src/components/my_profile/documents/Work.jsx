import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export const Work = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleSave = () => {
    console.log("Document Title:", documentTitle);
    console.log("Document Description:", documentDescription);
    console.log("Document File:", documentFile);
    setDocuments([
      ...documents,
      {
        title: documentTitle,
        description: documentDescription,
        file: documentFile,
      },
    ]);
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setDocumentTitle("");
    setDocumentDescription("");
    setDocumentFile(null);
  };

  return (
    <div>
      <div className="flex flex-row justify-around border-b border-gray-600 p-2">
        <div>Title</div>
        <div>Description</div>
        <div>File</div>
        <div>Action</div>
      </div>
      <div className="flex flex-col">
        {documents.map((document, index) => (
          <div key={index} className="flex flex-row justify-around p-2">
            <div>{document.title}</div>
            <div>{document.description}</div>
            <div>{document.file.name}</div>
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
                      Add Document
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="documentTitle"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Document Title:
                      </label>
                      <input
                        type="text"
                        id="documentTitle"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="documentDescription"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Document Description:
                      </label>
                      <input
                        type="text"
                        id="documentDescription"
                        value={documentDescription}
                        onChange={(e) => setDocumentDescription(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="documentFile"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upload Document:
                      </label>
                      <input
                        type="file"
                        id="documentFile"
                        onChange={(e) => setDocumentFile(e.target.files[0])}
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
