import React, { useState } from "react";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user-Context";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post(`${backendUrl}/login`, formData)
    .then((res) => {
      const token = res.data.token;

      toast.success(res.data.message || "Login successful", { position: "top-center" });

      window.localStorage.setItem("token", token);
      const decoded = jwtDecode(token);

      setUser({
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role,
      });

      navigate("/");
    })
    .catch((err) => {
      if (err.response && err.response.status === 429) {
        toast.error(err.response.data?.message || "Too many login attempts. Try again later.", {
          position: "top-center",
        });
      } else if (err.response && err.response.data?.message) {
        toast.error(err.response.data.message, { position: "top-center" });
      } else {
        toast.error("Login failed", { position: "top-center" });
      }
    });
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
