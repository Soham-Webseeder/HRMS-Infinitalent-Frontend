import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowDropdown } from "react-icons/io";

const CandidateSelection = () => {
  const [selections, setSelections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [itemId, setItemId] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [selectedSelection, setSelectedSelection] = useState({
    candidateName: "",
    position: "",
    selectionTerms: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesResponse, positionsResponse, selectionsResponse] =
          await Promise.all([
            axios.get(
              `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate`
            ),
            axios.get(
              `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllPostions`
            ),
            axios.get(
              `${
                import.meta.env.VITE_APP_BASE_URL
              }/recruitment/getAllSelection?page=${currentPage}&limit=${perPage}`
            ),
          ]);

        setCandidates(candidatesResponse.data.data);
        setTotalPages(selectionsResponse.data.pagination.totalPages);
        setPositions(positionsResponse.data.data);
        setSelections(selectionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, perPage]);

  const fetchData = async () => {
    try {
      const [candidatesResponse, positionsResponse, selectionsResponse] =
        await Promise.all([
          axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate`
          ),
          axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllPostions`
          ),
          axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllSelection`
          ),
        ]);

      setCandidates(candidatesResponse.data.data);
      setPositions(positionsResponse.data.data);
      setSelections(selectionsResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddSelectionToList = async (newSelection) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/createSelection`,
        newSelection
      );
      if (response.data.success) {
        setIsCreateModalOpen(false);
        toast.success("Selection successfully added");
        fetchData(); // Call fetchData to refresh selections
        setSelectedSelection({
          candidateName: "",
          position: "",
          selectionTerms: "",
        });
      } else {
        alert("Failed to create selection");
      }
    } catch (error) {
      console.error("Error creating selection:", error);
      alert("An error occurred while creating the selection");
    }
  };

  const handleUpdateSelectionInList = async (id, updatedSelection) => {
    console.log(id, "update iddddddddddddddddddddddddd");
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/recruitment/updateSelection/${id}`,
        updatedSelection
      );
      setIsEditModalOpen(false);
      toast.success("Successfully updated");
      fetchData(); // Call fetchData to refresh selections
    } catch (error) {
      console.error("Error updating selection:", error);
      alert("An error occurred while updating the selection");
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/recruitment/deleteSelection/${id}`
        );
        setSelections(selections.filter((selection) => selection._id !== id));
        toast.success("Successfully deleted");
      } catch (error) {
        console.error("Error deleting selection:", error);
        alert("An error occurred while deleting the entry");
      }
    }
  };

  const handleUpdateClick = (id) => {
    const selection = selections.find((selection) => selection._id === id);
    console.log(selection, "selection");
    setSelectedSelection({
      _id: id,
      candidateName: selection.candidateName._id,
      position: selection.jobPosition._id,
      selectionTerms: selection.selectionTerms,
    });
    setIsEditModalOpen(true);
  };

  const handleChange = (e) => {
    setSelectedSelection({
      ...selectedSelection,
      [e.target.name]: e.target.value,
    });
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const filteredSelection = selections.filter((candidate) => {
    if (
      candidate.candidateName.name &&
      candidate.candidateName.name &&
      typeof candidate.candidateName.name === "string"
    ) {
      return candidate.candidateName.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    return false;
  });
  return (
    <div className="container mx-auto p-4 md:pl-24 sm:pl-1 pl-4">
      <Toaster />
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Candidate Selections</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Selection
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-2 justify-between">
          <div className="relative">
            <select
              name=""
              id=""
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={perPage}
              onChange={handlePerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <IoMdArrowDropdown className="w-4 h-4 text-gray-400" />
            </div>
            <span className="self-center font-bold">entries</span>
          </div>
          <div className="flex flex-col items-end mb-2">
            <div className="flex">
              <span className="self-center font-bold">Search:</span>
              <input
                type="text"
                placeholder="Search By Asset Type.."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                SL No
              </th>
              <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Selection Term
              </th>
              <th className="border border-slate-300 px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSelection.map((selection, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  {selection.candidateName?.name}
                </td>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  {selection.jobPosition?.name}
                </td>
                <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                  {selection.selectionTerms}
                </td>
                <td className="border p-2 flex items-center gap-4 w-full py-6 ">
                  <button
                    className="text-indigo-500 hover:text-indigo-900 "
                    onClick={() => handleUpdateClick(selection._id)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-900"
                    onClick={() => handleDeleteClick(selection._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 rounded-md hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            Next
          </button>
        </div>
      </div>

      {isCreateModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsCreateModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-md md:w-1/2 sm:w-full w-full">
            <h2 className="text-lg font-medium mb-4">Create Selection</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSelectionToList(selectedSelection);
              }}
              className="space-y-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Candidate Name:</label>
                <select
                  name="candidateName"
                  value={selectedSelection.candidateName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a candidate</option>
                  {candidates.map((candidate) => (
                    <option key={candidate._id} value={candidate._id}>
                      {candidate.firstName} {candidate.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Job Position:</label>
                <select
                  name="position"
                  value={selectedSelection.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a job position</option>
                  {positions.map((position) => (
                    <option key={position._id} value={position._id}>
                      {position.position}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Selection Term:</label>
                <input
                  type="text"
                  name="selectionTerms"
                  value={selectedSelection.selectionTerms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 text-gray-500 border border-gray-300 rounded-md"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsEditModalOpen(false);
            }
          }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            <h2 className="text-lg font-medium mb-4">Edit Selection</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSelectionInList(
                  selectedSelection._id,
                  selectedSelection
                );
              }}
              className="space-y-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Candidate Name:</label>
                <select
                  name="candidateName"
                  value={selectedSelection.candidateName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option disabled value="">
                    Select a candidate
                  </option>
                  {candidates.map((candidate) => (
                    <option
                      selected={selectedSelection.candidateId === candidate._id}
                      key={candidate._id}
                      value={candidate._id}
                    >
                      {candidate.firstName} {candidate.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Job Position:</label>
                <select
                  name="position"
                  value={selectedSelection.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a job position</option>
                  {positions.map((position) => (
                    <option
                      selected={selectedSelection.position === position._id}
                      key={position._id}
                      value={position._id}
                    >
                      {position.position}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Selection Term:</label>
                <input
                  type="text"
                  name="selectionTerms"
                  value={selectedSelection.selectionTerms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 text-gray-500 border border-gray-300 rounded-md"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSelection;
