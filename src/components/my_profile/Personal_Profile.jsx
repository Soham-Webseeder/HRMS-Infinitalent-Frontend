import React from "react";
import { RiAddFill } from "react-icons/ri";

export const Personal_Profile = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
  };

  return (
    <div className="flex items-center justify-center rounded-full bg-zinc-100">
      <div className=" w-[100px] h-[100px] rounded-full overflow-hidden flex items-center justify-center">
        <label
          htmlFor="upload-profile-image"
          className="absolute  bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200"
        >
          <RiAddFill className="text-blue-500 text-5xl" />
          <input
            type="file"
            id="upload-profile-image"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
};
