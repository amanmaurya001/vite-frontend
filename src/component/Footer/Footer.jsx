import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const footerData = [
  {
    title: "Shopping",
    links: [
      { name: "Size Guide", path: "/size-guide" },
      { name: "FAQs", path: "/faq" },
      { name: "Blog", path: "/" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { name: "Return Your Order", path: "/" },
      { name: "Return Policy", path: "/return-policy" },
      { name: "Contact Us", path: "/contact-us" },
      { name: "Track Your Order", path: "/" },
    ],
  },
  {
    title: "Privacy & Legal",
    links: [
      { name: "Privacy Policy", path: "/Privicy" },
      { name: "Terms & Conditions", path: "/terms-conditions" },
      { name: "Terms Of Use", path: "/term-of-use" },
    ],
  },
];

const socialLinks = [
  { img: "/PHotos/instagram-white-icon.png", alt: "Instagram", path: "" },
  {
    img: "/PHotos/facebook-app-round-white-icon.png",
    alt: "Facebook",
    path: "",
  },
  { img: "/PHotos/X_logo_2023_(white).png", alt: "Twitter (X)", path: "" },
  { img: "/PHotos/pinterest-5-xxl.png", alt: "Pinterest", path: "" },
];

const Footer = () => {
  return (
    <div id="footer">
      {/* Columns */}
      {footerData.map((col, i) => (
        <div className="footer-coloumn" key={i}>
          <div className="footer-coloumn-header">
            <h2>{col.title}</h2>
          </div>

       
            <div className="footer-coloumn-links" >
                 {col.links.map((link, idx) => (
              <h3 key={idx}>
                <Link to={link.path}>{link.name}</Link>
              </h3>
                ))}
            </div>
        
        </div>
      ))}

      {/* Social media */}
      <div className="footer-extras">
        <div className="footer-social">
          <h1>Follow Us On Our Social Media</h1>

          <div className="footer-socialmedia">
            {socialLinks.map((social, idx) => (
              <Link to={social.path} key={idx}>
                <img src={social.img} alt={social.alt} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
