import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import BirthdayCalendar from "./BirthdayCalendar";
import WorkAnniversary from "./WorkAnniversary";
import DashboardStats from "./Hero";
import PunchStatus from "./PunchStatus";
import AttendanceCard from "./AttendanceCard";
import LeaveRequests from "./LeaveRequest";
import Notifications from "./Notification";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dashboard/getDashboardData`
        );
        setDashboardData(response.data);
        console.log(response.data, "Dashboard");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <section className="flex gap-2 py-2 flex-col px-2 min-h-[100vh] ">
      {/* Total Card Comp */}
      <div className="p-4 rounded bg-gray-100">
        <div className=" p-6 bg-white rounded-lg shadow">
          <h1 className="mb-6 text-2xl font-semibold">PULSE </h1>
          <DashboardStats
            totalPresent={dashboardData?.attendance?.totalPresent}
            totalAbsent={dashboardData?.attendance?.totalAbsent}
            totalEmployees={dashboardData?.totalEmployees}
          />
        </div>
      </div>
      <PunchStatus />

      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 flex justify-start items-center flex-col gap-2">
          <Calendar />
          <BirthdayCalendar />
          <WorkAnniversary />
          {/* <Notifications /> */}
        </div>
        <div className="col-span-1 flex justify-start items-center flex-col w-full rounded-md">
          <AttendanceCard leaveCounts={dashboardData?.leaveCounts} />
          <LeaveRequests leaveRequests={dashboardData?.leaveRequests} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
