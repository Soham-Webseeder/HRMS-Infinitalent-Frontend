import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const PositionalInfo = () => {
  const [employee, setEmployee] = useState([])
  const [selectedEmployee,setSelectedEmployee] = useState('')
  const[filteredEmployee,setFilteredEmployee] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedEmployeeData = employee.filter(
      (emp)=>`${emp.firstName} ${emp.lastName}` === selectedEmployee
    )
    setFilteredEmployee(selectedEmployeeData)
    
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee(value)
  }
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllEmployees`
      )
      setEmployee(response.data.data)
      setFilteredEmployee(response.data.data)
    }
    getData()
  }, [])

 
  return (
    <>
      <div className='bg-gray-100 w-full mx-auto min-h-screen sm:px-4 md:px-24 overflow-x-hidden flex flex-col'>
        <Toaster />
        <div className='bg-white border-gray-200 border border-rounded shadow-lg px-4 py-2'>
          <h2 className='text-xl font-bold mb-2'>Positional Report</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">
                Search
                <span className='text-red-500'>*</span>
              </label>
              <select name="employee" className='w-full border border-rounded px-4 py-2 mb-2' value={selectedEmployee} onChange={handleInputChange}>
              <option value="">Select Option</option>
                {employee.map((data) =>
                  <option value={`${data.firstName} ${data.lastName}`}key={data._id}>{`${data.firstName} ${data.lastName}`}</option>
                )}
              </select>
            </div>
            <div>
              <button type='submit' className='bg-blue-700 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear trasation-all duration-150 mt-4 mb-2'>
                Search
              </button>
            </div>
          </form>
        </div>
          <div className='bg-white border-gray-200 border border-rounded shadow-lg px-5 py-5 mt-3 overflow-x-auto '>
            <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Sl</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Division</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Duty Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Hire Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Original Hire Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Termination Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Termination Reason</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Voluntary Termination</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Re Hire Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Rate Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Tax Rate</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Pay Frequancy</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Pay Frequancy Text</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Hourly Rate2</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Hourly Rate3</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Home Department</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Department Text</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Supervisor Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Is Supervisor</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border border-slate-300">Supervisor Report</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployee.map((data,i)=>(
                 <tr key={data._id}>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{i+1}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.firstName}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.division}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.position}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.dutyType}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.hireDate}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.originalHireDate}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.terminationDate}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.terminationReason}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.voluntaryTermination}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.reHireDate}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.rateType}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.taxRate}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.payFrequency}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.payFrequencyText}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.hourlyRate2}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.hourlyRate3}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.homeDepartment}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.departmentText}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.supervisorName}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.isSupervisor}</td>
                   <td className="px-6 py-4 whitespace-nowrap border border-slate-300">{data.supervisorReport}</td>
                 </tr>
                ))}
              </tbody>
            </table>
          </div>
     
      </div>
    </>
  )
}

export default PositionalInfo;