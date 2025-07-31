import React, { useState } from "react";
import CancelElement from "../FilterElements/cancelElement/CancelElement";
import "./setting.css";
const Setting = ({ onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const call = (id) => {
    setIsMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
  <div className="setting"  onClick={() => call(2)}>Setting</div>
     {isMenuOpen[2] && (
        <div className="setting-menu">
              <CancelElement onClose={() => call(2)} />
                <button className="setting-items">Profile</button>
                 <button className="setting-items">change password</button>
        
        </div>
      )}

  </>
);
};

export default Setting;
