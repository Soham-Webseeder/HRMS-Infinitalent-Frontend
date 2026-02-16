import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const IncomeTax = () => {
    const [selectedFY, setSelectedFY] = useState('2024-2025');
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="w-full mb-4 pb-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium">
                        Income Tax
                    </h1>
                    <p className="font-light text-gray-600 mt-4">
                        <Link to="/">Home</Link> | <Link to="/app/payroll">Payroll</Link> | <Link to="/payroll/income-tax">Income Tax</Link>
                    </p>
                </div>
            </div>
            <div className="border rounded px-4 py-4 bg-gray-100">
                <div className="relative flex flex-col lg:flex-row justify-between p-4 sm:p-6 lg:p-8 min-h-screen">

                    {showForm && (
                        <div
                            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
                            onClick={toggleForm}
                        ></div>
                    )}

                    {/* Left Section Card */}
                    <div className="w-full lg:w-1/4 p-4 sm:p-6 bg-white shadow-lg rounded-lg mb-4 lg:mb-0">
                        <h1 className="text-lg sm:text-xl font-semibold">Income Tax</h1>
                        <div className="mt-4">
                            <button
                                onClick={() => setSelectedFY('2024-2025')}
                                className={`p-2 w-full text-left border rounded-md mb-2 ${selectedFY === '2024-2025' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
                            >
                                FY 2024-2025
                            </button>
                            <button
                                onClick={() => setSelectedFY('2023-2024')}
                                className={`p-2 w-full text-left border rounded-md ${selectedFY === '2023-2024' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
                            >
                                FY 2023-2024
                            </button>
                        </div>

                        <div className="mt-8">
                            <span className="text-sm text-gray-500">Your taxable income</span>
                            <h2 className="text-xl sm:text-2xl font-semi-bold">₹ 1200000.00</h2>
                        </div>
                    </div>

                    {/* Right Section Card */}
                    <div className="w-full lg:w-3/4 p-4 sm:p-6 bg-white shadow-lg rounded-lg">

                        <div className="flex items-center mb-6 bg-blue-50 p-4 sm:p-2 rounded-md">
                            <h2 className="text-md sm:text-lg font-semibold flex-1">Choose which tax regime you want to be taxed against and pay less</h2>
                            <button
                                onClick={toggleForm}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                Choose Tax Regime
                            </button>
                        </div>

                        {selectedFY === '2024-2025' ? (
                            <div>
                                {/* Tax Slabs for 2019-20 */}
                                <div className="mb-8 bg-gray-100 p-4 sm:p-6">
                                    <h3 className="text-md sm:text-lg font-bold">
                                        Tax Slabs (2019-20)
                                        <span className="ml-2 border border-green-500 text-green-500 px-2 py-1 rounded-full text-xs sm:text-sm">
                                            Active
                                        </span>
                                    </h3>

                                    <table className="table-auto mt-4 w-full text-sm sm:text-base">
                                        <tbody>
                                            <tr>
                                                <td>Up to 250,000</td>
                                                <td className="text-right">0%</td>
                                            </tr>
                                            <tr>
                                                <td>250,001 to 500,000</td>
                                                <td className="text-right">0%</td>
                                            </tr>
                                            <tr>
                                                <td>500,001 to 1,000,000</td>
                                                <td className="text-right">12,500 + 20% of total income exceeding 500,000</td>
                                            </tr>
                                            <tr>
                                                <td>Income above 1,000,001</td>
                                                <td className="text-right">112,500 + 30% of total income exceeding 1,000,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Tax Slabs for 2024-2025 */}
                                <div className="mb-8 p-4 sm:p-6">
                                    <h3 className="text-md sm:text-lg font-bold">Tax Slabs 2024-2025</h3>
                                    <table className="table-auto mt-4 w-full text-sm sm:text-base">
                                        <tbody>
                                            <tr>
                                                <td>Up to 300,000</td>
                                                <td className="text-right">0%</td>
                                            </tr>
                                            <tr>
                                                <td>300,001 to 700,000</td>
                                                <td className="text-right">0%</td>
                                            </tr>
                                            <tr>
                                                <td>700,001 to 1,000,000</td>
                                                <td className="text-right">20,000 + 10% of total income exceeding 700,000</td>
                                            </tr>
                                            <tr>
                                                <td>1,000,001 to 1,200,000</td>
                                                <td className="text-right">50,000 + 15% of total income exceeding 1,000,000</td>
                                            </tr>
                                            <tr>
                                                <td>1,200,001 to 1,500,000</td>
                                                <td className="text-right">80,000 + 20% of total income exceeding 1,200,000</td>
                                            </tr>
                                            <tr>
                                                <td>Income above 1,500,001</td>
                                                <td className="text-right">1,40,000 + 30% of total income exceeding 1,500,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-md sm:text-lg font-bold text-gray-500">No data available for FY 2023-2024</h3>
                            </div>
                        )}
                    </div>

                    {showForm && (
                        <div className="fixed top-0 right-0 h-full w-full sm:w-3/4 lg:w-1/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0 p-4 sm:p-6 lg:p-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold">Choose Tax Regime</h2>
                                <button onClick={toggleForm} className="text-gray-500 text-2xl">×</button>
                            </div>
                            <p className="mb-4 text-gray-600 text-sm sm:text-base">
                                Under the new Budget for FY 2024-2025, you may now pick which regime you wish to be taxed against. Make a more informed decision by using our calculator to
                                save tax.
                            </p>

                            <div className="flex items-center my-4">
                                <div className="flex-grow border-t border-dashed"></div>
                                <span className="px-2 text-gray-500 text-sm sm:text-base">Tax Calculator</span>
                                <div className="flex-grow border-t border-dashed"></div>
                            </div>

                            <div className="mb-4 flex justify-between text-sm sm:text-base">
                                <span className="font-semibold">Annual Gross Income</span>
                                <h2 className="text-lg sm:text-xl font-semibold">₹ 1,200,000</h2>
                            </div>

                            <div className="mb-4 flex justify-between text-sm sm:text-base">
                                <label className="font-semibold">Exemptions (as per FY 2019-20)</label>
                                <input
                                    type="text"
                                    className="w-24 p-1 border rounded-md text-sm"
                                    placeholder="Enter Exemptions"
                                />
                            </div>

                            <button className="bg-blue-500 text-white w-full py-2 rounded-md mb-4">Compare Tax Payable</button>

                            <div className="flex items-center my-4">
                                <div className="flex-grow border-t border-dashed"></div>
                                <span className="px-2 text-gray-500 text-sm sm:text-base">Set Applicable Tax Regime</span>
                                <div className="flex-grow border-t border-dashed"></div>
                            </div>

                            <div className="mb-4 text-sm sm:text-base">
                                <span className="font-semibold">Set Applicable Tax Regime</span>
                                <div className="mt-2">
                                    <label className="flex items-center mb-2">
                                        <input type="radio" name="taxRegime" className="mr-2" />
                                        Tax Slab as per FY 2019-2020 (Old Regime)
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="taxRegime" className="mr-2" />
                                        Tax Slab as per FY 2024-2025 (New Regime)
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomeTax;
