import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSliders } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function NoticeBoard() {
  const navigate = useNavigate();
  const [notice, setNotice] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [editId, setEditId] = React.useState("");
  const [noticeData, setNoticeData] = useState({
    attachmentImageUrl: null,
  });
  const [allNoticeData, setAllNoticeData] = useState([]);
  const [updatedData, setUpdatedData] = useState();
  const [perPage, setPerPage] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("attachmentImageUrl", noticeData.attachmentImageUrl);
      formData.append("noticeType", noticeData.noticeType);
      formData.append("description", noticeData.description);
      formData.append("noticeDate", noticeData.noticeDate);
      formData.append("noticeBy", noticeData.noticeBy);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/notice/createNotice`,
        formData
      );
      toast.success("Notice created successfully!");
      location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
        setSelectedImage(null);
      }
    }
  };

  useEffect(() => {
    const getNotice = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/notice/getAllNotice`
      );
      setAllNoticeData(res.data.data);
      if (editId) {
        const resNotice = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/notice/getNoticeById/${editId}`
        );
        console.log(resNotice.data.data, "resnotice");
        setNoticeData(resNotice.data.data);
      }
    };
    getNotice();
  }, [editId]);

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "notice";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleEditClick = async () => {
    const formData = new FormData();
    formData.append("attachmentImageUrl", noticeData.attachmentImageUrl);
    formData.append("noticeType", noticeData.noticeType);
    formData.append("description", noticeData.description);
    formData.append("noticeDate", noticeData.noticeDate);
    formData.append("noticeBy", noticeData.noticeBy);

    const res = await axios.patch(
      `${import.meta.env.VITE_APP_BASE_URL}/notice/updateNotice/${editId}`,
      formData
    );
    location.reload();
    console.log(res, "response");
  };

  console.log(editId, "editIddddddddddd");

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_APP_BASE_URL}/notice/deleteNotice/${id}`
        );
        setAllNoticeData((prevData) =>
          prevData.filter((notice) => notice._id !== id)
        );
        console.log(res, "response");
      } catch (error) {
        console.error(error);
        alert("Failed to delete the notice. Please try again.");
      }
    } else {
      console.log("Deletion canceled by user.");
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log(noticeData, "notice data data");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value)); // Convert value to integer
  };

  const filteredNotices = allNoticeData.filter(
    (notice) =>
      notice.noticeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.noticeDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.noticeBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="p-4  flex flex-col items-center">
        <Toaster />
        <div className="container flex justify-center w-full  flex-col  border rounded-lg shadow-md p-4">
          <div className="flex gap-2 p-4 self-end">
            <button
              onClick={() => {
                setNotice(!notice);
              }}
              className="bg-blue-400 text-white font-bold p-2 rounded "
            >
              Add New Notice
            </button>
          </div>
          <div className="bg-white  p-4 shadow-md border rounded-md h-[60vh] overflow-x-auto">
            <div className="flex justify-between mb-4 ">
              <div className="flex flex-col gap-2 ">
                <label className="font-semibold">Show</label>
                <select
                  className="border shadow-md rounded p-1 w-40 outline-blue-400"
                  value={perPage}
                  onChange={handlePerPageChange}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                  <option>All</option>
                </select>
              </div>

              <div>
                <label className="p-2">Search:</label>
                <input
                  type="text"
                  className="border p-1 rounded outline-blue-400"
                  placeholder="search..."
                  onChange={handleSearch}
                  value={searchQuery}
                />
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className=" border">
                  <th className="p-2 border-r">SL No</th>
                  <th className="p-2 border-r">Notice Type</th>
                  <th className="p-2 border-r">Description</th>
                  <th className="p-2 border-r">Notice Date</th>
                  <th className="p-2 border-r">Notice By</th>
                  <th className="p-2 text-start">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredNotices.slice(0, perPage).map((notice, index) => (
                  <tr key={notice._id} className="border">
                    <td className="p-2 border-r">{index + 1}</td>
                    <td className="p-2 border-r">{notice.noticeType}</td>
                    <td className="p-2 border-r">{notice.description}</td>
                    <td className="p-2 border-r">{notice.noticeDate}</td>
                    <td className="p-2 border-r">{notice.noticeBy}</td>

                    <td className="p-2">
                      <div className="w-20">
                        <div className="flex h-10 ">
                          <div
                            className="cursor-pointer w-10 border p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-800"
                            onClick={() => {
                              navigate(`viewnotice/${notice._id}`);
                            }}
                          >
                            <AiOutlineEye size={20} className="mt-0.5" />
                          </div>
                          <button
                            className="border p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-800  w-10"
                            onClick={() =>
                              handleDownload(notice.attachmentImage)
                            }
                          >
                            <BiDownload size={20} />
                          </button>
                          <button
                            className="border p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-800  w-10"
                            onClick={() => {
                              setEditId(notice._id);
                              setShowEdit(true);
                            }}
                          >
                            <AiOutlineEdit size={20} />
                          </button>
                          <button
                            className="border p-2 text-blue-500 hover:bg-gray-100 hover:text-blue-800  w-10"
                            onClick={() => handleDeleteClick(notice._id)}
                          >
                            <AiOutlineDelete size={20} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {notice && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-gray-800   ">
          <div className="w-1/3 mx-auto p-8 bg-white shadow-lg rounded">
            <div className="font-bold text-xl mb-4">Notice Form</div>
            <div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="notice-type"
                >
                  Notice Type
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notice-type"
                  type="text"
                  name="noticeType"
                  value={noticeData.noticeType}
                  onChange={handleChange}
                  placeholder="Notice Type"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={noticeData.description}
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="notice-date"
                >
                  Notice Date <span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notice-date"
                  type="date"
                  onChange={handleChange}
                  name="noticeDate"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="attachment"
                >
                  Attachment
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="attachment"
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    console.log(file, "fsdakfjlkjflkajsfklsdklaflk");
                    if (file) {
                      setSelectedImage(URL.createObjectURL(file));
                      setNoticeData((prevFormData) => ({
                        ...prevFormData,
                        attachmentImageUrl: file,
                      }));
                    }
                  }}
                  accept="image/*"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="notice-by"
                >
                  Notice By
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notice-by"
                  type="text"
                  name="noticeBy"
                  onChange={handleChange}
                  placeholder="Notice By"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setNotice(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                >
                  cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEdit && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-50 bg-gray-800   ">
          <div className="w-1/3 mx-auto p-8 bg-white shadow-lg rounded">
            <div className="font-bold text-xl mb-4">Notice Form</div>
            <div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="notice-type"
                >
                  Notice Type
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notice-type"
                  type="text"
                  name="noticeType"
                  value={noticeData.noticeType}
                  onChange={handleUpdateChange}
                  placeholder="Notice Type"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  value={noticeData.description}
                  onChange={handleUpdateChange}
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="notice-date"
                >
                  Notice Date <span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notice-date"
                  type="date"
                  value={noticeData.noticeDate}
                  onChange={handleUpdateChange}
                  name="noticeDate"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="attachment"
                >
                  Attachment
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="attachment"
                  type="file"
                  value={noticeData.attachmentImageUrl}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      setSelectedImage(URL.createObjectURL(file));
                      setUpdatedData((prevFormData) => ({
                        ...prevFormData,
                        attachmentImageUrl: file,
                      }));
                    }
                  }}
                  accept="image/*"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-zinc-700 text-sm font-bold mb-2"
                  htmlFor="notice-by"
                >
                  Notice By
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notice-by"
                  type="text"
                  name="noticeBy"
                  value={noticeData.noticeBy}
                  onChange={handleUpdateChange}
                  placeholder="Notice By"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowEdit(false)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                >
                  cancel
                </button>
                <button
                  onClick={handleEditClick}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
