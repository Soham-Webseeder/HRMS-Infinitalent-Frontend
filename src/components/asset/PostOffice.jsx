import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import logo from "/src/components/print/images/Logo.jpeg";

const PostOffice = () => {
  const [sentLettersData, setSentLettersData] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [letterContentForRecipient, setLetterContentForRecipient] =
    useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch sent letters when the component mounts
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

    fetchSentLetters();
  }, []);

  const handleDelete = async (letterId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this letter?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/letter/deleteLetter/${letterId}`);
      setSentLettersData((prev) => prev.filter((letter) => letter._id !== letterId));
    } catch (error) {
      console.error("Failed to delete letter:", error);
      alert("Something went wrong while deleting.");
    }
  };


  // Open the modal with recipients for a specific letter
  const openModal = (letter) => {
    setSelectedLetter(letter);
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRecipient(null);
    setLetterContentForRecipient("");
  };

  // Fetch letter content for a specific recipient using the letter ID
  const fetchSentLettersForRecipient = async (recipient) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/letter/getSentLetter/${selectedLetter._id
        }`
      );

      // Fetch the letter content
      const letterContent = response.data.data.letterContent.content; // Adjust as per your structure

      // Replace placeholders in the letter content with the recipient's details
      const populatedLetterContent = letterContent
        .replace(/{first_name}/g, recipient.firstName || "Employee") // Replace with recipient's first name
        .replace(/{last_name}/g, recipient.lastName || "") // Replace with recipient's last name
        .replace(/{letter_generation_date}/g, new Date().toLocaleDateString()) // Replace with current date
        .replace(/{emailid}/g, recipient.email || "")
        .replace(/{primary_phone_number}/g, recipient.phone || "")
        .replace(/{businessunit}/g, recipient.businessUnit || "")
        .replace(/{department}/g, recipient.department || "")
        .replace(/{team}/g, recipient.team || "")
        .replace(/{designation}/g, recipient.designation || "")
        .replace(/{reporting_office}/g, recipient.reportingOffice || "")
        .replace(/{date_of_joining}/g, recipient.hireDate || "")
        .replace(
          /{date_of_probation}/g,
          recipient.probationCompletionDate || ""
        )
        .replace(/{total_experience}/g, recipient.totalExperience || "")
        .replace(/{primary_manager}/g, recipient.primaryManager || "")
        .replace(/{employment_type}/g, recipient.employmentType || "")
        .replace(/{employee_profile_image}/g, recipient.profileImage || "")
        .replace(/{company_logo}/g, recipient.logo || "")
        .replace(/{company_registered_name}/g, recipient.registeredName || "")
        .replace(
          /{full_name}/g,
          `${recipient.firstName || ""} ${recipient.lastName || ""}`
        )
        .replace(/{job_type}/g, recipient.jobType || "")
        .replace(/{date_of_birth}/g, recipient.dateOfBirth || "")
        .replace(/{aadhar_number}/g, recipient.aadharNumber || "")
        .replace(/{pan_number}/g, recipient.panNumber || "");

      // Add more replacements as needed based on your placeholders

      // Construct the email HTML
      // Replace with your Base64 logo string
      const emailHTML = `
        <div class="p-6">
          <div class="p-6 border-2 border-gray-300">
            <div class="flex items-start justify-between">
              <div class="pt-0">
                <img src="${logo}" alt="Logo" style="width: 18%; height: auto; margin-bottom: 8px;"/>
              </div>
            </div>
            <div class="mb-4">
              <div>${populatedLetterContent}</div>
            </div><br></br>
            <div class="text-sm text-gray-700 text-bold space-y-3 mb-2 lg:space-y-3">
              <p>
                Reg Office & works: No. 427, 12th main road, 1st Block, 3rd stage,
                Manjunath Nagar, Bengaluru- 560010
              </p>
              <p>
                Corp Office: No.731, 2nd Floor, Channakeshava Nagara 13th Cross, Mico,
                Main Road, Electronic City, Bengaluru- 560100
              </p>
            </div>
          </div>
        </div>
      `;

      setLetterContentForRecipient(emailHTML);
      setSelectedRecipient(recipient);
    } catch (error) {
      console.error("Error fetching letter for recipient:", error);
    }
  };

  // Custom modal styles
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "1300px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "20px",
    },
  };

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold">Post Office</h1>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg mt-4">
        <thead className="bg-[#eef2ff] border-b border-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-gray-800 font-medium">
              Letter Name
            </th>
            <th className="px-4 py-2 text-left text-gray-800 font-medium">
              Category
            </th>
            <th className="px-4 py-2 text-left text-gray-800 font-medium">
              Recipients
            </th>
            <th className="px-4 py-2 text-left text-gray-800 font-medium">
              Sent Date
            </th>
            <th className="px-4 py-2 text-left text-gray-800 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sentLettersData.length > 0 ? (
            sentLettersData.map((letter, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-gray-800">{letter.letterName}</td>
                <td className="px-4 py-2 text-gray-800">
                  {letter.letterContent?.category || "N/A"}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {letter.audience?.includedEmployees?.length} Recipients
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {new Date(letter.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-gray-800 space-x-2">
                  <button
                    onClick={() => openModal(letter)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    View Recipients
                  </button>
                  {letter.pdfUrl && (
                    <a
                      href={letter.pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Download
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(letter._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-gray-800 text-center">
                No sent letters found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal to show recipients and letter content */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex h-full w-full max-w-7xl mx-auto">
          {/* Sidebar for Recipients */}
          <div className="w-1/5 bg-gray-100 p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              Recipients for {selectedLetter?.letterName}
            </h2>
            {selectedLetter?.audience?.includedEmployees?.map((recipient) => (
              <button
                key={recipient._id}
                className={`block w-full text-left px-4 py-2 mb-2 rounded ${selectedRecipient && selectedRecipient._id === recipient._id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200"
                  }`}
                onClick={() => fetchSentLettersForRecipient(recipient)}
              >
                {`${recipient.firstName} ${recipient.lastName}`}
              </button>
            ))}
          </div>

          {/* Letter Content Preview */}
          <div className="w-4/5 bg-white p-6 overflow-hidden">
            {selectedRecipient ? (
              <>
                <h3 className="text-xl font-bold mb-4">
                  Letter Review for{" "}
                  {`${selectedRecipient.firstName} ${selectedRecipient.lastName}`}
                </h3>
                <div
                  className="p-4 border border-gray-300 rounded bg-gray-50 overflow-auto"
                  style={{
                    height: "70vh",
                    maxWidth: "100%",
                    whiteSpace: "normal",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: letterContentForRecipient,
                    }}
                    className="letter-content"
                  />
                </div>
              </>
            ) : (
              <p className="text-gray-500">
                Select a recipient to preview their letter.
              </p>
            )}
          </div>
        </div>

        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PostOffice;
