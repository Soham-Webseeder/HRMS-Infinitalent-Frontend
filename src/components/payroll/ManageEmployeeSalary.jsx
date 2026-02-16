import { IoMdPrint } from "react-icons/io";

import React, { useRef } from "react";
import ReactPrint from "react-to-print";

export const ManageEmployeeSalary = () => {
  const componentRef = useRef();

  const data = [
    {
      sl: 1,
      salaryMonth: "January",
      employeeName: "John Doe",
      totalSalary: "$3000",
      leaveDays: "11",
      workingDay: "20",
      date: "2024-01-31",
      paidBy: "Bank Transfer",
      action: "View",
    },
    // Add more rows as needed
  ];

  return (
    <div className="w-full flex justify-center mt-3 pt-1 ">
      <div className="flex flex-col w-[89%]  pl-3 h-auto justify-evenly rounded-md bg-white shadow-lg">
        <h1 className="text-[25px] font-bold p-1 text-center border rounded-full shadow-md mb-2 w-full">Salary History </h1>
        {/* <div className="flex items-center justify-end pr-5">
          <ReactPrint
            trigger={() => <IoMdPrint size={25} />}
            content={() => componentRef.current}
            documentTitle={`INVOICE`}
          />
        </div> */}
        <div className="md:p-4 md:px-8 sm:p-1 p-1 flex items-center justify-center">
          <div className="overflow-x-auto w-full">
            <div ref={componentRef} className="block p-1">
              <h2 className="text-center my-4 text-xl font-medium">
                 Salary History
              </h2>
              <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400 p-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    {/* <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      SALARY MONTH
                    </th> */}
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      EMPLOYEE NAME
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      TOTAL SALARY
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      LEAVE DAYS
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      WORKING DAY
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      DATE
                    </th>
                    <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      PAID BY
                    </th>
                    {/* <th className="border border-slate-300 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      ACTION
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.sl}
                      </td>
                      {/* <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.salaryMonth}
                      </td> */}
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.employeeName}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.totalSalary}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.leaveDays}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.workingDay}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        {row.paidBy}
                      </td>
                      {/* <td className="border border-slate-300 px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900">
                          {row.action}
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployeeSalary;
