import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewNotice() {
  const { id } = useParams();
  console.log(id, "oddddddd");

  const [data, setData] = useState({});

  useEffect(() => {
    const getNotice = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/notice/getNoticeById/${id}`
      );
      setData(res.data.data);
    };
    getNotice();
  }, []);

  console.log(data, "dadata");

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

  return (
    <>
      <div className="flex  flex-col  items-center">
        <div className="w-1/2">
          <div className="bg-blue-500 p-4 flex justify-between items-center text-white ">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1.5m0 15V21m8.25-10.5h-1.5m-15 0h-1.5m17.34-6.72l-1.06 1.06m-13.56 0l-1.06-1.06m1.06 13.56l-1.06-1.06m13.56 0l1.06 1.06M12 6.75a5.25 5.25 0 015.25 5.25h-10.5a5.25 5.25 0 015.25-5.25zm0 0V3m0 18v-3.75m6.72-6.72l-1.06 1.06m-13.56 0L6.28 12m13.56 0a6.75 6.75 0 11-13.5 0h13.5z"
                />
              </svg>
              <span className="text-lg font-semibold">Notification</span>
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDownload(data.attachmentImage)}
            >
              Download Notice!
            </button>
          </div>
          <div className="p-4 bg-white space-y-4">
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-bold">Notice Date</span>
              <span>{data.noticeDate}</span>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-bold">Notice By</span>
              <span>{data.noticeBy}</span>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-bold">Notice</span>
              <span>{data.noticeType}</span>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-bold">Description</span>
              <span>{data.description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
