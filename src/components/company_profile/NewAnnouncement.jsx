import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const NewAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [announcement, setAnnouncement] = useState({ para: "" });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const id = localStorage.getItem("companyId");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/get-announcements`
      );
      setAnnouncements(response.data.response);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleTextareaChange = (e) => {
    const para = e.target.value;
    setAnnouncement({ ...announcement, para });
    setCharCount(para.length);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/company/updateAnnouncement/${
            announcement._id
          }`,
          { para: announcement.para }
        );
        if (response.data && response.data.success) {
          fetchAnnouncements();
          toast.success("Announcement updated successfully!");
          setAnnouncement({ para: "" });
          setCharCount(0);
          setIsEditing(false);
          setShowForm(false);
        } else {
          console.error("Error updating announcement:", response.data.message);
          toast.error("Error updating announcement");
        }
      } else {
        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/company/createAnnouncement/${id}`,
          { para: announcement.para }
        );
        if (response.data && response.data.success) {
          fetchAnnouncements();
          toast.success("Announcement posted successfully!");
          setAnnouncement({ para: "" });
          setCharCount(0);
          setShowForm(false);
        } else {
          console.error("Error creating announcement:", response.data.message);
          toast.error("Error creating announcement");
        }
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      toast.error("Error posting announcement");
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setAnnouncement({ para: "" });
    setCharCount(0);
  };

  const handleEdit = (ann) => {
    setShowForm(true);
    setIsEditing(true);
    setAnnouncement({ ...ann });
    setCharCount(ann.para.length);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this announcement?`
    );
    try {
      if (confirmDelete) {
        const response = await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/company/deleteAnnouncement/${id}`
        );
        if (response.data && response.data.success) {
          fetchAnnouncements();
          toast.success("Announcement deleted successfully!");
        } else {
          console.error("Error deleting announcement:", response.data.message);
          toast.error("Error deleting announcement");
        }
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Error deleting announcement");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Toaster />

      {/* Header with Button and Line */}
      <div className="w-full mb-4 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Announcements</h1>
          <div className="flex text-sm w-fit text-gray-500 mt-4 gap-1">
            <Link
              to="/"
              className="cursor-pointer hover:text-slate-800 transition-colors"
            >
              Home
            </Link>
            <span>|</span>
            <Link
              to="/app/companyProfile"
              className="cursor-pointer hover:text-slate-800 transition-colors"
            >
              Company Profile
            </Link>
            <span>|</span>
            <Link
              to="/annoucements"
              className="cursor-pointer hover:text-slate-800 transition-colors"
            >
              Announcements
            </Link>
          </div>
        </div>
        <button
          onClick={handleToggleForm}
          className="border-blue-600 border px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2"
        >
          Post an Announcement
        </button>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />

      {showForm && (
        <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white px-4 py-6 rounded-lg shadow-lg md:max-w-lg sm:w-full w-full mx-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                {isEditing ? "Edit Announcement" : "Post New Announcement"}
              </h3>
              <button
                onClick={handleToggleForm}
                className="text-gray-500 hover:text-gray-600"
              >
                <RxCross2 />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="w-full mt-4">
              <label
                htmlFor="announcementTextarea"
                className="block font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="announcementTextarea"
                value={announcement.para}
                onChange={handleTextareaChange}
                rows={4}
                placeholder="Enter Announcement"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={250}
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                {charCount}/250 Characters
              </div>
              <div className="flex justify-end mt-4 gap-3">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded"
                  onClick={handleToggleForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
                >
                  {isEditing ? "Update" : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="w-full mt-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-gray-600 text-left sm:text-lg border-b-2 border-gray-300">
                    <th className="py-2 px-4 font-medium whitespace-nowrap border-b-2 border-gray-300">
                      Announcement
                    </th>
                    <th className="py-2 px-4 font-medium whitespace-nowrap text-right border-b-2 border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {announcements.map((ann) => (
                    <tr
                      key={ann._id}
                      className="text-gray-600 text-left sm:text-lg"
                    >
                      <td className="py-2 px-4 max-w-sm whitespace-normal break-words text-lg leading-snug">
                        {ann.para}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleEdit(ann)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(ann._id)}
                          className="text-gray-500 hover:text-gray-900 ml-2"
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
