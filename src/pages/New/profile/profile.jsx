import "./profile.css";
import React, { useState, useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [allProfile, setProfile] = useState("");
  const navigate = useNavigate();
  function Button() {
    navigate("/profileup");
  }

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "http://websitebuild.herokuapp.com/api/auth-shop-owner/profile",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    const result = await data.json();
    setProfile(result.data);
  };

  return (
    <div className="profile">
      <h1 className="txtP2">Welcome To Profile</h1>
      <div className="prof">
        <div className="profile2">
          <h2 className="txto">Profile Information</h2>
          <p className="info">
            User Name : {allProfile?.first_name}_{allProfile?.second_name}
          </p>
          <p className="info">Email : {allProfile?.email}</p>
          <p className="info">Phone Number : {allProfile?.phone_number}</p>
        </div>
        <div className="dv">
          <div className="profile6">
            <h2 className="txto">Site Information</h2>
            <p className="info">Site Name : {allProfile?.site_name}</p>
            <p className="info">Site Address : {allProfile?.site_address}</p>
          </div>
          <div className="profile7">
            <h2 className="txto">Address</h2>
            <p className="info">Country : {allProfile?.country}</p>
            <p className="info">Government : {allProfile?.government}</p>
            <p className="info">City : {allProfile?.city}</p>
          </div>
        </div>
      </div>
      <div className="profil-btn">
        <button className="bttnP" onClick={Button}>
        
          <ModeEditIcon /> Edit
         
        </button>
      </div>
    </div>
  );
}
