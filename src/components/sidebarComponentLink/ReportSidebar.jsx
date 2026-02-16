import { TbReportAnalytics, TbReportMoney } from "react-icons/tb"; 
import { TbFileReport } from "react-icons/tb"; 
import { HiOutlineDocumentReport } from "react-icons/hi"; 
import { HiDocumentReport } from "react-icons/hi"; 
import React from "react";
import DisplayComponent from "./DisplayComponent";
import { GoReport } from "react-icons/go";
import { FcLeave } from "react-icons/fc";
import { TbReportMedical } from "react-icons/tb";
import { MdOutlineWebAsset } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

export const reportData = {
  title: "Report",
  src: "Chat",
  icon: <GoReport fontSize={20} color={"grey"} />,
  path: "/app/report",
  prePath: "report",
  subMenus: [
    {
      title: "Employee On Leave",
      src: "/Report/EmployeeOnLeave",
      icon: <TbReportMoney  fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/report/employee-on-leave",
    },
    {
      title: "Demographic Report",
      src: "/Report/DemographicReport",
      icon: <TbReportMedical fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/report/demographic-report",
    },
    {
      title: "Assets",
      src: "/Report/Assets",
      icon: <MdOutlineWebAsset fontSize={15} color={"grey"} />,
      path: "/report/asset-info",
    },
    {
      title: "Benefit Report",
      src: "/Report/BenefitReport",
      icon: <BiSolidReport fontSize={15} color={"grey"} />,
      path: "/report/benefit-report",
    },
    {
      title: "EPFO Report",
      src: "/Report/PfReport",
      icon: <HiDocumentReport fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/report/pf-report",
    },
    
    {
      title: "Pt Report",
      src: "/Report/PtReport",
      icon: <HiOutlineDocumentReport fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/report/pt-report",
    },
    
    {
      title: "Esic Report",
      src: "/Report/EsicReport",
      icon: <TbFileReport fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/report/esic-report",
    },
    {
      title: "Employee Master Report",
      src: "/Report/EmployeeMasterReport",
      icon: <TbReportAnalytics fontSize={15} color={"grey"} />,
      path: "/report/employee-master-report"
    },

    
    {
      title: "Employee Exit Report",
      src: "/Report/EmployeeExitReport",
      icon: <HiOutlineDocumentReport fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/report/exit-report",
    },
  ],
};
function ReportSidebar() {
  return (
    <div>
      <DisplayComponent data={reportData} />
    </div>
  );
}

export default ReportSidebar;
