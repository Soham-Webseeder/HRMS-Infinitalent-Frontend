import React from "react";
import logo from "../src/Logo.jpeg";

const CertificateOfInternship = () => {
    const Section = ({ children }) => (
        <div className="mb-6 md:mb-8">
            {children}
        </div>
    );

    return (
        <div className="p-6 md:p-9 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            <div className='pt-0' > <img src={logo} alt="Logo" className='w-2/5  h-15' /></div>


            <p className=" text-right mt-5 pl-4 text-sm md:text-base"><b className="underline"> Termination Date: </b>2024-08-11</p>
            <p className=" text-sm md:text-base font-bold pt-7"> <b></b> Doc Ref: ICPL/TERMINATE/2023-24/01</p>

            <h1 className=" text-center text-lg sm:text-3xl font-bold pt-16   ">
                ::TERMINATION LETTER::
            </h1>


            <p className="text-sm md:text-base pt-14 mb-3  ">Dear Chandrappa,</p>

            <p className="text-sm md:text-base pt-3 mb-3">
                I am sad to inform you that in the wake of ongoing issues with your poor performance in work and many
                leaves without information, and negative feedback about you in our customer company "Wynncom digital
                devices Pvt Ltd",, and we are compelled to terminate some of our staff members to lighten the burden.
                Unfortunately, the committee assigned for this purpose has proposed for the termination of your services
                as you could not meet the company requirement for last three months, and you were not able to deliver
                under pressure.

            </p>

            <p className="text-sm md:text-base pt-3 mb-4">
                So, you will be relieved of your duties from this organization at the end of the day 2024-08-11, and all
                your outstanding bills will be cleared instantly. We wish you best of luck for your future.

            </p>

           <p className="mb-72 pt-5">Sincerely,</p>

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

export default CertificateOfInternship;
