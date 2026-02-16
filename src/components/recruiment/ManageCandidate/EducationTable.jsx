import React from "react";

function EducationalInformation() {
  const data = [
    {
      id: 1,
      candidateId: "17156636854885S",
      degree: "B-Tech",
      university: "RGPV",
      cgpa: "8.5",
      comments: "Example",
    },
    {
      id: 1,
      candidateId: "18157736854885S",
      degree: "B-Tech",
      university: "RGPV",
      cgpa: "8.5",
      comments: "Example",
    },
  ];

  return (
    <table className="min-w-full bg-white Border">
      <thead>
        <tr>
          <th className="py-2 border">SL</th>
          <th className="py-2 border">Candidate Id</th>
          <th className="py-2 border">Obtained Degree</th>
          <th className="py-2 border">University</th>
          <th className="py-2 border">CGPA</th>
          <th className="py-2 border">Comments</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="text-center">
            <td className="py-2 border bg-gray-100">{index + 1}</td>
            <td className="py-2 border bg-gray-100">{item.candidateId}</td>
            <td className="py-2 border bg-gray-100">{item.degree}</td>
            <td className="py-2 border bg-gray-100">{item.university}</td>
            <td className="py-2 border bg-gray-100">{item.cgpa}</td>
            <td className="py-2 border bg-gray-100">{item.comments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EducationalInformation;
