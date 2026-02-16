import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import logo from "../../components/print/images/Logo.jpeg";
import { toWords } from "number-to-words";

const demoMonths = [
  "March",
  "February",
  "January",
  "December",
  "November",
  "October",
  "September",
  "August",
  "July",
  "June",
  "May",
  "April",
];

const generateFinancialYears = (startYear, numYears) => {
  let financialYears = [];
  for (let i = 0; i < numYears; i++) {
    let yearStart = startYear + i;
    let yearEnd = yearStart + 1;
    financialYears.push({
      start: yearStart,
      end: yearEnd,
    });
  }
  return financialYears;
};

export default function PaySlip() {
  const [currentEmployee, setCurrentEmployee] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isopenViewPaySlip, setIsopenViewPaySlip] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const getActiveFiscalYear = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return currentMonth < 3 ? currentYear - 1 : currentYear;
  };
  const currentFiscalStart = getActiveFiscalYear();
  const [financialStartYear, setFinancialStartYear] = useState(currentFiscalStart);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

    return { month, year, daysInMonth };
  });

  const [businessUnits, setBusinessUnits] = useState([]);
  const [currentPaySlip, setCurrentPaySlip] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPayslip, setcurrentPayslip] = useState(null);
  const [loadingPayslip, setLoadingPayslip] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/auth/getUsers`
        );
        const filteredUsers = response.data.data.filter(
          (user) => user.role === "hr" || user.role === "admin"
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // Helper function to format UTC date strings to "Month Year"
  const formatCycleDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      // Using 'default' locale for month name (long) and year (numeric)
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    } catch (e) {
      console.error("Error formatting date:", e);
      return 'N/A';
    }
  };

  // Renamed LOP function - necessary because LOP *amount* is not stored in the schema
  const getLOPDeductionAmount = (payslip) => {
    if (!payslip) return 0;

    // Use total work days from backend for accurate proration
    const divisorDays = payslip.totalWorkDays || new Date(payslip.year, payslip.month, 0).getDate();
    const lopDays = payslip.lopDays || 0;
    const grossSalary = Number(payslip.grossPay) || 0;

    // LOP is calculated based on gross pay and LOP days
    return Number(((grossSalary / divisorDays) * lopDays).toFixed(2));
  };


  // Function to fetch all employees
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

  const fetchBusinessUnits = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
      );
      const businessUnits = response.data.response;
      setBusinessUnits(businessUnits);
      // Removed setSecondDropdownOptions as it was not defined
    } catch (error) {
      console.error("Error fetching business units:", error);
    }
  };

  useEffect(() => {
    fetchBusinessUnits();
  }, []);

  const getBusinessUnitName = (bu) => {
    // 1. If 'bu' is already a populated object (sent from backend), return its name
    if (bu && typeof bu === 'object') {
      return bu.name || 'N/A';
    }

    // 2. If 'bu' is just an ID string, look it up in your local businessUnits state
    const businessUnit = businessUnits.find(unit => unit._id === bu);

    // 3. Final Fallback: Check if the selectedEmployee object has it, or return N/A
    return businessUnit ? businessUnit.name : (selectedEmployee?.businessUnit || 'N/A');
  };

  const fetchPayslipsByFinancialYear = async () => {
    try {
      setLoadingPayslip(true);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/getPayrollByFiscalYear/${selectedEmployee?._id
        }?fiscalYear=${financialStartYear}`
      );
      if (response.data.success) {
        setcurrentPayslip(response.data.data);
        const currentMonthName = currentMonth.month;
        const currentYearValue =
          (currentMonthName === "January" || currentMonthName === "February" || currentMonthName === "March")
            ? financialStartYear + 1
            : financialStartYear;

        setCurrentMonth({
          month: currentMonthName,
          year: currentYearValue,
          daysInMonth: getDaysInMonth(currentMonthName, currentYearValue),
        });
        setCurrentPaySlip(
          response.data.data[`${currentMonthName} ${currentYearValue}`]
        );
      } else {
        setcurrentPayslip(null);
      }
      setError("");
    } catch (error) {
      console.error("Error fetching payslip data:", error);
      setError("Error fetching payslip data in financial year");
      setcurrentPayslip(null);
    } finally {
      setLoadingPayslip(false);
    }
  };

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCurrentEmployee(value);
    if (value.trim() === "") {
      setFilteredEmployees([]);
      setDropDownOpen(false);
      setSelectedEmployee(null);
      setcurrentPayslip(null);
      return;
    }
    const emp = employees.filter((employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setSelectedEmployee(emp[0]);
    setFilteredEmployees(emp);
    setDropDownOpen(true);
  };

  const handleGeneratePayslip = async (e) => {
    e.preventDefault();

    const payload = {
      date,
      userID: userId,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/generateAllPayrolls`,
        payload
      );
      toggleModal();
    } catch (error) {
      console.error("Error generating payslip", error);
    }
  };

  // Handle employee selection from the dropdown
  const handleEmployeeSelect = (employee) => {
    setCurrentEmployee(`${employee.firstName} ${employee.lastName}`);
    setSelectedEmployee(employee);
    setDropDownOpen(false);
  };

  // Function to calculate the number of days in a given month and year
  const getDaysInMonth = (month, year) => {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  // Handle month change and refetch payslip data if an employee is selected
  const handleCurrentMonthChange = (month) => {
    let updatedMonth = month;
    let updatedYear = financialStartYear;

    if (month === "January" || month === "February" || month === "March") {
      updatedYear = financialStartYear + 1;
    }

    const daysInMonth = getDaysInMonth(updatedMonth, updatedYear);

    setCurrentMonth({ month: updatedMonth, year: updatedYear, daysInMonth });

    if (currentPayslip) {
      setCurrentPaySlip(currentPayslip[`${updatedMonth} ${updatedYear}`]);
    }

    setIsopenViewPaySlip(false);
  };

  const handleYearChange = (year) => {
    let updatedYear = year;
    if (
      currentMonth.month === "January" ||
      currentMonth.month === "February" ||
      currentMonth.month === "March"
    ) {
      updatedYear = year + 1;
    }

    const daysInMonth = getDaysInMonth(currentMonth.month, updatedYear);

    setCurrentMonth({ month: currentMonth.month, year: updatedYear, daysInMonth });

    if (currentPayslip) {
      setCurrentPaySlip(currentPayslip[`${currentMonth.month} ${updatedYear}`]);
    }

    setIsopenViewPaySlip(false);
  };

  const financialYears = generateFinancialYears(currentFiscalStart, 2);

  const [isDropdownOpenCalander, setDropdownOpenCalander] = useState(false);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(financialYears[0]);

  const handleDropdownToggle = () => {
    setDropdownOpenCalander(!isDropdownOpenCalander);
  };

  const handleFinancialYearSelect = (year) => {
    setSelectedFinancialYear(year);
    setFinancialStartYear(year.start);
    handleYearChange(year.start);
    setDropdownOpenCalander(false);
  };

  const handleDeletePayslipClick = async () => {
    try {
      setLoadingPayslip(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/deletePayroll/${currentPaySlip._id}`
      );

      if (response.data.success) {
        setCurrentPaySlip(null);
        let temp = currentPayslip;
        temp[`${currentMonth.month} ${currentMonth.year}`] = {};
        setCurrentPaySlip(temp);
      }
      setLoadingPayslip(false);
    } catch (error) {
      console.log(error);
      setLoadingPayslip(false);
    }
  };

  useEffect(() => {
    fetchPayslipsByFinancialYear();
  }, [selectedEmployee, financialStartYear]);


  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Payslip</h1>
          <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
            <Link to="/" className="cursor-pointer hover:text-slate-800">
              Home
            </Link>
            <span>|</span>
            <Link to="/app/payroll" className="cursor-pointer hover:text-slate-800">
              Payroll
            </Link>
            <span>|</span>
            <span className="cursor-default text-gray-500">
              Payslip
            </span>
          </div>
        </div>
        {/* <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 ml-auto"
          onClick={toggleModal}
        >
          Generate Payslip
        </button> */}
      </div>

      <div className="border rounded px-4 py-4 bg-gray-100">
        {/* Employee Search */}
        <div className="relative w-fit">
          <input
            type="text"
            value={currentEmployee}
            className="border-2 px-2 py-1 w-56"
            onChange={handleSearchChange}
            placeholder="Search employee"
          />
          <span className="absolute z-10 right-0 px-1 top-1/2 transform -translate-y-1/2 border-l-2 border-slate-300 hover:cursor-pointer">
            {/* Arrow Icon */}
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                fill="#cbd5e1"
              ></path>
            </svg>
          </span>

          {/* Dropdown */}
          {dropDownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10">
              <ul className="max-h-60 overflow-auto">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <li
                      key={employee._id}
                      onClick={() => handleEmployeeSelect(employee)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {employee.firstName} {employee.lastName}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-700">
                    No employees found
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Month Selection */}
        <div className="flex justify-between items-center my-4">
          <span className="flex gap-2 justify-center items-center">
            {/* Placeholder for additional elements */}
          </span>
          <div className="relative w-fit">
            <input
              type="text"
              value={`April-${selectedFinancialYear.start} to March-${selectedFinancialYear.end}`}
              className="border-2 px-2 py-1 w-56"
              // readOnly
              onClick={handleDropdownToggle} // Open dropdown on input click
            />
            <span
              className="absolute z-10 right-0 px-1 top-1/2 transform -translate-y-1/2 border-l-2 border-slate-300 hover:cursor-pointer"
              onClick={handleDropdownToggle} // Open dropdown on arrow click
            >
              {/* Arrow Icon */}
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
                  fill="#cbd5e1"
                ></path>
              </svg>
            </span>

            {/* Dropdown Menu */}
            {isDropdownOpenCalander && (
              <ul className="absolute w-56 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-20">
                {financialYears.map((year, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                    onClick={() => handleFinancialYearSelect(year)}
                  >
                    {`April-${year.start} to March-${year.end}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Month Options */}
        <div className="grid grid-cols-12 gap-2">
          {demoMonths.map((month, index) => {
            const displayYear = index <= 2 ? financialStartYear + 1 : financialStartYear;

            return (
              <div
                key={`${month}-${financialStartYear}`}
                className={`col-span-1 ${month === currentMonth.month
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-slate-100 shadow-sm"
                  } text-center py-2 hover:cursor-pointer`}
                onClick={() => handleCurrentMonthChange(month)}
              >
                {month}
                <br />
                {displayYear}
              </div>
            );
          })}
        </div>

        {/* Loading and Error Messages */}
        {loadingPayslip && (
          <div className="text-center my-4">Loading payslip data...</div>
        )}
        {error && <div className="text-center my-4 text-red-500">{error}</div>}

        {/* Payslip Details */}
        {currentPayslip && currentPaySlip && (
          <div className="grid grid-cols-2 gap-6 my-4">
            {/* Financial Details */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-1 px-4 py-6 min-h-56 shadow-md bg-white rounded">
              <div className="w-full flex justify-between items-center">
                <div className="font-medium flex items-center gap-1">
                  <h1>Amount Credited</h1>
                  {/* Decorative SVG */}
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M0 0 C5.28 0 10.56 0 16 0 C16 3.3 16 6.6 16 10 C10.72 10 5.44 10 0 10 C0 6.7 0 3.4 0 0 Z"
                      fill="#6DAB3D"
                      transform="translate(0,3)"
                    />
                    <path
                      d="M0 0 C2.475 0.495 2.475 0.495 5 1 C4.67 2.65 4.34 4.3 4 6 C2.68 5.67 1.36 5.34 0 5 C0 3.35 0 1.7 0 0 Z"
                      fill="#79B840"
                      transform="translate(9,5)"
                    />
                    <path
                      d="M0 0 C1.98 0.495 1.98 0.495 4 1 C4 2.65 4 4.3 4 6 C2.35 5.67 0.7 5.34 -1 5 C-0.67 3.35 -0.34 1.7 0 0 Z"
                      fill="#79B840"
                      transform="translate(3,5)"
                    />
                  </svg>
                </div>
                <p className="text-slate-700">
                  &#8377; {Number(currentPaySlip?.amountCredited).toFixed(0)} {/* Display as rounded integer for clarity */}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Total Work Days</h4>
                <p className="text-slate-700">
                  {currentPaySlip?.totalWorkDays}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Gross Pay</h4>
                <p className="text-slate-700">
                  &#8377; {Number(currentPaySlip?.grossPay).toFixed(2)}
                </p>
              </div>

              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Extra Pay</h4>
                <p className="text-slate-700">
                  &#8377; {Number(currentPaySlip?.extraPay).toFixed(2)}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">TDS</h4>
                <p className="text-slate-700">
                  {Number(currentPaySlip?.tds).toFixed(2)}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Extra Deductions</h4>
                <p className="text-slate-700">
                  &#8377; {Number(currentPaySlip?.extraDeductions).toFixed(2)}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Net Salary (Rounded)</h4>
                <p className="text-slate-700">
                  ₹ {Number(currentPaySlip?.netSalary).toFixed(0)} {/* Use netSalary from backend, displayed as rounded */}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-1 px-4 py-6 min-h-56 shadow-md bg-white rounded">
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Data Generation Date</h4>
                <p className="text-slate-700">
                  {currentPaySlip?.dataGenerationDate}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Payslip Generation Date</h4>
                <p className="text-slate-700">
                  {currentPaySlip?.payslipGenerationDate}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Manual TDS</h4>
                <p className="text-slate-700">
                  {currentPaySlip?.manualTDS ? "Yes" : "No"}
                </p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Source</h4>
                <p className="text-slate-700">{currentPaySlip?.source}</p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Data Created By</h4>
                <p className="text-slate-700">{currentPaySlip?.dataCreatedBy}</p>
              </div>
              <div className="w-full flex justify-between items-center">
                <h4 className="font-medium">Payslip Generated By</h4>
                <p className="text-slate-700">
                  {currentPaySlip?.payslipGeneratedBy?.firstName +
                    " " +
                    currentPaySlip?.payslipGeneratedBy?.lastName}{" "}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {currentPayslip && currentPaySlip && (
          <div className="flex justify-end items-center gap-2">
            <button
              className="px-4 py-1 bg-blue-50 text-blue-600 rounded"
              onClick={() => setIsopenViewPaySlip(true)}
            >
              View
            </button>
            <button
              className="px-4 py-1 bg-blue-50 text-blue-600 rounded"
              onClick={() => toPDF()}
            >
              Download
            </button>
            <button
              className="px-4 py-1 bg-red-50 text-red-600 rounded"
              onClick={handleDeletePayslipClick}
            >
              Delete Payslip
            </button>
          </div>
        )}

        {currentPayslip && !currentPaySlip && (
          <div className="w-full text-center font-bold text-xl py-4">
            <h1>Payroll is not Generated</h1>
          </div>
        )}
        {/* Divider */}
        <hr className="my-2 h-px bg-gray-700 border-0" />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-lg font-bold mb-4">Generate Payslips</h2>
            <form onSubmit={handleGeneratePayslip}>
              {/* Date Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date (YYYY-MM-DD):
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              {/* User ID Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select User:
                </label>
                <select
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="" disabled>
                    Select a user
                  </option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {`${user.firstName} ${user.lastName} (${user.role})`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-full shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isopenViewPaySlip && selectedEmployee && (
        <div className="flex flex-col items-center justify-center overflow-auto ">
          <div
            className="max-w-4xl mx-auto p-6 bg-white dark:bg-card rounded-lg shadow-md"
            ref={targetRef}
          >
            {/* Header Section */}
            <div className="flex flex-col items-start justify-between sm:flex-row mb-4 border border-gray-300 p-4">
              <div className="pt-0">
                <img src={logo} alt="Logo" className="w-32 h-auto" />
              </div>
              <div className="text-left mt-4 sm:mt-0">
                <h1 className="text-2xl font-bold text-black uppercase">
                  INFINITALENT CONSULTING PRIVATE LIMITED
                </h1>
                <p className="text-sm">
                  No 22, B R Complex, 1st cross, 2nd block, Nandini Layout, Bangalore-560096
                </p>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mt-4">
              Salary Slip For - {currentMonth.month} {currentMonth.year}
            </h2>

            {/* Employee Details */}

            <section className="mt-6">
              <h3 className="text-lg font-semibold text-center">
                Employee Details
              </h3>
              <div className="overflow-x-auto lg:overflow-hidden">
                <table className="min-w-full mt-2 border-collapse border border-black text-sm">
                  <tbody>
                    <tr className="text-left">
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "15%" }}
                      >
                        Employee Name:
                      </th>
                      <td className="border p-1" style={{ width: "15%" }}>
                        {selectedEmployee.firstName} {selectedEmployee.lastName}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Employee Id:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.employeeType}-{selectedEmployee.empId}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Designation:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.designation}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Department:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.department}
                      </td>
                    </tr>

                    <tr className="text-left">
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "15%" }}
                      >
                        Date Of Joining:
                      </th>
                      <td className="border p-1" style={{ width: "15%" }}>
                        {selectedEmployee.hireDate}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Location:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.city}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Business Unit:
                      </th>

                      <td className="border p-1" style={{ width: "10%" }}>
                        {getBusinessUnitName(selectedEmployee.businessUnit)}
                      </td>
                    </tr>

                    <tr className="text-left">
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "15%" }}
                      >
                        PF Number:
                      </th>
                      <td className="border p-1" style={{ width: "15%" }}>
                        {selectedEmployee.uanNo}{" "}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        ESIC Number:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.esicNo}{" "}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        UAN Number:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.uanNo}{" "}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        PAN Number:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.panNo}{" "}
                      </td>
                    </tr>

                    <tr className="text-left">
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "15%" }}
                      >
                        Working Days:
                      </th>
                      <td className="border p-1" style={{ width: "15%" }}>
                        {currentPaySlip?.totalWorkDays}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Effective Working Days:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {currentPaySlip?.presentDays} {/* Should use the totalWorkDays from currentPaySlip */}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Total Paid Leaves:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {currentPaySlip?.totalPaidLeaves}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      ></th>
                      <td className="border p-1" style={{ width: "10%" }}></td>
                    </tr>

                    <tr className="text-left">
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "15%" }}
                      >
                        Current LOP:
                      </th>
                      <td className="border p-1" style={{ width: "15%" }}>
                        {currentPaySlip?.lopDays}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Duration:
                      </th>
                      {/* FIX: Using the formatCycleDate helper function */}
                      <td className="border p-1" style={{ width: "10%" }}>
                        {formatCycleDate(currentPaySlip?.cycleStartDate)} to{" "}
                        {formatCycleDate(currentPaySlip?.cycleEndDate)}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      ></th>
                      <td className="border p-1" style={{ width: "10%" }}></td>
                    </tr>

                    <tr className="text-left">
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "15%" }}
                      >
                        Bank Name:
                      </th>
                      <td className="border p-1" style={{ width: "15%" }}>
                        {selectedEmployee.bankName}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Branch Name:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.branchName}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        Account Number:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.accountNo}
                      </td>
                      <th
                        className="border p-1 font-semibold"
                        style={{ width: "10%" }}
                      >
                        IFSC Code:
                      </th>
                      <td className="border p-1" style={{ width: "10%" }}>
                        {selectedEmployee.ifscCode}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <div className="flex flex-row gap-4 mt-6">
              {/* Income Section */}
              <section className="flex-1">
                <h3 className="text-lg font-semibold text-center mb-2">Income</h3>
                <table className="w-full border border-black text-sm">
                  <thead>
                    <tr>
                      <th className="border-b border-black p-2 font-semibold text-left">Components</th>
                      <th className="border-b border-black p-2 font-semibold text-right">Amount ₹</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">Basic Pay</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.basicSalary).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">HRA (Gross)</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.hra).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">DA</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.da).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Special Allowance</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.specialAllowance).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Others Allowance</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.otherAllowance).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Extra Pay</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.extraPay).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Employee Deduction Section */}
              <section className="flex-1">
                <h3 className="text-lg font-semibold text-center mb-2">Employee Deduction</h3>
                <table className="w-full border border-black text-sm">
                  <thead>
                    <tr>
                      <th className="border-b border-black p-2 font-semibold text-left">Components</th>
                      <th className="border-b border-black p-2 font-semibold text-right">Amount ₹</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">PF Employee (Gross)</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.pfEmployee).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">PF Employer Deduction</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.pfEmployer).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">ESIC Employee (Gross)</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.esicEmployee).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">ESIC Employer Deduction</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.esicEmployer).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">PT (Gross)</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.pt).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">TDS</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.tds).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="p-2">Extra Deduction</td>
                      <td className="p-2 text-right">{Number(currentPaySlip?.extraDeductions).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>

            {/* Summary */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold text-left">Summary</h3>
              <table className="min-w-full mt-2 border-collapse border border-gray-400 text-sm">
                <tbody>
                  <tr>
                    <td className="border p-2 text-left">Gross Earning (A):</td>
                    <td className="border p-2 font-semibold text-center">
                      {/* GrossPay + ExtraPay */}
                      ₹ {Number(currentPaySlip?.grossPay || 0)}
                    </td>
                    <td className="border p-2 text-left">Fixed Deductions (PF/PT/ESIC/TDS):</td>
                    <td className="border p-2 font-semibold text-center">
                      {/* Sum of all fixed employee deductions recorded in the schema */}
                      ₹ {(
                        Number(currentPaySlip?.pfEmployee || 0) +
                        Number(currentPaySlip?.esicEmployee || 0) +
                        Number(currentPaySlip?.pt || 0) +
                        Number(currentPaySlip?.tds || 0) +
                        Number(currentPaySlip?.manualTDS || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-left">Extra Pay:</td>
                    <td className="border p-2 font-semibold text-center">
                      ₹ {Number(currentPaySlip?.extraPay || 0).toFixed(2)}
                    </td>
                    <td className="border p-2 text-left">LOP Deduction:</td>
                    <td className="border p-2 font-semibold text-center">
                      {/* Using the renamed and kept function */}
                      ₹ {getLOPDeductionAmount(currentPaySlip).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-left">Total Deductions (B):</td>
                    <td className="border p-2 font-semibold text-center">
                      {/* Sum of all deductions: Fixed + LOP + Extra */}
                      ₹ {(
                        Number(currentPaySlip?.pfEmployee || 0) +
                        Number(currentPaySlip?.esicEmployee || 0) +
                        Number(currentPaySlip?.pt || 0) +
                        Number(currentPaySlip?.tds || 0) +
                        Number(currentPaySlip?.manualTDS || 0) +
                        Number(currentPaySlip?.extraDeductions || 0) +
                        getLOPDeductionAmount(currentPaySlip)
                      ).toFixed(2)}
                    </td>
                    <td className="border p-2 text-left">Extra Deductions:</td>
                    <td className="border p-2 font-semibold text-center">
                      ₹ {Number(currentPaySlip?.extraDeductions || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 text-left">Net Pay (A - B) Rs:</td>
                    <td className="border p-2 font-semibold text-center">
                      {/* Using the final rounded value from the backend */}
                      ₹ {Number(currentPaySlip?.netSalary).toFixed(0)}
                    </td>
                    <td className="border p-2 text-left" colSpan="2">
                      Net Pay (A - B) in words:{" "}
                      <strong>
                        {/* Using the final rounded value from the backend */}
                        {toWords(Number(currentPaySlip?.netSalary).toFixed(0))}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <p className="mt-6 text-center text-sm">
              No 22, B R Complex, 1st cross, 2nd block, Nandini Layout, Bangalore-560096
            </p>
            <hr className="my mt-2" />
            {/* Footer */}
            <footer className="mt-6 text-center text-sm">
              <p>
                NOTE: This is a computer-generated slip and does not require a
                signature.
              </p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}