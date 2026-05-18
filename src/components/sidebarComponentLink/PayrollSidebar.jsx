import React from "react";
import DisplayComponent from "./DisplayComponent";
import { CiDollar, CiMoneyBill } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { MdManageHistory } from "react-icons/md";

export const payrollData = {
  title: "Payroll",
  src: "Chart",
  icon: <CiDollar fontSize={20} color={"grey"} />,
  path: "/app/payroll",
  prePath: "payroll",
  subMenus: [
    {
      title: "Payroll Dashboard",
      icon: <CiMoneyBill fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/payroll/dashboard",
    },

    {
      title: "Payslip",
      icon: <MdManageHistory fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/payroll/pay-slip",
    },

    {
      title: "LOP",
      icon: <MdManageHistory fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/payroll/lop",
    },
    {
      title: "Extra Pay",
      icon: <MdManageHistory fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/payroll/extra-pay",
    },

    {
      title: "Extra Deduction",
      icon: <MdManageHistory fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/payroll/extra-deduction",
    },
    {
      title: "Delete Payroll",
      icon: <MdManageHistory fontSize={15} color={"grey"} />,
      cName: "sub-nav",
      path: "/payroll/delete-payroll",
    }
  ],
};
function PayrollSidebar() {
  return (
    <div>
      <DisplayComponent data={payrollData} />
    </div>
  );
}

export default PayrollSidebar;
