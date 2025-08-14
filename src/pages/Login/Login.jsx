import React, { useState, useContext } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../../redux/authSlice";

import { UserContext } from "../../context/user-Context";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({ username: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  
  dispatch(loginStart()); // Loading start
  
  try {
    const res = await axios.post(`${backendUrl}/login`, formData, {
      withCredentials: true
    });

    toast.success("Login successful", { position: "top-center" });

    // Redux mein user data save karo
    dispatch(loginSuccess(res.data.user));

    navigate("/");
  } catch (err) {
    dispatch(loginFail()); // Error state
    
    if (err.response) {
      const { status, data } = err.response;
      if (status === 429) {
        toast.error(data?.message || "Too many login attempts. Try again later.", {
          position: "top-center",
        });
      } else {
        toast.error(data?.message || "Login failed", { position: "top-center" });
      }
    } else {
      toast.error("Network error. Please try again.", { position: "top-center" });
    }
  }
};
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
