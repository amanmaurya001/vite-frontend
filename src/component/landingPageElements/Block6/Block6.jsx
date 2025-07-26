import React from 'react'
import "./Block6.css";
import { Link } from "react-router-dom";
const Block6 = () => {
  return (
     <section id="block6">
        <div id="block6-left">
          <div id="block6-left-up">
            <Link to={"/product/midi_dress_001"}>
              <img src="PHotos/home/block9-U.jpg" alt="" />
            </Link>
          </div>

          <div id="block6-left-down">
            <Link to={"/product/midi_dress_001"}>
              <img src="PHotos/index/block8-right-down.png" alt="" />
            </Link>
          </div>
        </div>
        <div id="block6-right">
          <Link to={"/product/midi_dress_001"}>
            <img src="PHotos/home/block9-R.jpg" alt="" />
          </Link>
        </div>
      </section>

  )
}

export default Block6