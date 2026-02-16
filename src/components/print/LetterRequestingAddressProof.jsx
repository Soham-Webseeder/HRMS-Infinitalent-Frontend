import React, { useState, useRef, useEffect } from 'react';
import logo from "./images/Logo.jpeg";
import { FaPrint } from "react-icons/fa";

const Letter = () => {
    // States for dynamic content
    const [date, setDate] = useState('2024-08-11');
    const [recipientName, setRecipientName] = useState('Chandrappa R');
    const [documentList, setDocumentList] = useState(['(Insert list of documents)']);
    const [responsibility, setResponsibility] = useState('(Insert Responsibility)');
    const [reliefDate, setReliefDate] = useState('(Date)');

    // Refs for inputs
    const dateInputRef = useRef(null);
    const recipientNameInputRef = useRef(null);
    const documentListRef = useRef(null);
    const responsibilityInputRef = useRef(null);
    const reliefDateInputRef = useRef(null);

    // Adjust input width based on content
    useEffect(() => {
        adjustWidth(dateInputRef, date);
        adjustWidth(recipientNameInputRef, recipientName);
        adjustWidth(responsibilityInputRef, responsibility);
        adjustWidth(reliefDateInputRef, reliefDate);
    }, [date, recipientName, responsibility, reliefDate]);

    const adjustWidth = (ref, value) => {
        if (ref.current) {
            const buffer = -9; // Adjust as needed
            ref.current.style.width = `${Math.max(value.length + buffer, 12)}ch`;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDocumentListChange = (index, event) => {
        const newDocumentList = [...documentList];
        newDocumentList[index] = event.target.value;
        setDocumentList(newDocumentList);
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
                <p className="text-right pt-11 text-sm md:text-base">
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
                        onChange={(e) => setRecipientName(e.target.value)}
                        ref={recipientNameInputRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    />
                </p>
                <p>MD/CEO,</p>
                <p>Management.</p>
            </div>

            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4">
                <b className='underline'>Sub:</b> Request for submitting address proof.
            </p>

            <div className="mb-6 md:mb-8">
                <p className='text-sm md:text-base mt-4'>
                    Dear <input
                        type="text"
                        className="underline"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        ref={recipientNameInputRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    />,
                </p>
                <p className="text-sm md:text-base pt-6">
                    On behalf of everyone at INFINITALENT CONSULTING PRIVATE LIMITED, I would like to welcome
                    you to our organization. We are looking forward to working with you and towards building a healthy
                    work relationship.
                </p>
            </div>

            <div className="mb-6 md:mb-8">
                <p className="text-sm md:text-base">
                    As a standard procedure for all employees, you are required to submit a copy of your Address Proof at
                    your office at the earliest, at our Bangalore office. This is purely for official records and purposes.
                </p>
                <div className="pt-3">
                    {documentList.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                className="underline font-bold"
                                value={doc}
                                onChange={(e) => handleDocumentListChange(index, e)}
                                ref={documentListRef}
                                style={{ overflow: 'hidden', width: '20ch', minWidth: '100px' }}
                            />
                        </div>
                    ))}
                </div>
                <p className='pt-3'>Thanking You,</p>
                <p className='pt-3'>Sincerely,</p>
                <p className='pt-3'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>
            </div>

            <div className="h-4 md:h-16 border-b border-black mb-6 md:mb-8"></div>

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

export default Letter;
