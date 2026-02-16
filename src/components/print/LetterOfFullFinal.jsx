import React, { useState, useRef, useEffect } from 'react';
import logo from "./images/Logo.jpeg";
import { FaPrint } from "react-icons/fa";

const SettlementLetter = () => {
  // States for dynamic content
  const [date, setDate] = useState('2024-08-11');
  const [amount, setAmount] = useState('(Insert Amount)');
  const [transactionDetails, setTransactionDetails] = useState('(Insert Transaction Details)');
  const [settlementDate, setSettlementDate] = useState('(Date)');
  const [recipientName, setRecipientName] = useState('Chandrappa R');
  const [recipient, setRecipient] = useState('__________');
  
  // Refs for inputs
  const dateInputRef = useRef(null);
  const amountInputRef = useRef(null);
  const transactionDetailsInputRef = useRef(null);
  const settlementDateInputRef = useRef(null);
  const recipientNameInputRef = useRef(null);

  // Adjust input width based on content
  useEffect(() => {
    adjustWidth(dateInputRef, date);
    adjustWidth(amountInputRef, amount);
    adjustWidth(transactionDetailsInputRef, transactionDetails);
    adjustWidth(settlementDateInputRef, settlementDate);
    adjustWidth(recipientNameInputRef, recipientName);
  }, [date, amount, transactionDetails, settlementDate, recipientName]);

  const adjustWidth = (ref, value) => {
    if (ref.current) {
      const buffer = -9; // Adjust as needed
      ref.current.style.width = `${Math.max(value.length + buffer, 12)}ch`;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-10 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg relative">
      <div className="absolute top-4 right-4 mt-4 mr-4 print:hidden">
        <button onClick={handlePrint} className="text-blue-600 hover:underline flex items-center">
          <FaPrint className="mr-2" /> Print
        </button>
      </div>
      <div className='pt-0'>
        <img src={logo} alt="Logo" className='w-2/5 h-15' />
      </div>
      <div className='text-sm md:text-base space-y-4 pt-0'>
        <p className="text-right pt-16 text-sm md:text-base">
          <b className='underline'>Date:</b>
          <input
            type="text"
            className="text-left pl-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            ref={dateInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          />
        </p>

        <p>To,</p>
        <p className="font-medium">
          <input
            type="text"
            className="underline"
            value={recipientName}
            onChange={(e) =>setRecipientName(e.target.value)}
            ref={recipientNameInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          />
        </p>
        <div className="h-6 md:h-8 mb-4">
        <input
            type="text"
            className="underline"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            ref={recipientNameInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          />
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <p className="text-sm md:text-base pt-6">
          <b>Sub:</b> Letter of full and final settlement.
        </p>
      </div>

      <div className="mb-6 md:mb-8">
        <p className='text-sm md:text-base'>Dear <input
          type="text"
          className="underline"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          ref={recipientNameInputRef}
          style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
        />,</p>
        <p className="text-sm md:text-base pt-6">
          This letter is to affirm that post the termination of your employment, we have credited a payment of
          <input
            type="text"
            className="underline font-bold ml-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            ref={amountInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          /><space/> via 
          <input
            type="text"
            className="underline font-bold ml-2"
            value={transactionDetails}
            onChange={(e) => setTransactionDetails(e.target.value)}
            ref={transactionDetailsInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          /><space/> on
          <input
            type="text"
            className="underline font-bold ml-2"
            value={settlementDate}
            onChange={(e) => setSettlementDate(e.target.value)}
            ref={settlementDateInputRef}
            style={{ overflow: 'hidden', width: '2ch', minWidth: '50px' }}
          /><space/> to you, as the full and final settlement towards your salary. With this payment, there are no dues left between you and INFINITALENT CONSULTING PRIVATE LIMITED. Kindly sign below to assert the same.
        </p>
      </div>

      <div className="mb-6 md:mb-8">
        <p>Regards</p>
        <p className='pt-3'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>
      </div>

      <div className="h-4 md:h-16 border-b border-black mb-6 md:mb-8"></div>

      <div className="mb-6 md:mb-8">
        <p className="text-sm md:text-base">
          I have received the amount of<input
            type="text"
            className="underline font-bold ml-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            ref={amountInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          /><space/> via<input
            type="text"
            className="underline font-bold ml-2"
            value={transactionDetails}
            onChange={(e) => setTransactionDetails(e.target.value)}
            ref={transactionDetailsInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          /><space/> on
        <input
            type="text"
            className="underline font-bold ml-2"
            value={settlementDate}
            onChange={(e) => setSettlementDate(e.target.value)}
            ref={settlementDateInputRef}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
          /> as the full and final settlement towards my employment at INFINITALENT CONSULTING PRIVATE LIMITED. I confirm that post this settlement, there are no dues left between me and INFINITALENT CONSULTING PRIVATE LIMITED.
        </p>
      </div>

      <div className='mb-72'>
        <p className="font-medium">Chandrappa R</p>
      </div>

      <footer className="bg-white border-t border-dotted border-gray-400 text-center sm:p-6 lg:p-10">
        <h2 className="text-orange-600 font-bold text-lg sm:text-xl lg:text-2xl">
          INFINITALENT CONSULTING PRIVATE LIMITED
        </h2>
        <div className="text-sm text-gray-700 text-bold space-y-3 mb-2 lg:space-y-3">
          <p>
            Reg Office & works: No. 427, 12th main road, 1st Block, 3rd stage,
            Manjunath Nagar, Bengaluru- 560010
          </p>
          <p>
            Corp Office: No.731, 2nd Floor, Channakeshava Nagara 13th Cross, Mico,
            Main Road, Electronic City, Bengaluru- 560100
          </p>
        </div>

        <div className="text-sm text-gray-700 space-y-3 mb-2 border-t border-dotted border-gray-400">
          <div className='flex gap-3 mt-2 lg:space-x-60'>
            <span className='text-start'>Contact: 080-35211534</span>
            <span className='text-end'>Mob: 7892273165 / 9035950524</span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full space-y-2 lg:mt-0 mt-3 lg:space-x-60 text-xs">
            <div className='text-center lg:text-left'>
              <a href="mailto:info@infiniti-talent.com" className="text-blue-600 hover:underline">
                info@infiniti-talent.com
              </a>{" "}
              |{" "}
              <a href="http://www.infiniti-talent.com" className="text-blue-600 hover:underline">
                www.infiniti-talent.com
              </a>
            </div>
            <div className='text-center lg:text-right'>
              <a href="mailto:info@infinitalentconsult.com" className="text-blue-600 hover:underline">
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

export default SettlementLetter;
