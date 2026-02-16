import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";

const EducationalInformation = () => {
  const [education, setEducation] = useState({
    educationalInfo: [
      {
        obtainedDegree: "",
        university: "",
        CGPA: "",
        comments: "",
      },
    ],
    resume: "",
    document: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const savedData = localStorage.getItem("candidateData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setEducation({
        educationalInfo: parsedData.educationalInfo || [
          {
            obtainedDegree: "",
            university: "",
            CGPA: "",
            comments: "",
          },
        ],
        resume: parsedData.resume || "",
        document: parsedData.document || "",
        firstName: parsedData.firstName || "",
        lastName: parsedData.lastName || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        alternativePhone: parsedData.alternativePhone || "",
        presentAddress: parsedData.presentAddress || "",
        permanentAddress: parsedData.permanentAddress || "",
        country: parsedData.country || "",
        interviewDate: parsedData.interviewDate || "",
        applicationDate: parsedData.applicationDate || "",
        jobPosition: parsedData.jobPosition || "",
        linkedln: parsedData.linkedln || "",
      });
    }
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducationalInfo = education.educationalInfo.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setEducation({ ...education, educationalInfo: updatedEducationalInfo });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEducation({ ...education, [name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFields = () => {
    setEducation({
      ...education,
      educationalInfo: [
        ...education.educationalInfo,
        {
          obtainedDegree: "",
          university: "",
          CGPA: "",
          comments: "",
        },
      ],
    });
  };

  const handleRemoveFields = (index) => {
    const updatedEducationalInfo = education.educationalInfo.filter(
      (info, i) => i !== index
    );
    setEducation({ ...education, educationalInfo: updatedEducationalInfo });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("candidateData", JSON.stringify(education));
    dispatch(increment()); // Move to the next form
  };

  return (
    <form onSubmit={handleSubmit}>
      {education.educationalInfo.map((info, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">
              Degree <span className="text-red-500">*</span>
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                name="obtainedDegree"
                value={info.obtainedDegree}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Obtained Degree"
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">
              University/College <span className="text-red-500">*</span>
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                name="university"
                value={info.university}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="University"
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">
              CGPA <span className="text-red-500">*</span>
            </label>
            <div className="w-[70%]">
              <input
                type="text"
                name="CGPA"
                value={info.CGPA}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="CGPA"
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">
              Comments
            </label>
            <div className="w-[70%]">
              <textarea
                name="comments"
                value={info.comments}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Comments"
              />
            </div>
          </div>
          <div className="flex justify-end">
            {index > 0 && education.educationalInfo.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFields(index)}
                className="bg-red-500 text-white rounded px-2 py-1 mt-2"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddFields}
        className="bg-green-500 text-white rounded px-2 py-1 mt-4"
      >
        Add Field
      </button>
      <div className="flex items-center justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        {/* <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          className="mt-2"
        />
        <input
          type="file"
          name="document"
          onChange={handleFileChange}
          className="mt-2"
        /> */}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </form>
  );
};

export default EducationalInformation;
