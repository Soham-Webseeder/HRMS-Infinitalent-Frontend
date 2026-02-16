import React from "react";

export const WorkHistory = () => {
  return (
    <div className="w-full mt-3 flex flex-col shadow-xl bg-slate-50 p-2">
      <div className="border-b border-gray-600 text-lg uppercase pb-2 font-medium">
        Work History
      </div>

      <div className="flex flex-col border border-gray-300 rounded-md overflow-hidden">
        <div className="flex flex-row bg-gray-200 px-4 py-2">
          <div className="flex-1">Department</div>
          <div className="flex-1">Designation</div>
          <div className="flex-1">From</div>
          <div className="flex-1">To</div>
        </div>
        <div className="flex flex-row px-4 py-2">
          <div className="flex-1">-</div>
          <div className="flex-1">-</div>
          <div className="flex-1">-</div>
          <div className="flex-1">-</div>
        </div>
      </div>

      <div className="mt-4 text-gray-600 pl-3 p-2">No work history found</div>
    </div>
  );
};
