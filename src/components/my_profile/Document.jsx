import React, { useState } from "react";
import { Certifications } from "./documents/Certifications";
import { IDs } from "./documents/IDs";
import { Work } from "./documents/Work";

export const Document = () => {
  const [page, setPage] = useState(1);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <IDs />;
      case 2:
        return <Certifications />;
      case 3:
        return <Work />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-[100vw] items-center justify-center">
      <div className="w-[44%]">
        <div className="flex flex-row gap-3 text-lg font-medium  p-2 w-full">
          <button onClick={() => handlePage(1)}>IDs</button>
          <button onClick={() => handlePage(2)}>Certifications</button>
          <button onClick={() => handlePage(3)}>Work</button>
        </div>
        <div>{renderPage()}</div>
      </div>
    </div>
  );
};
