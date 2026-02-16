import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Interview() {
  const [showModal, setShowModal] = useState(false);
  const [shortlist, setShortlist] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [interview, setInterview] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    canName: "",
    candidateName: "",
    jobPosition: "",
    jobPositionId: "",
    interviewDate: "",
    interviewer: "",
    vivaMarks: "",
    writtenMarks: "",
    mcqMarks: "",
    totalMarks: "",
    recommandation: "",
    selection: "",
    details: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllShortlist`
      );

      if (response.data.success) {
        setShortlist(response.data.data);
      } else {
        console.error("Error fetching  shortlist:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching  shortlist:", error);
    }
  };

  useEffect(() => {
    fetchPositions();
    fetchInterviewData();
  }, []);

  const fetchInterviewData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllInterviews`
      );
      setInterview(res.data.data);
    } catch {
      console.error("Error fetching interview data");
    }
  };

  const fetchCandidateById = async (id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/recruitment/getShortlistById/${id}`
      );
      if (response.data.success) {
        const data = response.data.data;
        setSelectedCandidate(data);
        setFormData({
          candidateName: data?.candidateName._id,
          canName: data?.candidateName.name,
          jobPosition: data.jobPosition?.name || "",
          jobPositionId: data.jobPosition?._id || "",
          interviewDate: data.interviewDate || "",
          interviewer: "",
          vivaMarks: "",
          writtenMarks: "",
          mcqMarks: "",
          totalMarks: "",
          recommandation: "",
          selection: "",
          details: data.jobPosition?.details || "",
        });
      } else {
        console.error("Error fetching candidate:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
  };

  const handleCandidateChange = (event) => {
    const selectedCandidateId = event.target.value;

    if (selectedCandidateId !== "Select option") {
      fetchCandidateById(selectedCandidateId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}recruitment/createInterview`,
        formData
      );

      if (response.data) {
        setShowModal(false);
        fetchPositions();
        toast.success("Position added successfully");

        setFormData({
          candidateName: "",
          jobPosition: "",
          interviewDate: "",
          interviewer: "",
          vivaMarks: "",
          writtenMarks: "",
          mcqMarks: "",
          totalMarks: "",
          recommandation: "",
          selection: "",
          details: "",
        });
      } else {
        toast.error("Failed to add position");
        console.error("Error adding position:", response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add position");
      console.error("Error adding position:", error);
    }
  };

  const handleDeleteInterview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this division?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/recruitment/deleteInterview/${id}`
        );
        fetchInterviewData();
        toast.success("Position deleted successfully");
      } catch (error) {
        toast.error("Failed to delete position");
        console.error("Error deleting position:", error);
      }
    }
  };

  const handleEditInterview = async (id) => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}recruitment/getInterviewById/${id}`
    );
    setFormData(res.data.data);

    setUpdateId(id);
    setShowUpdateModal(true);
  };
  const handleUpdateSubmit = async (id) => {
    console.log("updattingggggggggggggggggg..........");
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}recruitment/updateInterview/${id}`,
        formData
      );
      if (res.data) {
        toast.success("Interview updated successfully");
      }
    } catch {
      toast.error("Failed to udpated interview");
      console.error("Error adding position:", response.data.message);
    }
  };
  console.log(formData, "formdata");

  return (
    <>
     
        <div className="w-full bg-gray-100 sm:px-4  ">
          <div className="bg-white shadow-lg py-2">
            <h1 className="text-2xl font-bold pl-2">Interview Create</h1>
           
              <div className="flex flex-col items-end ">
                <div className="flex justify-between mb-4">
                  <div className="flex flex-between ">
                    <button
                      className="bg-blue-700 mx-4 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      onClick={() => setShowModal(true)}
                    >
                      Add Interview
                    </button>
                  </div>
                </div>
              </div>

              <div className="border rounded p-1 mx-2 py-2 ">
                <span className="self-center font-bold">Show</span>
                <div className="flex space-x-2">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="self-center font-bold">entries</span>
                <div className="flex flex-col items-end mb-2">
                  <div className="flex">
                    <span className="self-center font-bold">Search: </span>
                    <input
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by Interview..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full  flex overflow-x-auto ">
                <table className=" ">
                  <thead className="border">
                    <tr>
                      <th className="px-4 py-2 text-left border">SL No</th>
                      <th className="px-4 py-2 text-left border">Name</th>
                      <th className="px-4 py-2 text-left border">
                        Candidate Id
                      </th>
                      <th className="px-4 py-2 text-left border">
                        Job Position
                      </th>
                      <th className="px-4 py-2 text-left border">
                        Interview Date
                      </th>
                      <th className="px-4 py-2 text-left border">Viva Marks</th>
                      <th className="px-4 py-2 text-left border">
                        Written Total Marks
                      </th>
                      <th className="px-4 py-2 text-left border">
                        MCQ Total Marks
                      </th>
                      <th className="px-4 py-2 text-left border">
                        Total Marks
                      </th>
                      <th className="px-4 py-2 text-left border">Selection</th>
                      <th className="px-4 py-2 text-left border">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border">
                    {interview.length > 0 ? (
                      interview.map((shortlist, index) => (
                        <tr key={shortlist.candidateName?._id}>
                          <td className="px-4 py-2 border">{index + 1}</td>
                          <td className="px-4 py-2 border">
                            {shortlist.canName}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.candidateName}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.jobPosition}
                          </td>
                          <td className="px-4 py-2 border">
                            {new Date(
                              shortlist.interviewDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.vivaMarks}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.writtenMarks}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.mcqMarks}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.totalMarks}
                          </td>
                          <td className="px-4 py-2 border">
                            {shortlist.selection}
                          </td>
                          <td className=" whitespace-nowrap text-left text-sm font-medium flex ">
                            <div className="w-[50%] border-r border-slate-300 py-3 text-center">
                              <button
                                onClick={() =>
                                  handleEditInterview(shortlist._id)
                                }
                                className="text-indigo-500 hover:text-indigo-900"
                              >
                                <FaEdit size={20} />{" "}
                              </button>
                            </div>
                            <div className="w-[50%] border-r border-slate-300 py-3 text-center">
                              <button
                                onClick={() =>
                                  handleDeleteInterview(shortlist._id)
                                }
                                className="text-red-500 hover:text-red-900"
                              >
                                <MdDelete size={20} />{" "}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="text-center px-4 py-2 border"
                          colSpan={12}
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                </div>
                <div className="flex flex-col mt-4 items-end">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
   
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-md flex flex-col gap-4 w-1/2">
              <h2 className="text-center text-xl font-semibold text-zinc-800  mb-4">
                INTERVIEW FORM
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="candidateName"
                      className="block text-sm font-medium mb-1"
                    >
                      Candidate name
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="candidateName"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleCandidateChange}
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select option</option>
                      {shortlist.map((shortlist) => (
                        <option key={shortlist._id} value={shortlist._id}>
                          {shortlist.candidateName?.name}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">
                      Job Position *
                    </label>
                    <input
                      type="text"
                      name="jobPosition"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Position"
                      value={formData.jobPosition}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">
                      Interview Date *
                    </label>
                    <input
                      type="date"
                      name="interviewDate"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.interviewDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Interviewer *
                    </label>
                    <input
                      type="text"
                      name="interviewer"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Interviewer"
                      value={formData.interviewer}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Viva Marks *
                    </label>
                    <input
                      type="number"
                      name="vivaMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Viva Marks"
                      value={formData.vivaMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Written Total Marks *
                    </label>
                    <input
                      type="number"
                      name="writtenMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Written Total Marks"
                      value={formData.writtenMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      MCQ Total Marks *
                    </label>
                    <input
                      type="number"
                      name="mcqMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="MCQ Total Marks"
                      value={formData.mcqMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Total Marks *
                    </label>
                    <input
                      type="number"
                      name="totalMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Total Marks"
                      value={formData.totalMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      recommandation
                    </label>
                    <input
                      type="text"
                      name="recommandation"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="recommandation"
                      value={formData.recommandation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Selection *
                    </label>
                    <select
                      name="selection"
                      value={formData.selection}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select option</option>
                      <option value="Selected">Selected</option>
                      <option value="Deselected">Deselected</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Details
                    </label>
                    <textarea
                      name="details"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows="3"
                      placeholder="Details"
                      value={formData.details}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="reset"
                    onClick={() => setShowModal(false)}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-md flex flex-col gap-4 w-1/2">
              <h2 className="text-center text-xl font-semibold text-zinc-800  mb-4">
                INTERVIEW FORM
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="candidateName"
                      className="block text-sm font-medium mb-1"
                    >
                      Candidate name
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="candidateName"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleCandidateChange}
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select option</option>
                      {shortlist.map((shortlist) => (
                        <option key={shortlist._id} value={shortlist._id}>
                          {shortlist.candidateName?.name}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Job Position *
                    </label>
                    <input
                      type="text"
                      name="jobPosition"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Position"
                      value={formData.jobPosition}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Interview Date *
                    </label>
                    <input
                      type="date"
                      name="interviewDate"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.interviewDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Interviewer *
                    </label>
                    <input
                      type="text"
                      name="interviewer"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Interviewer"
                      value={formData.interviewer}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Viva Marks *
                    </label>
                    <input
                      type="number"
                      name="vivaMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Viva Marks"
                      value={formData.vivaMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Written Total Marks *
                    </label>
                    <input
                      type="number"
                      name="writtenMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Written Total Marks"
                      value={formData.writtenMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      MCQ Total Marks *
                    </label>
                    <input
                      type="number"
                      name="mcqMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="MCQ Total Marks"
                      value={formData.mcqMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Total Marks *
                    </label>
                    <input
                      type="number"
                      name="totalMarks"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Total Marks"
                      value={formData.totalMarks}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      recommandation
                    </label>
                    <input
                      type="text"
                      name="recommandation"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="recommandation"
                      value={formData.recommandation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Selection *
                    </label>
                    <select
                      name="selection"
                      value={formData.selection}
                      onChange={handleInputChange}
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select option</option>
                      <option value="Selected">Selected</option>
                      <option value="Deselected">Deselected</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700  ">
                      Details
                    </label>
                    <textarea
                      name="details"
                      className="mt-1 block w-full py-2 px-3 border border-zinc-300 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      rows="3"
                      placeholder="Details"
                      value={formData.details}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateSubmit(updateId)}
                    className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    
    </>
  );
}
