import React, { useEffect, useState } from 'react';
import "./EditAddress.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const EditAddress = () => {

  const {addressId}=useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    block: "",
    locality: "",
    landmark: "",
    addressType: "Home",
    isDefault: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:1234/editShowAdress/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData(res.data.targetAddresses);
      })
      .catch((err) => {
        console.log(err);
      });
  },[addressId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Submitted:", formData);
    // backend me bhejne ke liye yahan axios ya fetch use kar sakte ho

    axios
      .post(`http://localhost:1234/updateAddress/${addressId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        toast.success(res.data?.message, { position: "top-center" });
      })
      .catch((err) => {
        toast.error("something went wrong", { position: "top-center" });
      });
  };
  return (
    <div className="address-page">
      <div className="address-form-card">
        <h2>Edit Address</h2>
        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <div className="form-group">
            <input
              type="text"
              name="block"
              placeholder="Flat / House / Block No."
              value={formData.block}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality / Area / Street"
              value={formData.locality}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="landmark"
            placeholder="Landmark (optional)"
            value={formData.landmark}
            onChange={handleChange}
          />

          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            Set as default address
          </label>

          <button type="submit">Update Address</button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
