import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";

export const CandidateInformation = () => {
  const [showModal, setShowModal] = useState(false);
  const[open,setOpen] = useState(false)

  const [render, setRender] = useState(1);

  const [candidate, setCandidate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternativePhone: "",
    SSN: "",
    presentAddress: "",
    permanentAddress: "",
    country: "",
    city: "",
    zipcode: "",
    picture: "",
    educationalInfo: [
      { obtainedDegree: "", university: "", CGPA: "", comments: "" },
    ],
    pastExperience: [
      { companyName: "", workingPeriod: "", duties: "", supervisior: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleEduChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEdu = candidate.educationalInfo.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setCandidate({ ...candidate, educationalInfo: updatedEdu });
  };

  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExp = candidate.pastExperience.map((exp, i) =>
      i === index ? { ...exp, [name]: value } : exp
    );
    setCandidate({ ...candidate, pastExperience: updatedExp });
  };

  const addEducation = () => {
    setCandidate({
      ...candidate,
      educationalInfo: [
        ...candidate.educationalInfo,
        { obtainedDegree: "", university: "", CGPA: "", comments: "" },
      ],
    });
  };

  const addExperience = () => {
    setCandidate({
      ...candidate,
      pastExperience: [
        ...candidate.pastExperience,
        { companyName: "", workingPeriod: "", duties: "", supervisior: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/createCandidate`,
        candidate
      );
      console.log(response.data);
      alert("Candidate created successfully");
    } catch (error) {
      console.error("There was an error creating the candidate!", error);
      alert("Error creating candidate");
    }
  };
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCandidates(data.data);
        } else {
          console.error("Failed to fetch candidates:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);
  const handleClick = ()=>{
    setShowModal(true)
    setOpen(true)
  }

  return (
    <div className="w-full">
      <div className="w-fit flex justify-center mt-3 pt-1 ">
        <div className="flex flex-col  pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
          <h1 className="text-3xl font-bold p-1">Recruitment</h1>
          <div className="flex flex-row justify-between items-center py-3 bg-white rounded-t-sm">
        
            <div className="flex w-full items-center justify-between">
              <div className="flex md:flex-row sm:flex-col flex-col items-center justify-evenly md:gap-4 gap-1 sm:gap-1">
                <button
                  className="md:p-2 p-1 bg-blue-500 text-white font-bold shadow-md rounded sm:text-xs md:text-md text-xs"
                  onClick={() => setRender(1)}
                >
                  Basic Information
                </button>
                <button
                  className="md:p-2 p-1 bg-blue-500 text-white font-bold shadow-md rounded sm:text-xs md:text-md text-xs"
                  onClick={() => setRender(2)}
                >
                  Past Experience
                </button>
                <button
                  className="md:p-2 p-1 bg-blue-500 text-white font-bold shadow-md rounded sm:text-xs md:text-md text-xs"
                  onClick={() => setRender(3)}
                >
                  Educational Information
                </button>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="border-black border px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-8 sm:text-xs text-xs md:text-base flex items-center justify-center gap-2"
                >
                  <AiOutlinePlusCircle
                    size={25}
                    className="font-bold text-lg"
                  />{" "}
                  Add New Candidate
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-center w-full sm:w-full md:w-full">
            {render === 1 && <BasicInformationTable candidates={candidates} />}
            {render === 2 && <PastExperienceTable candidates={candidates} />}
            {render === 3 && (
              <EducationalInformationTable candidates={candidates} />
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-md max-h-[90vh] overflow-y-auto">
              <form
                onSubmit={handleSubmit}
                className="max-w-full mx-auto p-4 bg-white rounded shadow-md grid grid-cols-2 gap-4"
              >
                <button
                onClick={()=>setOpen(false)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                  <ImCross size={20}/>
                </button>
                <h2 className="col-span-2 text-xl font-bold mb-4">
                  Basic Information
                </h2>
                <label className="block mb-2 col-span-1">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={candidate.firstName}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={candidate.lastName}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={candidate.email}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={candidate.phone}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Alternative Phone:
                  <input
                    type="text"
                    name="alternativePhone"
                    value={candidate.alternativePhone}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  SSN:
                  <input
                    type="text"
                    name="SSN"
                    value={candidate.SSN}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-2">
                  Present Address:
                  <input
                    type="text"
                    name="presentAddress"
                    value={candidate.presentAddress}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-2">
                  Permanent Address:
                  <input
                    type="text"
                    name="permanentAddress"
                    value={candidate.permanentAddress}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Country:
                  <input
                    type="text"
                    name="country"
                    value={candidate.country}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  City:
                  <input
                    type="text"
                    name="city"
                    value={candidate.city}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Zipcode:
                  <input
                    type="text"
                    name="zipcode"
                    value={candidate.zipcode}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block mb-2 col-span-1">
                  Picture:
                  <input
                    type="text"
                    name="picture"
                    value={candidate.picture}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>

                <h2 className="col-span-2 text-xl font-bold mt-4 mb-4">
                  Educational Information
                </h2>
                {candidate.educationalInfo.map((edu, index) => (
                  <div key={index} className="col-span-2 mb-4">
                    <label className="block mb-2">
                      Obtained Degree:
                      <input
                        type="text"
                        name="obtainedDegree"
                        value={edu.obtainedDegree}
                        onChange={(e) => handleEduChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                    <label className="block mb-2">
                      University:
                      <input
                        type="text"
                        name="university"
                        value={edu.university}
                        onChange={(e) => handleEduChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                    <label className="block mb-2">
                      CGPA:
                      <input
                        type="text"
                        name="CGPA"
                        value={edu.CGPA}
                        onChange={(e) => handleEduChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                    <label className="block mb-2">
                      Comments:
                      <input
                        type="text"
                        name="comments"
                        value={edu.comments}
                        onChange={(e) => handleEduChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEducation}
                  className="col-span-2 bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Add More Education
                </button>

                <h2 className="col-span-2 text-xl font-bold mt-4 mb-4">
                  Past Experience
                </h2>
                {candidate.pastExperience.map((exp, index) => (
                  <div key={index} className="col-span-2 mb-4">
                    <label className="block mb-2">
                      Company Name:
                      <input
                        type="text"
                        name="companyName"
                        value={exp.companyName}
                        onChange={(e) => handleExpChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                    <label className="block mb-2">
                      Working Period:
                      <input
                        type="number"
                        name="workingPeriod"
                        value={exp.workingPeriod}
                        onChange={(e) => handleExpChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                    <label className="block mb-2">
                      Duties:
                      <input
                        type="text"
                        name="duties"
                        value={exp.duties}
                        onChange={(e) => handleExpChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                    <label className="block mb-2">
                      Supervisor:
                      <input
                        type="text"
                        name="supervisior"
                        value={exp.supervisior}
                        onChange={(e) => handleExpChange(index, e)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExperience}
                  className="col-span-2 bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Add More Experience
                </button>

                <button
                  type="submit"
                  className="col-span-2 bg-green-500 text-white py-2 px-4 rounded mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateInformation;
const BasicInformationTable = ({ candidates }) => (
  <div className="overflow-x-auto w-full">
    <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            SL
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Candidate Id
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Photograph
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            Email Address
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            SSN
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            Phone
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {candidates.map((candidate, index) => (
          <tr key={candidate._id}>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
              {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
              {candidate.firstName} {candidate.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
              {candidate._id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
              <img
                src={candidate.picture}
                alt="Photograph"
                className="h-12 w-12"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
              {candidate.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
              {candidate.SSN}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
              {candidate.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tbody className="bg-white divide-y divide-gray-200"></tbody>
    </table>
  </div>
);

const PastExperienceTable = ({ candidates }) => (
  <div className="overflow-x-auto w-full">
    <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            SL
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Candidate Id
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Company Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Working Period
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            Duties
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            Supervisor
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {candidates.map((candidate, index) =>
          candidate.pastExperience.map((experience, exIndex) => (
            <tr key={exIndex}>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                {candidate._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                {experience.companyName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                {experience.workingPeriod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                {experience.duties}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                {experience.supervisior}
              </td>
            </tr>
          ))
        )}
      </tbody>
      <tbody className="bg-white divide-y divide-gray-200"></tbody>
    </table>
  </div>
);

const EducationalInformationTable = ({ candidates }) => (
  <div className="overflow-x-auto w-full">
    <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            SL
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Candidate Id
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            Obtained Degree
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300"
          >
            University
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300 text-center"
          >
            CGPA
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {candidates.map((candidate, index) =>
          candidate.educationalInfo.map((education, eduIndex) => (
            <tr key={eduIndex}>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                {candidate._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300">
                {education.obtainedDegree}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                {education.university}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                {education.CGPA}
              </td>
            </tr>
          ))
        )}
      </tbody>
      <tbody className="bg-white divide-y divide-gray-200"></tbody>
    </table>
  </div>
);
