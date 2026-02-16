import { createBrowserRouter } from "react-router-dom";
import { CompanyProfile } from "../layout/CompanyProfile";
import { Home } from "../pages/Home";
import { Address } from "../components/company_profile/Address";
import { Admin } from "../components/company_profile/Admin";
import { Announcement } from "../components/company_profile/Announcement";
import { Department } from "../components/company_profile/Department";
import { Designation } from "../components/company_profile/Designation";
import { Myplan } from "../components/company_profile/Myplan";
import { Policies } from "../components/company_profile/Policies";
import { Statutory } from "../components/company_profile/Statutory";
import { Signup1 } from "../components/signup/Signup1";
import Login from "../components/login/Login";
import ForgotPassword from "../components/login/ForgotPassword";
import { Sidebar } from "../components/Sidebar";
import { MyProfile } from "../layout/MyProfile";
import { Work } from "../components/my_profile/Work";
import { Team } from "../components/my_profile/Team";
import { Education } from "../components/my_profile/Education";
import { Family } from "../components/my_profile/Family";
import { FileManager } from "../components/my_profile/FileManager";
import { Personal } from "../components/my_profile/Personal";
import { Document } from "../components/my_profile/Document";
import CheckAuth from "../components/CheckAuth";
import { Workweek } from "../components/my_profile/Workweek";
import AllPosition from "../components/employee/AllPosition";
import ManagePosition from "../components/employee/ManagePosition";
import Division from "../components/company_profile/Division";
import Departments from "../layout/Departments";
import NoticeBoard from "../components/noticeBoard/NoticeBoard";
import Leave from "../layout/Leave";
import { WeeklyHoliday } from "../components/leave/WeeklyHoliday";
import Holiday from "../components/leave/Holiday";
import AddLeaveType from "../components/leave/AddLeaveType";
import LeaveApplication from "../components/leave/LeaveApplication";
// import CandidateInformation from "../components/recruiment/CandidateInforation";
import AddNewCandidate from "../components/recruiment/AddNewCandidate";
import AddEmployee from "../components/employee/AddEmployee";
import Interview from "../components/recruiment/Interview";
import SalaryBenefits from "../components/payroll/SalaryBenefits";
import ViewNotice from "../components/noticeBoard/ViewNotice";
import SalarySetup from "../components/payroll/SalarySetup";
// import {Attendence} from "../layout/Attendence";
import AddEquipment from "../components/asset/equipment/AddEquipment";
import AllEquipment from "../components/asset/equipment/AllEquipment";
import Asset from "../layout/Asset";
import DailyPresent from "../components/report/DailyPresent";
import Report from "../layout/Report";
import MonthlyPresent from "../components/report/MonthlyPresent";
import DailyAbsent from "../components/report/DailyAbsent";
import MonthlyAbsent from "../components/report/MonthlyAbsent";
import AddAssetType from "../components/asset/AddAssetType";
import AllAssetType from "../components/asset/AllAssetType";
import ManageAssetType from "../components/asset/ManageAssetType";
import { EmployeeAttendance } from "../components/employeeComponents/EmployeeAttendance";
import AttendanceLogs from "../components/attendance/AttendanceLog";
import EmployeeOnLeave from "../components/report/EmployeeOnLeave";
import DemographicReport from "../components/report/DemographicReport";
import PositionalInfo from "../components/report/PositionalInfo";
import { AttendanceDetails } from "../components/attendance/AttendanceDetails";
import MonthlyAttendance from "../components/attendance/MonthlyAttendance";
import AssetInfo from "../components/report/AssetInfo";
import BenefitReport from "../components/report/BenefitReport";
import CustomReport from "../components/report/CustomReport";
import ManageEquipments from "../components/asset/equipment/ManageEquipments";
import AddEmployeePerformance from "../components/employee/AddEmployeePerformance";
import AllEmployeePerformance from "../components/employee/AllEmployeePerformance";
import ManageEmployeeSalary from "../components/payroll/ManageEmployeeSalary";
import AssignAsset from "../components/asset/AssignAsset";
import ManageEmployeePerformance from "../components/employee/ManageEmployeePerformance";
import ManageCandidate from "../components/recruiment/ManageCandidate/ManageCandidate";
import Recruitment from "../layout/Recruitment";
import Attendance from "../layout/Attendence";
import CandidateSelection from "../components/recruiment/CandidateSelection";
import ManageEmployee from "../components/employee/ManageEmployee";
import CandidateInformation from "../components/recruiment/CandidateInforation";
import SalaryGenerate from "../components/report/SalaryGenerate";
import Register from "../components/Register";
import RoleBasedRoute from "../components/RoleBasedRoute";
import EmployeeDashboard from "../components/EmployeeDashboard";
import EmployeeDashboardLayout from "../layout/EmployeeDashboardLayout";
import Payroll from "../components/employeeComponents/EmployeePayroll";
import EmployeeLeave from "../components/employeeComponents/EmployeeLeave";
import EmployeePayroll from "../components/employeeComponents/EmployeePayroll";
import EmployeeAsset from "../components/employeeComponents/EmployeeAsset";
import AnnualHoliday from "../components/AnnualHoliday";
import AttendanceForm from "../components/attendance/AttendenceForm";
import Recruitment_Management from "../components/recruiment/Recruitment_Management";
import EmployeeRecruitment from "../components/recruiment/EmployeeRecruitment";
import AllRecruitments from "../components/recruiment/AllRecruitments";
import { Announcements } from "../layout/Annoucements";
import MyProfileShow from "../components/MyProfileShow";
import SalarySlip from "../components/payroll/SalarySlip";
import CompanyProfileSidenav from "../components/sidebarComponentLink/CompanyProfileSidenav";
import { Letter } from "../layout/Letter";
import CreateLetter from "../components/letter/CreateLetter";
import Invite_New_Employee from "../components/Invite_New_Employee";
import EmployeeSidebar from "../components/sidebarComponentLink/EmployeeSidebar";
import AssetProfileSidenav from "../components/sidebarComponentLink/AssetProfile";
import AttendanceSidebar from "../components/sidebarComponentLink/AttendanceSidebar";
import RecruitmentSidebar from "../components/sidebarComponentLink/RecruitmentSidebar";
import ReportSidebar from "../components/sidebarComponentLink/ReportSidebar";
import PayrollSidebar from "../components/sidebarComponentLink/PayrollSidebar";
import Drafts from "../components/asset/Drafts";
import SentLetters from "../components/asset/SentLetters";
import PostOffice from "../components/asset/PostOffice";
import NewLetter from "../components/asset/NewLetter";
import NewEmployeeBasic from "../components/new_employee/NewEmployeeBasic";
import NewEmployeeMain from "../components/new_employee/NewEmployeeMain";
import IncomeTax from "../components/payroll/IncomeTax";
import DeclarationWindowMain from "../components/payroll/Declaration";
import LeavePolicies from "../components/leavePolicies/LeavePolicies";
import Letters from "../components/sidebarComponentLink/Letters";
import NewAttendance from "../components/attendance/NewAttendance";
import LateCome_EarlyGo_Policy from "../components/company_profile/LateComePolicy";
import ResignationInfo from "../components/my_profile/work/ResignationInfo";
import ResignationPolicy from "../components/company_profile/ResignationPolicy";
import HolidayPolicy from "../components/company_profile/HolidayPolicy";
import AttendancePolicy from "../components/company_profile/AttendancePolicy";
import EmployeeLeavePolicy from "../components/company_profile/EmployeeLeavePolicy";
import SalaryPolicy from "../components/company_profile/SalaryPolicy";
import HRPolicy from "../components/company_profile/HRPolicy";
import NewAssetAssign from "../components/asset/equipment/NewAssetAssign";
import NewManageEmployee from "../components/employee/NewManageEmployee";
import NewManageEmployeePerformance from "../components/employee/NewManageEmpPerformance";
import NewAssetType from "../components/asset/equipment/NewAssetType";
import NewDesignation from "../components/company_profile/NewDesignation";
import NewLeaveApplication from "../components/leave/NewLeaveApplication";
import NewRecruitmentManagement from "../components/recruiment/NewRecruitmentManagement";
import NewAllEquipment from "../components/asset/equipment/NewEquipment";
import Form16 from "../components/form16";
import PackageProration from "../components/payroll/PackageProration";
import TaxSheet from "../components/payroll/Tax_Sheet";
import AddNewCandidate2 from "../components/recruiment/AddNewCandidate2";
import NewMonthlyAttendance from "../components/attendance/NewMonthlyAttendance";
import { NewAnnouncement } from "../components/company_profile/NewAnnouncement";
import NewAssetInfo from "../components/report/NewAssetInfo";
import NewBenefitReport from "../components/report/NewBenefit";
import AddEmployee2 from "../components/employeeComponents/AddEmployee2";
import PaySlip from "../components/payroll/PaySlip";
import Overview2 from "../components/company_profile/Overview2";
import { BusinessUnit } from "../components/company_profile/BusinessUnit";
import NewDepartment from "../components/company_profile/NewDepartment";
import DirectoryMain from "../components/employeeComponents/Directory";
import AttendanceBonusPolicy from "../components/company_profile/AttendanceBonusPolicy";
import EmployeeUpdate from "../components/employee/EmployeeUpdate";
import PayRollDashboard from "../components/payroll/PayRollDashboard";
import RunPayroll from "../components/payroll/RunPayroll";
import PaySlipStep2 from "../components/payroll/PaySlipStep2";
import LOP from "../components/payroll/LOP";
import EmployeeResignations from "../components/employee/EmployeeResignations";
import EditDraftLetter from "../components/letter/EditDraft";
import Templates from "../components/letter/Templates";
import CreateTemplate from "../components/letter/CreateTemplate";
import PfReport from "../components/report/PfReport";
import EsicReport from "../components/report/EsicReport";
import PtReport from "../components/report/PtReport";
import LetterView from "../components/letter/LetterView";
import ExtraPay from "../components/payroll/ExtraPay";
import ManageExEmployee from "../components/employee/ManageExEmployee";
import ExtraDeductions from "../components/payroll/ExtraDeduction";
import EmployeeMasterReport from "../components/report/EmployeeMasterReport";
import EmployeeExitReport from "../components/report/EmployeeExutReport";
import DeletePayroll from "../components/payroll/DeletePayroll";
import EmployeeLocationLogs from "../components/LocationTrack/EmployeeLocationLogs";
import EmployeeTravelMap from "../components/LocationTrack/EmployeeTravelMap";

