import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

const SentLetters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentLettersData, setSentLettersData] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch sent letters and employees when the component mounts
  useEffect(() => {
    const fetchSentLetters = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/getAllLetters`
        );
        if (response.data?.data?.letters) {
          // Filter out only letters with status "sent"
          const sentLetters = response.data.data.letters.filter(
            (letter) => letter.status === "sent"
          );
          setSentLettersData(sentLetters);
        }
      } catch (error) {
        console.error("Error fetching sent letters:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`);
        if (Array.isArray(response.data)) {
          const formattedEmployees = response.data.map((emp) => ({
            id: emp._id,
            name: `${emp.firstName} ${emp.lastName}`,
          }));
          setEmployees(formattedEmployees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      }
    };

    fetchSentLetters();
    fetchEmployees();
  }, []);

  const handleDelete = async (letterId) => {
    if (!window.confirm("Are you sure you want to delete this letter?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/letter/deleteLetter/${letterId}`);
      setSentLettersData((prev) => prev.filter((letter) => letter._id !== letterId));
    } catch (error) {
      console.error("Failed to delete letter:", error);
    }
  };

  // Filter letters based on search term
  const filteredLetters = sentLettersData.filter((letter) =>
    letter.letterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex items-center justify-between pr-10 pl-4 pt-4">
        <h1 className="text-2xl font-bold">Sent Letters</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Letter Name..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch
            className="absolute right-3 top-2.5 text-gray-500"
            size={20}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Link to="/">Home</Link> | <Link to="/app/letter">Letters</Link> | {" "}
        <Link to="/letter/sent-letter">Sent Letters</Link>
        <div className="overflow-x-auto w-full">
          <br></br>
          <div className="relative">
            <div className="overflow-y-auto max-h-[calc(100vh-160px)]">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-[#eef2ff] border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">Letter Name</th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">Category</th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">Recipients</th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">Signatories</th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">Sent Date</th>
                    <th className="px-4 py-2 text-left text-gray-800 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLetters.length > 0 ? (
                    filteredLetters.map((letter, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-800">{letter.letterName}</td>
                        <td className="px-4 py-2 text-gray-800">{letter.letterContent?.category || "N/A"}</td>
                        <td className="px-4 py-2 text-gray-800">
                          {letter.audience?.includedEmployees?.map((emp) => (
                            <div key={emp._id}>{`${emp.firstName} ${emp.lastName}`}</div>
                          )) || "No recipients"}
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {letter.signatories?.join(", ") || "No signatories"}
                        </td>
                        <td className="px-4 py-2 text-gray-800">
                          {new Date(letter.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-gray-800 space-x-2">
                          <button
                            onClick={() => handleDelete(letter._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                          {letter.pdfUrl && (
                            <a
                              href={letter.pdfUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              Download
                            </a>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-gray-800 text-center">
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
};

export default SentLetters;
