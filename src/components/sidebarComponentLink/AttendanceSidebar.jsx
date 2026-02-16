import { GiInterleavedArrows } from "react-icons/gi"; 
import React from "react";
import DisplayComponent from "./DisplayComponent";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdCoPresent } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";

export const attendanceData = {
  title: "Attendance",
  src: "User",
  icon: <BsFillPeopleFill fontSize={20} color={"grey"} />,
  path: "/app/attendance",
  subMenus: [
    {
      title: "Attendance Form",
      icon: <MdCoPresent fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/attendance/form",
    },
    {
      title: "Monthly Attendance",
      icon: <FaCalendarAlt fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/attendance/monthly",
    },
    {
      title: "Leave Type",
      icon: <GiInterleavedArrows fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/leave/applicationType",
    },
    {
      title: "Employee Leave",
      icon: <FcLeave fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/leave/application",
    },
  ],
};
function AttendanceSidebar() {
  return (
    <div>
      <DisplayComponent data={attendanceData} />
    </div>
  );
}

export default AttendanceSidebar;
