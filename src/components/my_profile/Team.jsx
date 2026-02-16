import React from "react";
import ReportingManager from "./team/ReportingManager";

export const Team = () => {
  return (
    <div className="flex items-center flex-col justify-center gap-2">
      <div className="w-[44%]">
        <ReportingManager />
      </div>
    </div>
  );
};
