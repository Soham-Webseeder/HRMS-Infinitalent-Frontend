import React from 'react';
import logo from "../src/Logo.jpeg";

const Promotion = () => {
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
            <div className='pt-0' > <img src={logo} alt="Logo" className='w-2/5  h-15' /></div>
            <div className='text-sm md:text-base space-y-4 pt-0'>
                <p className="text-right pt-1 text-sm md:text-base"><b className='underline'>Date: </b> 2024-08-11</p>

                <p className="">To,</p>
                <p className="font-medium">Chandrappa R,</p>
                <p >MD/CEO,</p>
                <p >Management.</p>
            </div>


            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4"> <b className='underline'>Notice:</b> Promotion Letter.
            </p>


            <Section>
                <p className='pt-2 text-sm md:text-base'>Dear,  First Name</p>
                <p className="text-sm md:text-base pt-6">
                    We have been monitoring your performance over the last few months, and we have always found your
                    performance to be extraordinary. The results that you have produced over the period of time are
                    outstanding and we applaud you for the same. Seeing your diligence, and focus has been a source of
                    motivation for the whole team, and we hope that this positivity flows into every day of work.
                </p>
            </Section>
            <Section>
                <p className="text-sm md:text-base ">Hence, we are elated to inform you that after careful evaluation of your performance and your conduct,
                    we have decided to promote you to <Placeholder className="font-bold" label="(New Job Title)" />. We believe you will be a good fit for this
                    role and you can really add value to the company with increased responsibility.
                </p>
            </Section>
            <Section>
                <p className="text-sm md:text-base ">
                    In this new position, your job role would be <Placeholder className="font-bold" label="(Insert Job Description)" />, and you will be
                    reporting directly to<Placeholder className="font-bold" label="(New Managers's Name)" />. Subsequently, your salary will also be
                    increased to <Placeholder className="font-bold" label="(New CTC)" /> per annum. All other terms and conditions of your appointment
                    letter will continue to apply
                </p>
            </Section>
            <p className="text-sm md:text-base ">We hope this promotion will help you shine and will prove us right to promote you over your colleagues.</p>

            <p className="text-sm md:text-base mt-4">Thank you once again for all your effort.</p>
            <p className="text-sm md:text-base mt-4">Yours Truely,</p>


          <p className=' text-sm md:text-base pt-4 pb-72'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>


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

export default Promotion; 