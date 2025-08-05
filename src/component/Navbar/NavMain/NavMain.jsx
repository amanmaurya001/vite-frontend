import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import "../NavMain/NavMain1.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/user-Context";

const NavMain = () => {
  const { user } = useContext(UserContext);

  const [isMenuOpen, setIsMenuOpen] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
      toggleSearch();
    }
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const call = (id) => {
    setIsMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <>
      <nav id="navbar">
        <div className="navbar-hamburger" >
          <div className="menu-icon-btn" onClick={() => call(1)}>
            <img src="/PHotos/hamburger2.png" alt="Logo" />
            <p>menu</p>
          </div>
          <div className="search-icon-btn"   onClick={toggleSearch}>
            <img
              src="/PHotos/search.png"
              alt=""
            
              style={{ cursor: "pointer" }}
            />
            <p>search</p>
          </div>
        </div>

        <div className="navbar-logo">
          <Link to="/">
            <img
              style={{ height: "90%", width: "100%" }}
              src="/PHotos/index/logo123.png"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="navbar-actions">
          <div className="nav-link">
            {user && user.username ? (
              <div className="avatar-circle">
                <Link to="/profiledashboard/profile">
                  {user.username[0].toUpperCase()}
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <img src="/PHotos/user.png" alt="User" />
              </Link>
            )}
          </div>
          <div className="nav-link">
            <Link to="/wishlist">
              <img src="/PHotos/heart.png" alt="" />
            </Link>
          </div>
          {user && (
            <div className="nav-link">
              <Link to="/cart">
                <img src="/PHotos/shopping-bag.png" alt="" />
              </Link>
            </div>
          )}
        </div>
      </nav>
      {isMenuOpen[1] && (
        <div className="latest-menu">
          <Hamburger onClose={() => call(1)} />
        </div>
      )}

      {showSearch && (
        <div className="nav-search-bar">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              autoFocus
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-bar-btn" type="submit">
              <img src="/PHotos/search.png" alt="" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NavMain;
