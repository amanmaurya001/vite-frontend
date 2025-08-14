import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddressSelection.css";

const AddressSelection = ({
  onSelect,
  onCancel,
  onPaymentSelect,
  paymentInitiate,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  useEffect(() => {
    axios
      .get(`${backendUrl}/showAdress`, {
     withCredentials: true,
      })
      .then((res) => {
        if (!res.data.addresses || res.data.addresses.length === 0) {
          // navigate("/add-address");
        } else {
          setAddresses(res.data.addresses);
        }
      })
      .catch((err) => {
        console.log(err);
        // navigate("/add-address");
      });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
    onSelect && onSelect(id);
  };
  const handlePaymentSelect = (e) => {
    const method = e.target.value;
    setSelectedPayment(method);
    onPaymentSelect && onPaymentSelect(method);
  };
  return (
    <section className="select-address-container">
      <div className="select-address-page">
        <button className="select-adress-close" onClick={onCancel}>
          X
        </button>
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
        <div className="select-payment-method">
          <h3>Select Payment Method</h3>

          <label
            className={`radio-option ${
              selectedPayment === "card" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === "card"}
              onChange={handlePaymentSelect}
            />
            <span>Credit / Debit Card</span>
          </label>

          <label
            className={`radio-option ${
              selectedPayment === "upi" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={selectedPayment === "upi"}
              onChange={handlePaymentSelect}
            />
            <span>UPI / Wallet</span>
          </label>

          <label
            className={`radio-option ${
              selectedPayment === "cod" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedPayment === "cod"}
              onChange={handlePaymentSelect}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>

        <button onClick={paymentInitiate}>procedd to Pay</button>
      </div>
    </section>
  );
};

export default AddressSelection;
