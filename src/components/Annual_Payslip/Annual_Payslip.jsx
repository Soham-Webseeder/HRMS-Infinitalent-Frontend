import React from 'react';
import logo from "./Logo.jpeg";

const AnnualPayslip = () => {
  return (
    <div style={styles.payslipContainer}>
      {/* 1. Header with Company Logo and Partition */}
      <table style={styles.headerTable}>
        <tbody>
          <tr>
            <td style={styles.logoCell}>
              <img src={logo} alt="Company Logo" style={styles.logo} />
            </td>
            <td style={styles.partitionCell}></td> {/* Visible Partition */}
            <td style={styles.companyDetailsCell}>
              <h1 style={styles.companyName}>INFINITALENT CONSULTING PRIVATE LIMITED</h1>
              <p style={styles.address}>Office Address: No 413 12th Main Road 1st Block</p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 2. Sub-heading */}
      <table style={styles.subheadingTable}>
        <tbody>
          <tr>
            <td style={styles.subheading}>
              <h2 style={styles.title}>Salary Slip for 2024-2025</h2>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 3. Employee Details */}
      <table style={styles.employeeDetailsTable}>
        <tbody>
          <tr>
            <td style={styles.tableCellLeft}><strong>Employee Name:</strong> chandrappa M R</td>
            <td style={styles.tableCellLeft}><strong>Employee Type:</strong> Employee</td>
            <td style={styles.tableCellLeft}><strong>Employee Code:</strong> ICPL_2</td>
            <td style={styles.tableCellLeft}><strong>PAN Number:</strong></td>
          </tr>
          <tr>
            <td style={styles.tableCellLeft}><strong>Designation:</strong> MD/CEO</td>
            <td style={styles.tableCellLeft}><strong>Department:</strong> Management</td>
            <td style={styles.tableCellLeft}><strong>Date of Joining:</strong> 08-02-2021</td>
          </tr>
          <tr>
            <td style={styles.tableCellLeft}><strong>PF Number:</strong></td>
            <td style={styles.tableCellLeft}><strong>UAN Number:</strong></td>
            <td style={styles.tableCellLeft}><strong>ESIC Number:</strong></td>
            <td style={styles.tableCellLeft}><strong>Location:</strong> Bangalore</td>
          </tr>
        </tbody>
      </table>

      {/* 4. Earnings and Deductions (Total Days, LOP, Working Days) */}
      <table style={styles.earningsTable}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Earning and Deduction</th>
            <th style={styles.headerCell}>April 2024</th>
            <th style={styles.headerCell}>May 2024</th>
            <th style={styles.headerCell}>June 2024</th>
            <th style={styles.headerCell}>July 2024</th>
            <th style={styles.headerCell}>August 2024</th>
            <th style={styles.headerCell}>September 2024</th>
            <th style={styles.headerCell}>October 2024</th>
            <th style={styles.headerCell}>November 2024</th>
            <th style={styles.headerCell}>December 2024</th>
            <th style={styles.headerCell}>January 2025</th>
            <th style={styles.headerCell}>February 2025</th>
            <th style={styles.headerCell}>March 2025</th>
            <th style={styles.headerCell}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.tableCell}><strong>Total Days</strong></td>
            <td style={styles.monthCell}>30</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.monthCell}>30</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.monthCell}>30</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.monthCell}>30</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.monthCell}>29</td>
            <td style={styles.monthCell}>31</td>
            <td style={styles.tableCell}><strong>366</strong></td>
          </tr>
          <tr>
            <td style={styles.tableCell}><strong>LOP</strong></td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.tableCell}><strong>0</strong></td>
          </tr>
          <tr>
            <td style={styles.tableCell}><strong>Working Days</strong></td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.tableCell}><strong>0</strong></td>
          </tr>

          {/* 5. Earnings Section under the same columns */}
          <tr>
            <td style={styles.tableCell}><strong>EARNINGS</strong></td>
            <td colSpan="13" style={styles.subheading}></td>
          </tr>
          <tr>
            <td style={styles.tableCell}><strong>Gross Salary</strong></td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.tableCell}><strong>0</strong></td>
          </tr>

          {/* 6. Deductions Section under the same columns */}
          <tr>
            <td style={styles.tableCell}><strong>DEDUCTIONS</strong></td>
            <td colSpan="13" style={styles.subheading}></td>
          </tr>
          <tr>
            <td style={styles.tableCell}><strong>TDS</strong></td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.tableCell}><strong>0</strong></td>
          </tr>
          <tr>
            <td style={styles.tableCell}><strong>Net Amount</strong></td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.monthCell}>0</td>
            <td style={styles.tableCell}><strong>0</strong></td>
          </tr>
        </tbody>
      </table>

      {/* 7. Note Section */}
      <p style={styles.note}>
        Note: This is a computer-generated slip and does not require a signature.
      </p>
    </div>
  );
};

// Styles
const styles = {
  payslipContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  headerTable: {
    width: '100%',
    marginBottom: '20px',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  subheadingTable: {
    width: '100%',
    marginBottom: '20px',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  employeeDetailsTable: {
    width: '100%',
    marginBottom: '20px',
    textAlign: 'left',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  earningsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    textAlign: 'center',
    border: '1px solid black',
  },
  logoCell: {
    width: '15%',
    textAlign: 'left',
    padding: '20px 10px', // Increases height
  },
  logo: {
    width: '100px',
  },
  partitionCell: {
    width: '5px',
    borderRight: '1px solid black', // Vertical partition line between logo and company details
  },
  companyDetailsCell: {
    textAlign: 'left', // Left-align company details
    padding: '20px 10px', // Adds vertical space without changing text size
  },
  companyName: {
    fontSize: '26px',
    fontWeight: 'bold',
    margin: 0,
  },
  address: {
    fontSize: '14px',
    margin: 0,
  },
  subheading: {
    textAlign: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: 0,
  },
  headerCell: {
    fontWeight: 'bold',
    padding: '10px',
    border: '1px solid black',
  },
  tableCell: {
    padding: '8px',
    border: '1px solid black',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  tableCellLeft: {
    padding: '8px',
    border: '1px solid black',
    verticalAlign: 'middle',
    textAlign: 'left',
  },
  monthCell: {
    padding: '8px',
    border: '1px solid black',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  note: {
    marginTop: '20px',
    fontSize: '12px',
    fontStyle: 'italic',
    textAlign: 'center',
  },
};

export default AnnualPayslip;