const redirectPaths = {
  admin: "/",
  headHr: "/",
  hr: "/",
  employee: "/emp/dashboard",
};

const router = createBrowserRouter([
  {
    path: "/emp",
    element: (
      <RoleBasedRoute
        element={EmployeeDashboardLayout}
        allowedRoles={["employee"]}
        redirectPaths={redirectPaths}
      />
    ),
    children: [
      {
        path: "dashboard",
        element: <EmployeeDashboard />,
      },
      {
        path: "attendance",
        element: <EmployeeAttendance />,
      },
      {
        path: "leave",
        element: <EmployeeLeave />,
      },
      {
        path: "payroll",
        element: <EmployeePayroll />,
      },
      {
        path: "assign-asset",
        element: <EmployeeAsset />,
      },
    ],
  },

  // letter
  {
    path: "/letter",
    element: <Letter />,
    children: [
      {
        path: "create-letter",
        element: (
          <CheckAuth>
            <CreateLetter />
          </CheckAuth>
        ),
      },
      {
        path: "edit-draft/:draftId",
        element: (
          <CheckAuth>
            <EditDraftLetter />
          </CheckAuth>
        ),
      },
      {
        path: "templates",
        element: (
          <CheckAuth>
            <Templates />
          </CheckAuth>
        ),
      },
      {
        path: "templates/createTemplate",
        element: (
          <CheckAuth>
            <CreateTemplate />
          </CheckAuth>
        )
      },
      {
        path: "template/view/:templateId",
        element: (
          <CheckAuth>
            <LetterView />
          </CheckAuth>
        )
      }
    ],
  },
  {
    path: "/annoucements",
    element: <Announcements />,
    children: [
      {
        path: "",
        element: (
          <CheckAuth>
            <NewAnnouncement />
          </CheckAuth>
        ),
      },
    ],
  },

  {
    path: "/app",
    element: <CompanyProfile />,
    children: [
      {
        path: "companyProfile",
        element: (
          <CheckAuth>
            <CompanyProfileSidenav />
          </CheckAuth>
        ),
      },

      {
        path: "employee",
        element: (
          <CheckAuth>
            <EmployeeSidebar />
          </CheckAuth>
        ),
      },
      {
        path: "asset",
        element: (
          <CheckAuth>
            <AssetProfileSidenav />
          </CheckAuth>
        ),
      },
      {
        path: "attendance",
        element: (
          <CheckAuth>
            <AttendanceSidebar />
          </CheckAuth>
        ),
      },
      {
        path: "recruitment",
        element: (
          <CheckAuth>
            <RecruitmentSidebar />
          </CheckAuth>
        ),
      },

      {
        path: "letter",
        element: (
          <CheckAuth>
            <Letters />
          </CheckAuth>
        ),
      },
      {
        path: "report",
        element: (
          <CheckAuth>
            <ReportSidebar />
          </CheckAuth>
        ),
      },
      {
        path: "payroll",
        element: (
          <CheckAuth>
            <PayrollSidebar />
          </CheckAuth>
        ),
      },
      {
        path: "companyProfile/policies/leave",
        element: (
          <CheckAuth>
            <LeavePolicies />
          </CheckAuth>
        ),
      },
      {
        path: "location-tracking/logs",
        element: (
          <CheckAuth>
            <EmployeeLocationLogs />
          </CheckAuth>
        ),
      },
      {
        path: "location-tracking/map/:employeeId",
        element: (
          <CheckAuth>
            <EmployeeTravelMap />
          </CheckAuth>
        ),
      }
    ],
  },
  {
    path: "/company-profile",
    element: <CompanyProfile />,
    children: [
      {
        path: "overview",
        element: (
          <CheckAuth>
            <Overview2 />
          </CheckAuth>
        ),
      },
      {
        path: "address",
        element: (
          <CheckAuth>
            {" "}
            <Address />
          </CheckAuth>
        ),
      },
      {
        path: "admin",
        element: (
          <CheckAuth>
            <Admin />
          </CheckAuth>
        ),
      },
      {
        path: "department",
        element: (
          <CheckAuth>
            <NewDepartment />
          </CheckAuth>
        ),
      },
      {
        path: "business-unit",
        element: (
          <CheckAuth>
            <BusinessUnit />
          </CheckAuth>
        ),
      },
      {
        path: "divison",
        element: (
          <CheckAuth>
            <Division />
          </CheckAuth>
        ),
      },
      // {
      //   path: "designation",
      //   element: (
      //     <CheckAuth>
      //       <Designation />
      //     </CheckAuth>
      //   ),
      // },

      {
        path: "designation",
        element: (
          <CheckAuth>
            <NewDesignation />
          </CheckAuth>
        ),
      },
      {
        path: "myplan",
        element: (
          <CheckAuth>
            <Myplan />
          </CheckAuth>
        ),
      },
      {
        path: "policies",
        element: (
          <CheckAuth>
            <Policies />
          </CheckAuth>
        ),
      },

      {
        path: "late-come-policy",
        element: (
          <CheckAuth>
            <LateCome_EarlyGo_Policy />
          </CheckAuth>
        ),
      },

      {
        path: "resignation-policy",
        element: (
          <CheckAuth>
            <ResignationPolicy />
          </CheckAuth>
        ),
      },

      {
        path: "holiday-policy",
        element: (
          <CheckAuth>
            <HolidayPolicy />
          </CheckAuth>
        ),
      },

      {
        path: "attendance-bonus-policy",
        element: (
          <CheckAuth>
            <AttendanceBonusPolicy />
          </CheckAuth>
        ),
      },

      {
        path: "attendance-policy",
        element: (
          <CheckAuth>
            <AttendancePolicy />
          </CheckAuth>
        ),
      },

      {
        path: "employee-leave-policy",
        element: (
          <CheckAuth>
            <EmployeeLeavePolicy />
          </CheckAuth>
        ),
      },

      {
        path: "salary-policy",
        element: (
          <CheckAuth>
            <SalaryPolicy />
          </CheckAuth>
        ),
      },
      {
        path: "hr-policy",
        element: (
          <CheckAuth>
            <HRPolicy />
          </CheckAuth>
        ),
      },

      {
        path: "statutory",
        element: (
          <CheckAuth>
            <Statutory />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <CompanyProfile />,
    children: [
      {
        path: "MyProfile",
        element: (
          <CheckAuth>
            <MyProfileShow />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
    children: [
      {
        path: "personal",
        element: (
          <CheckAuth>
            <Personal />
          </CheckAuth>
        ),
      },

      {
        path: "work",
        element: (
          <CheckAuth>
            <Work />
          </CheckAuth>
        ),
      },
      {
        path: "work-week",
        element: (
          <CheckAuth>
            <Workweek />
          </CheckAuth>
        ),
      },
      {
        path: "team",
        element: (
          <CheckAuth>
            <Team />
          </CheckAuth>
        ),
      },
      {
        path: "education",
        element: (
          <CheckAuth>
            <Education />
          </CheckAuth>
        ),
      },
      {
        path: "family",
        element: (
          <CheckAuth>
            <Family />
          </CheckAuth>
        ),
      },
      {
        path: "documents",
        element: (
          <CheckAuth>
            <Document />
          </CheckAuth>
        ),
      },
      {
        path: "file-manager",
        element: (
          <CheckAuth>
            <FileManager />
          </CheckAuth>
        ),
      },
    ],
  },

  //department
  {
    path: "/departments",
    element: (
      <CheckAuth>
        <Departments />
      </CheckAuth>
    ),
    children: [
      {
        path: "department",
        element: (
          <CheckAuth>
            <Department />
          </CheckAuth>
        ),
      },
      {
        path: "division",
        element: (
          <CheckAuth>
            <Division />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/payroll",
    element: <Leave />,
    children: [
      {
        path: "package-proration",
        element: (
          <CheckAuth>
            <PackageProration />
          </CheckAuth>
        ),
      },
      {
        path: "salary-slip",
        element: (
          <CheckAuth>
            <SalarySlip />
          </CheckAuth>
        ),
      },
      {
        path: "income-tax",
        element: (
          <CheckAuth>
            <IncomeTax />
          </CheckAuth>
        ),
      },

      {
        path: "tax-sheet",
        element: (
          <CheckAuth>
            <TaxSheet />
          </CheckAuth>
        ),
      },
      {
        path: "IT-declaration",
        element: (
          <CheckAuth>
            <DeclarationWindowMain />
          </CheckAuth>
        ),
      },
      {
        path: "form-16",
        element: (
          <CheckAuth>
            <Form16 />
          </CheckAuth>
        ),
      },
      {
        path: "salary-benefits",
        element: (
          <CheckAuth>
            <SalaryBenefits />
          </CheckAuth>
        ),
      },
      {
        path: "salary-setup",
        element: (
          <CheckAuth>
            <SalarySetup />
          </CheckAuth>
        ),
      },

      {
        path: "pay-slip",
        element: (
          <CheckAuth>
            <PaySlip />
          </CheckAuth>
        ),
      },
      {
        path: "run-payroll",
        element: (
          <CheckAuth>
            <RunPayroll />
          </CheckAuth>
        ),
      },
      {
        path: "lop",
        element: (
          <CheckAuth>
            <LOP />
          </CheckAuth>
        ),
      },

      {
        path: "extra-pay",
        element: (
          <CheckAuth>
            <ExtraPay />
          </CheckAuth>
        ),
      },

      {
        path: "extra-deduction",
        element: (
          <CheckAuth>
            <ExtraDeductions />
          </CheckAuth>
        ),
      },
      {
        path: "dashboard",
        element: (
          <CheckAuth>
            <PayRollDashboard />
          </CheckAuth>
        ),
      },
      {
        path: "delete-payroll",
        element: (
          <CheckAuth>
            <DeletePayroll />
          </CheckAuth>
        ),
      },
      {
        path: "payslip-step2",
        element: (
          <CheckAuth>
            <PaySlipStep2 />
          </CheckAuth>
        ),
      },
      {
        path: "ManageEmployeeSalary",
        element: (
          <CheckAuth>
            <ManageEmployeeSalary />
          </CheckAuth>
        ),
      },
      {
        path: "salaryGenerate",
        element: (
          <CheckAuth>
            <SalarySlip />
          </CheckAuth>
        ),
      },
    ],
  },

  {
    path: "/leave",
    element: <Leave />,
    children: [
      {
        path: "weekly-holiday",
        element: (
          <CheckAuth>
            <WeeklyHoliday />
          </CheckAuth>
        ),
      },
      {
        path: "holiday",
        element: <Holiday />,
      },
      {
        path: "Annualholiday",
        element: <AnnualHoliday />,
      },
      {
        path: "application",
        element: <NewLeaveApplication />,
      },
      {
        path: "applicationType",
        element: <AddLeaveType />,
      },
    ],
  },

  {
    path: "/recruitment",
    element: <Recruitment />,
    children: [
      // {
      //   path: "candidateInfo",
      //   element: (
      //     <CheckAuth>
      //       <CandidateInformation />
      //     </CheckAuth>
      //   ),
      // },
      {
        path: "add-candidate",
        element: (
          <CheckAuth>
            <AddNewCandidate2 />
          </CheckAuth>
        ),
      },
      {
        path: "candidate-information",
        element: (
          <CheckAuth>
            <CandidateInformation />
          </CheckAuth>
        ),
      },
      {
        path: "interview",
        element: (
          <CheckAuth>
            <Interview />
          </CheckAuth>
        ),
      },
      {
        path: "manage-candidate",
        element: (
          <CheckAuth>
            <ManageCandidate />
          </CheckAuth>
        ),
      },
      // {
      //   path: "recruitment-management",
      //   element: (
      //     <CheckAuth>
      //       <Recruitment_Management />
      //     </CheckAuth>
      //   ),
      // },
      {
        path: "recruitment-management",
        element: (
          <CheckAuth>
            <NewRecruitmentManagement />
          </CheckAuth>
        ),
      },
      {
        path: "employee-recruitment",
        element: (
          <CheckAuth>
            <EmployeeRecruitment />
          </CheckAuth>
        ),
      },

      {
        path: "all-recruitment",
        element: (
          <CheckAuth>
            <AllRecruitments />
          </CheckAuth>
        ),
      },
      {
        path: "candidate-selection",
        element: (
          <CheckAuth>
            <CandidateSelection />
          </CheckAuth>
        ),
      },
      {
        path: "salary-setup",
        element: (
          <CheckAuth>
            <SalarySetup />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/attendance",
    element: <Attendance />,
    children: [
      // {
      //   path: "form",
      //   element: <AttendanceForm />,
      // },
      {
        path: "form",
        element: <NewAttendance />,
      },
      {
        path: "logs",
        element: <AttendanceLogs />,
      },
      {
        path: "details/:id",
        element: <AttendanceDetails />,
      },
      {
        path: "monthly",
        element: <NewMonthlyAttendance />,
      },
    ],
  },

  {
    path: "/employee",
    element: <CompanyProfile />,
    children: [
      {
        path: "invite_new_employee",
        element: (
          <CheckAuth>
            <Invite_New_Employee />
          </CheckAuth>
        ),
      },
      {
        path: "add-employee",
        element: (
          <CheckAuth>
            <AddEmployee2 />
          </CheckAuth>
        ),
      },

      {
        path: "directory",
        element: (
          <CheckAuth>
            <DirectoryMain />
          </CheckAuth>
        ),
      },
      {
        path: "update-employee",
        element: (
          <CheckAuth>
            <EmployeeUpdate />
          </CheckAuth>
        ),
      },
      {
        path: "resignation-employee",
        element: (
          <CheckAuth>
            <EmployeeResignations />
          </CheckAuth>
        ),
      },
      {
        path: "ex-employee",
        element: (
          <CheckAuth>
            <ManageExEmployee />
          </CheckAuth>
        ),
      },

      // {
      //   path: "manage-employee",
      //   element: (
      //     <CheckAuth>
      //       <ManageEmployee />
      //     </CheckAuth>
      //   ),
      // },

      {
        path: "manage-employee",
        element: (
          <CheckAuth>
            <NewManageEmployee />
          </CheckAuth>
        ),
      },
      {
        path: "manage-position",
        element: (
          <CheckAuth>
            <ManagePosition />
          </CheckAuth>
        ),
      },
      {
        path: "all-position",
        element: (
          <CheckAuth>
            <AllPosition />
          </CheckAuth>
        ),
      },

      {
        path: "add-employee-performance",
        element: (
          <CheckAuth>
            <AddEmployeePerformance />
          </CheckAuth>
        ),
      },
      {
        path: "all-employee-performance",
        element: (
          <CheckAuth>
            <AllEmployeePerformance />
          </CheckAuth>
        ),
      },

      {
        path: "manage-employee-performance",
        element: (
          <CheckAuth>
            <NewManageEmployeePerformance />
          </CheckAuth>
        ),
      },
      // {
      //   path: "manage-employee-performance",
      //   element: (
      //     <CheckAuth>
      //       <ManageEmployeePerformance />
      //     </CheckAuth>
      //   ),
      // },
    ],
  },

  {
    path: "/letter",
    element: <CompanyProfile />,
    children: [
      {
        path: "add-letter",
        element: (
          <CheckAuth>
            <NewLetter />
          </CheckAuth>
        ),
      },
      {
        path: "create-letter",
        element: (
          <CheckAuth>
            <CreateLetter />
          </CheckAuth>
        ),
      },
      {
        path: "draft",
        element: (
          <CheckAuth>
            <Drafts />
          </CheckAuth>
        ),
      },
      {
        path: "edit-draft/:draftId",
        element: (
          <CheckAuth>
            <EditDraftLetter />
          </CheckAuth>
        ),
      },
      {
        path: "sent-letter",
        element: (
          <CheckAuth>
            <SentLetters />
          </CheckAuth>
        ),
      },
      {
        path: "post-letter",
        element: (
          <CheckAuth>
            <PostOffice />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/asset",
    element: <Asset />,
    children: [
      {
        path: "assetType",
        element: (
          <CheckAuth>
            <AddAssetType />
          </CheckAuth>
        ),
      },
      // {
      //   path: "all-AssetType",
      //   element: (
      //     <CheckAuth>
      //       <AllAssetType />
      //     </CheckAuth>
      //   ),
      //},
      {
        path: "all-AssetType",
        element: (
          <CheckAuth>
            <NewAssetType />
          </CheckAuth>
        ),
      },
      {
        path: "manage-assetType",
        element: (
          <CheckAuth>
            <ManageAssetType />
          </CheckAuth>
        ),
      },
      {
        path: "add-equipment",
        element: (
          <CheckAuth>
            <AddEquipment />
          </CheckAuth>
        ),
      },
      // {
      //   path: "all-equipments",
      //   element: (
      //     <CheckAuth>
      //       <AllEquipment />
      //     </CheckAuth>
      //   ),
      // },

      {
        path: "all-equipments",
        element: (
          <CheckAuth>
            <NewAllEquipment />
          </CheckAuth>
        ),
      },
      {
        path: "manage-equipment",
        element: (
          <CheckAuth>
            <ManageEquipments />
          </CheckAuth>
        ),
      },
      // {
      //   path: "asset-assign",
      //   element: (
      //     <CheckAuth>
      //       <AssignAsset />
      //     </CheckAuth>
      //   ),
      // },
      {
        path: "asset-assign",
        element: (
          <CheckAuth>
            <NewAssetAssign />
          </CheckAuth>
        ),
      },
    ],
  },
  {
    path: "/report",
    element: <Report />,
    children: [
      {
        path: "daily-present",
        element: (
          <CheckAuth>
            <DailyPresent />
          </CheckAuth>
        ),
      },
      {
        path: "monthly-present",
        element: (
          <CheckAuth>
            <MonthlyPresent />
          </CheckAuth>
        ),
      },
      {
        path: "daily-absent",
        element: (
          <CheckAuth>
            <DailyAbsent />
          </CheckAuth>
        ),
      },
      {
        path: "monthly-absent",
        element: (
          <CheckAuth>
            <MonthlyAbsent />
          </CheckAuth>
        ),
      },
      {
        path: "employee-on-leave",
        element: (
          <CheckAuth>
            <EmployeeOnLeave />
          </CheckAuth>
        ),
      },
      {
        path: "demographic-report",
        element: (
          <CheckAuth>
            <DemographicReport />
          </CheckAuth>
        ),
      },
      {
        path: "positional-info",
        element: (
          <CheckAuth>
            <PositionalInfo />
          </CheckAuth>
        ),
      },
      {
        path: "asset-info",
        element: (
          <CheckAuth>
            <NewAssetInfo />
          </CheckAuth>
        ),
      },
      {
        path: "benefit-report",
        element: (
          <CheckAuth>
            <NewBenefitReport />
          </CheckAuth>
        ),
      },
      {
        path: "pf-report",
        element: (
          <CheckAuth>
            <PfReport />
          </CheckAuth>
        ),
      },

      {
        path: "esic-report",
        element: (
          <CheckAuth>
            <EsicReport />
          </CheckAuth>
        ),
      },

      {
        path: "pt-report",
        element: (
          <CheckAuth>
            <PtReport />
          </CheckAuth>
        ),
      },
      {
        path: "employee-master-report",
        element: (
          <CheckAuth>
            <EmployeeMasterReport />
          </CheckAuth>
        ),
      },
      {
        path: "custom-report",
        element: (
          <CheckAuth>
            <CustomReport />
          </CheckAuth>
        ),
      },

      {
        path: "exit-report",
        element: (
          <CheckAuth>
            <EmployeeExitReport />
          </CheckAuth>
        ),
      },
      // {
      //   path: "salaryGenerate",
      //   element: (
      //     <CheckAuth>
      //       <SalaryGenerate />
      //     </CheckAuth>
      //   ),
      // },
    ],
  },
  {
    path: "/noticeboard",
    element: (
      <CheckAuth>
        <CompanyProfile />
        <NoticeBoard />
      </CheckAuth>
    ),
  },
  {
    path: "/",
    element: (
      <CheckAuth>
        <Home />
      </CheckAuth>
    ),
  },

  {
    path: "/newemployee",
    element: <NewEmployeeMain />,
  },
  {
    path: "/newemployee/basic",
    element: <NewEmployeeBasic />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/auth",
    element: <CheckAuth />,
  },
  {
    path: "/sign-up",
    element: <Signup1 />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgetPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
  },
]);

export default router;

export const toastSettings = {
  position: "top-center",
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "light",
};
