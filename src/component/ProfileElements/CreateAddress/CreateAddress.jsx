import React, { useState } from 'react';
import './CreateAddress.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateAddress = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    city: '',
    state: '',
    block: '',
    locality: '',
    landmark: '',
    addressType: 'Home',
    isDefault: false,
  });

  const [errors, setErrors] = useState({}); // Field-wise errors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${backendUrl}/createAdress`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data?.message, { position: 'top-center' });

        // Reset form
        setFormData({
          fullName: '',
          mobile: '',
          pincode: '',
          city: '',
          state: '',
          block: '',
          locality: '',
          landmark: '',
          addressType: 'Home',
          isDefault: false,
        });

        // Clear errors
        setErrors({});
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
        <h2>Add New Address</h2>
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

          <button className="createAddressSubmit-btn" type="submit">
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAddress;
