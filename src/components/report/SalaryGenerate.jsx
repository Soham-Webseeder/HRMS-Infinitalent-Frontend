import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../public/webseederLogo.png";
import { useParams } from "react-router-dom";

export default function SalaryGenerate() {
  const { id } = useParams(); // Get ID from URL parameter

  const [employees, setEmployees] = useState([]);
  const [employeeShowId, setEmployeeShowId] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const [salaryData, setSalaryData] = useState({});

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  const fetchEmployeeById = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getEmployeeById/${id}`
      );
      setEmployeeData(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  const fetchSalaryData = async (id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }/salary/getSalarySetupByEmployeeName/${id}`
      );
      setSalaryData(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/salary/getSalarySetupById/${id}`
        );
        setEmployeeData(employeeResponse.data.data);
        console.log(employeeResponse.data.data, "Employee");

        const salaryResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/salary/getSalarySetupByEmployeeName/${id}`
        );
        setSalaryData(salaryResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(salaryData, "employee");

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
  const monthmonth = monthNames[now.getMonth()];

  const formattedDate = `${year}-${month}-${day}`;
  const formatDateString = `${monthmonth} ${year}`;

  const handleChange = (id) => {
    if (id) {
      setEmployeeShowId(id);
    }

    fetchEmployeeById(id);
    fetchSalaryData(id);
  };
  return (
    <>
      <div className="max-w-3xl mx-auto py-4 max-md:mx-2 h-fit">
        <div className="text-end mb-4">
          {/* <select
            name="employeeName"
            onChange={(e) => handleChange(e.target.value)}
            value={employeeShowId}
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400"
          >
            <option>Select option</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee._id}>
                {employee.firstName} {employee.lastName}
              </option>
            ))}
          </select> */}
          <button
            onClick={handlePrint}
            className="border text-blue-100 hover:bg-blue-400 active:bg-blue-600 bg-blue-500 p-2 rounded-full my-2 ml-2"
          >
            PRINT
          </button>
        </div>

        <div
          className="w-full  p-6 bg-white rounded-lg shadow-lg border border-gray-500 h-fit "
          ref={componentRef}
        >
          <div className="flex justify-between w-full items-center mb-4 ">
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
            <img className="w-40" src={logo} />
          </div>
          <div className="flex gap-2 mb-2 items-center">
            <h2 className="text-md">Payslip For the Month:</h2>
            <h3 className="text-md font-bold">{formatDateString}</h3>
          </div>

          <h4 className="text-md font-bold mb-2">Employee Summary</h4>
          <div className="grid grid-cols-2 gap-4  mb-4 text-sm">
            <div>
              <p>
                <span className="font-bold">Employee Name:</span>{" "}
                {employeeData?.employeeName?.firstName}{" "}
                {employeeData?.employeeName?.lastName}
              </p>

              <p>
                <span className="font-bold ">Employee Id:</span>{" "}
                {employeeData?.employeeName?.empId}
              </p>
              <p>
                <span className="font-bold">Pay Date:</span> {formattedDate}
              </p>
              <p>
                <span className="font-bold">Designation:</span>{" "}
                {employeeData?.employeeName?.division}
              </p>
              <p>
                <span className="font-bold">Joining Date:</span>{" "}
                {employeeData?.employeeName?.hireDate}
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
                {employeeData?.addition?.[0]?.basic}
              </p>
              <p>
                <span className="font-bold">Health:</span> ₹
                {employeeData?.addition?.[0]?.health}
              </p>
              <p>
                <span className="font-bold">House Rent Allowance:</span> ₹
                {employeeData?.addition?.[0]?.houseRent}
              </p>
              <p>
                <span className="font-bold">Other:</span> ₹
                {employeeData?.addition?.[0]?.sdsd}
              </p>
            </div>
            <div>
              <h4 className="text-md font-bold text-blue-700">Deductions</h4>
              <p>
                <span className="font-bold">Health Care:</span> ₹
                {employeeData?.deduction?.[0]?.healthCare}
              </p>
              <p>
                <span className="font-bold">PF:</span> ₹
                {employeeData?.deduction?.[0]?.pf}
              </p>
              <p>
                <span className="font-bold">Professional Tax:</span> ₹
                {employeeData?.deduction?.[0]?.tax}
              </p>
            </div>
          </div>

          <div className="text-center text-md  rounded-md flex gap-2 justify-between p-2">
            <p>
              Gross Earnings: ₹
              {(employeeData?.addition?.[0]?.basic || 0) +
                (employeeData?.addition?.[0]?.health || 0) +
                (employeeData?.addition?.[0]?.houseRent || 0) +
                (employeeData?.addition?.[0]?.sdsd || 0)}
            </p>
            <p>
              Total Deductions: ₹
              {parseInt(employeeData?.deduction?.[0]?.healthCare || 0) +
                parseInt(employeeData?.deduction?.[0]?.pf || 0) +
                parseInt(employeeData?.deduction?.[0]?.tax || 0)}
            </p>
          </div>

          <hr className="my-4" />

          <div className="text-center border border-gray-500  rounded-md flex gap-2 justify-end p-2">
            <p className="text-md ">TOTAL NET PAYABLE</p>
            <p className="text-md font-bold">₹{employeeData?.grossSalary}</p>
          </div>
        </div>
      </div>
    </>
  );
}
