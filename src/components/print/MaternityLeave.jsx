import React, { useState, useRef, useEffect } from 'react';
import logo from "./images/Logo.jpeg";
import { FaPrint } from "react-icons/fa";

const Letter = () => {
    // States for dynamic content
    const [date, setDate] = useState('2024-08-11');
    const [recipientName, setRecipientName] = useState('Chandrappa R');
    const [startDate, setStartDate] = useState('(Start Date of Leave)');
    const [rejoinDate, setRejoinDate] = useState('(Date of rejoining)');
    const [fillingInName, setFillingInName] = useState('(Insert name)');

    // Refs for inputs
    const dateInputRef = useRef(null);
    const recipientNameInputRef = useRef(null);
    const startDateInputRef = useRef(null);
    const rejoinDateInputRef = useRef(null);
    const fillingInNameInputRef = useRef(null);

    // Adjust input width based on content
    useEffect(() => {
        adjustWidth(dateInputRef, date);
        adjustWidth(recipientNameInputRef, recipientName);
        adjustWidth(startDateInputRef, startDate);
        adjustWidth(rejoinDateInputRef, rejoinDate);
        adjustWidth(fillingInNameInputRef, fillingInName);
    }, [date, recipientName, startDate, rejoinDate, fillingInName]);

    const adjustWidth = (ref, value) => {
        if (ref.current) {
            const buffer = -9; // Adjust as needed
            ref.current.style.width = `${Math.max(value.length + buffer, 12)}ch`;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const Section = ({ children }) => (
        <div className="mb-6 md:mb-8">
            {children}
        </div>
    );

    const Placeholder = ({ label, value, onChange, ref }) => (
        <input
            type="text"
            className="underline"
            value={value}
            onChange={onChange}
            ref={ref}
            style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
        />
    );

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
                    <b className='underline'>Date: </b>
                    <Placeholder
                        label="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        ref={dateInputRef}
                    />
                </p>

                <p>To,</p>
                <p className="font-medium">
                    <Placeholder
                        label="Recipient Name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        ref={recipientNameInputRef}
                    />
                </p>
                <p>MD/CEO,</p>
                <p>Management.</p>
            </div>

            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4">
                <b className='underline'>Sub:</b> Approval of Maternity Leave.
            </p>

            <Section>
                <p className="text-sm md:text-base pt-4">
                    Dear <Placeholder
                        label="Recipient Name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        ref={recipientNameInputRef}
                    />,
                </p>
                <p className="text-sm md:text-base pt-6">
                    This is to inform you that your request for a maternity leave from <Placeholder
                        label="Start Date of Leave"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        ref={startDateInputRef}
                    /><space/> has
                    been approved. You are expected to rejoin work on <Placeholder
                        label="Date of rejoining"
                        value={rejoinDate}
                        onChange={(e) => setRejoinDate(e.target.value)}
                        ref={rejoinDateInputRef}
                    />. In case you require
                    an extension in leave owing to any complications, you are requested to inform the office in advance.
                </p>
            </Section>
            <Section>
                <p className="text-sm md:text-base">
                    <Placeholder
                        label="Insert name"
                        value={fillingInName}
                        onChange={(e) => setFillingInName(e.target.value)}
                        ref={fillingInNameInputRef}
                    /> will be filling in for you in your absence. Before the leave begins, kindly see
                    to it that you have briefed them about the work and completed the necessary training. We hope that you
                    are available and in contact with us in the rare case of an emergency, and we will make sure that we won't
                    disturb you unless it's absolutely unavoidable.
                </p>
            </Section>
            <Section>
                <p className="text-sm md:text-base">
                    We thank you for your cooperation and wish you a healthy and happy time off work. The office wishes
                    you the best of luck for welcoming the newborn into the world and we pray that everything goes well.
                </p>
                <p className='pt-4 text-sm md:text-base'>Warm Regards.</p>
            </Section>

            <p className="mb-72">For INFINITALENT CONSULTING PRIVATE LIMITED</p>

            <Section>
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
            </Section>
        </div>
    );
};

export default Letter;
