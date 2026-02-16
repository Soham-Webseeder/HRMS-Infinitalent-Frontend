import React from "react";

export const Navbar2 = () => {
  return (
    <div className="flex flex-row items-center justify-evenly bg-slate-500 w-[100vw] h-[90px]">
      <div>
        <img src="" alt="" />
      </div>
      <div className=" flex flex-col items-center justify-center text-2xl font-medium">
        <h1 className="">Hey , vivek!</h1>
        <h1>Have an Awesome day</h1>
      </div>
      <div className=" flex flex-col  justify-center text-light font-medium ">
        <div className=" flex-row">
          <div className="flex flex-row gap-1">
            <div>
              <h1>THU 18,JUL 2019</h1>
              <h1>10:02:39 PM</h1>
            </div>
            <button className="w-[150px] bg-red-600  border bg-red text-white p-1 border-black rounded-md">
              Add
            </button>
          </div>
          <h1>Total Work duration 0hr : 0min</h1>
        </div>
      </div>
    </div>
  );
};
