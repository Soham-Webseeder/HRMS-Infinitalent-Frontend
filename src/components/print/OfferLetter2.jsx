import React, { useState } from 'react';
import logo from "../src/Logo.jpeg";

const OfferLetter = () => {
  const [offerDetails] = useState({
    ref: 'ICPL………/HRD/EMP/ICPL-OS-0111',
    date: '2024-08-11',
    name: 'Chandrappa',
    joiningDate: '2021-02-08',
    salary: 'Rs 29000/- p.m',
    reportDate: '20-Mar-2024',
    location: 'Banglore',
    company: 'Infinitalent Consulting Private Limited',
  });

  const handlePrint = () => {
    window.print();
  };

  return (


    <div className="p-6 md:p-10 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg">

      <div className='pt-0' > <img src={logo} alt="Logo" className='w-2/5  h-15
            '/></div>
      <div className="flex text-sm sm:text-base ">
        <p className='pt-14 text-sm'>Ref: {offerDetails.ref}</p>
        <p className='lg:pl-48 sm:pl-1 pt-14 md:pl-10 text-sm md:text-base'><b className='underline'>Date:</b>{offerDetails.date}</p>
      </div>


      <h1 className="text-lg pt-10 font-bold text-center sm:text-lg">:: OFFER LETTER ::</h1>



      <p className="text-sm sm:text-base p-4">
        <b>Dear </b>{offerDetails.name},
      </p>
      <div className=' p-4'>
        <p className="text-sm sm:text-base">
          This refers to your application and the subsequent interview on {offerDetails.date} for the Trainee Technician position. We are pleased to inform you that you have been accepted as an <b>"contract employee"</b> on the following terms and conditions:
        </p>
      </div>
      <div className='p-4 '>
        <ul className="list-decimal list-inside space-y-12 text-sm sm:text-base">
          <li>You will be working as an ICPL employee  and work location is {offerDetails.location}. The joining date will be {offerDetails.joiningDate}.</li>
          <li>During this period, you will be given an all-inclusive salary <b> {offerDetails.salary}</b></li>
          <li>You shall report to duty on or before {offerDetails.reportDate}.</li>
          <li>You will not be entitled to any other allowances, benefits except national holiday, Sunday and one day
            leave per month with prior information..</li>
          <li> During your working period you shall be under an instructor and strictly adhere to the schedule of the
            company policy </li>
          <li>Your work may be discontinued by the management without notice or without any reason ( Based on
            our customer company requirement ). Either 15 days prior information by ICPL or if employee wants to
            quit 15 days prior information to the ICPL in writing.
          </li>
          <li> The Management is under no obligation to offer you employment during working period if found
            satisfactory.</li>
          <li>However, the Management reserves the right to offer you employment on the successful completion of
            your training period in which event you shall accept such employment on terms and conditions to be
            advised to you.
          </li>
          <li> During your working period you shall not indulge or engage yourself in any other business, occupation
            or any other subversive activities detrimental to the interest of the company.
          </li>
          <li>You shall not at any time during your working period or after, disclose to anyone any information,
            know-how, knowledge, secrets, methods, plans, etc. of the company. </li>
          <li>  You will take good care of and be responsible for the work, machinery, tools and any other items,
            materials entrusted to you from time to time.
          </li>
          <li> In addition to the above terms and conditions, you will be governed by the Company's Standing
            Orders/ Service Rules & Regulations.</li>
          <li>During the working period, if you are found medically unfit, your job period gets discontinued with
            immediate effect. </li>
          <p>Your present place of posting is at  Bangalore….</p>
          <li> This offer is subject to your Back Ground Verification report being positive/ satisfactory</li>

        </ul>
      </div>
      <div className='text-sm sm:text-base p-4 space-y-8'>
        <p>Your deatails with us</p>
        <p>chandrappaR chandrappa@infini-talent.com 91 9035950524_______________________</p>
        <p>If any changes in the address or contact details keep inform to our HRD On time</p>
        <p>If you accept the above terms & conditions, you may report for job after signing this document</p>
        <p>I have read the above terms & conditions and voluntarily accept the same.
        </p>
        <p>I will report for work on………. {offerDetails.joiningDate}</p>
       </div>
       

      <div className="text-sm sm:text-base p-4">
        HR Department,
        <p className='pt-4'>{offerDetails.company}</p>
      </div>

      <div className="text-center mt-6 pb-72">
        <button
          onClick={handlePrint}
          className="px-4 py-2  bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 sm:px-6 sm:py-3"
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