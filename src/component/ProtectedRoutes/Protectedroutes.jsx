import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [authorized, setAuthorized] = useState(null);


  useEffect(() => {
     if (!token) {
    setAuthorized(false);
    return;
     }
    axios
      .get("http://localhost:1234/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.access === true) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      })
      .catch((err) => {
        setAuthorized(false);
      });
  }, [token]);
  if (authorized === null) {
  return <div>Loading...</div>;
   }
  if (authorized === true) {
    return children;
  }

  if (authorized === false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;




