import React, { useState } from "react";

export default function UserForm({ setIsDataReady }) {
  const [message, setMessage] = useState("");

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    street: "",
    state: "",
    city: "",
    postalCode: "",
    currentOrganization: "",
  });

  function validateForm() {
    for (let key in userDetails) {
      if (userDetails[key] === "") {
        setMessage("Input Feilds Missing!!");
        return false;
      }
      if (key === "phoneNumber" && userDetails[key].length !== 10) {
        setMessage("Invalid Phone Number!!");
        return false;
      }
      if (key === "email" && !userDetails[key].includes("@")) {
        setMessage("Invalid Email!!");
        return false;
      }
    }
    return true;
  }

  function handleInputChange(event) {
    setMessage("");
    setUserDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleReset() {
    setIsDataReady(false);
    setMessage("");
    setUserDetails(() => {
      return {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        street: "",
        state: "",
        city: "",
        postalCode: "",
        currentOrganization: "",
      };
    });
  }

  function handleSubmit() {
    if (validateForm()) {
      fetch("http://localhost:5000/form-submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.msg);
          setIsDataReady(false);
          setIsDataReady(true);
        })
        .catch((error) => {
          setMessage("Error occured while submiting the form!!");
          console.log(error);
        });
    }
  }

  return (
    <div className="2xl:w-1/3 lg:w-1/2 mx-auto mb-14 bg-white p-5 rounded-md shadow-lg shadow-slate-500">
      <div className="flex md:flex-row flex-col justify-center gap-4 mb-4">
        <div className="flex flex-col md:w-1/2">
          <label className="font-semibold">First Name</label>
          <input
            className="py-2 px-3 bg-slate-100 border"
            type="text"
            name="firstName"
            value={userDetails["firstName"]}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex flex-col md:w-1/2">
          <label className="font-semibold">Last Name</label>
          <input
            className="py-2 px-3 bg-slate-100 basis-1/2 border"
            type="text"
            name="lastName"
            value={userDetails["lastName"]}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Phone Number</label>
        <input
          className="py-2 px-3 bg-slate-100 w-full border"
          type="text"
          name="phoneNumber"
          value={userDetails["phoneNumber"]}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold">Email</label>
        <input
          className="py-2 px-3 bg-slate-100 w-full border"
          type="text"
          name="email"
          value={userDetails["email"]}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-4 mb-4">
        <div className="flex flex-col md:w-1/2">
          <label className="font-semibold">Street</label>
          <input
            className="py-2 px-3 bg-slate-100 basis-1/2 border"
            type="text"
            name="street"
            value={userDetails["street"]}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex flex-col md:w-1/2">
          <label className="font-semibold">State</label>
          <input
            className="py-2 px-3 bg-slate-100 basis-1/2 border"
            type="text"
            name="state"
            value={userDetails["state"]}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-4 mb-4">
        <div className="flex flex-col md:w-1/2">
          <label className="font-semibold">City</label>
          <input
            className="py-2 px-3 bg-slate-100 basis-1/2 border"
            type="text"
            name="city"
            value={userDetails["city"]}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex flex-col md:w-1/2">
          <label className="font-semibold">Postal Code</label>
          <input
            className="py-2 px-3 bg-slate-100 basis-1/2 border"
            type="text"
            name="postalCode"
            value={userDetails["postalCode"]}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="font-semibold">Current Organization</label>
        <input
          className="py-2 px-3 bg-slate-100 w-full border"
          type="text"
          name="currentOrganization"
          value={userDetails["currentOrganization"]}
          onChange={(event) => handleInputChange(event)}
        />
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-between mt-5">
        <p
          className={`${
            message === "Form Submitted" ? "text-green-600" : "text-red-600"
          } text-lg font-semibold sm:mb-0 mb-5`}
        >
          {message}
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 font-semibold text-black bg-red-400 hover:bg-red-500 rounded-md"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 font-semibold text-white bg-black hover:bg-slate-900 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
