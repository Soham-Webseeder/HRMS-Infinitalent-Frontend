import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { decrement } from "../../redux/slices/CounterSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { setModal } from "../../redux/slices/SidebarSlice";

export default function LoginInfo({ formData, setFormData, updateId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  // 1. SANITIZE PASSWORD ON MOUNT
  // If we are in update mode, we clear the password field in the state immediately
  // so the user never sees the Bcrypt hash.
  useEffect(() => {
    if (updateId && formData.password) {
      setFormData((prev) => ({
        ...prev,
        password: "", // Clear the hash so the input field starts empty
      }));
    }
  }, [updateId]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/checkUserEmail?userEmail=${email}`
      );
      return response.data.data?.exist;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const convertBase64ToFile = (base64String, fileName) => {
    if (!base64String || !base64String.includes(",")) return null;
    const parts = base64String.split(",");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(":")[1].split(";")[0];
    const extensionMap = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "application/pdf": ".pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    };
    const ext = extensionMap[mimeString] || "";
    const finalFileName = fileName.toLowerCase().endsWith(ext) ? fileName : `${fileName}${ext}`;
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([new Blob([ab], { type: mimeString })], finalFileName, { type: mimeString });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setEmailError("");

    try {
      if (!updateId) {
        const emailExists = await checkEmailExists(formData.userEmail);
        if (emailExists) {
          setEmailError("This user email already exists.");
          setSubmitting(false);
          return;
        }
      }

      const formDataToSend = new FormData();

      // Handle Media Fields
      const mediaFields = ["photograph", "resume", "aadharCard", "panCard", "SSC", "HSC"];
      mediaFields.forEach((key) => {
        const value = formData[key];
        if (value && typeof value === "string" && value.startsWith("data:")) {
          const file = convertBase64ToFile(value, `${key}_file`);
          if (file) formDataToSend.append(key, file);
        } else if (value && typeof value === "string") {
          formDataToSend.append(key, value);
        }
      });

      // Handle Dynamic Documents
      if (Array.isArray(formData.documents)) {
        formData.documents.forEach((doc, index) => {
          formDataToSend.append(`documents[${index}][docName]`, doc.docName || "");
          if (doc.docDocument && typeof doc.docDocument === "string") {
            if (doc.docDocument.startsWith("data:")) {
              const file = convertBase64ToFile(doc.docDocument, `doc_${index}`);
              if (file) formDataToSend.append(`documents[${index}][docDocument]`, file);
            } else {
              formDataToSend.append(`documents[${index}][docDocument]`, doc.docDocument);
            }
          }
        });
        formDataToSend.append("documents", JSON.stringify(formData.documents));
      }

      // Handle all other fields
      const ignoredFields = [...mediaFields, "documents", "salarySetup", "geofenceCenter", "location"];
      Object.entries(formData).forEach(([key, value]) => {
        if (!ignoredFields.includes(key) && value !== null && value !== undefined) {
          
          // 2. PASSWORD SUBMISSION LOGIC
          if (key === "password") {
            // ONLY append if it has a value (length > 0)
            const trimmedPass = typeof value === "string" ? value.trim() : "";
            if (trimmedPass.length > 0) {
              formDataToSend.append(key, trimmedPass);
            }
            return; // Exit loop for password field
          }

          if (typeof value === "object" && value._id) {
            formDataToSend.append(key, value._id);
          } else if (key === "benefits") {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      const url = updateId
        ? `${import.meta.env.VITE_APP_BASE_URL}/employee/updateEmployee/${updateId}`
        : `${import.meta.env.VITE_APP_BASE_URL}/employee/createEmployee`;

      const res = await axios({
        method: updateId ? "patch" : "post",
        url,
        data: formDataToSend,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        localStorage.removeItem("formData");
        toast.success(updateId ? "Employee Updated Successfully!" : "Employee Created Successfully!");
        if (location.pathname.includes("manage-employee")) {
          dispatch(setModal(false));
          window.location.reload();
        } else {
          navigate("/app/employee");
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "An error occurred during submission.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-100 pl-5 pr-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700">
              User Email <span className="text-red-500">*</span>
            </label>
            {emailError && <p className="text-red-500 text-xs mb-1">{emailError}</p>}
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail || ""}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email used for login"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700">
              Password {!updateId && <span className="text-red-500">*</span>}
              {updateId && <span className="text-xs text-zinc-500 ml-2">(Leave empty to keep current)</span>}
            </label>
            <input
              type="password"
              name="password"
              // 3. Ensuring the input reflects the cleared state
              value={formData.password || ""} 
              onChange={handleChange}
              required={!updateId}
              autoComplete="new-password"
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={updateId ? "Enter new password or leave blank" : "Min 6 characters"}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8 pb-6">
          <button
            type="button"
            onClick={() => dispatch(decrement())}
            disabled={submitting}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 disabled:bg-gray-400"
          >
            Previous
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {submitting ? "Processing..." : (updateId ? "Update Employee" : "Create Employee")}
          </button>
        </div>
      </form>
    </div>
  );
}