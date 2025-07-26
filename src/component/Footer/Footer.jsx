import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (

    <div id="footer">
      <div className="footer-coloumn0"></div>

      <div className="footer-coloumn">
        <div className="footer-coloumn-box0"></div>
        <div className="footer-coloumn-box">
          <h2>Shopping</h2>
        </div>
        <div className="footer-coloumn-box-mobile-view">
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/size-guide">Size Guide</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/faq">FAQs</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/">Blog</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1"></div>
        </div>
        <div className="footer-coloumn-box0"></div>
      </div>

      <div className="footer-coloumn">
        <div className="footer-coloumn-box0"></div>
        <div className="footer-coloumn-box">
          <h2>Customer Care</h2>
        </div>
        <div className="footer-coloumn-box-mobile-view">
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/">Return Your Order</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/return-policy">Return Policy</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/contact-us">Contact Us</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/">Track Your Order</Link>
            </h3>
          </div>
        </div>
        <div className="footer-coloumn-box0"></div>
      </div>

      <div className="footer-coloumn">
        <div className="footer-coloumn-box0"></div>
        <div className="footer-coloumn-box">
          <h2>Privacy & Legal</h2>
        </div>
        <div className="footer-coloumn-box-mobile-view">
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/Privicy">Privicy Policy</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/terms-conditions">Terms & Conditions</Link>
            </h3>
          </div>
          <div className="footer-coloumn-box1">
            <h3>
              <Link to="/term-of-use">Terms Of Use</Link>
            </h3>
          </div>
        </div>
        <div className="footer-coloumn-box0"></div>
      </div>

      <div className="footer-coloumn0"></div>

      <div className="footer-coloumn1">
        <div className="footer-coloumn1-block">
          <h1>Follow Us On Our Social Media</h1>
        </div>

        <div className="footer-coloumn1-block">
          <div className="footer-coloumn1-block-socialmedia">
            <Link to="">
              <img src="/PHotos/instagram-white-icon.png" alt="Instagram" />
            </Link>
          </div>
          <div className="footer-coloumn1-block-socialmedia">
            <Link to="">
              <img
                src="/PHotos/facebook-app-round-white-icon.png"
                alt="Facebook"
              />
            </Link>
          </div>
          <div className="footer-coloumn1-block-socialmedia">
            <Link to="">
              <img src="/PHotos/X_logo_2023_(white).png" alt="Twitter (X)" />
            </Link>
          </div>
          <div className="footer-coloumn1-block-socialmedia">
            <Link to="">
              <img src="/PHotos/pinterest-5-xxl.png" alt="Pinterest" />
            </Link>
          </div>
        </div>

        <div className="footer-coloumn1-block"></div>
        <div className="footer-coloumn1-block"></div>
      </div>
    </div>
   
  );
};

export default Footer;
