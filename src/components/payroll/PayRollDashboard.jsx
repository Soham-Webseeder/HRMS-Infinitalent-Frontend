import { useEffect, useState } from "react";
import {
  FaUser,
  FaMoneyBillWave,
  FaPiggyBank,
  FaDollarSign,
  FaPercentage,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import defaultBank from "../../assets/bank-illustration.bc3d29ee.svg";
import iciciBank from "../../assets/ICICI_Bank_Logo.3020875e.svg";
import SalarySheetExport from "./SalarySheetExport";
import * as XLSX from "xlsx";

export default function PayRollDashboard() {
  const now = new Date();
  now.setMonth(now.getMonth() - 1); // Set to last month
  const lastMonth = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const lastYear = now.getFullYear();
  const [salaryCycle, setSalaryCycle] = useState(`${lastYear}-${lastMonth}`);
  const [payrollOverview, setPayrollOverview] = useState(null);
  const [viewSalarySheetModel, setViewSalarySheetModel] = useState(false);
  const [viewPayrollDashboardModel, setViewPayrollDashboardModel] = useState(true);
  const [salarySheetEmployees, setSalarySheetEmployees] = useState([]);
  const [months, setMonths] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewBankSheetModel, setViewBankSheetModel] = useState(false);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [filteredSalarySheetEmployees, setFilteredSalarySheetEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  const fetchPayrollOverview = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/payroll/getPayrollOverview?year=${salaryCycle.split("-")[0]
      }&month=${salaryCycle.split("-")[1]}`
    );


    if (response.data.success) {
      setPayrollOverview(response.data.data);
    }
  };

  useEffect(() => {
    const fetchSalarySheet = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/payroll/getAllPayrollsByMonthAndBusinessUnit`,
          {
            params: {
              businessUnit: selectedBusinessUnit,
              month: salaryCycle.split("-")[1],
              year: salaryCycle.split("-")[0]
            }
          }
        );
        const data = response.data.data;
        console.log(data.data)
        const uniqueMonths = new Set();
        data.forEach((item) => {
          uniqueMonths.add(`${item.month}-${item.year}`);
        });

        setSalarySheetEmployees(data);
        setMonths([...uniqueMonths].sort()); // Sorting the months by date
      } catch (error) {
        console.error("Error fetching LOP data:", error);
      }
    };

    fetchSalarySheet();
  }, [selectedBusinessUnit, salaryCycle]);


  // Fetch Business Units
  useEffect(() => {
    const fetchBusinessUnits = async () => {
      try {
        const businessUnitResponse = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
        );

        if (businessUnitResponse.data) {
          setBusinessUnits(businessUnitResponse.data.response || []);
        }
      } catch (error) {
        console.error("Error fetching business units:", error);
      }
    };

    fetchBusinessUnits();
  }, []);

  const filteredSalarySheet = salarySheetEmployees.filter((item) => {
    const fullName = `${item.employeeName?.firstName || ""} ${item.employeeName?.lastName || ""
      }`.trim();
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSalaryCycleChange = async (event) => {
    setSalaryCycle(event.target.value);
  };

  useEffect(() => {
    fetchPayrollOverview();
  }, [salaryCycle]);

  useEffect(() => {
    fetchPayrollOverview();
  }, []);

  const handleViewSalarySheetClick = () => {
    setViewSalarySheetModel(true);
    setViewPayrollDashboardModel(false);
  };

  const handleViewDashboardClick = () => {
    setViewSalarySheetModel(false);
    setViewPayrollDashboardModel(true);
  };

  return (
    <>
      {viewPayrollDashboardModel && (
        <div className="flex flex-col px-6 py-2 space-y-2 rounded-lg shadow  bg-white">
          <div className="flex flex-col  gap-2 border-b border-gray-300 py-2">
            <div className="text-2xl font-medium">Payroll</div>
            <div>
              <div className="flex text-sm w-fit text-gray-500 mt-1 gap-1">
                <span
                  onClick={() => navigate("/")}
                  className="cursor-pointer hover:text-slate-800"
                >
                  Home
                </span>
                <span>|</span>
                <span
                  onClick={() => navigate("/app/payroll")}
                  className="cursor-pointer hover:text-slate-800"
                >
                  Payroll
                </span>
                <span>|</span>
                <span className="cursor-default text-gray-500">
                  Dashboard
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto  ">
            <div className="flex justify-between employees-center mb-4">
              <div className="flex employees-center">
                <h1 className="text-2xl font-bold text-gray-800 mr-4">
                  Payroll data overview
                </h1>
                {/* <button className="text-blue-500 hover:text-blue-600">
                  <FaSyncAlt className="h-5 w-5" />
                </button>
                <button className="text-blue-500 hover:text-blue-600 ml-2">
                  <FaCopy className="h-5 w-5" />
                </button> */}
              </div>
              <div className="text-gray-600">
                <div class="flex gap-2 employees-center">
                  <label
                    for="salary-cycle"
                    class="block text-medium font-medium mb-2 text-blue-600"
                  >
                    Salary Cycle:
                  </label>
                  <input
                    type="month"
                    id="salary-cycle"
                    name="salary-cycle"
                    value={salaryCycle}
                    onChange={handleSalaryCycleChange}
                    class="border border-gray-300 rounded-md p-2 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              You are viewing the payroll overview of the previous salary cycle.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                {/* Employee Count */}
                <div className="flex employees-center mb-4">
                  <FaUser className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {payrollOverview?.employeeCount}
                    </div>
                    <div className="text-sm text-gray-500">Employee count</div>
                  </div>
                </div>

                {/* Salary Payout */}
                <div className="flex employees-center mb-4">
                  <FaMoneyBillWave className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {payrollOverview?.salaryPayout}
                    </div>
                    <div className="text-sm text-gray-500">Salary payout</div>
                  </div>
                </div>

                {/* PF Employee (Gross) */}
                <div className="flex employees-center">
                  <FaPiggyBank className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {payrollOverview?.pfEmployee?.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      PF Employee (Gross)
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/* Wage Amount */}
                <div className="flex employees-center mb-4">
                  <FaDollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {parseFloat(payrollOverview?.wageAmount).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Wage Amount</div>
                  </div>
                </div>

                {/* Tax Payment */}
                <div className="flex employees-center mb-4">
                  <FaPercentage className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {payrollOverview?.taxPayment}
                    </div>
                    <div className="text-sm text-gray-500">Tax payment</div>
                  </div>
                </div>

                {/* PT (Gross) */}
                <div className="flex employees-center">
                  <FaDollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {payrollOverview?.pt}
                    </div>
                    <div className="text-sm text-gray-500">PT (Gross)</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-between">
          <div className="flex gap-4">
            <button className="bg-red-200 text-red-600 font-bold px-4 py-2 rounded-md">
              Delete PaySlip
            </button>
            <button className="bg-red-200 text-red-600 font-bold px-4 py-2 rounded-md">
              Delete Payroll Data
            </button>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-200 text-blue-600 font-bold px-4 py-2 rounded-md">
              Generate PaySlip
            </button>
            <button
              onClick={() => {
                navigate("/payroll/run-payroll");
              }}
              className="bg-blue-200 text-blue-600 font-bold px-4 py-2 rounded-md"
            >
              Run PayRoll
            </button>
          </div>
        </div> */}
          </div>
        </div>
      )}

      {viewSalarySheetModel && (
        <div className="px-4 py-2 flex flex-col gap-4 bg-white">
          <h1 className="text-xl font-bold">Salary Sheet</h1>

          {/* Filters Section */}
          <div className="flex gap-2 items-center flex-wrap">
            {/* Salary Cycle (Month-Year) Dropdown */}
            <div className="flex flex-col">
              <label
                htmlFor="salary-cycle"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Salary Cycle
              </label>
              <input
                type="month"
                id="salary-cycle"
                name="salary-cycle"
                value={salaryCycle}
                onChange={handleSalaryCycleChange}
                class="border border-gray-300 rounded-md p-2 w-fit focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Business Unit Dropdown */}
            <div className="flex flex-col">
              <label
                htmlFor="business-unit"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Business Unit
              </label>
              <select
                id="business-unit"
                value={selectedBusinessUnit}
                onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Business Units</option>
                {businessUnits.map((unit) => (
                  <option key={unit._id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex w-fit border-2 border-gray-300 rounded-full bg-white items-center hover:border-blue-500">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-1 border border-gray-300 rounded-full text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <IoSearch
                size={25}
                className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 text-gray-500"
              />
            </div>

            {/* Export Button */}
            <SalarySheetExport
              fileName="Salary_Sheet"
              salaryCycle={salaryCycle}
              selectedBusinessUnit={selectedBusinessUnit}
              businessUnits={businessUnits}
            />
          </div>

          {/* Salary Sheet Table */}
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3 overflow-x-auto w-full">
              <div className="max-h-[400px]">
                <table className="min-w-full border-separate border-spacing-y-2 max-h-2/4 overflow-y-scroll">
                  <thead className="bg-slate-100">
                    <tr className="max-xs:text-sm sm:text-sm">
                      <th className="p-2 text-left font-medium whitespace-nowrap">
                        Employee ID
                      </th>
                      <th className="p-2 text-left font-medium whitespace-nowrap">
                        Name
                      </th>
                      <th className="p-2 text-left font-medium whitespace-nowrap">
                        Department
                      </th>
                      <th className="p-2 text-left font-medium whitespace-nowrap">
                        Designation
                      </th>
                      <th className="p-2 text-left font-medium whitespace-nowrap">
                        Business Unit
                      </th>
                      <th className="p-2 text-left font-medium whitespace-nowrap">
                        Net Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSalarySheet.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-gray-500">
                          No employees found for the selected salary cycle and business unit.
                        </td>
                      </tr>
                    ) : (
                      filteredSalarySheet.map((payroll) => {
                        // Skip rendering if employeeName is null or undefined
                        if (!payroll.employeeName) return null;
                        const businessUnitName = businessUnits.find(
                          (unit) => unit._id === payroll.employeeName.businessUnit
                        )?.name || payroll.employeeName.businessUnit || 'N/A';
                        return (
                          <tr
                            key={payroll.employeeName?._id || Math.random()}
                            className="text-gray-600 text-left w-full rounded-xl border border-black sm:text-sm"
                          >
                            <td className="px-2 py-2 whitespace-nowrap bg-white border-b-2 rounded-l-md">
                              {payroll.employeeName.employeeType || 'N/A'}-
                              {payroll.employeeName.empId || 'N/A'}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap bg-white border-b-2">
                              {(payroll.employeeName.firstName || '') + " " + (payroll.employeeName.lastName || '')}
                            </td>
                            <td className="px-2 py-2 whitespace-nowrap bg-white border-b-2">
                              {payroll.employeeName.department || 'N/A'}
                            </td>
                            <td className="px-2 py-2 bg-white text-left border-b-2 font-medium whitespace-nowrap">
                              {payroll.employeeName.designation || 'N/A'}
                            </td>
                            <td className="px-2 py-2 bg-white text-left border-b-2 font-medium whitespace-nowrap">
                              {businessUnitName || 'N/A'}
                            </td>
                            <td className="px-2 bg-white py-2 text-left border-b-2 font-medium whitespace-nowrap">
                              {payroll?.amountCredited || 'N/A'}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="col-span-1 border-2">
              <h1 className="text-center py-2 bg-blue-200">Additional</h1>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-2 w-[92%]">
        <hr />
        <div className="flex justify-between employees-center gap-4 mt-2  px-8">
          <div className="flex justify-center employee-center gap-4">
            {viewPayrollDashboardModel && (
              <button
                className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-md"
                onClick={handleViewSalarySheetClick}
              >
                View Salary Sheet
              </button>
            )}
            {viewSalarySheetModel && (
              <button
                className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-md"
                onClick={handleViewDashboardClick}
              >
                View Dashboard
              </button>
            )}

            <button className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-md"
              onClick={() => {
                setViewBankSheetModel(true);
              }}
            >
              Bank Sheet
            </button>
            <button className="bg-red-100 text-red-700 font-medium px-4 py-2 rounded-md">
              Delete Payslip
            </button>
            <button
              className="bg-red-100 text-red-700 font-medium px-4 py-2 rounded-md"
              onClick={() => {
                navigate("/payroll/delete-payroll");
              }}
            >
              Delete Payroll Data
            </button>
            <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md">
              Close Payroll
            </button>
          </div>

          <div className="flex justify-center employee-center gap-4">
            {/* <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md">
              Generate Payroll
            </button> */}
            <button
              className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
              onClick={() => {
                navigate("/payroll/run-payroll");
              }}
            >
              Generate Payroll
            </button>
          </div>
        </div>
      </div>
      {
        viewBankSheetModel &&
        <BankSheetModel setViewBankSheetModel={setViewBankSheetModel} year={salaryCycle.split("-")[0]} month={salaryCycle.split("-")[1]} />
      }
    </>
  );
}

const Banks = [
  {
    title: "Default bank sheet",
    subTitle: "Get a generic bank sheet that works for most banks by clicking on the download button below.",
    image: defaultBank
  },
  {
    title: "ICICI Bank",
    subTitle: "Download and use this bank sheet if your company's salary is processed via ICICI Bank.",
    image: iciciBank
  },
]


const BankSheetModel = ({ setViewBankSheetModel, month, year }) => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-[200] flex ">
      <div className="w-2/3 bg-slate-500 opacity-40" onClick={() => {
        setViewBankSheetModel(false)
      }}>

      </div>
      <div className="w-1/3 bg-white h-full p-4 flex flex-col gap-4 shadow-xl">
        <div className="relative">
          <h1 className="w-full text-xl font-semibold text-center">Download Bank Sheet</h1>
          <span className="absolute top-2 left-4 hover:cursor-pointer" onClick={() => {
            setViewBankSheetModel(false)
          }}>
            {/* <MdOutlineClose /> */}
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"></path> </g></svg>
          </span>
        </div>

        <div className="w-full px-4 flex flex-col justify-between items-center gap-4">
          {
            Banks.map((bank) => {
              return (
                <div className="p-4 border-2 flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <img src={bank.image} alt="" srcset="" className="w-16 h-16" />
                    <h1 className="text-xl font-semibold">{bank.title}</h1>
                  </div>
                  <div className="">
                    {
                      bank.subTitle
                    }
                  </div>
                  <Download fileName={`Bank Sheet of ${year}-${month}`} year={year} month={month} />
                </div>
              )
            }
            )}
        </div>
      </div>
    </div>
  )
}

const Download = ({ fileName, month, year }) => {
  const [loading, setLoading] = useState(false);

  const exportToExcel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/payroll/getSalarySheet?month=${month}&year=${year}`
      );

      console.log(response.data, "Dataaaa")
      const data = response.data.data;

      // Check if data.payrolls is an array before mapping
      const filteredData = Array.isArray(data?.payrolls)
        ? data.payrolls.map((item) => {
          const {
            _id,
            employeeName,
            amountCredited
          } = item;

          const {
            empId,
            firstName,
            lastName,
            bankName,
            branchName,
            accountNo,
            accountType,
            ifscCode,
            salarySetup
          } = employeeName;

          return {
            empId,
            employeeName: `${firstName} ${lastName}`, // Combine firstName and lastName
            bankName,
            branchName,
            accountNo,
            accountType,
            ifscCode,
            amountCredited,
            netSalary: salarySetup?.netSalary?.toFixed(2)
          };
        })
        : []; // Fallback to an empty array if data.payrolls is not an array

      // Convert filtered data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredData);

      // Create a new workbook and add the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="w-fit px-4 py-2 bg-blue-500 text-white hover:bg-blue-600" onClick={exportToExcel}>
      Download
    </button>
  );
}