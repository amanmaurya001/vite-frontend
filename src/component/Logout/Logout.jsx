import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/authSlice";
  const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
          dispatch(checkAuth());
          navigate("/login");
        } else {
        console.warn("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="logout">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
export default Logout;
