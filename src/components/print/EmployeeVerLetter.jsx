import React from "react";
import logo from "../src/Logo.jpeg";

const Employee = () => {
    const Section = ({ children }) => (
        <div className="mb-6 md:mb-8">
            {children}
        </div>
    );
    const Placeholder = ({ label }) => (
        <span className="underline font-bold">_____{label}_____</span>
    );

    return (
        <div className="p-6 md:p-9 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <div className='pt-0' > <img src={logo} alt="Logo" className='w-2/5  h-15' /></div>

            <p className=" text-right mt-5 pl-4 text-sm md:text-base"><b className="underline">Date:</b>2024-08-11</p>
            <h1 className="text-2xl sm:text-3xl font-bold pt-16   ">
                Employment Verification Letter

            </h1>


            <p className="text-sm md:text-base pt-14 mb-3  ">To whomsoever it may concern,</p>

            <p className="text-sm md:text-base pt-3 mb-3">
                This is to certify that <b>Chandrappa R</b> is an employee at our company, INFINITALENT CONSULTING
                PRIVATE LIMITED.
            </p>

            <p className="text-sm md:text-base pt-3 mb-4">
                In this duration, chandrappa was found to be polite, punctual, and performed the roles and duties given to
                them adequately
            </p>

            <p className="text-sm md:text-base pt-3 mb-4">
                chandrappa has been our employee since 2021-02-08 and is currently working with us as MD/CEO in the
                Management department. <Placeholder className='font-bold' label="(He/She)" /> is currently working for a salary of  <Placeholder className='font-bold' label="(Insert Amount)"/>   per annum. The outlook of chandrappa's future at our company looks very good, and we
                hope to work with them for years to come.
            </p>
            <p className="text-sm md:text-base pt-3 mb-4">
            If you have any questions or concerns regarding chandrappa's employment at INFINITALENT
            CONSULTING PRIVATE LIMITED, you can contact us at the below mentioned contact details.
            </p>

            <div className="mt-8  ">
                <p>For INFINITALENT CONSULTING PRIVATE LIMITED</p>
            </div>
            <p className="mb-72 mt-5"><Placeholder className='font-bold' label="(Insert Contact Information)"/></p>


            <Section>
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

            </Section>
        </div>
    );
};

export default Employee;
