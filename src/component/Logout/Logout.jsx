import React from "react";
import "./Logout.css";
import { useContext } from "react";
 import { UserContext } from "../../context/user-Context";
// import { UserContext } from "../../context/user-Context";
import { useNavigate } from "react-router-dom";
const Logout = () => {
      const { setUser } = useContext(UserContext);
        const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔐 Auth token clear
    setUser(null); // ♻️ Context reset
    navigate("/"); // 🏠 Redirect to home
  };
  return (
    <div className="logout">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
