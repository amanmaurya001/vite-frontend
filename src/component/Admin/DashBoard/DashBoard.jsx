import React from "react";
import { useState, useEffect } from "react";
import "./DashBoard.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
const DashBoard = () => {
  return (
    <div className="admin-dashboard">
      <h2>DashBoard</h2>
      <div className="admin-panel">
        <div className="admin-panel-left">
          <Link to="all-products">
            <button>All Products</button>
          </Link>
          <Link to="create-product">
            <button>Create Product</button>
          </Link>
        </div>
        <div className="admin-panel-right">
               <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
