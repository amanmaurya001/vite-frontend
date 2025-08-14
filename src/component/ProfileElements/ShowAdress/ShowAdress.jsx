import React, { useEffect, useState } from "react";
import "./ShowAdress.css";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ShowAddress = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [address, setAddress] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/showAdress`, {
        withCredentials: true,
      })
      .then((res) => {
        setAddress(res.data.addresses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdateAddress = (addressId) => {
    navigate(`/profiledashboard/editAddress/${addressId}`);
  };

  console.log(address);

  return (
    <div className="address-list-page">
      <h2>Your Saved Addresses</h2>
      <div className="address-list">
        {address.map((addr, index) => (
          <div key={index} className="address-card">
            <p className="name-line">
              📍<strong>{addr.fullName}</strong>{" "}
              <span className="tag">({addr.addressType})</span>
            </p>
            <p>
              {addr.block}, {addr.locality}
            </p>
            <p>
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p>Mobile: {addr.mobile}</p>
            {addr.landmark && <p>Landmark: {addr.landmark}</p>}
            {addr.isDefault && <span className="default-badge">Default</span>}
            <button
              className="edit-adress"
              onClick={() => handleUpdateAddress(addr._id)}
            >
              edit
            </button>
          </div>
        ))}

        <button
          className="addAdress"
          onClick={() => navigate("/profiledashboard/createAdress")}
        >
          add Adress
        </button>
      </div>
    </div>
  );
};

export default ShowAddress;
