import React from "react";

export const Workweek = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="container mx-auto py-8 max-w-3xl">
        {" "}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Saturday Sunday Off</h1>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              This is a 5-day work rule with a weekly off set as Saturday and
              Sunday.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Effective Date</h2>
            <p className="text-gray-700">1 Jan, 2023</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Rule Setting 1</h2>
            <div className="flex justify-center">
              {" "}
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Week
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Mon
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Tue
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Wed
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Thu
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Fri
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Sat
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-200">
                      Sun
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="px-4 py-2 border border-gray-200">
                        {rowIndex + 1}
                      </td>
                      {[...Array(7)].map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-4 py-2 border border-gray-200"
                        >
                          {colIndex >= 5 ? (
                            <div className="w-3 h-3 bg-red-500"></div>
                          ) : (
                            <div className="w-3 h-3 bg-green-500"></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-row items-center gap-3 mt-3">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 text-xs m-1"></div>Working
                Day
              </div>
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 text-xs m-1"></div>Weekly off
              </div>
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 text-xs m-1"></div>Half
                Day
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workweek;
