// src/context/UserContext.jsx

import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


// 1️⃣ Create context
export const UserContext = createContext();

// 2️⃣ Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        // 3️⃣ Expiry check
        if (decoded.exp < now) {
          console.warn("Token expired");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // 4️⃣ Set user from decoded token
          setUser({
            id: decoded.userId,
            username: decoded.username,
            role: decoded.role,
          });
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
