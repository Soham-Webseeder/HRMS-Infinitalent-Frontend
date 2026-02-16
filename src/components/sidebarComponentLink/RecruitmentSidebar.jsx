import React from "react";
import DisplayComponent from "./DisplayComponent";
import { FaHeadphones, FaProjectDiagram } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";

export const recruitmentData = {
  title: "Recruitment",
  src: "User",
  icon: <FaHeadphones fontSize={20} color={"grey"} />,
  path: "/app/recruitment",
  prePath: "recruitment",
  subMenus: [
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
function RecruitmentSidebar() {
  return (
    <div>
      <DisplayComponent data={recruitmentData} />
    </div>
  );
}

export default RecruitmentSidebar;
