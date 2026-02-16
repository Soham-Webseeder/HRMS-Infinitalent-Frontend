import React from "react";
import logo from "../../components/print/images/Logo.jpeg";
import { Link } from "react-router-dom";

const SalarySlip = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">
            Salary Generate
          </h1>
          <p className="font-light text-gray-600 mt-4">
            <Link to="/">Home</Link> | <Link to="/app/payroll">Payroll</Link> | <Link to="/payroll/salaryGenerate">Salary Generate</Link>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-card rounded-lg shadow-md">
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
              Address: No 22, B R Complex, 1st cross, 2nd block, Nandini Layout, Bangalore-560096
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mt-4">
          Salary Slip For - October 2023
        </h2>

        {/* Employee Details */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-center">Employee Details</h3>
          <div className="overflow-x-auto lg:overflow-hidden">
            <table className="min-w-full mt-2 border-collapse border border-black text-sm">
              <tbody>
                <tr className="text-left">
                  <th className="border p-1 font-semibold" style={{ width: '15%' }}>Employee Name:</th>
                  <td className="border p-1" style={{ width: '15%' }}>Chandrappa M R</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Emp No:</th>
                  <td className="border p-1" style={{ width: '10%' }}>ICPL_2</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Designation:</th>
                  <td className="border p-1" style={{ width: '10%' }}>MD/CEO</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Department:</th>
                  <td className="border p-1" style={{ width: '10%' }}>Management</td>
                </tr>

                <tr className="text-left">
                  <th className="border p-1 font-semibold" style={{ width: '15%' }}>Date Of Joining:</th>
                  <td className="border p-1" style={{ width: '15%' }}>08-02-2021</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Location:</th>
                  <td className="border p-1" style={{ width: '10%' }}>Bangalore</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Total Month Days:</th>
                  <td className="border p-1" style={{ width: '10%' }}>31</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Business Unit:</th>
                  <td className="border p-1" style={{ width: '10%' }}>Corp Office</td>
                </tr>

                <tr className="text-left">
                  <th className="border p-1 font-semibold" style={{ width: '15%' }}>PF Number:</th>
                  <td className="border p-1" style={{ width: '15%' }}> </td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>ESIC Number:</th>
                  <td className="border p-1" style={{ width: '10%' }}> </td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>UAN Number:</th>
                  <td className="border p-1" style={{ width: '10%' }}> </td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>PAN Number:</th>
                  <td className="border p-1" style={{ width: '10%' }}> </td>
                </tr>

                <tr className="text-left">
                  <th className="border p-1 font-semibold" style={{ width: '15%' }}>Working Days:</th>
                  <td className="border p-1" style={{ width: '15%' }}>31</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Effective Working Days:</th>
                  <td className="border p-1" style={{ width: '10%' }}>31</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Total Arrear Days:</th>
                  <td className="border p-1" style={{ width: '10%' }}>0</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}></th>
                  <td className="border p-1" style={{ width: '10%' }}></td>
                </tr>

                <tr className="text-left">
                  <th className="border p-1 font-semibold" style={{ width: '15%' }}>Current LOP:</th>
                  <td className="border p-1" style={{ width: '15%' }}>0</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Previous LOP:</th>
                  <td className="border p-1" style={{ width: '10%' }}>0</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Duration:</th>
                  <td className="border p-1" style={{ width: '10%' }}>01-10-2023 to 31-10-2023</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}></th>
                  <td className="border p-1" style={{ width: '10%' }}></td>
                </tr>

                <tr className="text-left">
                  <th className="border p-1 font-semibold" style={{ width: '15%' }}>Bank Name:</th>
                  <td className="border p-1" style={{ width: '15%' }}>Bank of Baroda - Corporate Banking</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Branch Name:</th>
                  <td className="border p-1" style={{ width: '10%' }}>Peenya</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>Account Number:</th>
                  <td className="border p-1" style={{ width: '10%' }}>89410200000086</td>
                  <th className="border p-1 font-semibold" style={{ width: '10%' }}>IFSC Code:</th>
                  <td className="border p-1" style={{ width: '10%' }}>BARB0VJPEEN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>


        {/* Salary Breakdown - Income, Deductions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 border-collapse border border-gray-200">
          {/* Income Section */}
          <section>
            <h3 className="text-lg font-semibold text-center">Income</h3>
            <table className="min-w-full mt-2 ml-2 border-collapse border border-black text-sm">
              <thead>
                <tr className="text-left">
                  <th className="border p-2 font-semibold text-center">Components</th>
                  <th className="border p-2 font-semibold text-center">Amount ₹</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-left">
                  <td className="border p-2">Basic Pay</td>
                  <td className="border p-2">35000</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2">Basic Pay</td>
                  <td className="border p-2">35000</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2">HRA (Gross)</td>
                  <td className="border p-2">25000</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2">Medical</td>
                  <td className="border p-2">1250</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2 ">Special Allowance</td>
                  <td className="border p-2 ">45000</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Employee Deduction Section */}
          <section>
            <h3 className="text-lg font-semibold text-center">Employee Deduction</h3>
            <table className="min-w-full mt-2 border-collapse border border-black text-sm">
              <thead>
                <tr className="text-left">
                  <th className="border p-2 font-semibold ">Components</th>
                  <th className="border p-2 font-semibold ">Amount ₹</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-left">
                  <td className="border p-2 ">PF Employee (Gross)</td>
                  <td className="border p-2">1800</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2">PF Employer Deduction</td>
                  <td className="border p-2">1800</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2">PT (Gross)</td>
                  <td className="border p-2">200</td>
                </tr>
                <tr className="text-left">
                  <td className="border p-2">TDS</td>
                  <td className="border p-2">5460</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Employer Deduction Section */}
          <section>
            <h3 className="text-lg font-semibold text-center ">Employer Deduction</h3>
            <table className="min-w-full mt-2 border-collapse border border-black text-sm">
              <thead>
                <tr className="text-left">
                  <th className="border p-2 font-semibold ">Components</th>
                  <th className="border p-2 font-semibold ">Amount ₹</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr className="text-left">
                <td className="border p-2">PF Employer (Gross)</td>
                <td className="border p-2">1800</td>
              </tr> */}
              </tbody>
            </table>
          </section>
        </div>

        {/* Summary */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-left">Summary</h3>
          <table className="min-w-full mt-2 border-collapse border border-gray-400 text-sm">
            <tbody>
              {/* First row with Gross Earning, Total Arrears, and Total Deductions */}
              <tr>
                <td className="border p-2 text-left">Gross Earning (A):</td>
                <td className="border p-2 font-semibold text-center">100000</td>
                <td className="border p-2 text-left">Total Deductions (B): 3056</td>
                <td className="border p-2 font-semibold text-center">3056</td>
                <td className="border p-2 text-left">Total Arrears (Part of A):</td>
                <td className="border p-2 font-semibold text-center">0</td>
              </tr>

              {/* Second row with Net Pay and amount in words */}
              <tr>
                <td className="border p-2 text-left">Net Pay (A - B) Rs:</td>
                <td className="border p-2 font-semibold text-center">90740</td>
                <td className="border p-2 text-left" colSpan="4">
                  Net Pay (A - B) in words:{" "}
                  <strong>Ninety Thousand Seven Hundred Forty Rupees Only</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </section>


        <p className="mt-6 text-center text-sm">
          RO: No 413 12th Main Road 1st Block 3rd Stage Manjunatha Nagar
          Bangalore-560010, Karnataka, India
        </p>
        <hr className="my mt-2" />
        {/* Footer */}
        <footer className="mt-6 text-center text-sm">
          <p>NOTE: This is a computer-generated slip and does not require a signature.</p>
        </footer>
      </div>
    </div>
  );
};

export default SalarySlip;