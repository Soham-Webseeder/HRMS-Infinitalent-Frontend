import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AiFillPushpin } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTemplate() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [letterContent, setLetterContent] = useState("");
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const quillRefLetter = useRef(null); // Separate ref for letter content
  const quillRefEmail = useRef(null); // Separate ref for email content

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/letter/getCategory`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const insertVariableLetter = (variable) => {
    if (quillRefLetter.current && quillRefLetter.current.getEditor) {
      const editor = quillRefLetter.current.getEditor();
      const selection = editor.getSelection();
      if (selection && selection.index !== null) {
        const cursorPosition = selection.index;
        editor.insertText(cursorPosition, variable);
        editor.setSelection(cursorPosition + variable.length);
      }
    }
  };

  const insertVariableEmail = (variable) => {
    if (quillRefEmail.current && quillRefEmail.current.getEditor) {
      const editor = quillRefEmail.current.getEditor();
      const selection = editor.getSelection();
      if (selection && selection.index !== null) {
        const cursorPosition = selection.index;
        editor.insertText(cursorPosition, variable);
        editor.setSelection(cursorPosition + variable.length);
      }
    }
  };

  const saveTemplate = async () => {
    if (
      !categoryName ||
      !newTemplateName ||
      !letterContent ||
      !emailSubject ||
      !emailContent
    ) {
      alert("Please fill in all required fields for the template.");
      return;
    }

    // Get the HTML content from the React Quill editors
    const letterContentHtml = quillRefLetter.current.getEditor().root.innerHTML;
    const emailContentHtml = quillRefEmail.current.getEditor().root.innerHTML;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/letter/save-as-template`,
        {
          templateName: newTemplateName,
          category: categoryName,
          letterContent: letterContentHtml, // Save as HTML content
          emailSubject,
          emailContent: emailContentHtml, // Save as HTML content
        }
      );
      toast.success("Template saved successfully!");

      setSaveAsTemplate(false);
      setNewTemplateName("");
      setLetterContent(""); // Reset the letter content field
      setEmailSubject(""); // Reset the email subject field
      setEmailContent(""); // Reset the email content field
    } catch (error) {
      toast.error("Template already exists.");
    }
  };

  useEffect(() => {
    // Assuming you fetch the template, here's how you'd populate the editor with HTML
    const template = // Fetch the template data here (e.g., from API)
      setLetterContent(template.letterContent); // Directly set the HTML content
    setEmailContent(template.emailContent); // Directly set the HTML content
  }, []);


  return (
    <div className="px-4 py-2 space-y-4">
      <h1 className="text-xl md:text-2xl font-bold">Create Letter Template</h1><br></br>
      <Link to="/">Home</Link> | <Link to="/app/letter">Letters</Link> | {" "}
      <Link to="/letter/templates">Templates | {" "}</Link>
      <Link to="/letter/templates/createTemplate">Create Template</Link>
      <div className="space-y-3">
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor="category"
            className="text-sm text-gray-500 font-semibold"
          >
            Category
          </label>
          <select
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400"
          >
            <option value="">Select category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Letter Content Editor */}
        <div className="space-y-1 h-[15rem]">
          <ReactQuill
            ref={quillRefLetter}
            value={letterContent}
            onChange={setLetterContent}
            theme="snow"
            placeholder="Letter content"
            className="w-full static h-[11rem]"
          />
        </div>
        <select onChange={(e) => insertVariableLetter(e.target.value)}>
          <option value="">Insert Variable</option>
          <option value="{letter_generation_date}">
            Date of Letter Generation
          </option>
          <option value="{first_name}">First Name</option>
          <option value="{last_name}">Last Name</option>
          <option value="{emailid}">Email ID</option>
          <option value="{primary_phone_number}">Primary Phone Number</option>
          <option value="{permanent_address}">Permanent Address</option>
          <option value="{businessunit}">Business Unit</option>
          <option value="{department}">Department</option>
          <option value="{team}">Team</option>
          <option value="{designation}">Designation</option>
          <option value="{reporting_office}">
            Reporting Office Location
          </option>
          <option value="{date_of_joining}">Date of Joining</option>
          <option value="{date_of_probation}">Probation Completion Date</option>
          <option value="{expected_resignation_date}">Expected Resignation Date</option>
          <option value="{resignated_date}">Exit Date</option>
          <option value="{total_experience}">Total Experience</option>
          <option value="{primary_manager}">Primary Manager's Name</option>
          <option value="{employment_type}">Employment Type</option>
          <option value="{employee_profile_image}">Employee's Photo</option>
          <option value="{company_logo}">Company's Logo</option>
          <option value="{company_registered_name}">
            Company's Registered Name
          </option>
          <option value="{salary_proration}">Salary Proration</option>
          <option value="{full_name}">Full Name</option>
          <option value="{applied_for_designation}">
            Applied For Designation
          </option>
          <option value="{job_type}">Job Type</option>
          <option value="{date_of_birth}">Date of Birth</option>
          <option value="{aadhar_number}">Aadhar Number</option>
          <option value="{pan_number}">Pan Number</option>
          <option value="{signatory_detail}">Signing Authority Details</option>
        </select>
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor="subject"
            className="text-sm text-gray-500 font-semibold"
          >
            Subject
          </label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400 md:w-[24rem]"
          />
          <p className="flex gap-1 text-sm font-semibold text-gray-500 mt-1">
            <AiFillPushpin size={20} />
            This subject will be variable to the employee when the letter is sent.
          </p>
        </div>
        <div className="space-y-1 h-[15rem]">
          <p className="text-sm font-semibold text-gray-500">Body</p>
          <ReactQuill
            ref={quillRefEmail}
            value={emailContent}
            onChange={setEmailContent}
            theme="snow"
            placeholder="Enter email content"
            className="w-full static h-[11rem]"
          />
        </div>
        <select onChange={(e) => insertVariableEmail(e.target.value)}>
          <option value="">Insert Variable</option>
          <option value="{letter_generation_date}">
            Date of Letter Generation
          </option>
          <option value="{first_name}">First Name</option>
          <option value="{last_name}">Last Name</option>
          <option value="{emailid}">Email ID</option>
          <option value="{primary_phone_number}">Primary Phone Number</option>
          <option value="{permanent_address}">Permanent Address</option>
          <option value="{businessunit}">Business Unit</option>
          <option value="{department}">Department</option>
          <option value="{team}">Team</option>
          <option value="{designation}">Designation</option>
          <option value="{reporting_office}">
            Reporting Office Location
          </option>
          <option value="{date_of_joining}">Date of Joining</option>
          <option value="{date_of_probation}">Probation Completion Date</option>
          <option value="{expected_resignation_date}">Expected Resignation Date</option>
          <option value="{resignated_date}">Exit Date</option>
          <option value="{total_experience}">Total Experience</option>
          <option value="{primary_manager}">Primary Manager's Name</option>
          <option value="{employment_type}">Employment Type</option>
          <option value="{employee_profile_image}">Employee's Photo</option>
          <option value="{company_logo}">Company's Logo</option>
          <option value="{company_registered_name}">
            Company's Registered Name
          </option>
          <option value="{salary_proration}">Salary Proration</option>
          <option value="{full_name}">Full Name</option>
          <option value="{applied_for_designation}">
            Applied For Designation
          </option>
          <option value="{job_type}">Job Type</option>
          <option value="{date_of_birth}">Date of Birth</option>
          <option value="{aadhar_number}">Aadhar Number</option>
          <option value="{pan_number}">Pan Number</option>
          <option value="{signatory_detail}">Signing Authority Details</option>
        </select>
      </div>
      <div className="flex gap-1 items-center">
        <input
          type="checkbox"
          checked={saveAsTemplate}
          onChange={(e) => setSaveAsTemplate(e.target.checked)}
        />
        <p className="text-sm font-semibold text-gray-700">
          Save as new template
        </p>
      </div>

      {saveAsTemplate && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            placeholder="Enter new template name"
            className="border-2 border-gray-300 rounded-sm py-1 px-2 outline-none"
          />
          <button
            onClick={saveTemplate}
            disabled={!newTemplateName || !categoryName || !letterContent}
            className="bg-green-500 text-white font-semibold px-3 py-1 rounded-sm"
          >
            Save Template
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateTemplate;
