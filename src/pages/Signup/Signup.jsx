import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${backendUrl}/register`, formData)
  
      .then((res) => {
        toast.success(res.data?.message, { position: 'top-center' });
        navigate('/login');
      })
      .catch((err) => {
        toast.error("something went wrong", { position: 'top-center' });
      });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>

        <label>Date of Birth (Optional)</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <label>Phone Number (Optional)</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
