import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2pdf from "html2pdf.js";
import logo from "/src/components/print/images/Logo.jpeg";

export default function TemplateView() {
  const { templateId } = useParams(); 
  const [template, setTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const letterRef = useRef(null); // Reference to the letter content for PDF generation

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/getTemplateById/${templateId}`
        );

        setTemplate(response.data.data); // Set the template data (note `.data.data`)
        setIsLoading(false); // Mark as not loading anymore
      } catch (err) {
        toast.error("Error fetching template");
        setError("Error loading template");
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const generatePDF = () => {
    const element = letterRef.current;
    const options = {
      margin: 1,
      filename: `${template?.templateName || "template"}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!template) {
    return <div>No template found</div>;
  }

  return (
    <div className="p-6">
      <div className="text-right mb-4">
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
      <div className="p-6 border-2 border-gray-300" ref={letterRef}>
        <div className="flex items-start justify-between">
          <div className="pt-0">
            <img src={logo} alt="Logo" className="w-1/6 h-15 mb-2" />
            <div className="text-left">{new Date().toLocaleDateString('en-GB')}</div>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">{template.templateName}</h1>
        <div className="mb-4">
          <h2 className="font-semibold">Subject:</h2>
          <p>{template.emailSubject}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold">Letter Content:</h2>
          <div dangerouslySetInnerHTML={{ __html: template.letterContent }} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
