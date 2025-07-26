import React from 'react'
import "./Block2.css";
import { Link } from "react-router-dom";
const Block2 = () => {
  return (
      <section id="block2">
        <div id="block2-left">
          <h1>Supima Cotton</h1>
          <div>
            <Link to={""}>Men's</Link>

            <Link to={""}>Women's</Link>
          </div>
          <a href="">
            <img src="PHotos/home/block6-L.jpg" alt="" />
          </a>
        </div>

        <div id="block2-right">
          <h1>Tencel</h1>
          <div>
            <Link to={""}>Men's</Link>

            <Link to={""}>Women's</Link>
          </div>
          <Link to={""}>
            <img src="PHotos/home/block6-R2.jpg" alt="" />
          </Link>
        </div>
      </section>
  )
}

export default Block2