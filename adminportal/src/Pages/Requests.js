import React, { useState, useEffect } from "react";
import "./Requests.css";
import Sidebar from "../Components/Sidebar";
import { SERVER_URL } from "../constants";

const Requests = () => {
  const [unverified, setUnverified] = useState([]);

  useEffect(() => {
    (async () => {
      const getRes = await fetch(`${SERVER_URL}/getUnverifiedWashrooms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const getResBody = await getRes.json();
      console.log(getResBody.response)
      setUnverified(getResBody.response);
    })();
  }, []);

  let onApprove = async (id) => {
    const response = await fetch(`${SERVER_URL}/approveWashroom/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!response.ok) {
      return;
    }

    const updatedLocations = unverified.filter((location) => location.id !== id);
    setUnverified(updatedLocations);
  };

  return (
    <div className="washroom-list">
      <Sidebar />
      {unverified ? (
        <ul>
          {unverified.map((location) => (
            <li key={location.id} className="washroom-item">
              <div>Name: {location.name}</div>
              <div>Longitude: {location.longitude}</div>
              <div>Latitude: {location.latitude}</div>
              <div>Places ID: {location.places_id}</div>
              <div>Approved: {location.approved ? "Yes" : "No"}</div>
              <div>ID: {location.id}</div>
              <button onClick={() => onApprove(location.id)}>Approve</button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Requests;
