import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddressSelection.css';













const AddressSelection = ({ onSelect,onCancel,paymentInitiate}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    axios
      .get(`${backendUrl}/showAdress`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.addresses || res.data.addresses.length === 0) {
          navigate("/add-address");
        } else {
          setAddresses(res.data.addresses);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/add-address");
      });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    onSelect && onSelect(id);
  };

  return (
    <section className="select-address-container">
    <div className="select-address-page">
        <button className="select-adress-close"  onClick={onCancel}>X</button>
      <h2 className="select-address-heading">Select Delivery Address</h2>

      <div className="select-address-list">
        {addresses.map((addr) => (
          <label
            key={addr._id}
            className={`select-address-card ${
              selectedId === addr._id ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="address"
              value={addr._id}
              checked={selectedId === addr._id}
              onChange={() => handleSelect(addr._id)}
            />
            <div className="select-address-details">
              <p className="select-address-name">
                <strong>{addr.fullName}</strong>{" "}
                <span className="select-address-tag">
                  ({addr.addressType})
                </span>
              </p>
              <p>
                {addr.block}, {addr.locality}
              </p>
              <p>
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p>Mobile: {addr.mobile}</p>
              {addr.landmark && <p>Landmark: {addr.landmark}</p>}
              {addr.isDefault && (
                <span className="select-address-default">Default</span>
              )}
            </div>
          </label>
        ))}
      </div>
      <button  onClick={paymentInitiate}>procedd to Pay</button>
    </div>
    </section>
  );
};

export default AddressSelection;
