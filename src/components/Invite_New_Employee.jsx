import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosRefreshCircle } from "react-icons/io";
import { GoLock } from "react-icons/go";
import { AiOutlineLink } from "react-icons/ai";
import { MdCopyAll } from "react-icons/md";
import img1 from "../assets/4153553.jpg";
import React, { useState } from "react";

const Invite_New_Employee = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-4 py-8 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-2 w-full gap-8">
        <LeftSection />
        <RightSection setOpen={setOpen} />
      </div>
      <EmailPopup open={open} setOpen={setOpen} />
      <BottomSection />
    </div>
  );
};

export default Invite_New_Employee;

const LeftSection = () => {
  return (
    <div className="w-full">
      <h2 className="text-4xl">Hello chandrappa</h2>
      <p className="mt-2 text-lg">
        Share your company's add employee link & company code with your
        prospective employees.
      </p>
      <div className="w-full flex justify-center items-center">
        <img src={img1} className="object-contain object-center h-full w-4/5" />
      </div>
    </div>
  );
};

const RightSection = ({ setOpen }) => {
  const copyText = () => {
    const textToCopy = `
Hi,
    
Welcome to INFINITALENT CONSULTING PRIVATE LIMITED.
    
Please add yourself as an employee by clicking here: 
https://infinitalentconsult.sumhr.io/newemployee
    
and use the Company OTP 6431 to access the above link.
    
Best Regards,
chandrappa M R
        `;

    // Copy the text to the clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="w-full space-y-8">
      {/* info */}
      <div className="w-full space-y-2">
        <h2 className="text-xl flex justify-start items-center gap-4">
          <AiOutlineLink /> Add Employee Link
        </h2>
        <p className="text-blue-500 truncate text-lg bg-blue-50 p-2 rounded">
          https://infinitalentconsult.sumhr.io/static/media/employee.55d13daa.svg
        </p>
      </div>
      <div className="w-full space-y-2">
        <h2 className="text-xl flex justify-start items-center gap-4">
          <GoLock /> Company Code
        </h2>
        <div className="text-blue-500 truncate text-lg p-2 rounded bg-blue-50 flex justify-between items-center max-w-sm">
          <p className="tracking-widest">5462</p>{" "}
          <IoIosRefreshCircle className="text-2xl hover:cursor-pointer" />
        </div>
        <p className="text-gray-600">
          Company Code was last updated by chandrappa M R on 19-8-2024
          07:35:39AM
        </p>
      </div>
      {/* copy btn */}
      <button
        onClick={copyText}
        className="border-black border px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <MdCopyAll size={25} className="font-bold" /> Copy Link & OTP
      </button>
      {/* invite */}
      <p className="capitalize text-gray-600 flex justify-start items-center gap-4">
        <AiOutlineUserAdd /> Expanding your team?
      </p>
      <div className="space-y-2">
        <h3>Invite team member(s)</h3>
        <button
          onClick={() => setOpen(true)}
          className="flex justify-start items-center gap-2 text-blue-500"
        >
          <MdOutlineAlternateEmail className="text-xl text-black" /> Invite via
          email
        </button>
      </div>
    </div>
  );
};

const EmailPopup = ({ open, setOpen }) => {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
      className={`h-screen w-full fixed top-0 left-0 z-40 bg-black/25 backdrop-blur-[1px] flex justify-center items-center duration-500 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <EmailPopupContent setOpen={setOpen} />
    </div>
  );
};

const EmailPopupContent = ({ setOpen }) => {
  const [teamMembers, setTeamMembers] = useState([
    { firstName: "", lastName: "", email: "" },
  ]);

  // Handler to update the input values for each member
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...teamMembers];
    updatedMembers[index][name] = value;
    setTeamMembers(updatedMembers);
  };

  // Handler to add a new team member
  const handleAddMember = () => {
    setTeamMembers([
      ...teamMembers,
      { firstName: "", lastName: "", email: "" },
    ]);
  };

  // Handler to remove a team member
  const handleRemoveMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  // Handler to log out the team member data when clicking Invite
  const handleInvite = () => {
    console.log("Invited Team Members:", teamMembers);
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-lg shadow-black/25 rounded p-4">
      <h2 className="text-2xl flex justify-start items-center gap-2">
        Invite your team members via Email{" "}
        <AiOutlineMail className="text-4xl text-blue-500" />
      </h2>
      {/* Iterate over teamMembers to display fields */}
      <div className="w-full max-h-[50vh] overflow-y-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 text-gray-700 mt-4 relative"
          >
            <div className="w-full h-full rounded space-y-2">
              <label>First Name</label>
              <input
                className="w-full p-2 border border-gray-400 rounded"
                name="firstName"
                placeholder="Enter First Name"
                value={member.firstName}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="w-full h-full rounded space-y-2">
              <label>Last Name</label>
              <input
                className="w-full p-2 border border-gray-400 rounded"
                name="lastName"
                placeholder="Enter Last Name"
                value={member.lastName}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="w-full h-full rounded space-y-2 col-span-2">
              <label>Email</label>
              <input
                className="w-full p-2 border border-gray-400 rounded"
                name="email"
                placeholder="Enter Email Address"
                value={member.email}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            {/* Remove Button */}
            <button
              onClick={() => handleRemoveMember(index)}
              className="absolute top-2 right-0 text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 p-2 w-28 rounded text-white mt-4"
        onClick={handleAddMember}
      >
        Add More
      </button>

      <div className="w-full flex justify-end items-center gap-2">
        <button
          onClick={() => setOpen(false)}
          className="border border-blue-500 p-2 rounded text-blue-500 mt-4 w-28"
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 p-2 rounded text-white mt-4 w-28"
          onClick={handleInvite}
        >
          Invite
        </button>
      </div>
    </div>
  );
};

const BottomSection = () => {
  return (
    <div className="w-full bg-green-400">
      <h2></h2>
    </div>
  );
};
