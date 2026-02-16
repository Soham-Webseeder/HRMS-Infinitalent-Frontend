import { BiDownload } from "react-icons/bi";
import axios from "axios";
import React, { useState, useEffect } from "react";

function NoticeDash() {
  const [allNoticeData, setAllNoticeData] = useState([]);

  useEffect(() => {
    const getNotice = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/notice/getAllNotice`
      );
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const filteredData = res.data.data.filter((notice) => {
        return new Date(notice.noticeDate) >= oneWeekAgo;
      });

      setAllNoticeData(filteredData);
    };
    getNotice();
  }, []);

  // console.log(allNoticeData, "naskfjklsad");

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
    <div className="rounded-lg shadow-md border bg-[#0001] overflow-auto w-full p-1 2xl:p-4 ">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 headingFont">
        Notice
      </h2>
      <div className="bg-white  h-full col-span-1 p-4 w-full relative rounded-lg shadow">
        <div className="space-between flex flex-col gap-2 justify-between items-center mb-4">
        {allNoticeData && allNoticeData.length > 0 ? (
        allNoticeData.map((notice, index) => (
          <div key={notice._id} className="border w-full flex flex-col">
            <div className="flex justify-between py-2">
              <div className="flex items-center gap-2">
                <p className="pl-2 font-bold rounded-e-full bg-gray-800 h-10 w-10 text-white flex justify-start items-center">
                  {index + 1}
                </p>
                <p>{notice.noticeDate}</p>
              </div>
              <p className="flex flex-col py-2 items-end pr-2">
                <span className="font-medium">{notice.noticeType}</span>
              </p>
            </div>
            <div className="text-end pr-2">
              <p>{notice.description}</p>
            </div>
            <div className="flex justify-between">
              <p
                onClick={() => handleDownload(notice.attachmentImage)}
                className="bg-gray-800 p-2 cursor-pointer hover:bg-gray-700 text-white flex justify-center items-center gap-2"
              >
                <BiDownload size={20} />
                Download
              </p>
              <p className="text-end text-gray-800 font-bold pr-2">
                - {notice.noticeBy}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No notices found</p>
      )}
        </div>
      </div>
    </div>
  );
}

export default NoticeDash;
