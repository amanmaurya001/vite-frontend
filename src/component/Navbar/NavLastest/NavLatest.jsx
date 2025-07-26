import React, { useState } from "react";
import "./NavLatest.css";
const NavLatest = () => {
const Latest =[
   
   

      {
        gender: "Women",
        item: [
          { itemname: "All Products",  link: "/productlisting/Latest/all" },
          { itemname: "Shirt",        link: "/productlisting/Latest/shirt" },
          { itemname: "T-Shirt",      link: "/productlisting/Latest/t-shirt" },
          { itemname: "Polo T-shirt", link: "/productlisting/Latest/polo-tshirt" }
        ]
      },
      {
        gender: "Men",
        item: [
          { itemname: "All Products",  link: "/productlisting/Latest/shirt" },
          { itemname: "Pants",        link: "/productlisting/Latest/pants" },
          { itemname: "Formal Pants", link: "/productlisting/Latest/formal-pants" },
          { itemname: "Denim Jeans",  link: "/productlisting/Latest/denim-jeans" }
        ]
      }
    
]
    
  const [isMenuOpen, setIsMenuOpen] = useState({});

    const call = (id) => {
        setIsMenuOpen((prev) => ({
          ...prev,
          [id]: !prev[id],
        }));
      };
  return (
    <div className="navLatest" onClick={() =>call(1)}>
      <section className="navLatest-box">
        <h2>Latest</h2>
      </section>
      {isMenuOpen[1] && <div className="latest-menu">
     
        
        <section className="latest-menu-women">
         <h3>{Latest[0].gender}</h3>
         {Latest[0].item.map( (item,index)=>
             <li key=  {index}>{item.itemname}</li>
         )}
        </section>
        <section className="latest-menu-men">
           <h3>{Latest[1].gender}</h3>
         {Latest[1].item.map( (item,index)=>
             <li key=  {index}>{item.itemname}</li>
         )}
        </section>
     
        </div>}
    </div>
  );
};

export default NavLatest;
