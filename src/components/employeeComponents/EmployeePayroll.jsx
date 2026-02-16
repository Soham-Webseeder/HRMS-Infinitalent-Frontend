import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../public/webseederLogo.png";
import { useDispatch, useSelector } from "react-redux";


export default function EmployeePayroll() {
  const [employeeData, setEmployeeData] = useState({});
  const [salaryData, setSalaryData] = useState({});
  const componentRef = useRef();
  const user = useSelector((state) => state.user);
  const id = user.userAllData.employeeDetails;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchEmployeeData = async () => {
    try {
      // Fetch employee details
      const employeeResponse = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${id}`
      );
      console.log(employeeResponse.data.data, "emp");
      setEmployeeData(employeeResponse.data.data);

      // Fetch salary data
      const salaryResponse = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/salary/getSalarySetupByEmployeeName/${id}`
      );
      setSalaryData(salaryResponse.data.data);
      console.log(salaryResponse.data.data, "salary");
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };


  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[now.getMonth()];

  const formattedDate = `${year}-${month}-${day}`;
  const formattedDateString = `${monthName} ${year}`;

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto py-4">
        <div className="text-end mb-4">
          <button
            onClick={handlePrint}
            className="border text-blue-100 bg-blue-500 p-2 rounded-md my-2 ml-2"
          >
            PRINT
          </button>
        </div>

        <div
          className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-500 h-[100vh] "
          ref={componentRef}
        >
          <div className="flex justify-between items-center mb-4 ">
            <div>
              <h1 className="text-xl font-bold">
                WebSeeder Technologies Pvt Ltd
              </h1>
              <p className="text-xs text-zinc-600">
                Office No. 203, Navneet Plaza,
                <br />
                5/2 Old Palasia, Greater Kailash Road,
                <br />
                Above Fantasy Bakery, Indore, M.P. 452001
              </p>
            </div>
            <img className="w-40" src={logo} alt="Webseeder Logo" />
          </div>
          <div className="flex gap-2 mb-2 items-center">
            <h2 className="text-md">Payslip For the Month:</h2>
            <h3 className="text-md font-bold">{formattedDateString}</h3>
          </div>

          <h4 className="text-md font-bold mb-2">Employee Summary</h4>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p>
                <span className="font-bold">Employee Name:</span>{" "}
                {employeeData?.firstName} {employeeData?.lastName}
              </p>
              <p>
                <span className="font-bold">Employee Id:</span>{" "}
                {employeeData?.empId}
              </p>
              <p>
                <span className="font-bold">Pay Date:</span> {formattedDate}
              </p>
              <p>
                <span className="font-bold">Designation:</span>{" "}
                {employeeData?.division}
              </p>
              <p>
                <span className="font-bold">Joining Date:</span>{" "}
                {employeeData?.hireDate}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold">Bank Name:</span> State Bank of
                India
              </p>
              <p>
                <span className="font-bold">Account No:</span> 1234567890
              </p>
              <p>
                <span className="font-bold">IFSC Code:</span> SBIN0001234
              </p>
              <p>
                <span className="font-bold">Total Days In Month:</span> {21}
              </p>
              <p>
                <span className="font-bold">Present Days:</span> {15.5}
              </p>
              <p>
                <span className="font-bold">LOP Days:</span> {5.5}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <h4 className="text-md font-bold text-blue-700">Earnings</h4>
              <p>
                <span className="font-bold">Basic:</span> ₹
                {salaryData?.addition?.[0]?.basic || 0}
              </p>
              <p>
                <span className="font-bold">Health:</span> ₹
                {salaryData?.addition?.[0]?.health || 0}
              </p>
              <p>
                <span className="font-bold">House Rent Allowance:</span> ₹
                {salaryData?.addition?.[0]?.houseRent || 0}
              </p>
              <p>
                <span className="font-bold">Other:</span> ₹
                {salaryData?.addition?.[0]?.sdsd || 0}
              </p>
            </div>
            <div>
              <h4 className="text-md font-bold text-blue-700">Deductions</h4>
              <p>
                <span className="font-bold">Health Care:</span> ₹
                {salaryData?.deduction?.[0]?.healthCare || 0}
              </p>
              <p>
                <span className="font-bold">PF:</span> ₹
                {salaryData?.deduction?.[0]?.pf || 0}
              </p>
              <p>
                <span className="font-bold">Professional Tax:</span> ₹
                {salaryData?.deduction?.[0]?.tax || 0}
              </p>
            </div>
          </div>

          <div className="text-center text-md  rounded-md flex gap-2 justify-between p-2">
            <p>
              Gross Earnings: ₹
              {(salaryData?.addition?.[0]?.basic || 0) +
                (salaryData?.addition?.[0]?.health || 0) +
                (salaryData?.addition?.[0]?.houseRent || 0) +
                (salaryData?.addition?.[0]?.sdsd || 0)}
            </p>
            <p>
              Total Deductions: ₹
              {(salaryData?.deduction?.[0]?.healthCare || 0) +
                (salaryData?.deduction?.[0]?.pf || 0) +
                (salaryData?.deduction?.[0]?.tax || 0)}
            </p>
          </div>

          <hr className="my-4" />

          <div className="text-center border border-gray-500  rounded-md flex gap-2 justify-end p-2">
            <p className="text-md ">TOTAL NET PAYABLE</p>
            <p className="text-md font-bold">₹{salaryData?.grossSalary}</p>
          </div>
        </div>
      </div>
    </>
  );
}
