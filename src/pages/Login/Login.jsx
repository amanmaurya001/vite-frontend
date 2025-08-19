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
        withCredentials: true,
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
          toast.error(
            data?.message || "Too many login attempts. Try again later.",
            {
              position: "top-center",
            }
          );
        } else {
          toast.error(data?.message || "Login failed", {
            position: "top-center",
          });
        }
      } else {
        toast.error("Network error. Please try again.", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="login-container">
      <section>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <div className="login-socials">
            <div className="login-socials-icons">
              <i className="fab fa-google"></i>
            </div>
            <div className="login-socials-icons">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="login-socials-icons">
              <i className="fab fa-github"></i>
            </div>
            <div className="login-socials-icons">
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
          <p>or use your email/username & password</p>

          <input
          id="login-form-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />

          <input
          id="login-form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <p>Forget Password?</p>

          <button type="submit" id="login-form-btn">Login</button>

          <div className="login-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
        <div className="login-text">
          <h2>Hello, Stars!</h2>
          <p> Register with your deatails to join the Fashion </p>
          <button id="login-text-btn"><Link to="/signup"> SIGN UP </Link></button>
        </div>
      </section>
    </div>
  );
};

export default Login;
