import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { companyProfileData } from "./sidebarComponentLink/CompanyProfileSidenav";
import { Link, useNavigate } from "react-router-dom";
import { attendanceData } from "./sidebarComponentLink/AttendanceSidebar";
import { assetData } from "./sidebarComponentLink/AssetProfile";
import { employeeLinksdata } from "./sidebarComponentLink/EmployeeSidebar";
import { letterLinkData } from "./sidebarComponentLink/Letters";
import { payrollData } from "./sidebarComponentLink/PayrollSidebar";
import { reportData } from "./sidebarComponentLink/ReportSidebar";
import { recruitmentData } from "./sidebarComponentLink/RecruitmentSidebar";

// Function to combine menus with sub-menus and sub-menusTwo
const combineMenus = (...menus) => {
  let allMenus = [];

  menus.forEach((menu) => {
    // Add top-level menu item
    allMenus.push({
      title: menu.title,
      icon: menu.icon,
      path: menu.path,
    });

    // Add sub-menus if they exist
    if (menu.subMenus) {
      allMenus = [
        ...allMenus,
        ...menu.subMenus.map((sub) => ({
          title: sub.title,
          icon: sub.icon,
          path: sub.path,
        })),
      ];
    }

    // Add sub-menusTwo if they exist
    if (menu.subMenusTwo) {
      allMenus = [
        ...allMenus,
        ...menu.subMenusTwo.map((sub) => ({
          title: sub.title,
          icon: sub.icon,
          path: sub.path,
        })),
      ];
    }
  });

  return allMenus;
};

// Search modal component

const SearchModal = ({ isOpen, setIsOpen, onClose, results, onSearch }) => {
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1); // Track the currently focused result
  const navigate = useNavigate();
  const itemRefs = useRef([]); // Ref array for each result item

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }

        if (results.length) {
          if (e.key === "ArrowDown") {
            setFocusedIndex((prevIndex) =>
              prevIndex === results.length - 1 ? 0 : prevIndex + 1
            );
          } else if (e.key === "ArrowUp") {
            setFocusedIndex((prevIndex) =>
              prevIndex === 0 ? results.length - 1 : prevIndex - 1
            );
          } else if (e.key === "Enter" && focusedIndex >= 0) {
            window.scrollTo(0, 0);
            navigate(results[focusedIndex].path); // Navigate to the selected result
            setIsOpen(false);
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, results, focusedIndex, onClose, navigate]);

  useEffect(() => {
    // Scroll the focused item into view when the focused index changes
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setFocusedIndex(-1); // Reset focus when the search query changes
    onSearch(e.target.value);
  };

  // Spring configuration for list items
  const listSpring = useSpring({
    opacity: results.length > 0 ? 1 : 0,
    transform: results.length > 0 ? `translateY(0)` : `translateY(20px)`,
    config: { tension: 200, friction: 15 },
  });

  return isOpen ? (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 headingFont"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search..."
            autoFocus
          />
        </div>
        <div
          className={`max-h-60 overflow-y-auto overflow-hidden duration-200 ${
            query !== "" ? "p-4" : ""
          }`}
        >
          {results.length ? (
            <animated.ul style={listSpring}>
              {results.map((result, index) => (
                <animated.li
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)} // Assign ref to each list item
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    opacity: focusedIndex === index ? 1 : 0.7,
                    transform:
                      focusedIndex === index ? "scale(1.02)" : "scale(1)",
                  }}
                  className={`border-t border-gray-200 hover:bg-gray-300 cursor-pointer p-3 rounded-lg`}
                >
                  <Link
                    to={result.path}
                    className="flex justify-start items-center gap-2 w-full h-full"
                  >
                    {result.icon} {result.title}
                  </Link>
                </animated.li>
              ))}
            </animated.ul>
          ) : query !== "" ? (
            <p className="p-4 text-gray-500">No results found.</p>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};

const UniversalSearch = ({ isOpen, setIsOpen }) => {
  const [searchResults, setSearchResults] = useState([]);

  // Combine multiple menu arrays into one searchable array
  const combinedData = combineMenus(
    companyProfileData,
    attendanceData,
    assetData,
    employeeLinksdata,
    letterLinkData,
    payrollData,
    recruitmentData,
    reportData
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = (query) => {
    if (query) {
      const filteredResults = combinedData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchResults([]);
  };

  return (
    <>
      {/* <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Search (Ctrl + K)
      </button> */}
      <SearchModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={handleClose}
        results={searchResults}
        onSearch={handleSearch}
      />
    </>
  );
};

export default UniversalSearch;
