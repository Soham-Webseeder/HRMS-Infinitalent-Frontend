import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const basicData = [
    "Employee Code",
    "Employee Name",
    "Business Unit",
    "Department",
    "Designation"
]

const contextualData = [
    "Date Of Joining",
    // "Exit Date",
    "Resignation Request Date",
];

const EmployeeExitReport = () => {
    const [selectionType, setSelectionType] = useState("Specific Employees")
    const [selectedAllEmployees, setSelectedAllEmployees] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [dropDownOpen, setDropdownOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [businessUnits, setBusinessUnits] = useState([]);
    const [selectedBusinessUnits, setSelectedBusinessUnits] = useState([]);
    const [filteredBusinessUnits, setFilteredBusinessUnits] = useState([]);
    const [busniessUnitSearchTerm, setBusniessUnitSearchTerm] = useState("");
    const [receiverSearchTerm, setReceiverSearchTerm] = useState("");
    const [receiverDropDownOpen, setReceiverDropdownOpen] = useState(false);
    const [receiverEmployees,setReceiverEmployees] = useState([]);
    const [filteredReceiverEmployees, setFilteredReceiverEmployees] = useState([]);
    const [selectedReceiverEmployees, setSelectedReceiverEmployees] = useState([])
    
    const fetchAllEmployees = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/employee/get-exEmployees`
            );

            if (response.data.success) {
                setEmployees(response.data.data);
                setFilteredEmployees(response.data.data);
                // console.log(response.data.data)
            } else {
                setEmployees([])
            }

            const response2 = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/employee/get-employees`
            );

            if (response2.data.success) {
                setReceiverEmployees(response2.data.data);
                setFilteredReceiverEmployees(response2.data.data);
                // console.log(response2.data.data)
                // console.log(response.data.data)
            } else {
                setEmployees([])
            }
        } catch (error) {
            console.log(error)
            setEmployees([])
        }
    }

    const fetchAllBusinessUnits = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_BASE_URL}/company/get-bussinessUnits`
            );

            if (response.data.success) {
                setBusinessUnits(response.data.response);
                setFilteredBusinessUnits(response.data.response);
                // console.log(response.data.data)
            } else {
                setBusinessUnits([])
            }
        } catch (error) {
            console.log(error)
            setEmployees([])
        }
    }

    const handleSelectionTypeChange = (e) => {
        setSelectionType(e.target.value);
        setSelectedAllEmployees(false);
        setSelectedBusinessUnits([])
        setSelectedEmployees([])
        setSelectedReceiverEmployees([])
    }

    const handleSelectedAllEmployees = (e) => {
        if (selectedAllEmployees) {
            setSelectedEmployees([])
        } else {
            setSelectedEmployees(employees)
        }
        setSelectedAllEmployees(!selectedAllEmployees)
        // console.log(selectedAllEmployees)
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const filtered = employees.filter((emp) => {
            return `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(e.target.value.toLowerCase());
        })

        console.log(filtered)

        setFilteredEmployees(
            filtered
        )
    }

    const handleReceiverSearchChange = (e) => {
        setReceiverSearchTerm(e.target.value);
        const filtered = receiverEmployees.filter((emp) => {
            return `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(e.target.value.toLowerCase());
        })

        console.log(filtered)

        setFilteredReceiverEmployees(
            filtered
        )
    }

    const handleBusniessUnitSearchChange = (e) => {
        setBusniessUnitSearchTerm(e.target.value)

        const filtered = businessUnits.filter((businessUnit) => {
            return businessUnit.name.toLowerCase().includes(e.target.value.toLowerCase());
        })

        setFilteredBusinessUnits(filtered)
    }

    const handleEmployeeSelect = (employee) => {
        if (selectedEmployees.includes(employee)) {
            return
        }
        setSelectedEmployees([...selectedEmployees, employee])
    }

    const handleReceiverEmployeeSelect = (employee) => {
        if (selectedReceiverEmployees.includes(employee)) {
            return
        }
        setSelectedReceiverEmployees([...selectedReceiverEmployees, employee])
    }

    const handleGenerateReportClick = async() => {
        try {
            let emp = selectedEmployees;
            if(selectionType==="Group of Employees"){
                emp = selectedBusinessUnits.flatMap(bu => {
                    return employees
                        .filter(e => e.businessUnit === bu._id)
                });
            }

            const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/report/sendEmployeeExitReportByMail`,{
                employeeIds:emp.map(e=>e._id),
                receivers:selectedReceiverEmployees.map((e)=>e.email)
            })
            
            if(response.data.success){
                toast.success("Employee Master Report is sent to the mails.");
            }else{
                toast.error("Failed to sent Employee Master Report.");
            }
        } catch (error) {
            
        }
    }

    const removeSelectedEmployee = (employee) => {

        const filtered = selectedEmployees.filter((emp) => {
            return emp._id !== employee._id
        })
        console.log(filtered)
        setSelectedEmployees(filtered);
    }

    const removeSelectedReceiverEmployee = (employee) => {

        const filtered = selectedReceiverEmployees.filter((emp) => {
            return emp._id !== employee._id
        })
        console.log(filtered)
        setSelectedReceiverEmployees(filtered);
    }

    const removeSelectedBusinessUnit = (businessUnit) => {

        const filtered = selectedBusinessUnits.filter((bu) => {
            return bu._id !== businessUnit._id
        })
        setSelectedBusinessUnits(filtered);
    }

    useEffect(() => {
        fetchAllEmployees();
        fetchAllBusinessUnits();
    }, [])

    return (
        <div className="p-2 md:p-6 lg:p-8">
            <ToastContainer />
            <h1 className="text-xl md:text-2xl font-bold mb-4">
                Employee Exit Report
            </h1>

            <div className="flex justify-between items-center">
                {/* Navigation Links */}
                <div className="flex text-sm text-gray-500">
                    <Link
                        to="/"
                        className="pr-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
                    >
                        Home
                    </Link>
                    <Link
                        to="/app/report"
                        className="px-1 border-r-2 border-gray-400 flex justify-center items-center h-4"
                    >
                        Report
                    </Link>
                    <Link className="px-1 flex justify-center items-center h-4">
                        Employee Exit Report
                    </Link>
                </div>
            </div>
            <hr className="my-4" />
            <div className="px-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-base text-blue-400">Data in this report</h2>
                    <div className="grid grid-cols-2 text-sm border-2">
                        <div className="col-span-1 px-4 border-r-2 pb-2">
                            <h2 className="text-base font-semibold pt-2 border-b-2">{basicData.length} Basic data</h2>
                            <ul className="h-24 overflow-auto py-2">
                                {
                                    basicData.map((data)=>(
                                        <li>&#9900; {data}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-span-1 px-4 pb-2">
                            <h2 className="text-base font-semibold pt-2 border-b-2">{contextualData.length} Contextual data</h2>
                            <ul className=" h-24 overflow-auto py-2">
                                {
                                    contextualData.map(data => (<li>&#9900; {data}</li>))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-base text-blue-400">Specific Employees / Group Employees</label>
                    <select className="border-2 px-2 py-1 w-full" defaultValue={selectionType} onChange={handleSelectionTypeChange}>
                        <option value="Specific Employees">Specific Employees</option>
                        <option value="Group of Employees">Group of Employees</option>
                    </select>
                </div>
                {
                    selectionType === "Specific Employees" && (
                        <>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-base text-blue-400">Employees</h2>
                                <div className="flex flex-wrap jusitfy-start items-center gap-1">
                                    {
                                        selectedAllEmployees && (
                                            <span className="px-2 py-1 text-sm bg-blue-400 text-white rounded-full">
                                                All Employees
                                            </span>
                                        )
                                    }
                                    {
                                        !selectedAllEmployees && <>
                                            {
                                                selectedEmployees.map(employee => (
                                                    <div className="px-2 py-1 text-sm bg-blue-400 text-white rounded-full">
                                                        <span>
                                                            {employee.firstName} {employee.lastName}
                                                        </span>
                                                        <button
                                                            onClick={()=>{
                                                                removeSelectedEmployee(employee)
                                                            }}
                                                            className="ml-2 text-white font-bold"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    }
                                </div>
                                {
                                    !selectedAllEmployees &&
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Employee Name"
                                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            onFocus={() => setDropdownOpen(true)} // Open dropdown when focused
                                        />
                                        {
                                            dropDownOpen && filteredEmployees.length > 0 && (
                                                <div className="flex flex-col w-full border-2 h-40 overflow-auto">
                                                    {filteredEmployees.map((employee) => (
                                                        <p className="hover:bg-slate-100 px-2 py-1" onClick={() => { handleEmployeeSelect(employee) }}>{employee.firstName + ' ' + employee.lastName}</p>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                                <div className="flex justify-start items-center gap-2">
                                    <input type="checkbox" name="selectAllEmployees" id="selectAllEmployees" value={selectedAllEmployees} onChange={handleSelectedAllEmployees} />
                                    <label htmlFor="selectAllEmployees">Select All Employees</label>
                                </div>
                            </div>
                        </>
                    )
                }
                {
                    selectionType === "Group of Employees" && (
                        <>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-base text-blue-400">Business Units</h2>
                                <div className="flex flex-wrap jusitfy-start items-center gap-1">
                                    {
                                        selectedBusinessUnits.map(businessUnit => (
                                            <div className="px-2 py-1 text-sm bg-blue-400 text-white rounded-full">

                                                <span>
                                                    {businessUnit.name}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        removeSelectedBusinessUnit(businessUnit)
                                                    }}
                                                    className="ml-2 text-white font-bold"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))

                                    }
                                </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Enter Employee Name"
                                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                            value={busniessUnitSearchTerm}
                                            onChange={handleBusniessUnitSearchChange}
                                            onFocus={() => setDropdownOpen(true)} // Open dropdown when focused
                                        />
                                        {
                                            dropDownOpen && filteredBusinessUnits.length > 0 && (
                                                <div className="flex flex-col w-full border-2 h-40 overflow-auto">
                                                    {filteredBusinessUnits.map((businessUnit) => (
                                                        <p className="hover:bg-slate-100 px-2 py-1" onClick={() => {
                                                            if (selectedBusinessUnits.includes(businessUnit)) {
                                                                return
                                                            } else {
                                                                setSelectedBusinessUnits([...selectedBusinessUnits, businessUnit])
                                                            }

                                                        }}>{businessUnit.name}</p>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    </div>
                                
                            </div>
                        </>
                    )
                }
                <div className="flex flex-col gap-2">
                    <h2 className="text-base text-blue-400">Who receives the report</h2>
                    <div className="flex flex-wrap jusitfy-start items-center gap-1">
                        {
                            selectedReceiverEmployees.map(employee => (
                                <div className="px-2 py-1 text-sm bg-blue-400 text-white rounded-full">
                                                        <span>
                                                            {employee.firstName} {employee.lastName}
                                                        </span>
                                                        <button
                                                            onClick={()=>{
                                                                removeSelectedReceiverEmployee(employee)
                                                            }}
                                                            className="ml-2 text-white font-bold"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                            ))
                        }
                
                    </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Employee Name"
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                value={receiverSearchTerm}
                                onChange={handleReceiverSearchChange}
                                onFocus={() => setReceiverDropdownOpen(true)} // Open dropdown when focused
                            />
                            {
                                receiverDropDownOpen && filteredReceiverEmployees.length > 0 && (
                                    <div className="flex flex-col w-full border-2 h-40 overflow-auto">
                                        {filteredReceiverEmployees.map((employee) => (
                                            <p className="hover:bg-slate-100 px-2 py-1" onClick={() => { handleReceiverEmployeeSelect(employee) }}>{employee.firstName + ' ' + employee.lastName}</p>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    
                    <button className="mt-4 px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-600"
                        onClick={handleGenerateReportClick}
                    >
                        Generate
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeExitReport;