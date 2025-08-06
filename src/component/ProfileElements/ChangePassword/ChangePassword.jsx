import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1234/user/change-password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.message);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="secure-update-container">
      <div className="secure-update-card">
        <h2 className="secure-title">Change Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="secure-form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className="secure-input"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="secure-form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              className="secure-input"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="secure-form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="secure-input"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {message && <p className="secure-message">{message}</p>}

          <button type="submit" className="secure-submit-btn">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
