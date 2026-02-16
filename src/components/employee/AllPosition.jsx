import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllPosition() {

  const [showModal, setShowModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: "",
    details: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/getAllPostions`,
        {
          params: {
            page: page,
            limit: limit,
          },
        }
      );
      if (response.data.success) {
        setPositions(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        console.log("Positions Fetched Successfully:", response.data.message);
      } else {
        console.error("Error fetching positions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, [page, limit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/employee/createPosition`,
        formData
      );

      if (response.data.success) {
        setShowModal(false);
        fetchPositions();
        toast.success("Position added successfully");
        console.log("Position added successfully:", response.data.message);

        setFormData({ position: "", details: "" });
        navigate("/employee/all-position");
      } else {
        toast.error("Failed to add position");
        console.error("Error adding position:", response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add position");
      console.error("Error adding position:", error);
    }
  };

  const filteredPositions = positions.filter(
    (position) =>
      position.position &&
      position.position.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0,limit)

  return (
    <>
      <div className="bg-gray-100 min-h-screen sm:px-4 md:px-24 py-2 overflow-x-hidden flex flex-col w-full mx-auto">
        <div className="bg-white border-gray-200 border rounded-md shadow-lg px-5 py-5">
          <h2 className="text-xl font-bold mb-4">Position Create</h2>
          <div className="border rounded p-2">
            <div className="flex flex-col items-end">
              <div className="flex justify-between mb-4">
                <div className="flex flex-between space-x-2">
                  <button
                    className="bg-blue-700 m-4 self-start text-white active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => setShowModal(true)}
                  >
                    Add Position
                  </button>
                  <div>
                    <button className="m-4 self-start text-black active:bg-blue-900 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                      <Link to="/employee/manage-position">
                        Manage Position
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded px-4 py-4">
              <span className="self-center font-bold">Show</span>
              <div className="flex space-x-2">
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <span className="self-center font-bold">entries</span>
              <div className="flex flex-col items-end mb-2">
                <div className="flex">
                  <span className="self-center font-bold">Search: </span>
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search by position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <table className="w-full">
                <thead className="border">
                  <tr>
                    <th className="px-4 py-2 text-left border">SL</th>
                    <th className="px-4 py-2 text-left border">Position</th>
                    <th className="px-4 py-2 text-left border">Details</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {filteredPositions.map((position, index) => (
                    <tr key={position._id} className="border">
                      <td className="px-4 py-2 border">{(page - 1) * limit + index + 1}</td>
                      <td className="px-4 py-2 border">{position.position}</td>
                      <td className="px-4 py-2 border">{position.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col mt-4 items-end">
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 border rounded-md border-gray-300 bg-zinc-300 font-medium"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`px-4 py-2 border rounded-md border-gray-300 ${pageNumber === page ? "bg-blue-700 text-white" : "bg-zinc-300"} font-medium`}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    className="px-4 py-2 border rounded-md border-gray-300 bg-blue-700 text-white font-medium"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md flex flex-col gap-4 w-1/2">
            <h2 className="text-xl font-bold mb-4">Add Position</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium mb-1"
                >
                  Position
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Position"
                  className="p-2 border w-full form-input rounded mb-5"
                />
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium mb-1"
                >
                  Details
                </label>
                <input
                  type="text"
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Details"
                  className="p-2 border w-full form-input rounded"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

