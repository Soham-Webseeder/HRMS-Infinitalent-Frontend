import { useEffect, useState } from "react";
import axios from "axios";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [visibleActions, setVisibleActions] = useState({});

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/dashboard/getDashboardData`
        );
        setLeaveRequests(response.data.leaveRequests);
        console.log(response.data.leaveRequests,"Name")
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchData();
  }, []);

  const toggleActions = (status) => {
    setVisibleActions((prevState) => ({
      ...prevState,
      [status]: !prevState[status],
    }));
  };

  return (
    <div className="p-4 bg-gray-100 w-full mt-2 rounded">
      <div className="flex flex-col rounded-md shadow-md bg-white p-4">
        <Link
          to={"/leave/application"}
          className="pt-4 text-2xl font-bold mb-4 flex justify-start items-center gap-4 uppercase"
        >
          Leave Requests <BiLinkExternal />
        </Link>

        <div className="flex justify-between">
          <div className="font-bold text-gray-800">Code</div>
          <div className="font-bold text-gray-800">Name</div>
          <div className="font-bold text-gray-800">No of Days</div>
          <div className="font-medium"></div>
        </div>

        {leaveRequests &&
          leaveRequests.map((requestGroup, groupIndex) => (
            <div key={groupIndex}>
              {requestGroup.requests.map((request, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center py-2 w-full border-b border-muted">
                    <div className="flex flex-col text-slate-600">
                      <div>{request.empId}</div>
                    </div>
                    <div className="flex flex-col text-slate-600">
                      <div>{request.name}</div>
                    </div>
                    <div className="flex justify-center items-center flex-col text-slate-600">
                      <div>{request.noOfDays}</div>
                    </div>
                    <div
                      onClick={() =>
                        toggleActions(`${requestGroup._id}-${index}`)
                      }
                      className="cursor-pointer text-slate-600"
                    >
                      <PiDotsThreeOutlineVerticalFill />
                    </div>
                  </div>

                  {visibleActions[`${requestGroup._id}-${index}`] && (
                    <div className="flex justify-center items-center gap-4 w-full py-2">
                      {["Reject", "Pending", "Approved"].map(
                        (action, index) => {
                          const color =
                            action === "Reject"
                              ? "bg-red-200 text-red-600"
                              : action === "Pending"
                              ? "bg-blue-200 text-blue-600"
                              : "bg-green-200 text-green-600";
                          return (
                            <button
                              key={index}
                              className={`py-1 px-3 rounded ${color}`}
                            >
                              {action}
                            </button>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

        <div className="pb-3">
          <Link
            to={"/leave/application"}
            className="bg-blue-200 text-blue-600 w-full flex justify-center items-center p-2 rounded hover:text-white text-center mt-4"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
