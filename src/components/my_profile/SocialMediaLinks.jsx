import React, { useState } from "react";
import { ImLinkedin } from "react-icons/im";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillYoutube, AiOutlineCheck, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export const SocialMediaLinks = () => {
  const [editMode, setEditMode] = useState(false);
  const [socialMediaFormData, setSocialMediaFormData] = useState({
    linkedinUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
  });

  const handleEdit2 = () => {
    setEditMode(!editMode);
  };

  const handleSocialMediaSubmit = (e) => {
    e.preventDefault();
    console.log("Social media links submitted:", socialMediaFormData);
    setEditMode(false);
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaFormData({
      ...socialMediaFormData,
      [name]: value,
    });
  };

  return (
    <div className="bg-slate-100 h-50 w-full">
      <h2 className="text-xl font-semibold mb-6 border-b-[0.7px] border-gray-500 pl-3">
        Social Profile
      </h2>
      {!editMode ? (
        <div className="flex flex-row items-center justify-between ml-5 h-[60px]">
          <div className="flex flex-row items-center gap-2">
            <Link to="">
              <div className="text-3xl text-blue-700 rounded-full">
                <ImLinkedin />
              </div>
            </Link>
            <Link to="">
              <div className="text-3xl text-blue-700 rounded-full">
                <FaFacebook />
              </div>
            </Link>
            <Link to="">
              <div className="text-3xl text-white bg-black rounded-full">
                <FaTwitter />
              </div>
            </Link>
            <Link to="">
              <div className="text-3xl text-white bg-red-500 rounded-full">
                <AiFillYoutube />
              </div>
            </Link>
          </div>
          <div onClick={handleEdit2} className="text-xl cursor-pointer pr-3">
            <AiFillEdit />
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSocialMediaSubmit}>
            <div className="pl-7">
              <div className="flex flex-row justify-start items-center m-2">
                <div className="text-3xl text-blue-700 text-center">
                  <ImLinkedin />
                </div>
                <input
                  className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                  type="url"
                  name="linkedinUrl"
                  value={socialMediaFormData.linkedinUrl}
                  onChange={handleSocialMediaChange}
                  placeholder="Enter LinkedIn URL"
                />
              </div>
              <div className="flex flex-row justify-start items-center m-2">
                <div className="text-3xl text-blue-700 text-center">
                  <FaFacebook />
                </div>
                <input
                  className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                  type="url"
                  onChange={handleSocialMediaChange}
                  value={socialMediaFormData.facebookUrl}
                  name="facebookUrl"
                  placeholder="Enter Facebook URL"
                />
              </div>
              <div className="flex flex-row justify-start items-center m-2">
                <div className="text-3xl text-black text-center">
                  <FaTwitter />
                </div>
                <input
                  className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                  type="url"
                  onChange={handleSocialMediaChange}
                  value={socialMediaFormData.twitterUrl}
                  placeholder="Enter Twitter URL"
                  name="twitterUrl"
                />
              </div>
              <div className="flex flex-row justify-start items-center m-2">
                <div className="text-3xl text-blue-700 text-center">
                  <AiFillYoutube />
                </div>
                <input
                  className="border-b-[0.7px] border-gray-500 w-[80%] ml-4 rounded-md py-2 px-3 focus:outline-none"
                  type="url"
                  onChange={handleSocialMediaChange}
                  placeholder="Enter youtube URL"
                  value={socialMediaFormData.youtubeUrl}
                  name="youtubeUrl"
                />
              </div>
            </div>
            <div className="h-[100px] flex flex-row items-center justify-end bg-white">
              <div className="flex flex-row w-[300px]">
                <div className="bg-white flex gap-1 flex-row items-center justify-center rounded p-2 m-1 hover:scale-105 border border-gray-300">
                  <RxCross2 className="text-black text-sm font-semibold" />
                  <button
                    onClick={handleEdit2}
                    className="text-black text-sm font-semibold"
                  >
                    CANCEL
                  </button>
                </div>
                <div className="bg-blue-600 flex items-center justify-center rounded p-2 m-1 text-white hover:scale-105 hover:shadow-md">
                  <AiOutlineCheck className="text-xl" />
                  <button
                    type="submit"
                    className="text-white text-sm font-semibold pl-3 pr-3"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
