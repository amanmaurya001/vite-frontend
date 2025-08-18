import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

  // Jab tak auth check ho raha hai, tab loading dikha do
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  // Agar login nahi hai, to redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;




