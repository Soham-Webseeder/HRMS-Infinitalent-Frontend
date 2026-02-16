import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const FormSection = ({ title, fields, handleRemoveFields, handleChange }) => (
  <div>
    <form>
      <div className="flex flex-row items-center justify-between mt-2">
        <div className="w-1/3">Name</div>
        <div className="w-1/3">Email</div>
        <div className="w-1/3">Phone Number</div>
      </div>
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between mt-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={field.name}
            onChange={(e) => handleChange(e, index, "name")}
            className="w-1/3 px-2 py-1 border border-gray-400 rounded-md"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={field.email}
            onChange={(e) => handleChange(e, index, "email")}
            className="w-1/3 px-2 py-1 border border-gray-400 rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter phone"
            value={field.phone}
            onChange={(e) => handleChange(e, index, "phone")}
            className="w-1/3 px-2 py-1 border border-gray-400 rounded-md"
          />
          <button
            className="text-red-500 font-bold"
            onClick={() => handleRemoveFields(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </form>
  </div>
);

export const Statutory_temprary = () => {
  const [activeSection, setActiveSection] = useState("Directors");
  const [directorsFields, setDirectorsFields] = useState([
    { name: "", email: "", phone: "" },
  ]);
  const [auditorsFields, setAuditorsFields] = useState([
    { name: "", email: "", phone: "" },
  ]);
  const [companySecretaryFields, setCompanySecretaryFields] = useState([
    { name: "", email: "", phone: "" },
  ]);
  const [showButtons, setShowButtons] = useState(false);

  const handleAddFields = () => {
    switch (activeSection) {
      case "Directors":
        setDirectorsFields([
          ...directorsFields,
          { name: "", email: "", phone: "" },
        ]);
        break;
      case "Auditors":
        setAuditorsFields([
          ...auditorsFields,
          { name: "", email: "", phone: "" },
        ]);
        break;
      case "CompanySecretary":
        setCompanySecretaryFields([
          ...companySecretaryFields,
          { name: "", email: "", phone: "" },
        ]);
        break;
      default:
        break;
    }
    setShowButtons(true);
  };

  const handleRemoveFields = (index) => {
    switch (activeSection) {
      case "Directors":
        setDirectorsFields(directorsFields.filter((_, i) => i !== index));
        break;
      case "Auditors":
        setAuditorsFields(auditorsFields.filter((_, i) => i !== index));
        break;
      case "CompanySecretary":
        setCompanySecretaryFields(
          companySecretaryFields.filter((_, i) => i !== index)
        );
        break;
      default:
        break;
    }
  };

  const handleChange = (e, index, fieldName) => {
    const newValue = e.target.value;
    switch (activeSection) {
      case "Directors":
        setDirectorsFields(
          directorsFields.map((field, i) =>
            i === index ? { ...field, [fieldName]: newValue } : field
          )
        );
        break;
      case "Auditors":
        setAuditorsFields(
          auditorsFields.map((field, i) =>
            i === index ? { ...field, [fieldName]: newValue } : field
          )
        );
        break;
      case "CompanySecretary":
        setCompanySecretaryFields(
          companySecretaryFields.map((field, i) =>
            i === index ? { ...field, [fieldName]: newValue } : field
          )
        );
        break;
      default:
        break;
    }
  };

  const handleSaveFields = () => {
    setShowButtons(false);
  };

  const handleCancel = () => {
    setShowButtons(false);
  };

  return (
    <div className="container mx-auto w-[45%] py-2 bg-slate-50 p-3 shadow-xl rounded-sm">
      <div className="flex flex-col">
        <div className="flex flex-row justify-start items-center">
          <button
            className={`px-2 py-1 rounded-md mr-2 ${
              activeSection === "Directors"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("Directors")}
          >
            Directors
          </button>
          <button
            className={`px-2 py-1 rounded-md mr-2 ${
              activeSection === "Auditors"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("Auditors")}
          >
            Auditors
          </button>
          <button
            className={`px-2 py-1 rounded-md mr-2 ${
              activeSection === "CompanySecretary"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSection("CompanySecretary")}
          >
            Company Secretary
          </button>
        </div>
        <div>
          <h1 className="text-xl font-bold mt-2">{activeSection}</h1>
        </div>
        <FormSection
          title={activeSection}
          fields={
            activeSection === "Directors"
              ? directorsFields
              : activeSection === "Auditors"
              ? auditorsFields
              : companySecretaryFields
          }
          handleRemoveFields={handleRemoveFields}
          handleChange={handleChange}
        />
        {showButtons && (
          <div className="flex flex-row justify-end mt-3">
            <div className="flex flex-row">
              <button
                className="px-2 py-1 bg-white text-black rounded-md mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-3 py-1 bg-blue-600 text-white rounded-md mr-2"
                onClick={handleSaveFields}
              >
                Save
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-start mt-2">
          <button
            className="text-xl font-bold cursor-pointer p-2 text-blue-500 flex items-center"
            onClick={handleAddFields}
          >
            <AiFillPlusCircle className="mr-1" />
            <div className="text-base">Add</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statutory_temprary;
