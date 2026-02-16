import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./ToggleSwitch.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function Templates() {
  const user = useSelector((state) => state.user);
  const userRole = user.userRole;

  console.log(userRole, "iiiii");
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/getAllTemplates`
        );
        // Check if isEnabled exists, otherwise default to true
        const fetchedTemplates = response.data.map((template) => ({
          ...template,
          isEnabled: template.isEnabled ?? true, // Force default to true if undefined
        }));
        setTemplates(fetchedTemplates);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setError("Error fetching templates");
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        // Send a request to delete the template
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/letter/deleteTemplate/${templateId}`
        );

        // Remove the deleted template from the state
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template._id !== templateId)
        );
        toast.success("Template deleted successfully !");
      } catch (error) {
        toast.error("Error deleting template:", error);
      }
    }
  };

  const filteredTemplates = templates.filter((template) =>
    template.templateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewTemplate = (templateId) => {
    navigate(`/letter/template/view/${templateId}`);
  };

  const handleToggle = async (templateId, currentStatus) => {
    try {
      // Toggle the isEnabled status
      const newStatus = !currentStatus;

      // Update the status in the backend
      await axios.put(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/letter/updateTemplateStatus/${templateId}`,
        { isEnabled: newStatus }
      );

      // Update the local state after successful response
      setTemplates((prevTemplates) =>
        prevTemplates.map((template) =>
          template._id === templateId
            ? { ...template, isEnabled: newStatus }
            : template
        )
      );
    } catch (error) {
      console.error("Error updating template status:", error);
    }
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col p-6 space-y-2 rounded-lg shadow bg-gray-100 min-h-[100vh]">
      <header className="flex flex-col gap-4 border-b border-gray-300 py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold">Templates</h1>
            <nav className="text-sm text-gray-500 mt-1">
              <Link to="/" className="hover:text-slate-800">Home</Link>
              <span className="mx-1">|</span>
              <Link to="/app/letter" className="hover:text-slate-800">Letter</Link>
              <span className="mx-1">|</span>
              <span className="text-gray-500 cursor-default">Templates</span>
            </nav>
          </div>
          <button
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-600 mt-2 md:mt-0 transition-all"
            onClick={() => navigate("createTemplate")}
          >
            Create Template
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Template Name..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch
            className="absolute right-3 top-2.5 text-gray-500"
            size={20}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse shadow-md rounded-lg">
          <thead className="border-b sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Template Name
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Category Name
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Enabled
              </th>
              <th className="px-4 py-2 text-left text-gray-800 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  Loading templates...
                </td>
              </tr>
            ) : (
              filteredTemplates.map((template) => (
                <tr
                  key={template.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-gray-800">
                    {template.templateName}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {template.category}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={template.isEnabled} 
                        onChange={() =>
                          handleToggle(template._id, template.isEnabled)
                        }
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    <button
                      className="text-blue-600 hover:underline flex items-center gap-1"
                      onClick={() => handleViewTemplate(template._id)}
                    >
                      <AiOutlineEye size={16} />
                      View
                    </button>
                    {userRole === "admin" ? (
                      <button
                        className="text-red-600 hover:underline flex items-center gap-1"
                        onClick={() => handleDeleteTemplate(template._id)}
                      >
                        <AiOutlineDelete size={16} />
                        Delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
