import React, { useState, useEffect, useRef } from 'react';
import logo from "./images/Logo.jpeg";
import { FaPrint } from "react-icons/fa";
const Change = () => {
    const [newDesignation, setNewDesignation] = useState('(Insert New Designation)');
    const [reportingPerson, setReportingPerson] = useState('(Insert New Designation)');
    const [effectiveDate, setEffectiveDate] = useState('(Insert New Designation)');

    const newDesignationRef = useRef(null);
    const reportingPersonRef = useRef(null);
    const effectiveDateRef = useRef(null);

    useEffect(() => {
        adjustWidth(newDesignationRef, newDesignation);
        adjustWidth(reportingPersonRef, reportingPerson);
        adjustWidth(effectiveDateRef, effectiveDate);
    }, [newDesignation, reportingPerson, effectiveDate]);

    const adjustWidth = (ref, value) => {
        if (ref.current) {
            const buffer = -9; 
            ref.current.style.width = `${Math.max(value.length + buffer, 12)}ch`;
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 md:p-9 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg relative">
           <div className="absolute top-40 right-8 mt-4 mr-4 print:hidden">
                <button onClick={handlePrint} className="text-blue-600 hover:underline flex items-center">
                    <FaPrint className="mr-2" /> Print
                </button>
            </div>
            <div className='pt-0'>
                <img src={logo} alt="Logo" className='w-2/5 h-15' />
            </div>
            
            <div className='space-y-4 pt-0'>
                <p className="text-right pt-11 text-sm md:text-base">
                    <b className='underline'>Date:</b> 2024-08-11
                </p>

                <p>To,</p>
                <p className="font-medium">Chandrappa R,</p>
                <p>MD/CEO,</p>
                <p>Management.</p>
            </div>

            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4">
                <b className='underline'>Sub:</b> Change in Job Role.
            </p>

            <div className="mb-6 md:mb-8">
                <p>Dear Chandrappa,</p>
                <p className="text-sm md:text-base pt-6">
                    We are writing you this letter to affirm that we have decided to change your job role from MD/CEO to
                    <input
                        type="text"
                        className=" ml-1 underline font-bold"
                        value={newDesignation}
                        onChange={(e) => setNewDesignation(e.target.value)}
                        ref={newDesignationRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    />. We currently have a vacancy in the position of
                    <input
                        type="text"
                        className="underline font-bold mr-1"
                        value={reportingPerson}
                        onChange={(e) => setReportingPerson(e.target.value)}
                        ref={reportingPersonRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    /> in the
                    <input
                        type="text"
                        className="ml-1 underline font-bold mr-1"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        ref={effectiveDateRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    />. We have observed your work for the
                    past few days and we think that with your skills and experience, you would be a perfect fit for this
                    position.
                </p>
            </div>
            <div className="mb-6 md:mb-8">
                <p>In this new job role, your responsibilities will be as follows:
                    <input
                        type="text"
                        className="underline font-bold ml-1"
                        value={reportingPerson}
                        onChange={(e) => setReportingPerson(e.target.value)}
                        ref={reportingPersonRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    />
                </p>
            </div>
            <div className="mb-6 md:mb-8">
                <p className="text-sm md:text-base">
                    We also think that you will find the new job role more to your liking and that will help boost your
                    performance. Subsequently, you will be reporting directly to
                    <input
                        type="text"
                        className="underline font-bold ml-1 mr-1"
                        value={reportingPerson}
                        onChange={(e) => setReportingPerson(e.target.value)}
                        ref={reportingPersonRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    /> w.e.f.
                    <input
                        type="text"
                        className="underline font-bold ml-1 mr-1"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        ref={effectiveDateRef}
                        style={{ overflow: 'hidden', width: '12ch', minWidth: '50px' }}
                    />. You can contact them if you have any questions.
                </p>
            </div>

            <p>Regards,</p>

            <p className='pt-2 pb-72'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>

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

export default Change;
