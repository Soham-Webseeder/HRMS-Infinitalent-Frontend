import { TiBusinessCard } from "react-icons/ti";
import { GrUserWorker } from "react-icons/gr";
import React from "react";
import DisplayComponent from "./DisplayComponent";
import { GrOverview } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FcDepartment } from "react-icons/fc";
import { MdAdminPanelSettings, MdAlternateEmail } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GrAnnounce } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";

export const companyProfileData = {
  title: "Company Profile",
  src: "Chat",
  icon: <CgProfile fontSize={20} color={"grey"} />,
  path: "/app/companyProfile",
  prePath: "company-profile",
  home: "/",
  headingOne: "Organization",
  headingTwo: "Policies",
  subMenus: [
    {
      title: "Overview",
      icon: <GrOverview fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/overview",
    },

    {
      title: "Business Unit",
      icon: <TiBusinessCard fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/business-unit",
    },
    {
      title: "Admin",
      icon: <MdAdminPanelSettings fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/admin",
    },
    {
      title: "Designation",
      icon: <GrUserWorker fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/designation",
    },
    {
      title: "Departments",
      icon: <HiOutlineOfficeBuilding fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/department",
    },

    {
      title: "Announcement",
      src: "chat",
      icon: <GrAnnounce fontSize={20} color={"grey"} />,
      path: "/annoucements",
    },

    {
      title: "Annual Calendar ",
      src: "Calendar",
      icon: <BsCalendarCheck fontSize={20} color={"grey"} />,
      prePath: "/app/attendance",
      path: "/leave/Annualholiday",
    },
  ],
  subMenusTwo: [
    {
      title: "HR Policy",
      icon: <GrUserWorker fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/hr-policy",
    },
    {
      title: "Attendance Policy",
      icon: <HiOutlineOfficeBuilding fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/attendance-policy",
    },
    {
      title: "Employee Leave Policy",
      icon: <GrOverview fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/employee-leave-policy",
    },

    {
      title: "LateCome / EarlyGo Policy",
      icon: <MdAdminPanelSettings fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/late-come-policy",
    },
    {
      title: "Salary Policy",
      icon: <MdOutlinePolicy fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/salary-policy",
    },
    {
      title: "Attendance Bonus Policy",
      icon: <GrUserWorker fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/attendance-bonus-policy",
    },
    {
      title: "Holiday Policy",
      icon: <GrUserWorker fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/holiday-policy",
    },
    {
      title: "Resignation Policy",
      icon: <GrUserWorker fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/company-profile/resignation-policy",
    },
  ],
};

function CompanyProfileSidenav() {
  return (
    <div>
      <DisplayComponent data={companyProfileData} />
    </div>
  );
}

export default CompanyProfileSidenav;
