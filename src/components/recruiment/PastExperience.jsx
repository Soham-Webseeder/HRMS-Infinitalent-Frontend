import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { decrement } from '../../redux/slices/CounterSlice';
import { useNavigate } from 'react-router-dom';

const ExperienceForm = () => {
  const [experience, setExperience] = useState({
    pastExperience: [
      {
        companyName: '',
        workingPeriod: '',
        designation: '',
      },
    ],
  });

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('candidateData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPastExperience = experience.pastExperience.map((exp, i) =>
      i === index ? { ...exp, [name]: value } : exp
    );
    setExperience({ ...experience, pastExperience: updatedPastExperience });
  };

  const addExperienceField = () => {
    setExperience({
      ...experience,
      pastExperience: [
        ...experience.pastExperience,
        { companyName: '', workingPeriod: '', designation: '' },
      ],
    });
  };

  const removeExperienceField = (index) => {
    const updatedPastExperience = experience.pastExperience.filter((_, i) => i !== index);
    setExperience({ ...experience, pastExperience: updatedPastExperience });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Combine form data and experience data
  //   const combinedData = {
  //     ...formData,
  //     pastExperience: experience.pastExperience,
  //   };

  //   try {
  //     await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/recruitment/createCandidate`, combinedData); // Update URL accordingly
  //     // localStorage.removeItem('candidateData'); // Clear localStorage
  //     // navigate('/recruitment/manage-candidate'); // Redirect to success page
  //     // navigate('/recruitment/recruitment-management')
  //   } catch (error) {
  //     console.error('Error submitting form', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Combine form data and experience data
    const combinedData = {
      ...formData,
      pastExperience: experience.pastExperience,
      educationalInfo: formData.educationalInfo || [], // Ensure it's at least an empty array
    };
  
    // Convert Base64 strings to File objects
    const convertBase64ToFile = (base64String, fileName) => {
      const byteString = atob(base64String.split(",")[1]);
      const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      return new File([blob], fileName, { type: mimeString });
    };
  
    // Create a FormData object and append all form data
    const formDataToSend = new FormData();
    
    // Append simple fields (text, numbers, etc.)
    for (const key in combinedData) {
      if (key !== "resume" && key !== "document" && key !== "educationalInfo" && key !== "pastExperience") {
        formDataToSend.append(key, combinedData[key]);
      }
    }
  
    // Append arrays as JSON strings
    formDataToSend.append("educationalInfo", JSON.stringify(combinedData.educationalInfo));
    formDataToSend.append("pastExperience", JSON.stringify(combinedData.pastExperience));
  
    // Convert base64-encoded files and append them if they exist
    if (combinedData.resume) {
      const resumeFile = convertBase64ToFile(combinedData.resume, "resume.pdf");
      formDataToSend.append('resume', resumeFile);
    }
    
    if (combinedData.document) {
      const documentFile = convertBase64ToFile(combinedData.document, "document.pdf");
      formDataToSend.append('document', documentFile);
    }
  
    try {
      // Send form data using axios
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/createCandidate`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Handle success: Redirect or show success message
      navigate('/recruitment/recruitment-management');
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
  
  


  

  return (
    <form onSubmit={handleSubmit}>
      {experience.pastExperience.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">Company Name</label>
            <div className="w-[70%]">
              <input
                type="text"
                name="companyName"
                value={exp.companyName}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Company Name"
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">Working Period</label>
            <div className="w-[70%]">
              <input
                type="text"
                name="workingPeriod"
                value={exp.workingPeriod}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Working Period"
              />
            </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="block text-gray-700 w-1/4 font-bold">Designation</label>
            <div className="w-[70%]">
              <input
                type="text"
                name="designation"
                value={exp.designation}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Designation"
              />
            </div>
          </div>
          <div className="flex justify-end">
            {index > 0 && experience.pastExperience.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperienceField(index)}
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
        onClick={addExperienceField}
        className="bg-green-500 text-white rounded px-2 py-1 mt-4"
      >
        Add Experience
      </button>
      <div className="flex items-center justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={() => dispatch(decrement())}
          className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
