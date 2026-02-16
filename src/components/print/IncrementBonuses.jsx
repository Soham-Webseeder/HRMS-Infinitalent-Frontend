import React, { useState } from 'react';
import logo from "../src/Logo.jpeg";

const Bonus = () => {
    // Dynamic state variables
    const [employeeName, setEmployeeName] = useState("Chandrappa R");
    const [designation, setDesignation] = useState("MD/CEO");
    const [occasion, setOccasion] = useState("Diwali");
    const [bonusAmount, setBonusAmount] = useState("₹50,000");
    const [date, setDate] = useState("2024-08-11");

    const Section = ({ children }) => (
        <div className="mb-6 md:mb-8">
            {children}
        </div>
    );

    return (
        <div className="p-6 md:p-10 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            {/* Logo */}
            <div className='pt-0'>
                <img src={logo} alt="Logo" className='w-2/5 h-15' />
            </div>

            {/* Date and Address */}
            <div className='text-sm md:text-base space-y-4 pt-0'>
                <p className="text-right pt-11 text-sm md:text-base">
                    <b className='underline'>Date:</b> {date}
                </p>

                <p>To,</p>
                <p className="font-medium">{employeeName},</p>
                <p>{designation},</p>
                <p>Management.</p>
            </div>

            {/* Subject */}
            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4">
                <b className='underline'>Sub:</b> Bonus Letter
            </p>

            {/* Letter Content */}
            <Section>
                <p className="text-sm md:text-base pt-5">Dear {employeeName},</p>
                <p className="text-sm md:text-base pt-6">
                    On behalf of everyone at INFINITALENT CONSULTING PRIVATE LIMITED, I would like to
                    appreciate your work over the past few months. The countless number of hours and efforts that you have
                    put in over the past few months haven't been overlooked, and I would like to thank you for your
                    remarkable services. As a result of the exemplary performance of you and the whole team, our business in
                    this quarter has been outstanding, which is why, on the occasion of {occasion}, we
                    have decided to give you a bonus of {bonusAmount}.
                </p>
            </Section>

            <Section>
                <p>Wishing you a very Happy {occasion}.</p>
                <p className='pt-3'>Warm Regards,</p>
            </Section>

            <div className='mb-72'>
                <p>For INFINITALENT CONSULTING PRIVATE LIMITED</p>
            </div>

            {/* Footer */}
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

export default Bonus;
