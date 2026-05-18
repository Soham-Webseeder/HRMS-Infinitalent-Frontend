import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "N/A";
  }
};

export default function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [updatedDate, setUpdatedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch draft letters from the API
  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/getDrafts`
        );
        setDrafts(response.data.data); // Assuming the API response has 'data' containing the drafts
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching drafts");
        setIsLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  const handleDeleteDraft = async (draftId) => {
    if (window.confirm("Are you sure you want to delete this draft?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/deleteDraft/${draftId}`
        );
        // Update the state to remove the deleted draft
        setDrafts((prevDrafts) =>
          prevDrafts.filter((draft) => draft._id !== draftId)
        );
        toast.success("Draft deleted successfully !");
      } catch (error) {
        toast.error("Error deleting draft:");
        setError("Error deleting draft");
      }
    }
  };

  // Filter letters based on search term
  const filteredLetters = drafts.filter((letter) =>
    letter.letterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };

  if (isLoading) {
    return <div className="p-6">Loading drafts...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col p-6 space-y-2 rounded-lg shadow  bg-gray-100 min-h-[100vh]">
      <div className="flex flex-col  gap-4 border-b border-gray-300 py-2">
        <div className="text-2xl font-medium">Drafts</div>
        <div>
          <p className="font-light text-gray-600">
            <span
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            >
              Home{" "}
            </span>
            <Link to="/app/letter">Letter</Link> |{" "}
            <span className="cursor-pointer">Drafts</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Letter Name..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch
            className="absolute right-3 top-2.5 text-gray-500"
            size={20}
          />
        </div>
        <div className="relative mb-2 md:mb-0">
          <label className="mr-2 text-sm">Show:</label>
          <select
            onChange={handlePerPageChange}
            value={perPage}
            className="border rounded-full py-1 px-2 text-sm"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto w-full">
          <div className="relative">
            <div className="overflow-y-auto max-h-[calc(100vh-160px)]">
              <table className="w-full border-collapse shadow-md rounded-lg">
                <thead className="border-b sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">
                      Letter Name
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">
                      Created Date
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">
                      Updated Date
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredLetters.length > 0 ? (
                    filteredLetters.map((letter, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2 text-gray-800">
                          {letter.letterName}
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {formatDate(letter.createdAt)}
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {formatDate(letter.updatedAt)}
                        </td>

                        <td className="px-4 py-2 text-gray-800">
                          <Link
                            to={`/letter/edit-draft/${letter._id}`}
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <AiOutlineEdit size={16} /> {/* Edit icon */}
                            Edit
                          </Link>
                          <button
                            className="text-red-600 hover:underline flex items-center gap-1"
                            onClick={() => handleDeleteDraft(letter._id)}
                          >
                            <AiOutlineDelete size={16} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-2 text-gray-800 text-center"
                      >
                        No letters found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
