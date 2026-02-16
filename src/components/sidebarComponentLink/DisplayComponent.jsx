import React from "react";
import { useNavigate } from "react-router-dom";

function DisplayComponent({ data }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col p-6 space-y-2 rounded-lg shadow  bg-gray-100 min-h-[100vh]">
      <div className="flex flex-col  gap-4 border-b border-gray-300 py-2">
        <div className="text-2xl font-medium">{data?.title}</div>
        <div>
          <p className="font-light text-gray-600">
            <span
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            >
              Home
            </span>{" "}
            | <span className="cursor-pointer">{data?.title}</span>
          </p>
        </div>
      </div>
      <div className="pb-2">
        <div className="text-xl font-medium pb-1 mb-1">{data?.headingOne}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {data?.subMenus?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(item.path)}
              className="flex cursor-pointer flex-col items-center h-28  justify-center p-4 space-y-2 bg-white rounded-2xl shadow-md hover:bg-blue-100"
            >
              <div>
                {React.cloneElement(item.icon, { size: 30, color: "#091f4a" })}
              </div>
              <div className="text-base font-light text-blue-900">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {data?.subMenusTwo && (
        <div className=" border-t border-gray-300 py-1 mt-1">
          <div className="text-xl font-medium py-1 mb-1">
            {data?.headingTwo}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {data?.subMenusTwo?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="flex cursor-pointer flex-col items-center h-28  justify-center p-4 space-y-2 bg-white rounded-2xl shadow-md hover:bg-blue-100"
              >
                <div>
                  {React.cloneElement(item.icon, {
                    size: 30,
                    color: "#091f4a",
                  })}
                </div>
                <div className="text-base font-light text-blue-900">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayComponent;
