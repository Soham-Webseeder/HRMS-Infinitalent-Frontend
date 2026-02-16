import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setCandidateModal } from "../../../redux/slices/SidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import AddNewCandidate from "../AddNewCandidate";

function BasicInformation() {
  const [data, setData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const navigate = useNavigate();

  const { editCandidateModal } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/recruitment/getAllCandidate/`
    );

    console.log(res.data.data, "console");
    setData(res.data.data);
  };

  const handleEditClick = async (id) => {
    setUpdateId(id);
    dispatch(setCandidateModal(true));
  };

  const handleDeleteClick = async (id) => {
    const agree = window.confirm("Do you want to delete Candidate");
    if (!agree) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/recruitment/deleteCandidate/${id}`
      );
      toast.success("Candidate Successfully Deleted!");
      fetchData();
    } catch (error) {
      console.error("Error deleting Candidate:", error);
    }
  };
  const handleNavigateCv = async (id) => {
    navigate(`/recruitment/candidate/cv/${id}`);
  };

  return (
    <>
      {editCandidateModal ? (
        <AddNewCandidate
          type={"update"}
          updateId={updateId}
          setUpdateId={setUpdateId}
        />
      ) : (
        <table className="min-w-full bg-white border">
          <Toaster />
          <thead>
            <tr>
              <th className="py-2 border">SL</th>
              <th className="py-2 border">Name</th>
              <th className="py-2 border">Candidate Id</th>
              <th className="py-2 border">Photograph</th>
              <th className="py-2 border">Email</th>
              <th className="py-2 border">SSN</th>
              <th className="py-2 border">Phone</th>
              <th className="py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 border">{index + 1}</td>
                <td className="py-2 border">{item.firstName}</td>
                <td className="py-2 border">{item._id}</td>
                <td className="py-2 border">
                  <img className="h-20" src={item.resume} alt="" />
                </td>
                <td className="py-2 border">{item.email}</td>
                <td className="py-2 border">{item.SSN}</td>
                <td className="py-2 border">{item.phone}</td>
                <td className="py-2 border">
                  <div className="flex gap-2 p-4">
                    <div onClick={() => handleEditClick(item._id)}>
                      <AiOutlineEdit
                        size={30}
                        className="border text-green-200 bg-green-500 p-1 rounded-md"
                      />
                    </div>
                    <div onClick={() => handleDeleteClick(item._id)}>
                      <AiOutlineDelete
                        size={30}
                        className="border text-red-200 bg-red-500 p-1 rounded-md"
                      />
                    </div>
                    {/* <div onClick={() => handleNavigateCv(item._id)}>
                      <AiOutlineEye
                        size={30}
                        className="border text-blue-200 bg-blue-500 p-1 rounded-md"
                      />
                    </div> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default BasicInformation;
