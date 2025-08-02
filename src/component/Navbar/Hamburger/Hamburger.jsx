import React from "react";
import "./Hamburger.css";
import CancelElement from "../../FilterElements/cancelElement/CancelElement";
import NavLatest from "../NavLastest/NavLatest";
import NavWomen from "../NavWomen/NavWomen";
import NavMen from "../NavMen/NavMen";
import Logout from "../../Logout/Logout";
import { Link } from "react-router-dom";

const Hamburger = ({ onClose }) => {
  return (
    <div id="ham">
      <section className="main-ham">
        <div className="main-ham-content">
          <CancelElement onClose={onClose} />
          <NavLatest />
          <NavWomen onClose={onClose} />
          <NavMen onClose={onClose} />
        </div>
        <Link to="/profiledashboard">
          <button className="ham-setting" onClick={onClose}>Setting</button>
        </Link>
      </section>
      <section className="ham-ad" >
        <img src="/PHotos/home/block8-L.jpg" alt="" />
      </section>
    </div>
  );
};

export default Hamburger;
