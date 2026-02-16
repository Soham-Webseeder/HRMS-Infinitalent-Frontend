import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AiFillPushpin } from "react-icons/ai";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function EditDraftLetter() {
  const { draftId } = useParams();
  const [currStep, setCurrStep] = useState(1);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isFilled, setIsFilled] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [updatedAt, setUpdatedDate] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [letterContent, setLetterContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [excludedEmployees, setExcludedEmployees] = useState([]);
  const [letterName, setLetterName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [drafts, setDrafts] = useState("");
  const quillRef = useRef(null);
  const [templateId, selectedTemplateId] = useState("");
  const [signatories, setSignatories] = useState([]);
  const [newSignatoryName, setNewSignatoryName] = useState("");
  const [signatoryOptions, setSignatoryOptions] = useState([]);
  const [signatoryImages, setSignatoryImages] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const navigate = useNavigate();

  const addNewSignatory = async () => {
    if (!newSignatoryName.trim()) {
      toast.error("Please enter a signatory name");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/letter/createSignatory`,
        { name: newSignatoryName }
      );

      if (response.data.success) {
        setSignatoryOptions([...signatoryOptions, newSignatoryName]);
        setNewSignatoryName("");
        toast.success("New signatory added successfully");
      }
    } catch (error) {
      toast.error("Failed to add new signatory");
    }
  };

  // Update the handleSignatureUpload function
  const handleSignatureUpload = async (event, signatory) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/updateSignatoryImage`,
          {
            name: signatory,
            image: base64Image,
          }
        );

        if (response.data.success) {
          setSignatoryImages(prev => ({
            ...prev,
            [signatory]: base64Image
          }));
          setPreviewUrls(prev => ({
            ...prev,
            [signatory]: URL.createObjectURL(file)
          }));
          toast.success(`${signatory}'s signature updated`);
        }
      } catch (error) {
        toast.error("Failed to upload signature");
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchDraftData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/getDraftById/${draftId}`
        );
        const draftData = response?.data?.data;

        if (draftData) {
          setLetterName(draftData?.letterName || letterName);
          setCategoryName(draftData?.letterContent?.category || categoryName);
          setLetterContent(draftData?.letterContent?.content || letterContent);
          setSelectedGroup(draftData?.audience?.group || selectedGroup);
          setSelectedOptions(draftData?.audience?.options || selectedOptions);
          setSignatories(draftData?.signatories || []);
          setEmailSubject(draftData.emailDetails?.subject || "");
          setEmailContent(draftData.emailDetails?.body || "");

          // Load signatory images if they exist in the draft
          if (draftData.signatoryImages) {
            setSignatoryImages(prevImages => ({
              ...prevImages,
              ...draftData.signatoryImages
            }));
          }

          setIsFilled({ 1: true, 2: true, 3: true, 4: true });
          setUpdatedDate(draftData?.updatedDate || new Date().toISOString());
        }
      } catch (error) {
        console.error("Error fetching draft data:", error);
      }
    };

    if (draftId) {
      fetchDraftData();
    }
  }, [draftId]);
  // ... (rest of the functions from CreateLetter component)

  const handleSignatoryChange = (event) => {
    const selectedSignatories = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSignatories(selectedSignatories);
  };

  useEffect(() => {
    const fetchSignatories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/letter/getSignatories`
        );
        if (response.data.success) {
          const images = {};
          response.data.data.forEach((signatory) => {
            images[signatory.name] = signatory.image;
          });
          setSignatoryOptions(response.data.data.map((s) => s.name)); // Keep all options available
          setSignatoryImages(images);
        }
      } catch (error) {
        console.error("Failed to fetch signatories", error);
      }
    };

    fetchSignatories();
  }, []);

  // Update the handleUpdateDraft function
  const handleUpdateDraft = async () => {
    const updatedData = {
      letterName,
      letterContent: {
        category: categoryName,
        template: selectedTemplateName,
        content: letterContent,
        saveAsTemplate: saveAsTemplate,
      },
      audience: {
        group: selectedGroup,
        options: selectedOptions,
        excludedEmployees,
      },
      signatories,
      signatoryImages: Object.fromEntries(
        signatories.map(name => [name, signatoryImages[name] || null])
      ),
      emailContent: {
        subject: emailSubject,
        body: emailContent,
      },
      status: "edited",
      updatedAt
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/letter/updateDraft/${draftId}`,
        updatedData
      );

      if (response.data.success) {
        toast.success("Draft updated successfully");
        navigate("/letter/draft");
      }
    } catch (error) {
      toast.error("Error updating draft");
    }
  };

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

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL
        }/employee/getEmployeesByAudienceGroup/${selectedGroup}`,
        {
          params: {
            audienceOptions: selectedOptions,
          },
        }
      );
      setEmployees(response.data.data?.employee);
      if (selectedGroup === "Specific Employees") {
        setExcludedEmployees(response.data.data?.employee);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const fetchBusinessUnits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
      );
      const businessUnits = response.data.response;
      setBusinessUnits(businessUnits);
      setSecondDropdownOptions(
        businessUnits.map((unit) => ({ id: unit._id, name: unit.name }))
      );
    } catch (error) {
      console.error("Error fetching business units:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getDepartments`
      );
      if (response.data && response.data.response) {
        const departmentNames = response.data.response.map((department) => ({
          id: department._id,
          name: department.department.title,
        }));
        setSecondDropdownOptions(departmentNames);
        console.log(departmentNames);
      } else {
        console.error("Department data not found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    switch (selectedGroup) {
      case "All Employees":
        setSecondDropdownOptions(
          employees.map((emp) => ({
            id: emp._id,
            name: `${emp.firstName} ${emp.lastName}`,
          }))
        );
        break;
      case "Business Unit":
        fetchBusinessUnits();
        break;
      case "Departments":
        fetchDepartments();
        break;
      default:
        setSecondDropdownOptions([]);
    }
  }, [selectedGroup, employees]);

  useEffect(() => {
    fetchEmployees();
  }, [selectedGroup, selectedOptions]);

  useEffect(() => {
    if (categoryName) {
      const fetchTemplatesByCategory = async () => {
        try {
          console.log("Fetching templates for category:", categoryName);
          const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_URL
            }/letter/templates/${categoryName}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch templates");
          }
          const data = await response.json();
          console.log("Fetched Templates Data:", data);
          setTemplates(data);
        } catch (error) {
          console.error("Error fetching templates:", error.message);
        }
      };

      fetchTemplatesByCategory();
    } else {
      setTemplates([]);
    }
  }, [categoryName]);

  const handleTemplateSelect = (e) => {
    const selectedValue = e.target.value; // Get the selected template name
    setSelectedTemplate(selectedValue); // Update selected template state

    if (selectedValue) {
      const selectedTemplate = templates.find(
        (template) => template.templateName === selectedValue
      );

      if (selectedTemplate) {
        // Set the letter content with the selected template's content
        setLetterContent(selectedTemplate.letterContent);
        setEmailSubject(selectedTemplate.emailSubject);
        setEmailContent(selectedTemplate.emailContent)
      }
    } else {
      // Reset content if no template is selected
      setLetterContent("");
    }
  };

  const handleOptionToggle = (optionName) => {
    console.log(optionName);
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(optionName)) {
        return prevSelectedOptions.filter((id) => id !== optionName);
      } else {
        return [...prevSelectedOptions, optionName];
      }
    });
  };

  const removeSelectedOption = (optionName) => {
    console.log(optionName);
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((id) => id !== optionName)
    );
  };

  const handleSaveOptionsAndNext = () => {
    handleStep(currStep + 1);
  };

  const handleStep = (step) => {
    setCurrStep(step);
    setIsFilled({ ...isFilled, [step - 1]: true });
  };

  const sendMail = async () => {
    if (sendStatus === "Sending") {
      console.log("Mails are currently being sent");
      return;
    }

    try {
      setSendStatus("Sending");

      const excludedIds = excludedEmployees.map((emp) => emp._id);

      const includedEmployees = employees.filter(
        (emp) => !excludedIds.includes(emp._id)
      );

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/letter/sendMail`,
        {
          emailContent,
          emailSubject,
          letterContent,
          audienceGroup: selectedGroup,
          audienceOptions: selectedOptions,
          letterName,
          signatories,
          signatoryImages, // Include images in payload
          category: categoryName,
          excludeEmployees: excludedIds,
          includedEmployees: includedEmployees.map((emp) => emp._id),
          templateId: selectedTemplateId,
        }
      );

      if (response.data.success) {
        setSendStatus("Sent");
        toast.success("Email has been sent");
      } else {
        setSendStatus("Rejected");
        toast.error("Email was not sent");
      }
    } catch (error) {
      toast.error("Some fields have not been filled", error);
      setSendStatus("Rejected");
    }
  };

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const removeExcludedEmployee = (employee) => {
    setExcludedEmployees((prevExcludedEmployees) =>
      prevExcludedEmployees.filter((emp) => emp._id !== employee._id)
    );
  };

  const addExcludedEmployee = (employee) => {
    setExcludedEmployees((prevExcludedEmployees) => {
      if (prevExcludedEmployees.some((emp) => emp._id === employee._id)) {
        return prevExcludedEmployees;
      }
      return [...prevExcludedEmployees, employee];
    });
  };

  const handleExcludedEmployeeToggle = (employee) => {
    setExcludedEmployees((prevExcludedEmployees) => {
      if (prevExcludedEmployees.includes(employee)) {
        return prevExcludedEmployees.filter((emp) => emp._id !== employee._id);
      } else {
        return [...prevExcludedEmployees, employee];
      }
    });
  };

  const handleIncludedEmployeeToggle = (employee) => {
    setExcludedEmployees((prevExcludedEmployees) => {
      if (prevExcludedEmployees.some((emp) => emp._id === employee._id)) {
        return prevExcludedEmployees.filter((emp) => emp._id !== employee._id);
      } else {
        return [...prevExcludedEmployees, employee];
      }
    });
  };

  const filteredEmployee = employees?.filter((employee) =>
    `${employee.employeeName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleLetterContentChange = (newContent) => {
    setLetterContent(newContent);
  };

  const handleCategoryChange = (newCategory) => {
    setCategoryName(newCategory);
  };

  const insertVariable = (variable) => {
    const editor = quillRef.current.getEditor();
    const cursorPosition = editor.getSelection().index;
    editor.insertText(cursorPosition, variable);
    editor.setSelection(cursorPosition + variable.length);
  };

  return (
    <div className="px-4 py-2 space-y-4">
      <h1 className="text-xl md:text-2xl font-bold">Edit Draft Letter</h1><br></br>
      <Link to="/">Home</Link> | <Link to="/app/letter">Letter</Link> | {" "}
      <Link to="/letter/draft">Drafts | </Link>
      <Link to="">Edit Draft</Link>
      {/* Step 1: Select audience */}
      <div
        className={`space-y-4 border rounded-sm shadow-gray-400 shadow px-4 py-2 ${currStep === 1 && "border-2 border-blue-400"
          }`}
      >
        <h1>{letterName}</h1>
        <div
          className={`flex gap-2 ${currStep !== 1 && "cursor-pointer"}`}
          onClick={() => setCurrStep(1)}
        >
          <span
            className={`px-2 border-2 font-bold shadow rounded-[100%] text-gray-500 ${currStep === 1 && "border-blue-400 text-blue-400"
              } ${isFilled[1] && "bg-blue-500 text-white"}`}
          >
            1
          </span>
          <h1 className="text-lg font-semibold">Select audience</h1>
        </div>
        {currStep === 1 && (
          <div className="space-y-3">
            <div className="flex flex-col gap-0.5 ">
              <label
                htmlFor="selectGroup"
                className="text-sm text-gray-500 font-semibold"
              >
                Select group
              </label>

              <select
                id="groupSelection"
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setSelectedOptions([]);
                }}
                className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400"
              >
                <option>Select group</option>
                <option>All Employees</option>
                <option>Business Unit</option>
                <option>Departments</option>
                <option>Specific Employees</option>
              </select>
            </div>
            {selectedGroup &&
              selectedGroup !== "All Employees" &&
              selectedGroup !== "Specific Employees" && (
                <div className="flex flex-col gap-0.5">
                  <label
                    htmlFor="selectOption"
                    className="text-sm text-gray-500 font-semibold"
                  >
                    Select {selectedGroup}
                  </label>
                  <div className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400 md:w-[24rem]">
                    {secondDropdownOptions.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.name)}
                          onChange={() => handleOptionToggle(option.name)}
                          className="w-4 h-4"
                        />
                        <label className="text-sm text-gray-700">
                          {option.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedOptions.map((name) => {
                return (
                  <div
                    key={name}
                    className="flex items-center bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full"
                  >
                    <span>{name}</span>
                    <button
                      onClick={() => removeSelectedOption(name)}
                      className="ml-2 text-red-600 font-bold"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>

            {selectedGroup !== "Specific Employees" && (
              <div className="flex flex-col gap-0.5 ">
                <div className="flex gap-1 ">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                    className="w-4"
                  />

                  <p className="text-sm font-semibold text-gray-700">
                    Exclude employees
                  </p>
                </div>

                {!isCheckboxChecked && (
                  <select
                    className="border-2 bg-gray-100 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400  md:w-[24rem]"
                    disabled={!isCheckboxChecked}
                  >
                    <option>Select employees</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.employeeName}
                      </option>
                    ))}
                  </select>
                )}
                {isCheckboxChecked && (
                  <div className="border-2 border-employeeNamegray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400 md:w-[24rem] h-40 overflow-y-auto">
                    {employees.map((employee) => (
                      <div
                        key={employee._id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={excludedEmployees.includes(employee)}
                          onChange={() =>
                            handleExcludedEmployeeToggle(employee)
                          }
                          className="w-4 h-4"
                        />
                        <label className="text-sm text-gray-700">
                          {employee.employeeName}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 my-2">
                  {excludedEmployees.map((employee) => {
                    return (
                      <div
                        key={employee._id}
                        className="flex items-center bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full"
                      >
                        <span>{employee.employeeName}</span>
                        <button
                          onClick={() => removeExcludedEmployee(employee)} // Handle removing option
                          className="ml-2 text-red-600 font-bold"
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedGroup === "Specific Employees" && (
              <div className="flex flex-col gap-0.5 ">
                <div className="flex gap-1 justify-between ">
                  <p className="text-sm font-semibold text-gray-700">
                    Select employees
                  </p>
                  <input
                    className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="border-2 border-employeeNamegray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400 md:w-[24rem] h-40 overflow-y-auto">
                  {filteredEmployee.map((employee) => (
                    <div key={employee._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!excludedEmployees.includes(employee)}
                        onChange={() => handleIncludedEmployeeToggle(employee)}
                        className="w-4 h-4"
                      />
                      <label className="text-sm text-gray-700">
                        {employee.employeeName}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 my-2">
                  {employees
                    .filter(
                      (employee) =>
                        !excludedEmployees.some(
                          (excluded) => excluded._id === employee._id
                        )
                    )
                    .map((employee) => {
                      return (
                        <div
                          key={employee._id}
                          className="flex items-center bg-blue-100 text-blue-600 font-semibold px-3 py-1 rounded-full"
                        >
                          <span>{employee.employeeName}</span>
                          <button
                            onClick={() => addExcludedEmployee(employee)} // Handle removing option
                            className="ml-2 text-red-600 font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            <div>
              <button
                className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                onClick={() => handleSaveOptionsAndNext()}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 2: Compose letter */}
      <div
        className={`space-y-4 border rounded-sm shadow-gray-400 shadow px-4 py-2 ${currStep === 2 && "border-2 border-blue-400"
          }`}
      >
        <div
          className={`flex gap-2 ${currStep !== 2 && "cursor-pointer"}`}
          onClick={() => setCurrStep(2)}
        >
          <span
            className={`px-2 border-2 font-bold shadow rounded-[100%] text-gray-500 ${currStep === 2 && "border-blue-400 text-blue-400"
              } ${isFilled[2] && "bg-blue-500 text-white"}`}
          >
            2
          </span>
          <h1 className="text-lg font-semibold">Compose letter</h1>
        </div>
        {currStep === 2 && (
          <div className="space-y-3">
            <div className=" lg:flex lg:space-x-3 max-lg:space-y-3">
              <div className="flex flex-col gap-0.5 ">
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
                  {categories.length > 0 ? (
                    categories.map((category, index) => (
                      <option key={index} value={category}>
                        {" "}
                        {category}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
              </div>

              <div className="flex flex-col gap-0.5 ">
                <label
                  htmlFor="templates"
                  className="text-sm text-gray-500 font-semibold"
                >
                  Templates (optional)
                </label>
                <select
                  id="templates"
                  value={selectedTemplate}
                  onChange={handleTemplateSelect}
                  className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400 md:w-[24rem]"
                >
                  <option>Select Templates</option>
                  {templates.length > 0 ? (
                    templates.map((template, index) => (
                      <option
                        key={index}
                        value={template.templateName}
                        onClick={() =>
                          setSelectedTemplateName(template.templateName)
                        }
                      >
                        {template.templateName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No templates available</option>
                  )}
                </select>

                <div className="flex gap-1 mt-1">
                  <p className="text-sm font-semibold text-blue-600 ">
                    Do not find a category of your suiting ?
                  </p>

                  <p className="text-sm font-semibold text-blue-800 cursor-pointer hover:text-blue-700">
                    Request here.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1 h-[15rem]">
              <p className="text-sm font-semibold text-gray-600">
                Make a contextual letter by using variables as placeholders.
              </p>
              <ReactQuill
                ref={quillRef}
                key={selectedTemplate}
                value={letterContent}
                onChange={setLetterContent}
                theme="snow"
                placeholder="Letter content"
                className="w-full static h-[11rem]"
              />
            </div>
            <select onChange={(e) => insertVariable(e.target.value)}>
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

            <div className="space-x-2">
              <button
                className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                onClick={() => handleStep(currStep - 1)}
              >
                Previous
              </button>

              <button
                className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                onClick={() => handleStep(currStep + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Compose email */}
      <div
        className={`space-y-4 border rounded-sm shadow-gray-400 shadow px-4 py-2 ${currStep === 3 && "border-2 border-blue-400"
          }`}
      >
        <div
          className={`flex gap-2 ${currStep !== 3 && "cursor-pointer"}`}
          onClick={() => setCurrStep(3)}
        >
          <span
            className={`px-2 border-2 font-bold shadow rounded-[100%] text-gray-500 ${currStep === 3 && "border-blue-400 text-blue-400"
              } ${isFilled[3] && "bg-blue-500 text-white"}`}
          >
            3
          </span>
          <h1 className="text-lg font-semibold">Compose email</h1>
        </div>
        {currStep === 3 && (
          <div className="space-y-3">
            <div className="flex flex-col gap-0.5 ">
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
                className="border-2 border-gray-300 rounded-sm py-1 pl-2 outline-none focus:border-blue-400  md:w-[24rem]"
              />

              <p className="flex  gap-1 text-sm font-semibold text-gray-500 mt-1">
                {" "}
                <AiFillPushpin size={20} />
                This subject will be variable to the employee when the letter is
                sent.
              </p>
            </div>
            <div className="space-y-1 h-[15rem]">
              <p className="text-sm font-semibold text-gray-500">Body</p>
              <ReactQuill
                ref={quillRef}
                key={selectedTemplate}
                value={emailContent}
                onChange={setEmailContent}
                theme="snow"
                placeholder="Enter Letter content"
                className="w-full static h-[11rem]"
              />
            </div>
            <select onChange={(e) => insertVariable(e.target.value)}>
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

            <div className="space-x-2">
              <button
                className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                onClick={() => handleStep(currStep - 1)}
              >
                Previous
              </button>

              <button
                className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                onClick={() => handleStep(currStep + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step 4: Signatories */}
      <div
          className={` space-y-4 border rounded-sm shadow-gray-400 shadow px-4 py-2 ${currStep === 4 && "border-2  border-blue-400"
            }`}
        >
          <div
            className={`flex gap-2 ${currStep !== 4 && "cursor-pointer"}`}
            onClick={() => setCurrStep(4)}
          >
            <span
              className={`px-2  border-2 font-bold shadow rounded-[100%] text-gray-500 ${currStep === 4 && "border-blue-400 text-blue-400 "
                }${isFilled[4] === true && " bg-blue-500 text-white"}`}
            >
              4
            </span>
            <h1 className="text-lg font-semibold">Signatories</h1>
          </div>
          {currStep === 4 && (
            <div className="space-y-3">
              <div className="flex gap-2 items-center mt-4">
                <input
                  type="text"
                  value={newSignatoryName}
                  onChange={(e) => setNewSignatoryName(e.target.value)}
                  placeholder="Enter new signatory name"
                  className="border rounded px-2 py-1"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={addNewSignatory}
                >
                  Add Signatory
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <label htmlFor="signatories" className="text-sm font-semibold">
                  Select Signatories
                </label>
                <select
                  id="signatories"
                  name="signatories"
                  multiple
                  value={signatories}
                  onChange={(e) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (opt) => opt.value
                    );
                    setSignatories(selected);
                  }}
                  className="border-2 rounded-md px-2 py-1"
                >
                  {signatoryOptions.map((signatory) => (
                    <option key={signatory} value={signatory}>
                      {signatory}
                    </option>
                  ))}
                </select>

                {signatories.map((signatory) => (
                  <div key={signatory} className="flex items-center gap-4 mt-2">
                    <div>
                      <p className="text-sm">{signatory}'s Signature</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSignatureUpload(e, signatory)}
                        className="block text-sm"
                      />
                    </div>
                    {(previewUrls[signatory] || signatoryImages[signatory]) && (
                      <img
                        src={previewUrls[signatory] || signatoryImages[signatory]}
                        alt={`${signatory}'s signature`}
                        className="w-20 h-20 rounded-md border"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="space-x-2">
                <button
                  className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                  onClick={() => handleStep(currStep - 1)}
                >
                  Previous
                </button>

                <button
                  className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200"
                  onClick={() => handleStep(5)}
                >
                  save
                </button>
              </div>
            </div>
          )}
        </div>
      {/* Action buttons */}
      <div className="space-x-2">
        <button className="bg-blue-200 text-blue-700 font-semibold px-3 py-1 rounded-sm hover:bg-blue-300 active:bg-blue-200">
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-sm hover:bg-blue-400 active:bg-blue-500"
          onClick={handleUpdateDraft}
        >
          Update Draft
        </button>
        <button
          className={`${sendStatus === null ? "bg-blue-500" : "bg-blue-400"
            } text-white font-semibold px-3 py-1 rounded-sm hover:bg-blue-400 active:bg-blue-500`}
          onClick={sendMail}
        >
          {sendStatus === null ? "Send" : sendStatus}
        </button>
      </div>
    </div>
  );
}

export default EditDraftLetter;
