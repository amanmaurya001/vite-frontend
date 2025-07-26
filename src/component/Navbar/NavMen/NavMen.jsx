import React, { useState } from "react";
import "../NavMen/Navmen.css";
import { Link } from "react-router-dom";
const NavMen = ({ onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState({});
  const Men = [
    {
      Heading: "Upper",
      item: [
        { itemname: "All Products", link: "/productlisting/Men/allproducts" },
        { itemname: "Shirt", link: "/productlisting/Men/shirt" },
        { itemname: "T-Shirt", link: "/productlisting/Men/t-shirt" },
        { itemname: "Polo T-shirt", link: "/productlisting/Men/polo-tshirt" },
      ],
    },
    {
      Heading: "Bottoms",
      item: [
        { itemname: "Pants", link: "/productlisting/Men/pants" },
        { itemname: "Formal Pants", link: "/productlisting/Men/formal-pants" },
        { itemname: "Denim Jeans", link: "/productlisting/Men/denim-jeans" },
      ],
    },
  ];
  const call = (id) => {
    setIsMenuOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="navMen" onClick={() => call(1)}>
      <section className="navMen-box">
        <h2>Men</h2>
      </section>
      {isMenuOpen[1] && (
        <div className="Men-menu">
          {Men.map((head, index) => (
            <div className="Men-item" key={index}>
              <h3>{head.Heading}</h3>

              {head.item.map((item, index1) => (
               <Link to={item.link} onClick={onClose} key={index1}>
                  <li >{item.itemname}</li>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMen;
