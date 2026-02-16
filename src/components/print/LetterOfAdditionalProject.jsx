import React, { useState } from 'react';
import logo from "../src/Logo.jpeg";

const Increment = () => {
    // States for dynamic content
    const [employeeName, setEmployeeName] = useState("Chandrappa R");
    const [position, setPosition] = useState("MD/CEO");
    const [projectName, setProjectName] = useState("");
    const [responseDate, setResponseDate] = useState("");
    const [date, setDate] = useState("2024-08-11");

    const Section = ({ children }) => (
        <div className="mb-6 md:mb-8">
            {children}
        </div>
    );

    const Placeholder = ({ label }) => (
        <span className="underline font-bold">_____{label}_____</span>
    );

    return (
        <div className="p-6 pt-0 md:p-10 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <div className='pt-0'>
                <img src={logo} alt="Logo" className='w-2/5 h-15' />
            </div>

            <div className='text-sm md:text-base space-y-4 pt-0'>
                <p className="text-right pt-1 text-sm md:text-base">
                    <b className='underline'>Date:</b>
                    <input 
                        type="date" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        className="ml-2 border-none focus:outline-none"
                    />
                </p>

                <p>To,</p>
                <p className="font-medium">
                    <input 
                        type="text" 
                        value={employeeName} 
                        onChange={(e) => setEmployeeName(e.target.value)} 
                        className="border-none focus:outline-none"
                    />
                </p>
                <p>
                    <input 
                        type="text" 
                        value={position} 
                        onChange={(e) => setPosition(e.target.value)} 
                        className="border-none focus:outline-none"
                    />
                </p>
                <p>Management.</p>
            </div>

            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4">
                <b className='underline'>Sub:</b> Additional Project.
            </p>

            <Section>
                <p className='pt-2 text-sm md:text-base'>Dear {employeeName},</p>
                <p className="text-sm md:text-base pt-6">
                    We have observed your work for the past few weeks, and we appreciate your excellent performance. Your
                    dedication towards work is commendable, and I am sure the whole team has high regard for the same.
                </p>
            </Section>

            <Section>
                <p className="text-sm md:text-base">
                    As you must know, the company is currently working on the 
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="(Insert Project Name)"
                        className="font-bold underline ml-2 border-none focus:outline-none"
                    />. Seeing
                    your performance, we think that you would be a good fit for this project. We think that this will be a good
                    experience for you, and beneficial for the both of us. Please let us know about your thoughts on the same
                    by 
                    <input
                        type="date"
                        value={responseDate}
                        onChange={(e) => setResponseDate(e.target.value)}
                        placeholder="(Date)"
                        className="font-bold underline ml-2 border-none focus:outline-none"
                    />.
                </p>
            </Section>

            <div className='mb-4'>
                <p className="text-sm md:text-base">Hoping to get you onboard for this project.</p>
            </div>

            <p className="text-sm md:text-base">Regards,</p>
            <p className='text-sm md:text-base pt-2 pb-72'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>

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

export default Increment;
