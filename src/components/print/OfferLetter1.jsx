import React, { useState } from 'react';
import logo from "./images/Logo.jpeg";

const OfferLetter = () => {
  const [offerDetails, setOfferDetails] = useState({
    ref: 'ICPL………/HRD/EMP/ICPL-OS-0111',
    date: '2024-08-11',
    name: 'Chandrappa',
    joiningDate: '2021-02-08',
    salary: 'Rs 15300/- p.m.',
    reportDate: '20-Mar-2024',
    location: 'DISA India Ltd, Tumakuru plant',
    company: 'Infinitalent Consulting Private Limited',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-10 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <div className='pt-0'>
        <img src={logo} alt="Logo" className='w-2/5 h-15' />
      </div>
      <div className="flex text-sm sm:text-base">
        <p className='pt-14 text-sm'>Ref: 
          <input
            type="text"
            name="ref"
            value={offerDetails.ref}
            onChange={handleChange}
            className="border-b border-gray-300 ml-2"
          />
        </p>
        <p className='lg:pl-48 sm:pl-1 pt-14 text-sm md:text-base'>
          <b className='underline'>Date:</b>
          <input
            type="date"
            name="date"
            value={offerDetails.date}
            onChange={handleChange}
            className="border-b border-gray-300 ml-2"
          />
        </p>
      </div>

      <h1 className="text-lg pt-10 font-bold text-center sm:text-lg">:: OFFER LETTER ::</h1>

      <p className="text-sm sm:text-base p-4">
        <b>Dear </b>
        <input
          type="text"
          name="name"
          value={offerDetails.name}
          onChange={handleChange}
          className="border-b border-gray-300"
        />,
      </p>
      <div className='p-4'>
        <p className="text-sm sm:text-base">
          This refers to your application and the subsequent interview on {offerDetails.date} for the Trainee Technician position. We are pleased to inform you that you have been accepted as an <b>"Apprenticeship Trainee"</b> on the following terms and conditions:
        </p>
      </div>
      <div className='p-4'>
        <ul className="list-decimal list-inside space-y-12 text-sm sm:text-base">
          <li>You will be working as an ICPL employee at
            <input
              type="text"
              name="location"
              value={offerDetails.location}
              onChange={handleChange}
              className="border-b border-gray-300 ml-2"
            />. The joining date will be
            <input
              type="date"
              name="joiningDate"
              value={offerDetails.joiningDate}
              onChange={handleChange}
              className="border-b border-gray-300 ml-2"
            />.
          </li>
          <li>During this period, you will be given an all-inclusive salary
            <input
              type="text"
              name="salary"
              value={offerDetails.salary}
              onChange={handleChange}
              className="border-b border-gray-300 ml-2"
            />
          </li>
          <li>You shall report to duty on or before
            <input
              type="text"
              name="reportDate"
              value={offerDetails.reportDate}
              onChange={handleChange}
              className="border-b border-gray-300 ml-2"
            />.
          </li>
          <li>You will not be entitled to get PF & ESIC/Medical insurance during this training period, not any other allowances/benefits except national holiday, Sunday and one day leave per month.</li>
          <li>During your working period you shall be under an instructor and strictly adhere to the schedule of the company policy.</li>
          <li>Your work may be discontinued by the management without notice or without any reason (Based on our customer company requirement).</li>
          <li>The Management is under no obligation to offer you employment during the working period if found satisfactory.</li>
          <li>However, the Management reserves the right to offer you employment on the successful completion of your training period in which event you shall accept such employment on terms and conditions to be advised to you.</li>
          <li>During your working period you shall not indulge or engage yourself in any other business, occupation or any other subversive activities detrimental to the interest of the company.</li>
          <li>You shall not at any time during your working period or after, disclose to anyone any information, know-how, knowledge, secrets, methods, plans, etc. of the company.</li>
          <li>You will take good care of and be responsible for the work, machinery, tools and any other items, materials entrusted to you from time to time.</li>
          <li>In addition to the above terms and conditions, you will be governed by the Company's Standing Orders/ Service Rules & Regulations.</li>
          <li>During the working period, if you are found medically unfit, your job period gets discontinued with immediate effect.</li>
          <p>Your present place of posting is at
            <input
              type="text"
              name="location"
              value={offerDetails.location}
              onChange={handleChange}
              className="border-b border-gray-300 ml-2"
            />, ….</p>
          <li>This offer is subject to your Background Verification report being positive/ satisfactory.</li>
        </ul>
      </div>
      <div className='text-sm sm:text-base p-4 space-y-8'>
        <p>Your details are shown below</p>
        <p className='pt-8'>
          <input
            type="text"
            name="name"
            value={offerDetails.name}
            onChange={handleChange}
            className="border-b border-gray-300"
          />
        </p>
        <input
            type="text"
            name="Mobile"
            value={offerDetails.Mobile}
            onChange={handleChange}
            className="border-b border-gray-300"
          />
        <p className='pt-8'>+91 9035950524</p>
        <p className="text-sm sm:text-base">
          Your posting will be at
          <input
            type="text"
            name="location"
            value={offerDetails.location}
            onChange={handleChange}
            className="border-b border-gray-300 ml-2"
          />.
        </p>
        <p className="text-sm sm:text-base">
          This offer is subject to a positive Background Verification report.
        </p>
        <p className="text-sm sm:text-base">
          If you accept the above terms, please report for the job after signing this document.
        </p>
      </div>
      <div className="space-y-2 text-sm sm:text-base p-4">
        <p>Signature of the employee:</p>
        <p>Place: Bangalore</p>
      </div>

      <div className="text-sm sm:text-base p-4">
        HR Department,
        <p>
          <input
            type="text"
            name="company"
            value={offerDetails.company}
            onChange={handleChange}
            className="border-b border-gray-300"
          />
        </p>
      </div>

      <div className="text-center mt-6 pb-72">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 sm:px-6 sm:py-3"
        >
          Print Offer Letter
        </button>
      </div>
      <footer className=" bg-white border-t border-dotted border-gray-400 text-center  sm:p-6 lg:p-10">
                <h2 className="text-orange-600 font-bold text-lg sm:text-xl lg:text-2xl ">
                    INFINITALENT CONSULTING PRIVATE LIMITED
                </h2>
                <div className="text-sm text-gray-700 text-bold space-y-3  mb-2 lg:space-y-3">
                    <p>
                        Reg Office & works: No. 427, 12th main road, 1st Block, 3rd stage,
                        Manjunath Nagar, Bengaluru- 560010
                    </p>
                    <p>
                        Corp Office: No.731, 2nd Floor, Channakeshava Nagara 13th Cross, Mico,
                        Main Road, Electronic City, Bengaluru- 560100
                    </p>
                </div>

                <div className="text-sm text-gray-700 space-y-3 mb-2 border-t border-dotted border-gray-400 ">
                    <div className=' flex gap-3 mt-2 lg:space-x-60'>
                        <span className='text-start '>Contact: 080-35211534</span>
                        <span className='text-end'>Mob: 7892273165 / 9035950524</span>
                    </div>
                    <div className="  flex flex-col lg:flex-row justify-between items-center w-full  space-y-2   lg:mt-0 mt-3 lg:space-x-60 text-xs ">
                        <div className=' text-center lg:text-left '>
                            <a href="mailto:info@infiniti-talent.com" className="text-blue-600 hover:underline">
                                info@infiniti-talent.com
                            </a>{" "}
                            |{" "}
                            <a href="http://www.infiniti-talent.com" className="text-blue-600 hover:underline ">
                                www.infiniti-talent.com
                            </a>
                        </div>
                        <div className='text-center lg:text-right  '>
                            <a href="mailto:info@infinitalentconsult.com" className="text-blue-600 hover:underline ">
                                info@infinitalentconsult.com
                            </a>{" "}
                            |{" "}
                            <a href="http://www.infinitalentconsult.com" className="text-blue-600 hover:underline">
                                www.infinitalentconsult.com
                            </a>
                        </div>
                    </div>
                </div>
            </footer>


    </div>

  );
};

export default OfferLetter; 