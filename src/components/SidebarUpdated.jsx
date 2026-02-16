import { SlEnvolopeLetter } from "react-icons/sl";
import { RxDashboard } from "react-icons/rx";
import { IoIosHelpBuoy } from "react-icons/io";
import { FaWpforms } from "react-icons/fa";
import { RiContactsBookLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpeg";
import { RiHomeLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { GrAnnounce } from "react-icons/gr";
import { FaHeadphones } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";
import { GoReport } from "react-icons/go";
import { FcLeave } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../redux/slices/SidebarSlice";
import { useNavigate, useLocation } from "react-router-dom";

import { GrOverview } from "react-icons/gr";
import { FcDepartment } from "react-icons/fc";
import { MdAdminPanelSettings, MdAlternateEmail } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { GiHumanTarget } from "react-icons/gi";
import { FaBorderAll } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { MdCoPresent } from "react-icons/md";

import { IoPersonAddSharp } from "react-icons/io5";

import { FaProjectDiagram } from "react-icons/fa";
import { FaArrowsDownToPeople } from "react-icons/fa6";

import { IoIosPeople } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";

import { CiMoneyBill } from "react-icons/ci";

import { MdManageHistory } from "react-icons/md";
import { RiHammerFill } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineWebAsset, MdAccountCircle } from "react-icons/md";
import { BsFillPeopleFill, BsCalendarCheck } from "react-icons/bs";
import { TbReportMedical } from "react-icons/tb";
import { BiSolidReport } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import React from "react";

export const Menus = [
  {
    title: "Dashboard",
    src: "Chart_fill",
    icon: <RxDashboard fontSize={20} color={"grey"} />,
    path: "/",
    line: "line",
  },
  {
    title: "Company Profile",
    src: "Chat",
    icon: <CgProfile fontSize={20} color={"grey"} />,
    prePath: "company-profile",
    path: "/app/companyProfile",
  },
  {
    title: "Employee",
    src: "User",
    icon: <MdAccountCircle fontSize={20} color={"grey"} />,
    path: "/app/employee",
    prePath: "employee",
  },
  {
    title: "Asset",
    src: "User",
    icon: <MdOutlineWebAsset fontSize={20} color={"grey"} />,
    path: "/app/asset",
    prePath: "asset",
  },

  {
    title: "Attendance ",
    src: "User",
    icon: <BsFillPeopleFill fontSize={20} color={"grey"} />,
    path: "/app/attendance",
  },
  {
    title: "Letters",
    src: "User",
    icon: <SlEnvolopeLetter fontSize={20} color={"grey"} />,
    path: "/app/letter",
    prePath: "letter",
  },
  {
    title: "Payroll",
    src: "Chart",
    icon: <CiDollar fontSize={20} color={"grey"} />,
    path: "/app/payroll",
    prePath: "payroll",
  },
  {
    title: "Report",
    src: "Chat",
    icon: <GoReport fontSize={20} color={"grey"} />,
    path: "/app/report",
    prePath: "report",
  },
  {
    title: "Location",
    src: "User",
    icon: <MdLocationOn fontSize={20} color={"grey"} />,
    path: "/app/location-tracking/logs",
    prePath: "location-tracking",
  },
];

export const SidebarUpdated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currDropdown, setCurrDropdown] = useState(null);
  const [dropDownFlag, setDropDownFlag] = useState(false);
  const { sidebar } = useSelector((state) => state.sidebar);
  const [subPath, setSubPath] = useState(null);
  const dispatch = useDispatch();

  // handdlers
  const handleSidebarToggle = () => {
    dispatch(setSidebar(!sidebar));
  };

  const dropDownHanddler = (index, path) => {
    setCurrDropdown(index);

    if (path === "none" && dropDownFlag === false) {
      setDropDownFlag(true);
    } else if (path === "none" && currDropdown !== index) {
      setDropDownFlag(true);
    } else {
      setCurrDropdown(false);
    }
  };

  const [prevPath, setPrevPath] = useState(null);
  const pathSegment = location.pathname.split("/")[1];

  useEffect(() => {
    setPrevPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-[95vh] max-md:h-full flex items-start justify-start p-0 sticky top-0 max-md:fixed z-40 bg-white">
      <button
        className={`fixed right-2 top-2 rounded-md p-1 md:hidden z-40 font-bold text-white bg-red-400 hover:bg-red-500 active:bg-red-300 duration-200`}
        onClick={handleSidebarToggle}
      >
        Close
      </button>

      <div
        className={`max-md:w-[10.5rem]  md:w-20 bg-gray-700  overflow-y-auto no-scrollbar  border-2 rounded-3xl duration-500 h-full m-4`}
      >
        <div className="w-full flex items-center justify-center">
          <ul>
            {Menus.map((Menu, index) => (
              <li key={index} className="p-2">
                <Link
                  to={Menu.path !== "none" ? Menu.path : prevPath}
                  className={`flex rounded-md cursor-pointer font-semibold text-sm items-center ${(Menu.path === location.pathname ||
                      index === currDropdown ||
                      Menu?.prePath === pathSegment) &&
                    ""
                    }`}
                  onClick={() => dropDownHanddler(index, Menu.path)}
                  title={Menu.title} // Add title attribute here for the tooltip
                >
                  <div
                    className={`flex justify-center flex-col items-center py-3 px-3 rounded-xl ${(Menu.path === location.pathname ||
                        index === currDropdown ||
                        Menu?.prePath === pathSegment) &&
                      " bg-black"
                      }`}
                  >
                    {React.cloneElement(Menu.icon, {
                      size: window.innerWidth >= 1024 ? 30 : 25, // Adjust icon size for lg screens
                      color: "white",
                    })}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
