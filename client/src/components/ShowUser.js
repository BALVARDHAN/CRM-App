import React, { useEffect } from "react";
import { useState } from "react";

export default function ShowUser({ fetchedData }) {
  const [pushResponse, setPushResponse] = useState({ status: "", msg: "" });
  const [copyOfFetchedData, setCopyOfFetchedData] = useState(fetchedData);

  useEffect(() => {
    setPushResponse({ status: "", msg: "" });
    setCopyOfFetchedData(fetchedData);
  }, [fetchedData]);

  function handleInputChange(event) {
    setCopyOfFetchedData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handlePushToCRM() {
    fetch("http://localhost:5000/push-to-crm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(copyOfFetchedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok")
          setPushResponse({
            status: "ok",
            msg: "SUCCESSFUL",
          });
        else setPushResponse({ status: "fail", msg: data.errorMsg });
      })
      .catch((error) => {
        console.log(error);
        setPushResponse({
          status: "fail",
          msg: "Error occured while making a POST request to server",
        });
      });
  }

  return (
    <div className="xl:w-10/12  mx-auto flex flex-col justify-center items-center bg-white rounded-md shadow-lg shadow-slate-500">
      <div className="w-full grid xl:grid-rows-3 p-5 rounded-t-md">
        <div className="grid md:grid-cols-3 sm:grid-cols-1">
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">First Name</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="firstName"
              value={copyOfFetchedData["firstName"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">Last Name</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="lastName"
              value={copyOfFetchedData["lastName"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">Phone</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="phoneNumber"
              value={copyOfFetchedData["phoneNumber"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1">
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">Email</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="email"
              value={copyOfFetchedData["email"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">Street</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="street"
              value={copyOfFetchedData["street"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">State</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="state"
              value={copyOfFetchedData["state"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1">
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">City</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="city"
              value={copyOfFetchedData["city"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">Postal Code</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="postalCode"
              value={copyOfFetchedData["postalCode"]}
              onChange={handleInputChange}
            />
          </div>
          <div className="bg-slate-200 p-2 m-2 shadow-sm shadow-black">
            <p className="font-semibold text-xs text-gray-400">Organization</p>
            <input
              className="w-full font-semibold text-lg bg-slate-200 focus:outline-none focus:border-slate-600"
              name="currentOrganization"
              value={copyOfFetchedData["currentOrganization"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex sm:flex-row flex-col justify-between items-center pb-5 px-5 gap-2">
        <p
          className={`${
            pushResponse.status === "ok" ? "text-green-600" : "text-red-600"
          } text-lg font-semibold lg:mb-0 mb-4`}
        >
          {pushResponse.msg}
        </p>
        <div className="flex justify-end gap-2">
          <button
            className={`${
              pushResponse.status === "ok"
                ? "bg-gray-400"
                : "bg-blue-900 hover:bg-blue-950"
            } py-2 px-4 text-white font-semibold rounded-md`}
            disabled={pushResponse.status === "ok"}
            onClick={handlePushToCRM}
          >
            {pushResponse.status === "ok" ? "Pushed" : "Push to CRM"}
          </button>
        </div>
      </div>
    </div>
  );
}
