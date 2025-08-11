import React, { useEffect, useState } from "react";
import axios from "axios";
import Logout from "../../Logout/Logout";
import "./Profile.css";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [profiledata, setProfiledata] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setProfiledata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div className="profile-container">
     
      <div className="profile">
        <div className="profile-header">
          <div className="avatar-circle1"></div>
        </div>

        <div className="profile-details">


          <div className="detail-card">
      
            <p>
              <strong>User ID:</strong>
            </p>
            <p>{profiledata.username}</p>
          </div>




          <div className="detail-card">
         
            <p>
              <strong>Email:</strong>
            </p>
            <p>{profiledata.email}</p>
          </div>
          <div className="detail-card">
  
            <p>
              <strong>Phone:</strong>
            </p>
            <p>{profiledata.phone}</p>
          </div>
          <div className="detail-card">
         
            <p>
              <strong>DoB:</strong>
            </p>
            <p>{profiledata.dob?.split("T")[0]}</p>
          </div>
          <div className="detail-card">
          
            <p>
              <strong>Gender:</strong>
            </p>
            <p>{profiledata.gender}</p>
          </div>
          <div className="detail-card">
        
            <p>
              <strong>Join at :</strong>
            </p>
            <p>{profiledata.createdAt?.split("T")[0]}</p>
          </div>
        </div>
   
      </div>
      
    </div>
  );
};

export default Profile;
