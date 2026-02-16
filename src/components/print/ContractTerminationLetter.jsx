import React, { useState, useRef } from 'react';
import { FaPrint } from "react-icons/fa";
import logo from "./images/Logo.jpeg";

const Promotion = () => {
    const [date, setDate] = useState('2024-08-11');
    const [formData, setFormData] = useState({
        name: "(Insert Name)",
        organization: "(Name of Organisation)",
        address: "(Address)",
        contractDetails: "(Insert Contract Details)",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePrint = () => {
        window.print();
    };


        return (
            <div className="p-6 md:p-9 font-serif max-w-lg lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg relative">
               <div className="absolute top-32 right-8 mt-4 mr-4 print:hidden">
                    <button onClick={handlePrint} className="text-blue-600 hover:underline flex items-center">
                        <FaPrint className="mr-2" /> Print
                    </button>
                </div>
                <div className='pt-0'>
                    <img src={logo} alt="Logo" className='w-2/5 h-15' />
                </div>
    
            <div className='space-y-4 pt-0'>
            <p className="text-right mt-5 pl-4 text-sm md:text-base">
                <b className="underline">Date:</b>
                <input
                    type="text"
                    className="text-left pl-1 "
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '12ch', minWidth: '100px' }} // Adjust width as needed
                />
            </p>

                <p>To,</p>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="underline font-bold  outline-none w-full"
                />
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="underline font-bold  outline-none w-full"
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="underline font-bold  outline-none w-full"
                />
            </div>

            <p className="h-4 md:h-8 mb-3 text-sm md:text-base mt-7">
                <b className='underline'>Sub:</b> Contract Termination Letter.
            </p>

            <div className="mb-6 md:mb-8">
                <p className='pt-2 text-sm md:text-base'>Dear Chandrappa,</p>
                <p className="text-sm md:text-base pt-6">
                    We greatly appreciate the business relationship we have had with you for years. However, due to
                    unfortunate circumstances of financial hardships, we have decided to cease our business transactions with
                    your company. We have tried our best to prevent this but the circumstances before us and prompted us to
                    sever ties with your company.
                </p>
            </div>

            <div className="mb-6 md:mb-8">
                <p className="text-sm md:text-base">
                    Hence, we regretfully inform you that our company, INFINITALENT CONSULTING PRIVATE
                    LIMITED, is terminating the
                    <input
                        type="text"
                        name="contractDetails"
                        value={formData.contractDetails}
                        onChange={handleChange}
                        className="underline font-bold w-full"
                    />.
                    I understand that this notice shall serve as compliance to the required period as the provisions stated in our agreement.
                </p>
            </div>

            <p className="text-sm md:text-base mt-4">
                In any case, if another opportunity arises for us to open another agreement with you, we hope that you
                will be open to such an arrangement.
            </p>
            <p className='pt-4'>Sincerely,</p>
            <p className='text-sm md:text-base pt-4 pb-72'>For INFINITALENT CONSULTING PRIVATE LIMITED</p>

            <footer className="bg-white border-t border-dotted border-gray-400 text-center sm:p-6 lg:p-10">
                <h2 className="text-orange-600 font-bold text-lg sm:text-xl lg:text-2xl">
                    INFINITALENT CONSULTING PRIVATE LIMITED
                </h2>
                <div className="text-sm text-gray-700 font-bold space-y-3 mb-2 lg:space-y-3">
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

export default Promotion;

