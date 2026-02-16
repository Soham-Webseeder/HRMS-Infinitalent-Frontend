import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CvShow() {
  const [candidate, setCandidate] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const fetchCandidate = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getCandidateById/${id}`
      );

      setCandidate(res.data.data);
    };
    fetchCandidate();
  }, []);

  console.log(candidate, "candidate");

  return (
    <>
      <div className="flex w-full justify-center p-6">
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="text-center mb-4">
              <img
                src={candidate.picture}
                alt="Profile Picture"
                className="mx-auto rounded-full h-40 w-40 "
              />
              <h2 className="text-xl font-semibold mt-2">sdafasd</h2>
              <p className="text-zinc-600">
                <i className="fas fa-phone-alt"></i> 1212121212
              </p>
            </div>
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Personal Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Name</span>
                  <span>
                    {candidate.firstName} {candidate.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Phone</span>
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email Address</span>
                  <span>{candidate.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Present Address</span>
                  <span>{candidate.presentAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Permanent Address</span>
                  <span>{candidate.permanentAddress}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <i className="fas fa-graduation-cap mr-2"></i> Education
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <span className="font-semibold">Obtained Degree</span>
                  <span className="font-semibold">Institute Name</span>
                  <span className="font-semibold">Result</span>
                  <span className="font-semibold">Comments</span>
                </div>
                {candidate &&
                  candidate.educationalInfo &&
                  candidate.educationalInfo.map((info, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4">
                      <span>{info.obtainedDegree}</span>
                      <span>{info.university}</span>
                      <span>{info.CGPA}</span>
                      <span>{info.comments}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <i className="fas fa-briefcase mr-2"></i> Past Experience
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <span className="font-semibold">Company Name</span>
                <span className="font-semibold">Working Period</span>
                <span className="font-semibold">Position</span>
                <span className="font-semibold">Supervisor</span>
              </div>
              {candidate &&
                candidate.pastExperience &&
                candidate.pastExperience.map((experience, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    <span>{experience.companyName}</span>
                    <span>{experience.workingPeriod}</span>
                    <span>{experience.position}</span>
                    <span>{experience.supervisor}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
