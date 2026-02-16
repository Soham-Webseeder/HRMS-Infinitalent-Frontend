import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AttendanceBonusPolicy = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [document, setDocument] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the base URL for local server images/files
  const IMG_URL = import.meta.env.VITE_APP_IMG_URL;

  const handleAddClick = () => {
    setTitle("");
    setDocument(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = () => {
    if (policy) {
      setTitle(policy.title);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const handleSaveClick = async () => {
    if (!title || (!document && !isEditing)) {
      alert("Please provide a title and a document.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    // Hardcode category to match the specific section
    formData.append("category", "Bonus");

    if (document) {
      formData.append("document", document);
    }

    try {
      if (isEditing && policy) {
        await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/company/updatePolicy/${policy._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/company/createPolicy`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      setShowForm(false);
      fetchPolicies();
    } catch (error) {
      console.error("Error saving policy:", error);
      alert("Failed to save policy.");
    }
  };

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      // API call now includes the category filter
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllPolicies?category=Bonus`
      );
      
      // Since the API already filters, we just take the first result
      const bonusPolicy = response.data.data[0];

      if (bonusPolicy) {
        setPolicy(bonusPolicy);
        setError(null);
      } else {
        setPolicy(null);
        setError("Attendance Bonus Policy not found");
      }
    } catch (err) {
      setError("Error fetching policies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleCancelClick = () => {
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Attendance Bonus Policy</h1>
          <div className="flex text-sm w-fit text-gray-500 mt-4 gap-1">
            <Link to="/" className="cursor-pointer hover:text-slate-800">Home</Link>
            <span>|</span>
            <Link to="/app/companyProfile" className="cursor-pointer hover:text-slate-800">Company Profile</Link>
            <span>|</span>
            <span className="cursor-default text-gray-500">Attendance Bonus Policy</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 py-4">
          <button
            onClick={policy ? handleEditClick : handleAddClick}
            className="px-6 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 max-sm:text-sm md:text-base"
          >
            {policy ? "Edit Policy" : "Add Policy"}
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-medium mb-4">
            {isEditing ? "Edit Policy" : "Add Policy"}
          </h2>
          <div className="mb-4">
            <label htmlFor="titleInput" className="block font-medium mb-1">Title</label>
            <input
              id="titleInput"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="documentInput" className="block font-medium mb-1">Document Upload (PDF)</label>
            <input
              id="documentInput"
              type="file"
              accept="application/pdf"
              onChange={(e) => setDocument(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm">Cancel</button>
            <button onClick={handleSaveClick} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Save</button>
          </div>
        </div>
      ) : (
        <div className="mt-6 p-4 md:p-6 shadow-md rounded-lg" style={{ minHeight: "450px" }}>
          {loading ? (
            <p>Loading policy...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : policy ? (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto h-60">
              <h2 className="text-lg md:text-xl font-semibold">Title: {policy.title}</h2>
              {policy.document && (
                <div className="mt-4">
                  <a
                    // Combine server URL with the relative path from the DB
                    href={`${IMG_URL}/${policy.document}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-medium underline"
                  >
                    View Document (PDF)
                  </a>
                </div>
              )}
            </div>
          ) : (
            <p>No policy available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceBonusPolicy;