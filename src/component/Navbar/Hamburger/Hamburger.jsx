import React, { useState } from "react";
import "./Hamburger.css";
import { useNavigate, Link } from "react-router-dom";
import CancelElement from "../../FilterElements/cancelElement/CancelElement";
import NavLatest from "../NavLastest/NavLatest";
import NavWomen from "../NavWomen/NavWomen";
import NavMen from "../NavMen/NavMen";
import Logout from "../../Logout/Logout";

const Hamburger = ({ onClose }) => {
  const [searchText, setSearchText] = useState(""); // state for input
  const navigate = useNavigate(); // react-router navigation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
      toggleSearch();
    }
  };
  return (
    <div id="ham">
      <section className="main-ham">
        <div className="main-ham-content">
          <CancelElement onClose={onClose} color="hsl(40, 100%, 90%)" />

          <form className="hamburger-serach-form" onSubmit={handleSubmit}>
            <input
              className="hamburger-serach-input"
              placeholder="Search here..."
             
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="hamburger-search-btn"
              onClick={(e) => {
                handleSubmit(e); // search ka kaam
                onClose(); // hamburger close
              }}
            >
              <img src="/PHotos/search.png" alt="" />
            </button>
          </form>

          <NavLatest />
          <NavWomen onClose={onClose} />
          <NavMen onClose={onClose} />
        </div>

        <button className="ham-setting" onClick={onClose}>
          <Link to="/profiledashboard">Setting</Link>
        </button>
      </section>
      <section className="ham-ad">
        <img src="/PHotos/home/block8-L.jpg" alt="" />
      </section>
    </div>
  );
};

export default Hamburger;
