import React, { useState } from "react";
import img1 from "../../assets/4153553.jpg";

const NewEmployeeBasic = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Validation functions
  const validateField = (value) => value.trim().length > 0; // Checks if field is not empty
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email); // Simple email validation
  const validateDate = (date) => !isNaN(Date.parse(date)); // Checks if the date is valid

  const fields = [
    {
      label: "First Name",
      value: firstName,
      setValue: setFirstName,
      validate: validateField,
    },
    {
      label: "Last Name",
      value: lastName,
      setValue: setLastName,
      validate: validateField,
    },
    {
      label: "Date of birth",
      value: dob,
      setValue: setDob,
      validate: validateDate,
    },
    {
      label: "Email ID",
      value: email,
      setValue: setEmail,
      validate: validateEmail,
    },
    {
      label: "Phone Number",
      value: phone,
      setValue: setPhone,
      validate: validateField,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="max-w-4xl w-full grid grid-cols-2 gap-20">
        {/* left */}
        <div className="h-full w-full flex flex-col justify-center items-start">
          <h2 className="text-5xl text-blue-500 headingFont">Hello !</h2>
          <p className="text-xl mt-2">
            Welcome to INFINITALENT CONSULTING PRIVATE LIMITED
          </p>
          <div className="space-y-4 mt-4">
            {fields.map((field, index) => (
              <h3
                key={index}
                className={`flex justify-start items-center gap-2 ${
                  field.validate(field.value)
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                <span
                  className={`h-7 w-7 flex justify-center items-center headingFont ${
                    field.validate(field.value)
                      ? "text-white bg-blue-500"
                      : "text-blue-500 border border-blue-500"
                  } rounded-full`}
                >
                  {field.validate(field.value) ? "✔" : index + 1}
                </span>
                {field.label}
              </h3>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="w-full h-full shadow shadow-black/50 p-2 rounded">
          <div
            className={
              "rounded-full overflow-hidden h-36 w-36 border border-gray-500 mx-auto"
            }
          >
            <img src={img1} className="object-cover object-center" />
          </div>
          <div className="space-y-2 mt-4">
            {fields.map((field, index) => (
              <div key={index} className="w-full max-w-sm">
                <h3>{field.label}</h3>
                <input
                  type={
                    field.label === "Email ID"
                      ? "email"
                      : field.label === "Date of birth"
                      ? "date"
                      : "text"
                  }
                  className="p-2 rounded mt-1 border border-blue-200 w-full"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployeeBasic;
