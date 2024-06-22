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
      <table className=" w-full flex flex-col gap-2 mb-10">
        <tr className="flex gap-2">
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">First Name</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="firstName"
                value={copyOfFetchedData["firstName"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["firstName"]}
              </p>
            )}
          </td>
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">Last Name</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="lastName"
                value={copyOfFetchedData["lastName"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["lastName"]}
              </p>
            )}
          </td>
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">Phone</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="phoneNumber"
                value={copyOfFetchedData["phoneNumber"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["phoneNumber"]}
              </p>
            )}
          </td>
        </tr>
        <tr className="flex gap-2">
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">Email</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="email"
                value={copyOfFetchedData["email"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["email"]}
              </p>
            )}
          </td>
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">Street</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="street"
                value={copyOfFetchedData["street"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["street"]}
              </p>
            )}
          </td>
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">State</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="state"
                value={copyOfFetchedData["state"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["state"]}
              </p>
            )}
          </td>
        </tr>
        <tr className="flex gap-2">
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">City</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="city"
                value={copyOfFetchedData["city"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["city"]}
              </p>
            )}
          </td>
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">Postal Code</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="postalCode"
                value={copyOfFetchedData["postalCode"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["postalCode"]}
              </p>
            )}
          </td>
          <td className="basis-1/3 bg-slate-200 py-2 px-2">
            <p className="text-sm text-stone-500">Organization</p>
            {isEditing ? (
              <input
                className="w-full font-semibold text-lg bg-white border border-slate-400 px-2 py-2 focus:outline-none focus:border-slate-600"
                name="currentOrganization"
                value={copyOfFetchedData["currentOrganization"]}
                onChange={handleInputChange}
              />
            ) : (
              <p className="text-xl font-semibold">
                {copyOfFetchedData["currentOrganization"]}
              </p>
            )}
          </td>
        </tr>
      </table>
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
