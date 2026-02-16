import React, { useState } from 'react';
import { IoIosArrowDropright } from "react-icons/io";

const dropdownOptions = [
    'Option 1',
    'Option 2',
    'Option 3'
];

const dropdownClass = ' right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md hidden';
const buttonClass = 'group cursor-pointer outline-none hover:rotate-90 duration-300 bg-primary text-primary-foreground hover:bg-slate-300 px-4 py-2 rounded ';
const listItemClass = 'px-4 py-2 hover:bg-zinc-100';

const Notifications = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='w-'>
            <div className="p-5 px-15 bg-white rounded-lg shadow-md  h-fit">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="pt-3 ml-4 text-left text-xl font-bold text-foreground">Latest Notifications</h2>
                    <div className="relative">
                        <span className='text-blue-400 hover:cursor-pointer'>View All</span>
                        <button className={buttonClass} onClick={toggleDropdown}>
                            <IoIosArrowDropright size={15} className='text-blue-400'/>
                        </button>
                        <div className={isDropdownOpen ? dropdownClass : dropdownClass + ' hidden'}>
                            <ul className="py-8">
                                {dropdownOptions.map((option, index) => (
                                    <li key={index} className={listItemClass}>{option}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <ul className='space-y-2 ml-5'>
                    <li className="flex items-center justify-between p-4 bg-slate-100 w-full">
                        <span className="text-muted">A message from XYZ</span>
                        <div className='flex justify-between items-center gap-3'>
                            <span className="text-sm text-muted">10:00 AM</span>
                            <span><IoIosArrowDropright color={'grey'}/></span>
                        </div>
                    </li>
                    <li className="flex items-center justify-between p-4 w-full">
                        <span className="text-muted">New employee data in system</span>
                        <div className='flex justify-between items-center gap-3'>
                            <span className="text-sm text-muted">Monday, Aug 15</span>
                            <span><IoIosArrowDropright color={'grey'}/></span>
                        </div>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-slate-100 w-full">
                        <span className="text-muted">Salary payment has been issued</span>
                        <div className='flex justify-between items-center gap-3'>
                            <span className="text-sm text-muted">August 10, 2023</span>
                            <span><IoIosArrowDropright color={'grey'}/></span>
                        </div>
                    </li>
                    <li className="flex items-center justify-between p-4 w-full">
                        <span className="text-muted">Marketing calendar was updated</span>
                        <div className='flex justify-between items-center gap-3'>
                            <span className="text-sm text-muted">August 5, 2023</span>
                            <span><IoIosArrowDropright color={'grey'}/></span>
                        </div>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-slate-100 w-full">
                        <span className="text-muted">New employee documents have been uploaded</span>
                        <div className='flex justify-between items-center gap-3'>
                            <span className="text-sm text-muted">August 1, 2023</span>
                            <span><IoIosArrowDropright color={'grey'}/></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Notifications;
