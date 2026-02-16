import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/slices/CounterSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setModal } from "../../redux/slices/SidebarSlice";
export default function LoginInfo({ updateId, setUpdateId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.counter);
  const [formData, setFormData] = useState(currentForm);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save form data to local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    try {
      // Convert Base64 strings to File objects

      const convertBase64ToFile = (base64String, fileName) => {
        const byteString = atob(base64String.split(",")[1]);
        const mimeString = base64String
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        return new File([blob], fileName, { type: mimeString });
      };

      let photographFile = null;
      if (formData.photograph && !updateId) {
        photographFile = convertBase64ToFile(
          formData.photograph,
          "photograph.jpg"
        );
      }

      let resumeFile = null;
      if (formData.resume) {
        resumeFile = convertBase64ToFile(formData.resume, "resume.pdf");
      }

      // Create a FormData object and append all form data
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "photograph" && photographFile) {
          formDataToSend.append(key, photographFile);
        } else if (key === "resume" && resumeFile) {
          formDataToSend.append(key, resumeFile);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      console.log("Calling API...");
      let res;
      if (updateId) {
        console.log("Update API hit");
        res = await axios.patch(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/employee/updateEmployee/${updateId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        console.log("Post API hit");
        res = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/employee/createEmployee`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (res.status === 200 || res.status === 201) {
        if (res.data.success) {
          localStorage.removeItem("formData");

          toast.success(
            updateId
              ? "Employee Updated Successfully..."
              : "Employee Added Successfully..."
          );
          if (updateId) {
            dispatch(setModal(false));
          }

          navigate("/employee/manage-employee");
          window.reload();
        } else {
          toast.error(
            updateId ? "Failed to update employee" : "Failed to add employee"
          );
        }
      } else {
        toast.error("Failed to submit employee data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit employee data");
    }
  };

  return (
    <>
      <div className="mt-4 ">
        <form onSubmit={handleSubmit}>
          <div className="h-[60vh]">
            <div className="mb-4">
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-zinc-700"
              >
                User Email <span className="text-red-500">*</span>
              </label>
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
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => dispatch(decrement())}
              className="bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              {!updateId ? "Submit" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
