import React, { useState, useRef, useEffect } from "react";
import { FaPrint } from "react-icons/fa";
import logo from "./images/Logo.jpeg";

const CertificateOfInternship = () => {
    const [date, setDate] = useState('2024-08-11');
    const [endDate, setEndDate] = useState('2021-02-08');
    const [blank, setBlank] = useState('__________');
    const [duration, setDuration] = useState('(Duration of Internship)');
    const [pronoun, setPronoun] = useState('(him/her)');

    const endDateRef = useRef(null);
    const blankRef = useRef(null);
    const durationRef = useRef(null);
    const pronounRef = useRef(null);

    useEffect(() => {
        adjustWidth(endDateRef, endDate);
        adjustWidth(blankRef, blank);
        adjustWidth(durationRef, duration);
        adjustWidth(pronounRef, pronoun);
    }, [endDate, blank, duration, pronoun]);

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
           <div className="absolute top-36 right-8 mt-4 mr-4 print:hidden">
                <button onClick={handlePrint} className="text-blue-600 hover:underline flex items-center">
                    <FaPrint className="mr-2" /> Print
                </button>
            </div>
            <div className='pt-0'>
                <img src={logo} alt="Logo" className='w-2/5 h-15' />
            </div>

            <p className="text-right mt-5 pl-4 text-sm md:text-base  pl-4px">
                <b className="underline">Date:</b>
                <input
                    type="text"
                    className="text-left pl-1"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '12ch', minWidth: '100px' }} // Adjust width as needed
                />
            </p>
            
            <h1 className="text-2xl sm:text-3xl font-bold pt-16">
                Certificate of Internship
            </h1>

            <p className="text-sm md:text-base pt-14 mb-3">To whomsoever it may concern,</p>

            <p className="text-sm md:text-base pt-3 mb-3">
                This is to certify that <span className="font-semibold">Chandrappa R</span> has successfully
                completed an internship in <span>MD/CEO</span> at our company,
                <span> INFINITALENT CONSULTING PRIVATE LIMITED</span>, between
                <input
                    type="text"
                    className="underline ml-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    ref={endDateRef}
                    style={{ width: '12ch', minWidth: '50px' }}
                /> and{" "}
                <input
                    type="text"
                    className="underline ml-2"
                    value={blank}
                    onChange={(e) => setBlank(e.target.value)}
                    ref={endDateRef}
                    style={{ width: '12ch', minWidth: '50px' }}
                />  completing{" "}
                <span className="font-semibold">
                    <input
                        type="text"
                        className="underline"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        ref={durationRef}
                        style={{ width: '12ch', minWidth: '50px' }}
                    />
                </span>.
            </p>

            <p className="text-sm md:text-base pt-3 mb-4">
                In this duration, Chandrappa was found to be polite, punctual, and performed the roles and duties given to
                them adequately.
            </p>

            <p className="text-sm md:text-base pt-3 mb-4">
                We wish <input
                    type="text"
                    className="underline ml-2"
                    value={pronoun}
                    onChange={(e) => setPronoun(e.target.value)}
                    ref={pronounRef}
                    style={{ width: '6ch', minWidth: '30px' }} // Smaller width for pronoun
                /> every success in life.
            </p>

            <div className="mt-8 mb-72">
                <p>For INFINITALENT CONSULTING PRIVATE LIMITED</p>
            </div>

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

const Section = ({ children }) => (
    <div className="mb-6 md:mb-8">
        {children}
    </div>
);

export default CertificateOfInternship;
