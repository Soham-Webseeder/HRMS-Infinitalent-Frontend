import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const EmployeeRecruitment = () => {
  const [formData, setFormData] = useState({
    serialNo: "",
    date: "",
    from: "",
    jobDescription: [
      { Sno: 1, designation: "", purpose: "", NoOfEmployee: "" },
    ],
    preparedBy: "",
    approvedBy: "",
  });
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJobDescriptionChange = (index, field, value) => {
    const updatedJobDescription = [...formData.jobDescription];
    updatedJobDescription[index][field] = value;
    setFormData({ ...formData, jobDescription: updatedJobDescription });
  };

  const handleAddJobDescription = () => {
    const newJob = {
      Sno: formData.jobDescription.length + 1,
      designation: "",
      purpose: "",
      NoOfEmployee: "",
    };
    setFormData({
      ...formData,
      jobDescription: [...formData.jobDescription, newJob],
    });
  };

  const handleRemoveJobDescription = (index) => {
    const updatedJobDescription = formData.jobDescription.filter(
      (job, i) => i !== index
    );
    // Update the serial numbers
    updatedJobDescription.forEach((job, i) => {
      job.Sno = i + 1;
    });
    setFormData({ ...formData, jobDescription: updatedJobDescription });
  };

  const handleReset = () => {
    setFormData({
      serialNo: "",
      date: "",
      from: "",
      jobDescription: [
        { Sno: 1, designation: "", purpose: "", NoOfEmployee: "" },
      ],
      preparedBy: "",
      approvedBy: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/createRecruitment`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      if (result.success) {
        alert("Employee Recruitment Created Successfully!");
        handleReset();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="text-end mb-4">
        <button
          type="button"
          onClick={handlePrint}
          className="border text-blue-100 bg-blue-500 p-2 rounded-md my-2 ml-2"
        >
          Print Form
        </button>
      </div>

      <div
        className="p-4 md:p-6 bg-background text-foreground dark:bg-primary dark:text-primary-foreground w-full max-w-3xl border"
        ref={componentRef}
      >
        <h1 className="text-xl md:text-2xl font-bold text-center">
          UNITED ENGINEERING WORKS
        </h1>
        <h2 className="text-lg md:text-xl text-center">UDAIPUR</h2>
        <h3 className="text-base md:text-lg font-semibold text-center mt-4">
          EMPLOYEE REQUIREMENT FORM
        </h3>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* SERIAL NO. and DATE on the same line */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium" htmlFor="serialNo">
                SERIAL NO.
              </label>
              <input
                type="text"
                id="serialNo"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 rounded-md p-2"
              />
            </div>
          </div>

          {/* FROM and TO: HR DEPARTMENT on the same line */}
          <div className="flex items-center mt-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium"
                htmlFor="fromDepartment"
              >
                FROM
              </label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 rounded-md p-2"
              />
            </div>
            <div className="ml-4 flex-shrink-0">
              <label
                className="block text-sm font-medium"
                htmlFor="toDepartment"
              >
                TO
              </label>
              <h3 className="mt-1 block w-full rounded-md p-2">
                HR Department
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm md:text-base">
            PLEASE PROVIDE THE FOLLOWING EMPLOYEE FOR THE ABOVE MENTIONED
            DEPARTMENT:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full mt-4">
              <thead>
                <tr>
                  <th className="p-2 dark:border-primary">S.NO.</th>
                  <th className="p-2 dark:border-primary">
                    EMPLOYEE POST/DESIGNATION
                  </th>
                  <th className="p-2 dark:border-primary">PURPOSE</th>
                  <th className="p-2 dark:border-primary">
                    NUMBER OF EMPLOYEE
                  </th>
                  <th className="p-2 dark:border-primary no-print">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {formData.jobDescription.map((job, index) => (
                  <tr key={index}>
                    <td className="p-2 dark:border-primary">{job.Sno}</td>
                    <td className="p-2 dark:border-primary">
                      <input
                        type="text"
                        className="w-full border-b border-gray-400 rounded-md p-1"
                        value={job.designation}
                        onChange={(e) =>
                          handleJobDescriptionChange(
                            index,
                            "designation",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-2 dark:border-primary">
                      <input
                        type="text"
                        className="w-full border-b border-gray-400 rounded-md p-1"
                        value={job.purpose}
                        onChange={(e) =>
                          handleJobDescriptionChange(
                            index,
                            "purpose",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-2 dark:border-primary">
                      <input
                        type="number"
                        className="w-full border-b border-gray-400 rounded-md p-1"
                        value={job.NoOfEmployee}
                        onChange={(e) =>
                          handleJobDescriptionChange(
                            index,
                            "NoOfEmployee",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="p-2 dark:border-primary no-print">
                      <button
                        type="button"
                        onClick={() => handleRemoveJobDescription(index)}
                        className="border text-red-100 bg-red-500 p-1 rounded-md"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={handleAddJobDescription}
              className="border text-green-100 bg-green-500 p-2 rounded-md mt-4 no-print"
            >
              Add More Fields
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">PREPARED BY</label>
              <input
                type="text"
                name="preparedBy"
                value={formData.preparedBy}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">APPROVED BY</label>
              <input
                type="text"
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleChange}
                className="mt-1 block w-full border-b border-gray-400 rounded-md p-2"
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="border text-white bg-blue-500 p-2 rounded-md mx-2 no-print"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="border text-gray-600 bg-gray-200 p-2 rounded-md mx-2 no-print"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRecruitment;
