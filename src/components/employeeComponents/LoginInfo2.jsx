import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { setModal } from "../../redux/slices/SidebarSlice";

export default function LoginInfo({ updateId, setUpdateId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentForm = useSelector((state) => state.counter);

  // *** FIX START ***
  // 1. Initial State: Set password to empty string for updates to prevent displaying/re-hashing
  const initialFormData = updateId
    ? { ...currentForm, password: "" }
    : currentForm;

  const [formData, setFormData] = useState(initialFormData);
  // *** FIX END ***

  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);

      // *** FIX START ***
      // 2. Handle Local Storage: Clear password on update even if it was saved locally
      setFormData(prev => ({
        ...prev,
        ...parsedData,
        password: updateId ? "" : (parsedData.password || "")
      }));
    } else if (updateId) {
      // Ensure password is cleared if Redux state has the hashed value upon initial load
      setFormData(prev => ({ ...prev, password: "" }));
    }
    // *** FIX END ***
  }, [updateId]);

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL
        }/employee/checkUserEmail?userEmail=${email}`
      );
      console.log("Login", response.data);
      return response.data.data?.exist;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // prevent double-clicks
    setSubmitting(true);
    setEmailError("");

    try {
      // Check if the email already exists (only on create)
      if (!updateId) {
        const emailExists = await checkEmailExists(formData.userEmail);
        if (emailExists) {
          setEmailError("This email already exists.");
          setSubmitting(false);
          return;
        }
      }

      // Save form data locally (backup in case of failure)
      // NOTE: We intentionally save the possibly empty password field here
      localStorage.setItem("formData", JSON.stringify(formData));

      const convertBase64ToFile = (base64String, fileName) => {
        if (!base64String || !base64String.includes(",")) {
          throw new Error("Invalid Base64 string.");
        }

        const parts = base64String.split(",");
        const byteString = atob(parts[1]);
        const mimeString = parts[0].split(":")[1].split(";")[0];

        // Map common MIME types to extensions
        const extensionMap = {
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "application/pdf": ".pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx"
        };

        const ext = extensionMap[mimeString] || "";
        // Ensure the filename ends with the correct extension
        const finalFileName = fileName.toLowerCase().endsWith(ext) ? fileName : `${fileName}${ext}`;

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        return new File([new Blob([ab], { type: mimeString })], finalFileName, {
          type: mimeString,
        });
      };

      const formDataToSend = new FormData();

      // 2. Handle Standard Media Fields (Photograph, Resume, Aadhar, PAN, SSC, HSC)
      const mediaFields = ["photograph", "resume", "aadharCard", "panCard", "SSC", "HSC"];
      mediaFields.forEach((key) => {
        const value = formData[key];
        if (value && typeof value === "string" && value.startsWith("data:")) {
          // If it's a new Base64 string, convert to file
          const file = convertBase64ToFile(value, `${key}_file`);
          formDataToSend.append(key, file);
        } else if (value && typeof value === "string") {
          // If it's an existing local path or URL, append as text
          formDataToSend.append(key, value);
        }
      });

      // 3. Handle Dynamic Documents (Indexed Keys)
      if (Array.isArray(formData.documents)) {
        formData.documents.forEach((doc, index) => {
          // Append the name as a string
          formDataToSend.append(`documents[${index}][docName]`, doc.docName);

          // Append the document file or existing path
          if (doc.docDocument && typeof doc.docDocument === "string") {
            if (doc.docDocument.startsWith("data:")) {
              const file = convertBase64ToFile(doc.docDocument, `doc_${index}`);
              formDataToSend.append(`documents[${index}][docDocument]`, file);
            } else {
              formDataToSend.append(`documents[${index}][docDocument]`, doc.docDocument);
            }
          }
        });
        // Also send the full array as a JSON string for the controller to parse non-file fields
        formDataToSend.append("documents", JSON.stringify(formData.documents));
      }

      const filteredFormData = { ...formData };

      // Remove handled fields to avoid duplicates
      [...mediaFields, "documents", "geofenceCenter", "location"].forEach(k => delete filteredFormData[k]);

      // Don't send SalarySetup as an object to avoid CastErrors
      delete filteredFormData.salarySetup;

      if (updateId && !filteredFormData.password) delete filteredFormData.password;

      Object.entries(filteredFormData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // FIX: If the value is a populated object (like businessUnit or companyDetails), 
          // extract only the ID string.
          if (typeof value === "object" && value._id) {
            formDataToSend.append(key, value._id);
          }
          // Otherwise, append the value as usual
          else {
            formDataToSend.append(key, value);
          }
        }
      });

      // API call
      const url = updateId
        ? `${import.meta.env.VITE_APP_BASE_URL}/employee/updateEmployee/${updateId}`
        : `${import.meta.env.VITE_APP_BASE_URL}/employee/createEmployee`;

      const res = await axios({
        method: updateId ? "patch" : "post",
        url,
        data: formDataToSend,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        if (res.data.success) {
          localStorage.removeItem("formData");
          toast.success(updateId ? "Employee Updated Successfully..." : "Employee Added Successfully...");

          if (location.pathname === "/employee/manage-employee") {
            dispatch(setModal(false));
            window.location.reload();
          } else {
            navigate("/employee/manage-employee");
          }
        }
      } else {
        toast.error("Failed to submit employee data: " + res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit employee data: " + (error.response?.data?.message || error.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  console.log(formData, "formdata");

  return (
    <>
      <div className="mt-4 bg-gray-100 pl-5 pr-5 ">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="mb-4">
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-zinc-700"
              >
                User Email <span className="text-red-500">*</span>
              </label>
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700"
              >
                Password {updateId ? "" : <span className="text-red-500">*</span>}
                {/* Clarify that password is optional on update */}
                {updateId && <span className="text-sm text-zinc-500 ml-2">(Leave empty to keep current password)</span>}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                required={!updateId} // Only required for new employee creation
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => dispatch(decrement())}
              disabled={submitting}
              className={`border px-5 py-1 mb-4 rounded-full text-white flex items-center justify-end gap-2
      ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              Previous
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`border px-5 py-1 mb-4 rounded-full text-white flex items-center justify-end gap-2
      ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {submitting ? "Processing..." : (!updateId ? "Submit" : "Update")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}