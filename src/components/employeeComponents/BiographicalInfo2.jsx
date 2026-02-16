import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

export default function BiographicalInfo({ formData: propData, setFormData: setPropData }) {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);
  const IMG_URL = import.meta.env.VITE_APP_IMG_URL;

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    maritalStatus: "Single",
    religion: "",
    citizenship: "",
    gender: "",
    photograph: "",
    resume: "",
    aadharCard: "",
    panCard: "",
    SSC: "",
    HSC: "",
    documents: [{
      docName: "",
      docDocument: ""
    }],
  });

  // Sync propData (fetched from API) with local state
  useEffect(() => {
    if (propData && Object.keys(propData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...propData,
        documents: propData.documents?.length > 0 
          ? propData.documents 
          : [{ docName: "", docDocument: "" }]
      }));
    }
  }, [propData]);

  // Helper to determine the source of the file preview (Base64 vs Server URL)
  const getFilePreview = (path) => {
    if (!path) return null;
    if (path.startsWith("data:") || path.startsWith("blob:")) return path;
    return `${IMG_URL}/${path}`;
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const base64File = await fileToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: base64File,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData && !propData) { // Only load from storage if no propData exists
      setFormData(JSON.parse(savedFormData));
    }
  }, [propData]);

  useEffect(() => {
    const {
      photograph,
      resume,
      aadharCard,
      panCard,
      SSC,
      HSC,
      ...nonFileData
    } = formData;
    localStorage.setItem("formData", JSON.stringify(nonFileData));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof setPropData === 'function') {
      setPropData(formData); // This updates the state in AddEmployee2.jsx
    }
    localStorage.setItem("formData", JSON.stringify(formData));
    dispatch(increment());
  };

  const handleDocumentChange = async (e, index) => {
    const { name, value, type, files } = e.target;
    const updatedDocuments = Array.isArray(formData.documents) ? [...formData.documents] : [];

    if (type === "file") {
      const file = files[0];
      const base64File = await fileToBase64(file);
      updatedDocuments[index][name] = base64File;
    } else {
      updatedDocuments[index][name] = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      documents: updatedDocuments,
    }));
  };

  const addDocument = () => {
    setFormData((prevData) => ({
      ...prevData,
      documents: Array.isArray(prevData.documents)
        ? [...prevData.documents, { docName: "", docDocument: "" }]
        : [{ docName: "", docDocument: "" }],
    }));
  };

  const removeDocument = (index) => {
    const updatedDocuments = Array.isArray(formData.documents)
      ? formData.documents.filter((_, i) => i !== index)
      : [];

    setFormData((prevData) => ({
      ...prevData,
      documents: updatedDocuments,
    }));
  };

  return (
    <div className="bg-zinc-100">
      <div className="bg-gray-100  rounded-lg pl-5 pr-5 ">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="dateOfBirth">
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
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="maritalStatus">
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
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="religion">
                  Religion
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="religion"
                  name="religion"
                  type="text"
                  value={formData.religion}
                  onChange={handleInputChange}
                  placeholder="Religion"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="citizenship">
                  Citizenship
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="citizenship"
                  name="citizenship"
                  type="text"
                  value={formData.citizenship}
                  onChange={handleInputChange}
                  placeholder="Citizenship"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="photograph">
                  Photograph
                </label>
                {formData.photograph && (
                   <img src={getFilePreview(formData.photograph)} alt="Preview" className="w-20 h-20 mb-2 object-cover rounded" />
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="photograph"
                  name="photograph"
                  type="file"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="resume">
                  Resume
                </label>
                {formData.resume && (
                  <a href={getFilePreview(formData.resume)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View Current Resume</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="resume"
                  name="resume"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="gender">
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
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="aadharCard">
                  Aadhar Card
                </label>
                {formData.aadharCard && (
                  <a href={getFilePreview(formData.aadharCard)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View Aadhar Card</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="aadharCard"
                  name="aadharCard"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="panCard">
                  PAN Card
                </label>
                {formData.panCard && (
                  <a href={getFilePreview(formData.panCard)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View PAN Card</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="panCard"
                  name="panCard"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="SSC">
                  SSC Certificate
                </label>
                {formData.SSC && (
                  <a href={getFilePreview(formData.SSC)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View SSC Certificate</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="SSC"
                  name="SSC"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2" htmlFor="HSC">
                  HSC Certificate
                </label>
                {formData.HSC && (
                  <a href={getFilePreview(formData.HSC)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View HSC Certificate</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="HSC"
                  name="HSC"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>
          <div>
            {formData?.documents?.map((document, index) => (
              <div key={index} className="mb-4 p-3 border rounded bg-white">
                <div>
                  <label className="block text-zinc-700 text-sm font-medium mb-2">
                    Document Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="docName"
                    type="text"
                    value={document.docName}
                    onChange={(e) => handleDocumentChange(e, index)}
                    placeholder="Enter document name"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 text-sm font-medium mt-4 mb-2">
                    Document File
                  </label>
                  {document.docDocument && (
                    <a href={getFilePreview(document.docDocument)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-2">View Existing File</a>
                  )}
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="docDocument"
                    type="file"
                    onChange={(e) => handleDocumentChange(e, index)}
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                {formData.documents.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 text-sm mt-2"
                    onClick={() => removeDocument(index)}
                  >
                    Remove Document
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="text-blue-500 text-sm mt-4"
              onClick={addDocument}
            >
              Add Document
            </button>
          </div>

          <div className="flex justify-between mt-8  ">
            <button
              onClick={() => dispatch(decrement())}
              className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
              type="button"
            >
              Previous
            </button>
            <button
              type="submit"
              className="border-black mb-4 border px-5 py-1 bg-blue-600  text-white rounded-full hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-end gap-2"
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}