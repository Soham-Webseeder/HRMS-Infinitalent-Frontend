import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for routing

export default function NewLetter() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = (buttonType) => {
    setSelected(buttonType);
  };

  const handleNext = () => {
    navigate("/letter/create-letter"); // Navigate to the 'next' route
  };


  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-col items-start justify-between pr-10 pl-4 pt-4">
        <div>
          <h1 className="text-2xl font-medium">Create Letter</h1>
          <p className="font-light text-gray-600 mt-4">
            <Link to="/">Home</Link> | <Link to="/app/letter">Letter</Link> |{" "}
            <Link to="/letter/add-letter">Create Letter</Link>
          </p>
        </div>
        <hr className="w-full my-1" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4 ">
        <img
          className="w-96"
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1616616732828/ZWSu7pd1g.png?auto=compress,format&format=webp"
          alt="Description of the image"
        />
        <h1 className="text-lg">Select how you want the letter to be signed</h1>

        {/* Container for buttons */}
        <div className="flex space-x-6 max-sm:w-screen max-sm:px-3">
          <button
            onClick={() => handleClick("physical")}
            className={`relative border-2 rounded w-64 p-4 flex flex-col items-center justify-center ${
              selected === "physical" ? "border-blue-500" : "shadow-md"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">Physical Signature</span>
              <span className="text-center mt-2">
                Select if you want to print the letter and get a physical
                signature on it.
              </span>
              {selected === "physical" && (
                <AiOutlineCheck className="text-white mt-2 bg-emerald-500 rounded-full" />
              )}
            </div>
          </button>
          <button
            onClick={() => handleClick("virtual")}
            className={`relative border-2 rounded w-64 p-4 flex flex-col items-center justify-center ${
              selected === "virtual" ? "border-blue-500" : "shadow-md"
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">Virtual Signature</span>
              <span className="text-center mt-2">
                The system will append virtual signature before dispatching the
                letters.
              </span>
              {selected === "virtual" && (
                <AiOutlineCheck className="text-white mt-2 bg-emerald-500 rounded-full" />
              )}
            </div>
          </button>
        </div>
        {/* Next Button */}
        <button
          className=" bg-sky-100 text-blue-500 px-6 py-2 rounded mt-4"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
