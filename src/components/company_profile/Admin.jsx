import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export const Admin = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    contact: "",
    designation: "",
    image: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/getAllAdmins`
      );
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("email", formData.email);
    formDataWithImage.append("contact", formData.contact);
    formDataWithImage.append("designation", formData.designation);
    if (formData.image) {
      formDataWithImage.append("image", formData.image);
    }

    try {
      let res;
      if (formData._id) {
        // Update existing admin
        res = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/company/updateAdmin/${formData._id}`,
          formDataWithImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new admin
        res = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/company/createAdmin`,
          formDataWithImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      console.log("Admin operation result:", res.data);
      fetchData(); // Fetch updated list of admins
      handleCancelClick(); // Reset form and hide add form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirmed) return; // Exit function if user cancels

    try {
      console.log(`Attempting to delete admin with id: ${id}`);
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/company/deleteAdmin/${id}`
      );
      console.log("Delete response:", res.data);

      fetchData(); // Fetch updated list of admins
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const toggleAddForm = () => {
    setFormData({
      _id: "",
      name: "",
      email: "",
      contact: "",
      designation: "",
      image: null,
    }); // Reset form data
    setShowAddForm(true); // Show the form
  };

  const handleEdit = (admin) => {
    setFormData({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      contact: admin.contact,
      designation: admin.designation,
      image: null, // Reset image field to avoid unwanted pre-fill
    });
    setShowAddForm(true); // Show the form in edit mode
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setFormData({
      _id: "",
      name: "",
      email: "",
      contact: "",
      designation: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen 2xl:bg-gray-100  w-full  sm:px-4   flex flex-col relative items-center pt-1">
      <div className="bg-white 2xl:border-gray-200 2xl:border 2xl:shadow-lg p-2  w-full 2xl:w-[80%]">
        <h1 className="text-2xl font-semibold mt-1">Company Admin</h1>
        <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
          <NavLink to="/" className="cursor-pointer hover:text-slate-800">
            Home
          </NavLink>
          <span>|</span>
          <NavLink
            to="/app/companyProfile"
            className="cursor-pointer hover:text-slate-800"
          >
            Company Profile
          </NavLink>
          <span>|</span>
          <span className="cursor-default text-gray-500 hover:text-slate-800">
            Company Admin
          </span>
        </div>

        <div className="flex  justify-between items-center mb-4">
          <div className="flex text-sm  w-fit text-gray-500 mt-1 gap-1"></div>

          <>
            {!showAddForm && (
              <button
                onClick={toggleAddForm}
                className="bg-blue-500 mr-2 text-white px-6 py-2 rounded-full hover:bg-blue-600 ml-auto"
              >
                Add New Admin
              </button>
            )}
          </>
        </div>

        <hr className=" py-2 " />

        <div className="w-full max-w-7xl ">
          <div className="flex flex-col bg-white ">
            <div className="w-full flex flex-col border rounded">
              <div className="flex flex-wrap justify-center mt-4">
                {data.map((admin) => (
                  <div
                    key={admin._id}
                    className="bg-white border-2 rounded-xl p-4 m-4 flex flex-col items-center shadow-md"
                    style={{
                      width: "300px",
                      height: "350px",
                      display: "flex",
                      justifyContent: "space-between",
                    }} // Reduced card height
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={admin.image || "default-image-url"} // Use a placeholder if no image is available
                        alt={`${admin.name}'s profile`}
                        className="h-20 w-20 rounded-full object-cover object-center"
                      />

                      <h2 className="text-xl font-semibold mb-2 text-center">
                        {admin.name}
                      </h2>
                    </div>
                    <div className="text-left w-full">
                      <p className="mb-1">
                        <strong>Email:</strong>{" "}
                        <a
                          href={`mailto:${admin.email}`}
                          className="block truncate"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {admin.email}
                        </a>
                      </p>
                      <p className="mb-1">
                        <strong>Contact:</strong> {admin.contact}
                      </p>
                      <p className="mb-1">
                        <strong>Designation:</strong> {admin.designation}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full"
                        onClick={() => handleEdit(admin)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full"
                        onClick={() => handleDelete(admin._id)}
                      >
                        <BiSolidTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showAddForm && (
                <div className="mt-4 bg-white rounded-lg shadow-lg p-4 w-full mx-auto">
                  <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="w-full"
                  >
                    <div className="flex flex-col space-y-2">
                      {formData._id && (
                        <input
                          type="hidden"
                          name="_id"
                          value={formData._id}
                        />
                      )}

                      <label className="text-lg font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border-2 rounded-lg p-2"
                        value={formData.name}
                        placeholder="Enter Name"
                        onChange={handleChange}
                        name="name"
                        required
                      />

                      <label className="text-lg font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border-2 rounded-lg p-2"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        required
                      />

                      <label className="text-lg font-medium">
                        Contact <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border-2 rounded-lg p-2"
                        placeholder="Enter Contact"
                        onChange={handleChange}
                        value={formData.contact}
                        name="contact"
                        required
                      />

                      <label className="text-lg font-medium">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full border-2 rounded-lg p-2"
                        placeholder="Enter Designation"
                        onChange={handleChange}
                        value={formData.designation}
                        name="designation"
                        required
                      />

                      <label className="text-lg font-medium">
                        Upload Photo
                      </label>
                      <input
                        className="w-full border-2 rounded-lg p-2"
                        type="file"
                        onChange={handleChange}
                        name="image"
                      />

                      {formData.image && (
                        <div className="flex justify-center mt-2">
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="h-20 w-20 rounded-full"
                          />
                        </div>
                      )}

                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={handleCancelClick}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
