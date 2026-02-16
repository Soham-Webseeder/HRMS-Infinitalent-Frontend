import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicInfoTable from "./BasicInfoTable";
import ExperienceTable from "./ExperienceTable";
import EducationTable from "./EducationTable";

const MainComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Basic Information");

  useEffect(() => {
    axios
      .get("api") //add api
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  const filteredData = (Array.isArray(data) ? data : []).filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const renderTable = () => {
    switch (activeTab) {
      case "Basic Information":
        return <BasicInfoTable data={currentEntries} />;
      case "Past Experience":
        return <ExperienceTable data={currentEntries} />;
      case "Educational Information":
        return <EducationTable data={currentEntries} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-6 px-10  min-h-screen  flex justify-center">
        <div className="w-[95%]">
          <div className="flex justify-between items-center mb-4 gap-2">
            <label className="font-semibold">
              Show
              <select
                className="ml-2 border p-1"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              entries
            </label>
            <div className="flex items-center gap-2">
              <label className="font-bold flex flex-row">Search</label>
              <input
                type="text"
                placeholder="Search"
                className="border rounded p-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {renderTable()}

          <div className="mt-4 flex justify-end items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded"
            >
              Previous
            </button>
            <div className="space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-2 py-1 border rounded ${
                    currentPage === index + 1 ? "bg-gray-200" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
