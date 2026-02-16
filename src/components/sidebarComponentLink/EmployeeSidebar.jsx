import { BiUserX } from "react-icons/bi";
import { BiUserVoice } from "react-icons/bi";
import React from "react";
import DisplayComponent from "./DisplayComponent";
import { GrOverview } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FcDepartment } from "react-icons/fc";
import {
  MdAdminPanelSettings,
  MdAlternateEmail,
  MdAssignmentAdd,
  MdGroupAdd,
} from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiHumanTarget } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";

export const employeeLinksdata = {
  title: "Employee",
  src: "Chat",
  icon: <CgProfile fontSize={20} color={"grey"} />,
  path: "/app/employee",
  prePath: "employee",
  home: "/",
  headingOne: "Employee",
  headingTwo: "Recruitment",
  subMenus: [
    {
      title: "Add-Employee",
      icon: <MdGroupAdd fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/employee/add-employee",
    },

    {
      title: "Manage-Employee",
      icon: <GiHumanTarget fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/employee/manage-employee",
    },

    {
      title: "Manage-Employee-Performance",
      icon: <MdAssignmentAdd fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/employee/manage-employee-performance",
    },

    {
      title: "Employee-Update",
      icon: <BiUserVoice fontSize={15} color={"grey"} />,

      cName: "sub-nav",
      path: "/employee/update-employee",
    },
    {
      title: "Employee-Resignations",
      icon: <BiUserX fontSize={15} color={"grey"} />,

      cName: "sub-nav",
      path: "/employee/resignation-employee",
    },
    {
      title: "Ex-Employees",
      icon: <GiHumanTarget fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/employee/ex-employee",
    },
  ],
  subMenusTwo: [
    {
      title: "Add Candidate",
      icon: <IoPersonAddSharp fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/recruitment/add-candidate",
    },
    {
      title: "Recruitment Management",
      icon: <FaProjectDiagram fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/recruitment/recruitment-management",
    },
  ],
};
function EmployeeSidebar() {
  return (
    <div>
      <DisplayComponent data={employeeLinksdata} />
    </div>
  );
}

export default EmployeeSidebar;
