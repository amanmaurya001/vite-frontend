import React from "react";
import   './CancelElement.css';

const CancelElement = ({ onClose, color = "black" }) => {
  return (
    <div className="CancelElement">
      <div className="logo">
        <img src="/PHotos/index/cancel-logo.png" alt="" />
      </div>
      <div className="cancel" onClick={onClose}>
        <h2 style={{ color }}>X</h2>
      </div>
    </div>
  );
};

export default CancelElement;
