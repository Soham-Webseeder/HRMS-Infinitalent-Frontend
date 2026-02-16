import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const DeclarationWindow = ({ title, limit, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const sectionStyle = {
    border: '1px solid #ddd',
    padding: '10px 20px',
    marginBottom: '5px',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '5px',
  };

  const titleStyle = {
    flex: '1',
  };

  const rightCornerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const contentStyle = {
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginTop: '10px',
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <div style={sectionStyle} onClick={toggleDropdown}>
        <div style={titleStyle}>
          <h3 style={{ margin: 0 }}>{title} (Limit: {limit})</h3>
        </div>
        <div style={rightCornerStyle}>
          <p style={{ marginRight: '10px' }}>Total Amount: 0</p>
          <span style={{ cursor: 'pointer' }}>{isOpen ? '-' : '▼'}</span>
        </div>
      </div>
      {isOpen && (
        <div style={contentStyle}>
          {content}
        </div>
      )}
    </div>
  );
};


const DeclarationWindowMain = () => {
  const [activeButton, setActiveButton] = useState('declaration');
  const [showNotes, setShowNotes] = useState(false);
  const [subheading, setSubheading] = useState('Declaration Window');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);


    if (buttonType === 'submission') {
      setShowNotes(true);
      setSubheading('Submission Window');
    } else {
      setShowNotes(false);
      setSubheading('Declaration Window');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const tableRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  };

  const tableColStyle = {
    flex: '1',
    marginRight: '10px',
  };

  const labelStyle = {
    marginBottom: '5px',
    display: 'block',
    fontWeight: 'bold',
  };

  const sections = [
    {
      title: 'Section 10',
      limit: '150000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Section 10(13A) HRA Bill</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>Conveyance Allowance [Section 10(General)]</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div>
            <h4>HRA Details</h4>
            <div style={tableRowStyle}>
              <div style={tableColStyle}>
                <label style={labelStyle}>Medical [Section 10(General)]</label>
                <input type="number" placeholder="0" style={inputStyle} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Chapter 6',
      limit: '150000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>House Loan Payment</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>Infrastructure Bond</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Mutual Fund</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>Tuition Fees</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Fixed Deposit</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>Others</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Infrastructure Development</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>Sukanya Samriddhi Scheme</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Voluntary Provident Fund (VPF)</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>80CCC</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>80CCD</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>80CC</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>

          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>80C</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Housing Loan Interest',
      limit: '200000',
      content: (
        <div>
          <label>Housing Loan Interest Amount u/s 24</label>
          <input type="number" placeholder="0" style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
      ),
    },
    {
      title: '80DD - Medical treatment for handicapped dependent',
      limit: '125000',
      content: (
        <div>
          <label>Medical Treatment</label>
          <input type="number" placeholder="0" style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
      ),
    },
    {
      title: '80U - Income of Blind OR Physically Handicapped person',
      limit: '125000',
      content: (
        <div>
          <label>Income of Blind OR Physically Handicapped person</label>
          <input type="number" placeholder="0" style={{ width: '100%', padding: '8px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
      ),
    },
    {
      title: '80 E - Interest paid on Higher Education Loan',
      limit: '0',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Interest Education Loan</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 16 Entertainment Allowance',
      limit: '0',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Entertainment Allowance bill</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>Section 16(iii)</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80D - Medical Insurance Self',
      limit: '25000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Health Insurance self</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Let out property Housing Loan Interest u/s 24',
      limit: '200000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>
                Profit on Housing Loan Interest u/s 24 (Let out property)
              </label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
            <div style={tableColStyle}>
              <label style={labelStyle}>
                Loss on Housing Loan Interest u/s 24 (Let out property)
              </label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80 G - Donation',
      limit: '0',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>80 G - Donation</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80DDB Med Exp incurred on treatment of employees or his dependent if senior citizen',
      limit: '100000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Dependant Handicapped Treatment self</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80DDB Med Exp incurred on treatment of employees or his dependent',
      limit: '80000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Dependant Handicapped Treatment</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80TTA - Interest In Saving Account',
      limit: '10000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Income from Other sources (80TTA)</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80TTB - Interest In Saving Account Senior Citizen',
      limit: '50000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Income from Other sources (80TTB)</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'National Pension Scheme (NPS) u/s 80CCD(1B)',
      limit: '50000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>NPS u/s 80CCD(1B)</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80D - Medical Insurance Parents Senior Citizen',
      limit: '50000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Medical Insurance Parents</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80D - Medical Insurance Parents',
      limit: '25000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Medical Insurance Parents</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80 EE - Additional Home Loan Interest Deduction',
      limit: '50000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Additional Home Loan Interest</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80D - Preventive Health Checkup',
      limit: '5000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Preventive Health Checkup</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80EEA - Additional benefit for First time home loan buyer',
      limit: '150000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>First Time Home Loan Buyer</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '80GGC - Donation to registered political party / electoral trust',
      limit: 'No Limit',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Political Party Donation</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80EEB - Deduction for loan interest on electric vehicle',
      limit: '150000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Electric Vehicle Loan Interest</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 80D - Preventive Health Checkup Dependant Parents',
      limit: '5000',
      content: (
        <div>
          <div style={tableRowStyle}>
            <div style={tableColStyle}>
              <label style={labelStyle}>Health Checkup - Dependant Parents</label>
              <input type="number" placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>
      ),
    },

  ];

  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    border: '1px solid',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  };

  const notesContainerStyle = {
    width: '30%',
  };

  const tableContainerStyle = {
    width: '70%',
  };

  const declarationInfoStyle = {
    fontSize: '14px',
    color: '#333',
    marginBottom: '10px',
  };

  const dateRangeStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  };

  const newBoxStyle = {
    position: 'absolute',
    right: '0',
    top: '-20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '5px 10px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
  };

  const viewLogsStyle = {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  const notesStyle = {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
    width: '100%',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const notesListStyle = {
    listStyleType: 'decimal',
    paddingLeft: '20px',
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">
            IT Declaration
          </h1>
          <p className="font-light text-gray-600 mt-4">
            <Link to="/">Home</Link> | <Link to="/app/payroll">Payroll</Link> | <Link to="/payroll/IT-declaration">IT Declaration</Link>
          </p>
        </div>
      </div>
      <div className="border rounded px-4 py-4 bg-gray-100">
        <div style={{ padding: '40px 20px', position: 'relative' }}> {/* Increased top padding */}
          {/* Container for Buttons and Calendar Box */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            {/* New Date Box in the right corner above the buttons */}
            <div style={newBoxStyle}>
              <FaCalendarAlt style={{ marginRight: '5px' }} />
              <span>Apr-2024 to Mar-2025</span>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: activeButton === 'declaration' ? '#007bff' : '#6c757d',
                  color: '#fff',
                  borderColor: activeButton === 'declaration' ? '#007bff' : '#6c757d',
                }}
                onClick={() => handleButtonClick('declaration')}
              >
                Declaration
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: activeButton === 'submission' ? '#007bff' : '#6c757d',
                  color: '#fff',
                  borderColor: activeButton === 'submission' ? '#007bff' : '#6c757d',
                }}
                onClick={() => handleButtonClick('submission')}
              >
                Submission
              </button>
            </div>
          </div>

          {/* Subheading */}
          <h2>{subheading}</h2>

          {/* Calendar and logs info under the buttons */}
          <div style={declarationInfoStyle}>
            <div style={dateRangeStyle}>
              <FaCalendarAlt style={{ marginRight: '5px' }} />
              <span>Apr-2024 to Mar-2025</span>
            </div>
            <div>
              <a href="#" style={viewLogsStyle}>View logs</a>
            </div>
          </div>

          {/* Notes and Table Section */}
          <div style={containerStyle}>
            <div style={notesContainerStyle}>
              {showNotes && (
                <div style={notesStyle}>
                  <h4>Note:</h4>
                  <ul style={notesListStyle}>
                    <li>It's mandatory to take action on the declaration, either you can upload receipts OR make it zero (if the doc is not there).</li>
                    <li>You can change the declaration value at submission and attach relevant receipts.</li>
                    <li>New Submission you can do and attach relevant receipts.</li>
                    <li>Once the Submission is done, the request went to admin for approval, after their action you can see the exemption in the tax sheet.</li>
                    <li>If an employee has not done a submission then as admin you have to take action and make it zero otherwise till Mar 2025 their payroll will run based on the declaration.</li>
                  </ul>
                </div>
              )}
            </div>

            <div style={tableContainerStyle}>
              {sections.map((section, index) => (
                <DeclarationWindow key={index} title={section.title} limit={section.limit} content={section.content} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationWindowMain;
