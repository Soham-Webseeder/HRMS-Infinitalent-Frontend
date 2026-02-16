import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/4153553.jpg";

const NewEmployeeMain = () => {
  const [companyCode, setCompanyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Ensure the input is numeric and no longer than 4 digits
    if (/^\d*$/.test(value) && value.length <= 4) {
      setCompanyCode(value);
    }
  };

  const handleSubmit = () => {
    if (companyCode.length === 4) {
      setLoading(true);
      // Mimic API call with setTimeout
      setTimeout(() => {
        setLoading(false);
        // On success, navigate to the desired page
        navigate("/newemployee/basic");
      }, 1000); // 1 second delay to mimic the API call
    } else {
      alert("Please enter a 4-digit company code");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="max-w-4xl w-full grid grid-cols-2">
        {/* left */}
        <div className="h-full w-full">
          <h2 className="text-5xl headingFont">Hello, welcome!</h2>
          <p className="mt-2">Add yourself as an employee</p>
          <div className="mt-4 space-y-1">
            <p className="text-blue-500">Company code</p>
            <input
              className="p-2 rounded border border-blue-500 w-full max-w-sm"
              value={companyCode}
              onChange={handleInputChange}
              maxLength={4}
              placeholder="Enter 4-digit code"
            />
          </div>
          <button
            className="w-full max-w-sm bg-blue-500 text-white mt-8 px-6 py-4 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Started"}
          </button>
        </div>
        {/* right */}
        <div className="w-full h-full">
          <img
            src={img1}
            className="h-full w-full object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default NewEmployeeMain;
