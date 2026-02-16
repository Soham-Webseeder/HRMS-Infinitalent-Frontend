import React from 'react';

const TaxSheet = () => {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(taxData)], { type: 'application/json' });
    saveAs(blob, 'Annual_Tax_Sheet.json');
  };

  const taxData = {
    months: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'],
    salaryComponents: [
      { name: 'Basic Pay', values: [35000, 35000, 35000, 35000, 35000, 35000, 35000, 35000, 35000, 35000, 35000, 35000] },
      { name: 'Conveyance Allowance', values: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800] },
      { name: 'HRA (Gross)', values: [25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000] },
      { name: 'Medical', values: [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250] },
      { name: 'Special Allowance', values: [37950, 37950, 37950, 37950, 37950, 37950, 37950, 37950, 37950, 37950, 37950, 37950] },
    ],
    grossSalary: 1200000,
    deductions: {
      standard: 50000,
      section10: 21600,
      pfEmployee: 21600,
      pt: 2400,
    },
    netTaxableSalary: 1104400,
    taxOnNetSalary: 143820,
    educationCess: 5733,
    totalTax: 149572,
    remainingTax: 149572,
    remainingMonths: 12,
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ margin: 0 }}>Tax Sheet</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <select style={{ padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <option>Apr-2024 to Mar-2025</option>
          {/* Additional options can be added here */}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap' }}>
        <h4 style={{ margin: 0 }}>Tax Computation Sheet</h4>

        <button
          onClick={handleDownload}
          style={{
            backgroundColor: '#ADD8E6', 
            border: '1px solid #87CEEB',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Download Annual Tax Sheet
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid black', padding: '8px' }}>Component Name</th>
              {taxData.months.map((month, idx) => (
                <th key={idx} style={{ border: '1px solid black', padding: '8px' }}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {taxData.salaryComponents.map((component, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{component.name}</td>
                {component.values.map((value, idx) => (
                  <td key={idx} style={{ border: '1px solid black', padding: '8px', textAlign: 'right' }}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', marginTop: '10px', maxWidth: '500px' }}>
        <tbody>
          <tr>
            <td style={{ padding: '8px' }}>Total Gross Salary</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.grossSalary}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Standard Deduction</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.deductions.standard}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Section 10 (Tax-Free)</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.deductions.section10}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>PF Employee (Gross)</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.deductions.pfEmployee}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>PT (Gross)</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.deductions.pt}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Net Taxable Salary</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.netTaxableSalary}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Tax on Net Taxable Salary</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.taxOnNetSalary}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Education Cess</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.educationCess}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Total Tax</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.totalTax}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Remaining Tax</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.remainingTax}</td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>Remaining Months</td>
            <td style={{ padding: '8px', textAlign: 'right' }}>{taxData.remainingMonths}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaxSheet;
