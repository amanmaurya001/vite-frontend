import React, { useEffect, useState } from 'react';
import "./EditAddress.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const EditAddress = () => {
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({}); // Field-wise errors

  useEffect(() => {
    axios
      .get(`${backendUrl}/editShowAdress/${addressId}`, {
       withCredentials: true,
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

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Submitted:", formData);
    // backend me bhejne ke liye yahan axios ya fetch use kar sakte ho

    axios
      .post(`${backendUrl}/updateAddress/${addressId}`, formData, {
         withCredentials: true,
      })

      .then((res) => {
        toast.success(res.data?.message, { position: "top-center" });

        // Clear errors on success
        setErrors({});
           navigate('/profiledashboard/showAdress');
      })
      .catch((error) => {
        if (error.response?.data?.fieldErrors) {
          // Backend sent field-wise validation errors
          setErrors(error.response.data.fieldErrors);
        } else {
          toast.error(
            error.response?.data?.message || 'Something went wrong',
            { position: 'top-center' }
          );
        }
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
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
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
            {errors.pincode && <p className="error-text">{errors.pincode}</p>}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          {errors.state && <p className="error-text">{errors.state}</p>}

          <div className="form-group">
            <input
              type="text"
              name="block"
              placeholder="Flat / House / Block No."
              value={formData.block}
              onChange={handleChange}
              required
            />
            {errors.block && <p className="error-text">{errors.block}</p>}

            <input
              type="text"
              name="locality"
              placeholder="Locality / Area / Street"
              value={formData.locality}
              onChange={handleChange}
              required
            />
            {errors.locality && <p className="error-text">{errors.locality}</p>}
          </div>

          <input
            type="text"
            name="landmark"
            placeholder="Landmark (optional)"
            value={formData.landmark}
            onChange={handleChange}
          />
          {errors.landmark && <p className="error-text">{errors.landmark}</p>}

          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          {errors.addressType && <p className="error-text">{errors.addressType}</p>}

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            Set as default address
          </label>
          {errors.isDefault && <p className="error-text">{errors.isDefault}</p>}

          <button type="submit">Update Address</button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;