import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // Import a spinner

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading state true

  // Automatically stop loading after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer when the component is unmounted
  }, []);

  // Only render the loading screen if isLoading is true
  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <ClipLoader color="#ffffff" size={100} /> {/* Loader with customizable color and size */}
        </div>
      )}
    </>
  );
};

export default Loader;
