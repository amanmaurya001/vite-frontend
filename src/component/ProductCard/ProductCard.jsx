import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
const ProductCard = (props) => {
  return (
    <div className="product-card">
  <Link to={`/products/${props.productId}`}>
      <section className="image">
      
        <img className="img1" src={props.image0} alt="" />

        <img className="img2" src={props.image1} alt="" />
      </section>

      <h2 className="name">{props.name}</h2>
      
      <section className="price">
        <h2>Rs{props.priceOriginal}.00</h2>
        <h3>Rs{props.priceOffer}.00</h3>
        <h4>{props.Note}</h4>
      </section>
      </Link>
    </div>
  );
};

export default ProductCard;
