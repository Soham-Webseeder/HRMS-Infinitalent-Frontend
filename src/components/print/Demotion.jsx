import React from 'react';
import logo from "../src/Logo.jpeg";

const Demotion = () => {
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
                <p className="text-right pt-1 text-sm md:text-base"><b className='underline'>Date:</b> 2024-08-11</p>

                <p className="">To,</p>
                <p className="font-medium">Chandrappa R,</p>
                <p >MD/CEO,</p>
                <p >Management.</p>
            </div>


            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-4"> <b className='underline'>Sub:</b> Demotion Letter.</p>


            <Section>
                <p className='pt-2 text-sm md:text-base'>Dear Chandrappa,</p>
                <p className="text-sm md:text-base pt-6">
                    We are writing this letter to confirm your demotion from MD/CEO to <Placeholder className='font-bold' label="(Insert New Designation)" />, as discussed in our meeting dated<Placeholder className='font-bold' label="(Date)" /> .

                </p>
            </Section>
            <Section>
                <p className="text-sm md:text-base ">You have been an exceptional employee of INFINITALENT CONSULTING PRIVATE LIMITED until
                    you got promoted to MD/CEO. Your incredible performance was one of the key reasons for your
                    promotion. However, ever since your promotion, your performance has declined tremendously. We
                    decided to give you <Placeholder className='font-bold' label="(Insert Duration)" /> to prove yourself in your new position, but it was to no
                    avail. Even after issuing you verbal and written warnings, we still couldn't see a significant increase in the
                    results you were producing. </p>
            </Section>
            <Section>
                <p className='text-sm md:text-base'>Hence, we have decided to demote you to <Placeholder className='font-bold' label="(Insert New DEsignation)" />. We hope that this
                    reduction in responsibilities will help you restore yourself to your old performance levels, and perhaps
                    even perform better than ever, following which we may reconsider promoting you later in the future after
                    a thorough evaluation.</p>
            </Section>
            <Section>
            <p>This demotion will take effect from <Placeholder className='font-bold' label="(Date)" />, following which your salary will be revised to
            <Placeholder className='font-bold' label="(Insert new CTC)" />  per annum. Subsequently, you will be reporting to <Placeholder className='font-bold' label="(Date)" />. The
            terms and conditions in your original appointment letter will continue to apply.</p>
            </Section>
            <p className="text-sm md:text-base ">Feel free to contact us at any time.</p>
            <p className="text-sm md:text-base pt-3">Sincerely,</p>

            <p className=' text-sm md:text-base pt-3 pb-72'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>







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

export default Demotion; 