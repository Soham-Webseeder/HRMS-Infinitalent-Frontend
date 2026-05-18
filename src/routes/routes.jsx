import { createBrowserRouter } from "react-router-dom";
import { CompanyProfile } from "../layout/CompanyProfile";
import { Home } from "../pages/Home";
import { Address } from "../components/company_profile/Address";
import Login from "../components/login/Login";
import ForgotPassword from "../components/login/ForgotPassword";
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
import Leave from "../layout/Leave";
import { WeeklyHoliday } from "../components/leave/WeeklyHoliday";
import Holiday from "../components/leave/Holiday";
import AddLeaveType from "../components/leave/AddLeaveType";
import LeaveApplication from "../components/leave/LeaveApplication";
import AddEmployee from "../components/employee/AddEmployee";
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
import AssignAsset from "../components/asset/AssignAsset";
import ManageEmployeePerformance from "../components/employee/ManageEmployeePerformance";
import Attendance from "../layout/Attendance";
import ManageEmployee from "../components/employee/ManageEmployee";
import SalaryGenerate from "../components/report/SalaryGenerate";
import RoleBasedRoute from "../components/RoleBasedRoute";
import AnnualHoliday from "../components/AnnualHoliday";
import AttendanceForm from "../components/attendance/AttendanceForm";
import { Announcements } from "../layout/Annoucements";
import MyProfileShow from "../components/MyProfileShow";
import SalarySlip from "../components/payroll/SalarySlip";
import CompanyProfileSidenav from "../components/sidebarComponentLink/CompanyProfileSidenav";
import { Letter } from "../layout/Letter";
import CreateLetter from "../components/letter/CreateLetter";
import EmployeeSidebar from "../components/sidebarComponentLink/EmployeeSidebar";
import AssetProfileSidenav from "../components/sidebarComponentLink/AssetProfile";
import AttendanceSidebar from "../components/sidebarComponentLink/AttendanceSidebar";
import ReportSidebar from "../components/sidebarComponentLink/ReportSidebar";
import PayrollSidebar from "../components/sidebarComponentLink/PayrollSidebar";
import Drafts from "../components/letter/Drafts";
import SentLetters from "../components/letter/SentLetters";
import PostOffice from "../components/letter/PostOffice";
import NewLetter from "../components/letter/NewLetter";
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
import NewAssetType from "../components/asset/equipment/NewAssetType";
import NewDesignation from "../components/company_profile/Designation";
import NewLeaveApplication from "../components/leave/NewLeaveApplication";
import NewAllEquipment from "../components/asset/equipment/NewEquipment";
import Form16 from "../components/form16";
import NewMonthlyAttendance from "../components/attendance/NewMonthlyAttendance";
import { Announcement } from "../components/company_profile/Announcement";
import NewAssetInfo from "../components/report/NewAssetInfo";
import NewBenefitReport from "../components/report/NewBenefit";
import PaySlip from "../components/payroll/PaySlip";
import Overview2 from "../components/company_profile/Overview";
import { BusinessUnit } from "../components/company_profile/BusinessUnit";
import NewDepartment from "../components/company_profile/Department";
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
            <Announcement />
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
        path: "designation",
        element: (
          <CheckAuth>
            <NewDesignation />
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
      }
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
  {
    path: "/payroll",
    element: <Leave />,
    children: [
      {
        path: "salary-slip",
        element: (
          <CheckAuth>
            <SalarySlip />
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
        path: "add-employee",
        element: (
          <CheckAuth>
            <AddEmployee />
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
      {
        path: "manage-employee",
        element: (
          <CheckAuth>
            <ManageEmployee />
          </CheckAuth>
        ),
      },
      {
        path: "manage-employee-performance",
        element: (
          <CheckAuth>
            <ManageEmployeePerformance />
          </CheckAuth>
        ),
      },
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
    ],
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
    path: "/login",
    element: <Login />,
  },

  {
    path: "/auth",
    element: <CheckAuth />,
  },
  {
    path: "/forgetPassword",
    element: <ForgotPassword />,
  }
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
