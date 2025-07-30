import React from 'react'
import { Link } from "react-router-dom";
import "./Block5.css";
const block5 = () => {
  return (
        <section id="block5">
        <div id="block5-left">
          <a href="html/mens-html/mens-jacket.html">
            <img src="/PHotos/home/block8-L.jpg" alt="" />
          </a>
        </div>
        <div id="block5-right">
          <div id="block5-right-up">
            <Link to={"/products/corset_001"}>
              <img src="/PHotos/home/block8-U.jpg" alt="" />
            </Link>
          </div>
          <div id="block5-right-down">
            <Link to={"/products/cottage-0002"}>
              <img src="/PHotos/home/block8-D.jpg" alt="" />
            </Link>
          </div>
        </div>
      </section>
  )
}

export default block5