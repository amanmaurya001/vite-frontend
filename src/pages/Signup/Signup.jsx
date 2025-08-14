import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    phone: "",
  });

  // Field-wise errors state
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Field error reset on change
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear errors before submit
    setFieldErrors({});

    axios
      .post(`${backendUrl}/register`, formData)
      .then((res) => {
        toast.success(res.data?.message, { position: "top-center" });
        navigate("/login");
      })
      .catch((err) => {
        const errors = err?.response?.data?.errors;

        if (errors && Array.isArray(errors)) {
          // Map array errors to fields based on keywords in error message
          const newFieldErrors = {};
          errors.forEach((msg) => {
            if (msg.toLowerCase().includes("username")) newFieldErrors.username = msg;
            else if (msg.toLowerCase().includes("email")) newFieldErrors.email = msg;
            else if (msg.toLowerCase().includes("password")) newFieldErrors.password = msg;
            else if (msg.toLowerCase().includes("gender")) newFieldErrors.gender = msg;
            else if (msg.toLowerCase().includes("dob")) newFieldErrors.dob = msg;
            else if (msg.toLowerCase().includes("phone")) newFieldErrors.phone = msg;
          });
          setFieldErrors(newFieldErrors);
        } else {
          toast.error(err?.response?.data?.message || "Something went wrong", {
            position: "top-center",
          });
        }
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
        {fieldErrors.username && <p className="error-text" >{fieldErrors.username}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {fieldErrors.email && <p className="error-text">{fieldErrors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {fieldErrors.password && <p className="error-text">{fieldErrors.password}</p>}

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
        {fieldErrors.gender && <p className="error-text">{fieldErrors.gender}</p>}

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {fieldErrors.dob && <p className="error-text">{fieldErrors.dob}</p>}

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {fieldErrors.phone && <p className="error-text">{fieldErrors.phone}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
