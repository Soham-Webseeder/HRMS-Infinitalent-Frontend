import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

// Using props directly ensures data retention when switching tabs
export default function BiographicalInfo({ formData, setFormData }) {
  const dispatch = useDispatch();
  const IMG_URL = import.meta.env.VITE_APP_IMG_URL;

  // Safety check to prevent crashes if the parent hasn't initialized the object
  if (!formData) return null;

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
      if (file) {
        const base64File = await fileToBase64(file);
        setFormData((prevData) => ({
          ...prevData,
          [name]: base64File,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDocumentChange = async (e, index) => {
    const { name, value, type, files } = e.target;
    const updatedDocuments = [...(formData.documents || [])];

    if (type === "file") {
      const file = files[0];
      if (file) {
        const base64File = await fileToBase64(file);
        updatedDocuments[index][name] = base64File;
      }
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
      documents: [...(prevData.documents || []), { docName: "", docDocument: "" }],
    }));
  };

  const removeDocument = (index) => {
    const updatedDocuments = (formData.documents || []).filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      documents: updatedDocuments,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(increment());
  };

  return (
    <div className="bg-zinc-100">
      <div className="bg-gray-100 rounded-lg pl-5 pr-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 pt-4">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="maritalStatus"
                  value={formData.maritalStatus || "Single"}
                  required
                  onChange={handleInputChange}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">Religion</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="religion"
                  type="text"
                  value={formData.religion || ""}
                  onChange={handleInputChange}
                  placeholder="Religion"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">Citizenship</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="citizenship"
                  type="text"
                  value={formData.citizenship || ""}
                  onChange={handleInputChange}
                  placeholder="Citizenship"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">Photograph</label>
                {formData.photograph && (
                  <img src={getFilePreview(formData.photograph)} alt="Preview" className="w-20 h-20 mb-2 object-cover rounded border" />
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="photograph"
                  type="file"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">Resume</label>
                {formData.resume && (
                  <a href={getFilePreview(formData.resume)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View Current Resume</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="resume"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="gender"
                  value={formData.gender || ""}
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
                <label className="block text-zinc-700 text-sm font-medium mb-2">Aadhar Card</label>
                {formData.aadharCard && (
                  <a href={getFilePreview(formData.aadharCard)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View Aadhar Card</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="aadharCard"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">PAN Card</label>
                {formData.panCard && (
                  <a href={getFilePreview(formData.panCard)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View PAN Card</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="panCard"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">SSC Certificate</label>
                {formData.SSC && (
                  <a href={getFilePreview(formData.SSC)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View SSC Certificate</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="SSC"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="mb-4">
                <label className="block text-zinc-700 text-sm font-medium mb-2">HSC Certificate</label>
                {formData.HSC && (
                  <a href={getFilePreview(formData.HSC)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-1">View HSC Certificate</a>
                )}
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                  name="HSC"
                  type="file"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pb-4">
            <h3 className="text-md font-semibold text-zinc-800 mb-4">Additional Documents</h3>
            {(formData.documents || [{ docName: "", docDocument: "" }]).map((document, index) => (
              <div key={index} className="mb-4 p-3 border rounded bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-700 text-sm font-medium mb-2">Document Name</label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                      name="docName"
                      type="text"
                      value={document.docName || ""}
                      onChange={(e) => handleDocumentChange(e, index)}
                      placeholder="Enter document name"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 text-sm font-medium mb-2">Document File</label>
                    {document.docDocument && (
                      <a href={getFilePreview(document.docDocument)} target="_blank" rel="noreferrer" className="text-blue-500 text-xs underline block mb-2">View Existing File</a>
                    )}
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 focus:outline-none"
                      name="docDocument"
                      type="file"
                      onChange={(e) => handleDocumentChange(e, index)}
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                </div>
                {formData.documents?.length > 1 && (
                  <button type="button" className="text-red-500 text-sm mt-2" onClick={() => removeDocument(index)}>
                    Remove Document
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="text-blue-500 text-sm mt-2 font-medium" onClick={addDocument}>
              + Add Another Document
            </button>
          </div>

          <div className="flex justify-between mt-8 pb-6">
            <button
              onClick={() => dispatch(decrement())}
              className="border-black border px-5 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              type="button"
            >
              Previous
            </button>
            <button
              type="submit"
              className="border-black border px-8 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}