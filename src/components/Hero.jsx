import React from "react";
import { IoPeople } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";

const DashboardStats = ({ totalEmployees, totalPresent, totalAbsent }) => {
  const stats = [
    {
      id: 1,
      label: "TOTAL EMPLOYEE",
      count: totalEmployees || 0,
      icon: <IoPeople />,
    },
    {
      id: 2,
      label: "TOTAL PRESENT",
      count: totalPresent || 0,
      icon: <FaPeopleGroup />,
    },
    {
      id: 3,
      label: "TOTAL ABSENT",
      count: totalAbsent || 0,
      icon: <MdGroupAdd />,
    },
  ];

  return (
    <div className="grid grid-cols-3  gap-8 rounded">
      {stats.map((stat) => (
        <StatsCard data={stat} />
      ))}
    </div>
  );
};

export default DashboardStats;

const StatsCard = ({ data }) => {
  return (
    <div className="flex text-blue-900 items-center justify-center px-6 py-4 space-y-2 bg-white rounded-lg shadow">
      <div className="col-span-2 w-full flex justify-center flex-col items-start gap-2">
        <h2 className="text-5xl font-medium">{data.icon}</h2>
        <h6 className="text-xl text-nowrap">{data.label}</h6>
      </div>
      <div className="col-span-1 w-full flex justify-center items-center text-6xl">
        {data.count}
      </div>
    </div>
  );
};
