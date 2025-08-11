import React from "react";
import "./ProfileDashboard.css";
import { Link, Outlet } from "react-router-dom";
import Logout from "../../component/Logout/Logout";
const ProfileDashboard = () => {
  return (
    <div className="ProfileDashboard">
   
      <section>
      <div className="ProfileDashboard-option">
        <h3>My account</h3>

        <Link to="profile">
          <button>profile</button>
        </Link>

      
        
          <Link to="showAdress">
          <button>showAdress</button>
        </Link>
         <Link to="ChangePassword">
          <button>Change Password</button>
        </Link>

        <h3>My Activity</h3>
        <Link to="/cart">
          <button>My cart</button>
        </Link>
        <Link to="/wishlist">
          <button>My wishlist</button>
        </Link>
        <Link>
          <button>orders</button>
        </Link>
        <Link to="orderhistory">
          <button>order hsitory</button>
        </Link>

        <h3>Orders & Return</h3>
         <Link>
          <button>Track Your Order</button>
        </Link>
        <div> <Logout/></div>
       
   
      </div>
      <div className="ProfileDashboard-output">
        <Outlet />
      </div>
      </section>
    </div>
  );
};

export default ProfileDashboard;
