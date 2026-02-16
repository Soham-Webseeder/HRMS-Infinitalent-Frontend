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
  MdOutlineLocalPostOffice,
} from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiHumanTarget } from "react-icons/gi";
import { BsEnvelopePaper } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { CiPaperplane } from "react-icons/ci";

export const letterLinkData = {
  title: "Letters",
  src: "Chat",
  icon: <CgProfile fontSize={20} color={"grey"} />,
  path: "/app/letter",
  prePath: "letter",
  home: "/",
  subMenus: [
    {
      title: "Add-letter",
      icon: <BsEnvelopePaper fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/letter/add-letter",
    },
    {
      title: "Templates",
      icon: <MdOutlineLocalPostOffice fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/letter/templates",
    },

    {
      title: "Draft",
      icon: <RiDraftLine rget fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/letter/draft",
    },

    {
      title: "Sent Letter",
      icon: <CiPaperplane fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/letter/sent-letter",
    },

    // {
    //   title: "Create Templates",
    //   icon: <RiDraftLine rget fontSize={15} color={"grey"} />,
    //   cName: "sub-nav",
    //   path: "/letter/templates/createTemplate",
    // },

    {
      title: "Post Office",
      icon: <MdOutlineLocalPostOffice fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/letter/post-letter",
    },
  ],
};
function Letters() {
  return (
    <div>
      <DisplayComponent data={letterLinkData} />
    </div>
  );
}

export default Letters;
