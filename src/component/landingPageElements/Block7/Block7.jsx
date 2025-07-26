import React from 'react'
import "./Block7.css";
import { Link } from "react-router-dom";
const Block7 = () => {
  return (
      <section id="block7">
        <div id="block7-up">
          <h3>Something special for the holidays</h3>
        </div>
        <div id="block7-mid">
          {[
            {
              name: "A-Line Cotton Skirt",
              img: "/PHotos/women/women-skirt/long/long-0001/1.png",
            },
            {
              name: "Women's Sneakers",
              img: "PHotos/index/women sneakers.png",
            },
            { name: "Men's Bags", img: "PHotos/index/mens bag.png" },
            { name: "Men's Purse", img: "PHotos/index/mens purse.png" },
          ].map((product, index) => (
            <div id="block7-mid-product" key={index}>
              <Link to={""}>
                <div id="block7-mid-product-img">
                  <img src={`${product.img}`} alt="" />
                </div>
                <div id="block7-mid-product-name">{product.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </section>
  )
}

export default Block7