import React, { useState } from "react";
import "./NavWomen.css";
import { Link } from "react-router-dom";
const NavWomen = ({ onClose }) => {
  const [isMenuOpen, setIsMenuOpen] = useState({});

  const women = [
    {
      Heading: "Tops",
      item: [
        { itemname: "All Products", link: "/productlisting/Women/allproducts" },
        { itemname: "Shirt", link: "/productlisting/Women/Shirt" },
        { itemname: "T-Shirt", link: "/productlisting/Women/t-shirt" },
        { itemname: "Kurti", link: "/productlisting/Women/Kurti" },
        { itemname: "Crop Top", link: "/productlisting/Women/crop-top" },
        { itemname: "Corset top", link: "/productlisting/Women/Corset" },

      
      ],
    },
    {
      Heading: "Bottoms",
      item: [
        { itemname: "Pants", link: "/productlisting/Women/pants" },
        { itemname: "Denim Jeans", link: "/productlisting/Women/denim-jeans" },
        { itemname: "Trousers", link: "/productlisting/Women/trousers" },
      ],
    },

    {
      Heading: "Dresses",
      item: [
        { itemname: "Mini Dress", link: "/productlisting/Women/mini" },
        { itemname: "Midi Dress", link: "/productlisting/Women/midi" },
        { itemname: "Maxi Dress", link: "/productlisting/Women/maxi" },
        {itemname: "Floral Dress",link: "/productlisting/Women/floral"},
        {itemname: "Cottage Dress",link: "/productlisting/Women/Cottage"}
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
    <div className="navWomen" onClick={() => call(1)}>
      <section className="navWomen-box">
        <h2>Women</h2>
      </section>
      {isMenuOpen[1] && (
        <div className="women-menu">
          {women.map((head, index) => (
            <div className="women-item" key={index}>
              <h3>{head.Heading}</h3>

              {head.item.map((item, index1) => (
                <Link to={item.link} onClick={onClose} key={index1}>
                  <li>{item.itemname}</li>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavWomen;
