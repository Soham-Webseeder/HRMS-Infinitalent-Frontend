import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const ResignationPolicy = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddClick = () => {
    setTitle('');
    setDescription('');
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = () => {
    if (policy) {
      setTitle(policy.title);
      setDescription(policy.description.replace(' resignation-policy', ''));
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("title", title);
    const updatedDescription = description;
    formData.append("description", updatedDescription);
    if (document) {
      formData.append("document", document);
    }

    try {
      if (isEditing && policy) {
        await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/company/updatePolicy/${policy._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/company/createPolicy`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      setShowForm(false);
      fetchPolicies();
    } catch (error) {
      console.error("Error saving policy:", error);
      alert("Failed to save policy. Please try again.");
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/company/getAllPolicies`);
      const hrPolicy = response.data.data.find((policy) => policy.description.trim() === 'resignation-policy');
      if (hrPolicy) {
        setPolicy(hrPolicy);
      } else {
        setError('Resignation Policy not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching policies');
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
          <h1 className="text-2xl font-medium">
            Resignation Policy
          </h1>
          <div className="flex text-sm w-fit text-gray-500 mt-4 gap-1">
            <Link to="/" className="cursor-pointer hover:text-slate-800">
              Home
            </Link>
            <span>|</span>
            <Link to="/app/companyProfile" className="cursor-pointer hover:text-slate-800">
              Company Profile
            </Link>
            <span>|</span>
            <span className="cursor-default text-gray-500 hover:text-slate-800">
              Resignation Policy
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 py-4">
          <button
            onClick={policy ? handleEditClick : handleAddClick}
            className="border-black  px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 sm:mr-4  max-sm:text-sm md:text-base  gap-2"
          >
            <span>{policy ? 'Edit Policy' : 'Add Policy'}</span>
          </button>
        </div>
      </div>
      {showForm ? (
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-medium mb-4">{isEditing ? 'Edit Policy' : 'Add Policy'}</h2>
          <div className="mb-4">
            <label htmlFor="titleInput" className="block font-medium mb-1">
              Title
            </label>
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
            <label htmlFor="documentInput" className="block font-medium mb-1">
              Document Upload
            </label>
            <input
              id="documentInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setDocument(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 p-4 md:p-6 shadow-md rounded-lg" style={{ minHeight: '450px' }}>
          {loading ? (
            <p className="text-sm md:text-base">Loading policy...</p>
          ) : error ? (
            <p className="text-sm md:text-base text-red-500">{error}</p>
          ) : policy ? (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto h-60">
              <h2 className="text-lg md:text-xl font-semibold">Title: {policy.title}</h2>
              {policy.document && (
                <div className="mt-4">
                  <a
                    href={policy.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm md:text-base">No policy available</p>
          )}
        </div>
      )}
    </div>
  );

}
export default ResignationPolicy;
