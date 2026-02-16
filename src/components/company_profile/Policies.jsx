import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import ReactQuill from "react-quill-new"; // Import ReactQuill
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

export const Policies = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // Set initial open index to null
  const [itemId, setItemId] = useState("");

  // Function to handle adding a new policy or updating an existing one
  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      let response;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (file) {
        formData.append("image", file);
      }
      if (itemId) {
        formData.append("_method", "PATCH");
        response = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/company/updatePolicy/${itemId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/company/createPolicy`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      const updatedPolicy = response.data.data;
      if (itemId) {
        setPolicies((prevPolicies) =>
          prevPolicies.map((policy) =>
            policy._id === updatedPolicy._id ? updatedPolicy : policy
          )
        );
      } else {
        setPolicies((prevPolicies) => [updatedPolicy, ...prevPolicies]);
      }

      setShowForm(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setItemId("");
    } catch (error) {
      console.error("Error saving Policy:", error);
    }
  };

  const handlePhotoRemoveClick = async (itemId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/company/updatePolicy/${itemId}`,
        {
          image: null,
        }
      );
      // Update state or re-fetch data to reflect the removal
      setPolicy((prevPolicy) => ({ ...prevPolicy, image: null }));
    } catch (error) {
      console.error("Error updating policy:", error);
    }
  };

  // Function to handle deleting a policy
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/company/deletePolicy/${id}`
        );
        setPolicies((prevPolicies) =>
          prevPolicies.filter((policy) => policy._id !== id)
        );
        console.log("Policy Deleted Successfully");
      } catch (error) {
        console.error("Error deleting Policy:", error);
      }
    }
  };

  // Function to handle opening/closing policy details
  const handleOpen = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Function to handle edit click
  const handleEditClick = (id) => {
    const policyToEdit = policies.find((policy) => policy._id === id);
    setTitle(policyToEdit.title);
    setDescription(policyToEdit.description);
    setFile(null);
    setItemId(id);
    setShowForm(true);
  };

  // Function to handle canceling form submission
  const handleCancelClick = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setShowForm(false);
    setItemId("");
  };

  // Function to handle adding new policy click
  const handleAddClick = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setShowForm(true);
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to fetch policies from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/getAllPolicies`
        );
        setPolicies(response.data.data);
      } catch (error) {
        console.error("Error fetching Policies:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" w-full justify-center p-4 ">
      <div className="w-full mx-auto 2xl:w-[80%] ">
        <div className=" w-full">
          <div className="flex justify-start w-full">
            <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full">
              Company Policies
            </h1>
          </div>
          {!showForm && (
            <div className="flex justify-end w-full">
              <button
                onClick={handleAddClick}
                className="border-black border px-3  py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-4 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2 slef-right"
              >
                {/* <AiFillPlusCircle className="text-lg font-bold" /> */}
                <span>Create Policy</span>
              </button>
            </div>
          )}
        </div>
        {showForm ? (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-medium mb-4">
              {itemId ? "Edit Policy" : "Add Policy"}
            </h2>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="descriptionInput"
                className="block font-medium mb-1"
              >
                Description
              </label>
              <ReactQuill
                value={description}
                onChange={(value) => setDescription(value)}
                theme="snow"
                placeholder="Enter description"
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fileInput" className="block font-medium mb-1">
                Upload File
              </label>
              <input
                id="fileInput"
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelClick}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {itemId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4">
            {policies.map((policy, index) => (
              <div key={policy._id} className="mb-4">
                <div
                  className="cursor-pointer flex justify-between items-center bg-gray-100 p-3 rounded-md"
                  onClick={() => handleOpen(index)}
                >
                  <span className="text-lg font-medium">{policy.title}</span>
                  <IoMdArrowDropdown
                    size={24}
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <div className="mt-2 bg-gray-50 p-4 rounded-md">
                    <p
                      className="mb-2"
                      dangerouslySetInnerHTML={{ __html: policy.description }}
                    />
                    {policy.image && (
                      <div>
                        <img
                          src={policy.image}
                          alt=""
                          className="mb-2"
                          style={{ maxHeight: "200px", width: "auto" }}
                        />
                        <div
                          onClick={() => handlePhotoRemoveClick(policy._id)}
                          className="text-red-500 cursor-pointer border p-1 w-20 flex items-center justify-center border-red-800 rounded-md shadow-md"
                        >
                          remove
                        </div>
                      </div>
                    )}

                    <div className="flex w-full justify-end">
                      <button
                        onClick={() => handleEditClick(policy._id)}
                        className="text-indigo-500 hover:text-indigo-900 pr-2 border-gray-400 border-r  mr-2 flex items-center"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(policy._id)}
                        className="text-red-500 hover:text-red-900 flex items-center"
                      >
                        <AiFillDelete size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Policies;
