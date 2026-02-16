import { BiLinkExternal } from "react-icons/bi";
import { BsBoxArrowRight } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegWindowMaximize } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import React from "react";

const textMutedClass = "text-muted-foreground font-bold text-gray-800";
const textMediumClass = "text-lg ";
const borderClass = "border-b border-muted";

const AttendanceCard = ({ leaveCounts }) => {
  const {
    sickLeaveCount = 0,
    totalLeaveCount = 0,
    overtimeCount = 0,
  } = leaveCounts || {};
  console.log(leaveCounts, "leaveData");

  return (
    <div className="w-full p-4 bg-gray-100 rounded">
      <div className="flex w-full flex-col rounded shadow-md bg-white px-4 py-3">
        <Link
          to={"/attendance/form"}
          className="py-2 text-2xl font-bold text-foreground flex justify-start items-center gap-4 uppercase"
        >
          Attendance <BiLinkExternal />
        </Link>
        <div className="flex flex-col gap-3 justify-between">
          <AttendanceItem
            label="Sick-Leave"
            Icon={<FaRegWindowMaximize size={25} />}
            value={sickLeaveCount}
          />
          <AttendanceItem
            label="Leave"
            Icon={<BsBoxArrowRight size={25} />}
            value={totalLeaveCount}
          />
          <AttendanceItem
            label="Overtime"
            Icon={<AiOutlineClockCircle size={25} />}
            value={overtimeCount}
          />
        </div>
        <Link
          to={"/attendance/form"}
          className="bg-blue-200 text-blue-600 w-full p-2 rounded-lg hover:text-white flex justify-center items-center"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

const AttendanceItem = ({ label, value, Icon, Iconi }) => {
  return (
    <div className={`py-3 flex justify-between px-4 ${borderClass}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-blue-900">{Icon}</div>
          <div className={textMutedClass}>{label}</div>
        </div>
      </div>
      <div className={`${textMediumClass} font-light`}>{value}</div>
    </div>
  );
};

export default AttendanceCard;
