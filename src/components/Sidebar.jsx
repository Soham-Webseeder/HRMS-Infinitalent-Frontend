import { RiNewspaperLine } from "react-icons/ri";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CiPaperplane } from "react-icons/ci";
import { BsEnvelopePaper } from "react-icons/bs";
import { RiFilePaper2Line } from "react-icons/ri";
import { RiDraftLine } from "react-icons/ri";
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
const Menus = [
  {
    title: "Dashboard",
    src: "Chart_fill",
    icon: <RiHomeLine fontSize={20} color={"grey"} />,
    path: "/",
  },
  {
    title: "Company Profile",
    src: "Chat",
    icon: <CgProfile fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "company-profile",
    subMenus: [
      {
        title: "Overview",
        icon: <GrOverview fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/company-profile/overview",
      },

      {
        title: "Departments",
        icon: <HiOutlineOfficeBuilding fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/company-profile/department",
      },

      {
        title: "Admin",
        icon: <MdAdminPanelSettings fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/company-profile/admin",
      },
      {
        title: "Policies",
        icon: <MdOutlinePolicy fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/company-profile/policies",
      },
    ],
  },

  {
    title: "Announcement",
    src: "chat",
    icon: <GrAnnounce fontSize={20} color={"grey"} />,
    path: "/annoucements",
  },

  {
    title: "Employee",
    src: "User",
    icon: <MdAccountCircle fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "employee",
    subMenus: [
      {
        title: "Add Employee",
        icon: <MdGroupAdd fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/employee/add-employee",
      },
      {
        title: "Manage Employee",
        icon: <GiHumanTarget fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/employee/manage-employee",
      },
      // {
      //   title: "All Position",
      //   icon: <FaBorderAll fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/employee/all-position"
      // }
      // ,
      {
        title: "Employee Performance",
        icon: <MdAssignmentAdd fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/employee/manage-employee-performance",
      },
    ],
  },

  {
    title: "Asset",
    src: "User",
    icon: <MdOutlineWebAsset fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "asset",
    subMenus: [
      {
        title: "All Asset",
        icon: <MdAssignmentAdd fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/asset/all-AssetType",
      },
      {
        title: "Asset Assign",
        icon: <GrResources fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/asset/asset-assign",
      },
      {
        title: "All Equipments",
        icon: <RiHammerFill fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/asset/all-equipments",
        // path: "/asset/manage-equipment"
      },
    ],
  },

  {
    title: "Annual Calendar ",
    src: "Calendar",
    icon: <BsCalendarCheck fontSize={20} color={"grey"} />,
    prePath: "annual-calendar",
    path: "/leave/Annualholiday",
  },

  {
    title: "Attendance ",
    src: "User",
    icon: <BsFillPeopleFill fontSize={20} color={"grey"} />,
    path: "none",
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
        title: "Employee Leave",
        icon: <FcLeave fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/leave/application",
      },
    ],
  },

  {
    title: "Letter",
    src: "User",
    icon: <RiNewspaperLine fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "letter",
    subMenus: [
      {
        title: "Create Letter",
        icon: <BsEnvelopePaper fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/letter/add-letter",
      },
      // {
      //   title: "New Letter",
      //   icon: <GiHumanTarget fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/letter/create-letter",
      // },
      {
        title: "Drafts",
        icon: <RiDraftLine rget fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/letter/draft",
      },
      {
        title: "Sent Letters",
        icon: <CiPaperplane fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/letter/sent-letter",
      },
      {
        title: "Post Office",
        icon: <MdOutlineLocalPostOffice fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/letter/post-letter",
      },
    ],
  },
  {
    title: "Recruitment",
    src: "User",
    icon: <FaHeadphones fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "recruitment",
    subMenus: [
      {
        title: "Add Candidate",
        icon: <IoPersonAddSharp fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/recruitment/add-candidate",
      },
      // {
      //   title: "Candidate Information",
      //   icon: <FcLeave fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/recruitment/candidate-information"
      // }

      // ,
      // {
      //   title: "Interview",
      //   icon: <FcLeave fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/recruitment/interview"
      // },
      // {
      //   title: "Manage Candidate",
      //   icon: <FcLeave fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/recruitment/manage-candidate"
      // }
      // ,

      {
        title: "Recruitment Management",
        icon: <FaProjectDiagram fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/recruitment/recruitment-management",
      },
      // {
      //   title: "Employee Recruitment",
      //   icon: <FaArrowsDownToPeople fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/recruitment/employee-recruitment"
      // }
      // ,
      // {
      //   title: "All Recruitment",
      //   icon: <IoIosPeople fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/recruitment/all-recruitment"
      // },
      // {
      //   title: "Candidate Selection",
      //   icon: <FcLeave fontSize={15} color={"grey"} />,
      //   cName: "sub-nav",
      //   path: "/recruitment/candidate-selection"
      // }
      // ,
    ],
  },

  {
    title: "Payroll",
    src: "Chart",
    icon: <CiDollar fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "payroll",
    subMenus: [
      
      {
        title: "Package & Proration",
        icon: <CiMoneyBill fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/package-proration",
      },
      {
        title: "Tax-Sheet",
        icon: <GiMoneyStack fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/tax-sheet",
      },
      
      {
        title: "Salary Setup",
        icon: <GiMoneyStack fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/salary-setup",
      },
      {
        title: "Manage Salary",
        icon: <CiMoneyBill fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/ManageEmployeeSalary",
      },
      {
        title: "IT Declaration",
        icon: <MdManageHistory fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/IT-declaration",
      },
      
      {
        title: "Form16",
        icon: <GiMoneyStack fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/form-16",
      },

      {
        title: "Income Tax",
        icon: <CiMoneyBill fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/income-tax",
      },

      
      {
        title: "Salary-Slip",
        icon: <GiMoneyStack fontSize={15} color={"grey"} />,
        cName: "sub-nav",
        path: "/payroll/salary-slip",
      },
    ],
  },

  {
    title: "Report",
    src: "Chat",
    icon: <GoReport fontSize={20} color={"grey"} />,
    path: "none",
    prePath: "report",
    subMenus: [
      {
        title: "Employee On Leave",
        src: "/Report/EmployeeOnLeave",
        icon: <FcLeave fontSize={15} color={"grey"} />,
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
      // {
      //   title: "Custom Report",
      //   src: "/Report/CustomReport",
      //   icon: <TbReportAnalytics fontSize={15} color={"grey"} />,
      //   path: "/report/custom-report"
      // },
    ],
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currDropdown, setCurrDropdown] = useState(null);
  const [dropDownFlag, setDropDownFlag] = useState(false);
  const { sidebar } = useSelector((state) => state.sidebar);
  const [subPath, setSubPath] = useState(null);

  const dispatch = useDispatch();

  const handleSidebarToggle = () => {
    dispatch(setSidebar(!sidebar));
  };

  // Handle opening/closing of dropdowns
  const dropDownHandler = (index, path) => {
    if (currDropdown === index) {
      // Close the currently active dropdown
      setDropDownFlag(false);
      setCurrDropdown(null);
    } else {
      // Open the new dropdown and close the previous one
      setCurrDropdown(index);
      setDropDownFlag(true);
    }
  };

  const [prevPath, setPrevPath] = useState(null);
  const pathSegment = location.pathname.split("/")[1];

  useEffect(() => {
    setPrevPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-[100vh] max-md:h-full bg-white flex items-start justify-start p-0 sticky top-0 max-md:fixed z-40">
      <button
        className={`fixed right-2 top-2 rounded-md p-1 md:hidden z-40 font-bold text-white bg-red-400 hover:bg-red-500 active:bg-red-300 duration-200`}
        onClick={handleSidebarToggle}
      >
        Close
      </button>

      <div className={`max-md:w-[15.5rem] px-2 md:w-60 bg-white duration-500`}>
        <div className="pt-6 overflow-y-auto mt-16">
          <ul>
            {Menus.map((Menu, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={Menu.path !== "none" ? Menu.path : prevPath}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-400 hover:text-white text-black font-semibold text-sm items-center gap-x-4 ${
                    (Menu.path === location.pathname ||
                      index === currDropdown ||
                      Menu?.prePath === pathSegment) &&
                    "bg-blue-400 text-white"
                  }`}
                  onClick={() => dropDownHandler(index, Menu.path)}
                >
                  {Menu.icon}
                  <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                    {Menu.title}
                  </span>
                  {Menu.subMenus && (
                    <IoMdArrowDropdown
                      className={`transition-transform duration-500 ease-in-out ${
                        currDropdown === index && dropDownFlag && "rotate-180"
                      }`}
                    />
                  )}
                </Link>

                {currDropdown === index && dropDownFlag && (
                  <ul
                    className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
                    style={{
                      maxHeight: dropDownFlag ? "200px" : "0",
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    {Menu?.subMenus?.map((subMenuItem, idx) => (
                      <Link
                        to={subMenuItem.path}
                        key={idx}
                        className={`flex px-4 cursor-pointer text-sm text-black py-1 mb-1 rounded-md hover:bg-blue-400 hover:text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${
                          subMenuItem.path === location.pathname &&
                          "bg-blue-400 text-white"
                        }`}
                        onClick={() => setSubPath(subMenuItem.path)}
                      >
                        {subMenuItem?.icon && (
                          <span className="mr-2 pt-1">{subMenuItem.icon}</span>
                        )}
                        {subMenuItem.title}
                      </Link>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-0 max-md:w-[15.5rem] md:w-60 py-2 border-t">
        <div className="flex justify-between px-6">
          <AiOutlineUserAdd
            fontSize={38}
            className="text-blue-950 cursor-pointer hover:bg-gray-200 rounded-full p-2"
            onClick={()=>{
              navigate('/employee/invite_new_employee')
            }}
          />
          <RiContactsBookLine
            fontSize={38}
            onClick={()=>{
              navigate('/directory')
            }}
            className="text-blue-950 cursor-pointer hover:bg-gray-200 rounded-full p-2"
          />
          <FaWpforms
            fontSize={38}
            className="text-blue-950 cursor-pointer hover:bg-gray-200 rounded-full p-2"
          />
          <IoIosHelpBuoy
            fontSize={40}
            className="text-blue-950 cursor-pointer hover:bg-gray-200 rounded-full p-2"
          />
        </div>
      </div>
    </div>
  );
};
