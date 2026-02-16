import React, { useState, useRef, useEffect } from 'react';
import { FaPrint } from "react-icons/fa";
import logo from "./images/Logo.jpeg";

const Bonus = () => {
    const [bonusAmount, setBonusAmount] = useState('(Insert Amount)');

    const bonusAmountRef = useRef(null);

    useEffect(() => {
        adjustWidth(bonusAmountRef, bonusAmount);
    }, [bonusAmount]);

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
        <div className="p-6 md:p-10 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg relative">
           <div className="absolute top-40 right-8 mt-4 mr-4 print:hidden">
                <button onClick={handlePrint} className="text-blue-600 hover:underline flex items-center">
                    <FaPrint className="mr-2" /> Print
                </button>
            </div>
            <div className='pt-0'>
                <img src={logo} alt="Logo" className='w-2/5 h-15' />
            </div>
            <div className='space-y-4 pt-0'>
                <div className="text-right pt-11 text-sm md:text-base">
                    <b className='underline'>Date:</b>
                    <input
                        type="text"
                        className="text-left pl-1"
                        value="2024-08-11"
                        readOnly
                        style={{ width: '12ch', minWidth: '50px' }}
                    />
                </div>

                <p>To,</p>
                <p className="font-medium">Chandrappa R,</p>
                <p>MD/CEO,</p>
                <p>Management.</p>
            </div>

            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4">
                <b className='underline'>Sub:</b> Bonus Letter
            </p>

            <div className="mb-6 md:mb-8">
                <p className='text-sm md:text-base pt-3'>Dear Chandrappa,</p>
                <p className="text-sm md:text-base pt-6">
                    On behalf of everyone at INFINITALENT CONSULTING PRIVATE LIMITED, I would like to
                    appreciate your work over the past few months. The countless number of hours and efforts that you have
                    put in over the period of time haven't gone unnoticed and I would like to thank you for your exceptional
                    services. As a result of your phenomenal performance, we have decided to give you a bonus of
                    <input
                        type="text"
                        className="underline font-bold ml-2"
                        value={bonusAmount}
                        onChange={(e) => setBonusAmount(e.target.value)}
                        ref={bonusAmountRef}
                        style={{ width: '12ch', minWidth: '50px' }}
                    />
                </p>
            </div>

            <div className="mb-6 md:mb-8">
                <p className="text-sm md:text-base">
                    Seeing your diligence, self-motivation, and focus has been a source of motivation for the whole team, and
                    we hope that this positivity flows into every day of work.
                </p>
                <p className="text-sm md:text-base pt-3">Thank you once again for all your effort.</p>
                <p className='text-sm md:text-base pt-3'>Yours Truly,</p>
            </div>

            <div className='text-sm md:text-base mb-72'>
                <p>For INFINITALENT CONSULTING PRIVATE LIMITED</p>
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

export default Bonus;
