import React from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";
export const Save_CancleButton = () => {
  return (
    <div className=" bg-white flex flex-row w-[500px] ">
      <div className="bg-white flex flex-row items-center justify-center rounded p-2 m-1">
        <RxCross2 />
        <button className=" text-black text-sm font-semibold"> CANCLE </button>
      </div>
      <div className="bg-blue-600 flex flex-row items-center justify-center rounded p-2 m-1 text-white">
        <AiOutlineCheck />
        <button type="submit" className=" text-white text-sm font-semibold">
          SAVE
        </button>
      </div>
    </div>
  );
};
