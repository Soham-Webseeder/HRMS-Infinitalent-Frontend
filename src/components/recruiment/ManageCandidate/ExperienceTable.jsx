import React, { useState, useEffect } from "react";
import axios from "axios";

function PastExperience() {

  const [pastExperience, setPastExperience] = useState([]);

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate`);
        console.log(response, "only response")
        const candidateData = response.data.data;

        // Extract pastExperience arrays from all candidates
        const experienceArray = candidateData.map(candidate => candidate.pastExperience).flat();
        
        setPastExperience(experienceArray);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchCandidateData();
  }, []);

  console.log(pastExperience, "pstasdkasflkjk")

  return (
    <table className="min-w-full bg-white border">
      <thead>
        <tr className="border">
          <th className="py-2 border">SL</th>
          <th className="py-2 border">Candidate Id</th>
          <th className="py-2 border">Company Name</th>
          <th className="py-2 border">Working Period</th>
          <th className="py-2 border">Duties</th>
          <th className="py-2 border">Supervisor</th>
        </tr>
      </thead>
      <tbody>
        {pastExperience.map((item, index) => (
          <tr key={item.id} className="text-center border">
            <td className="py-2 border bg-gray-100 ">{index + 1}</td>
            <td className="py-2 border bg-gray-100">{item.candidateId}</td>
            <td className="py-2 border bg-gray-100">{item.companyName}</td>
            <td className="py-2 border bg-gray-100">{item.workingPeriod}</td>
            <td className="py-2 border bg-gray-100">{item.duties}</td>
            <td className="py-2 border bg-gray-100">{item.supervisor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PastExperience;
