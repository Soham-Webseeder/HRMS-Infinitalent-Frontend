import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const notificationArray = [
  "Take the Tour to get started",
  "Complete your Company Profile",
  "Complete your Profile",
];

export const Notifications = () => {
  return (
    <div className="pt-1 mt-1 p-1 w-[50vw]">
      <h1 className="text-md font-bold text-slate-900">
        Tasks And Notifications
      </h1>
      <div className="w-full border-blue-500 border-l-4 mt-2 shadow-md">
        <div className="flex flex-col gap-0">
          {notificationArray.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full rounded-sm border flex flex-row items-center justify-between p-2 hover:bg-blue-100 transition-colors duration-200"
              >
                <div className="flex gap-4 items-center">
                  <MdKeyboardArrowLeft className="text-xl text-blue-500" />
                  <h1 className="text-black text-sm font-semibold">{item}</h1>
                </div>
                <div className="text-xl text-blue-500">
                  <MdKeyboardArrowRight />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
