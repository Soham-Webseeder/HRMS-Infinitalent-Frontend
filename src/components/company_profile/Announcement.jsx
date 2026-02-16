import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [announcement, setAnnouncement] = useState({ para: "" });
  const [liveAnnouncement, setLiveAnnouncement] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const id = localStorage.getItem("companyId");

  // Fetch announcements from backend on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Function to fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllAnnouncement/${id}`
      );
      setAnnouncements(response.data.response);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  // Function to handle textarea change
  const handleTextareaChange = (e) => {
    const para = e.target.value;
    setAnnouncement({ ...announcement, para });
    setCharCount(para.length);
  };

  // Function to handle form submission (create or update announcement)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing announcement
        const response = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/company/updateAnnouncement/${announcement._id}`,
          { para: announcement.para }
        );
        if (response.data && response.data.success) {
          fetchAnnouncements();
          setLiveAnnouncement(response.data.response.para);
          setAnnouncement({ para: "" });
          setCharCount(0);
          setIsEditing(false);
          setShowForm(false);
        } else {
          console.error("Error updating announcement:", response.data.message);
        }
      } else {
        // Create new announcement
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/company/createAnnouncement/${id}`,
          { para: announcement.para }
        );
        if (response.data && response.data.success) {
          setLiveAnnouncement(response.data.response.para);
          setAnnouncement({ para: "" });
          setCharCount(0);
          fetchAnnouncements();
          setShowForm(false);
        } else {
          console.error("Error creating announcement:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  // Function to toggle form visibility and edit mode
  const handleToggleForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setAnnouncement({ para: "" });
    setCharCount(0);
  };

  // Function to handle edit button click
  const handleEdit = (ann) => {
    setShowForm(true);
    setIsEditing(true);
    setAnnouncement({ ...ann });
    setCharCount(ann.para.length);
  };

  // Function to handle delete button click
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this announcement?`
    );
    try {
      if (confirmDelete) {
        const response = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/company/deleteAnnouncement/${id}`
        );
        if (response.data && response.data.success) {
          fetchAnnouncements();
          setLiveAnnouncement("");
        } else {
          console.error("Error deleting announcement:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="w-full px-4 flex justify-center mb-4">
      <div className="container 2xl:w-[80%]">
        <div className="flex items-center justify-center">
          <div className="w-full bg-white p-2 rounded-lg shadow-lg">
            <div className="flex flex-col justify-between items-center py-3 bg-white rounded-t-sm w-full">
              <div className="w-full">
                <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2">Announcements</h1>
              </div>
              {!showForm && (
                <div className="w-full flex justify-end">
                  <button
                    onClick={handleToggleForm}
                    className="border-black border px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <AiOutlinePlusCircle size={25} className="font-bold" />{" "}
                    Post an Announcement
                  </button>
                </div>
              )}
            </div>

            {showForm && (
              <form onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="announcementTextarea" className="block font-bold">
                    Message
                  </label>
                  <textarea
                    id="announcementTextarea"
                    value={announcement.para}
                    onChange={handleTextareaChange}
                    rows={4}
                    placeholder="Enter Announcement"
                    className="w-full p-2 border rounded-md"
                  />
                  <div className="text-xs text-gray-500">
                    {charCount}/100 Characters
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded mt-4 mr-2"
                    onClick={handleToggleForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded mt-4"
                  >
                    {isEditing ? "Update" : "Post"}
                  </button>
                </div>
              </form>
            )}

            {!showForm && (
              <div className="w-full">
                <table className="table-auto min-w-full divide-y divide-gray-200 border-collapse border border-slate-400 break-words">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
                      >
                        Announcement
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 w-10"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {announcements.map((ann) => (
                      <tr key={ann._id}>
                        <td className="px-6 py-4 whitespace-normal break-words border border-slate-300">
                          <div className="text-sm text-gray-900">{ann.para}</div>
                        </td>
                        <td className="whitespace-nowrap text-left text-sm font-medium pl-3">
                          <div className="flex gap-2">
                            <button
                              className="text-indigo-500 hover:text-indigo-900"
                              onClick={() => handleEdit(ann)}
                            >
                              <FaEdit size={20} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-900"
                              onClick={() => handleDelete(ann._id)}
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
