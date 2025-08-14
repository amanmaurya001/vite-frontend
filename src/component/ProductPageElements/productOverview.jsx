import React from 'react';

const ProductOverview = ({
  product,
  selectSize,
  onSelectSize,
  quantity,
  onQuantityChange,
  isWished,
  onWishToggle,
  onAddToCart
}) => {
  if (!product) return null;

  return (
    <div className="Product-overview">
      <h1>{product.name}</h1>
      <h1>MRP inclusive of all taxes</h1>
      <h1>Rs {product.price?.original}.00</h1>
      <h1>{product.overview}</h1>

      <h1>Sizes</h1>
      <div className="sizes">
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className={selectSize === size ? "active" : ""}
            onClick={() => onSelectSize(size)}
          >
            {size}
          </button>
        ))}
      </div>

      <section className="quantity-and-wish">
        <div className="quantity">
          <button onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}>
            -
          </button>
          <div>{quantity}</div>
          <button onClick={() => quantity < 10 && onQuantityChange(quantity + 1)}>
            +
          </button>
        </div>

        <div
          className="wish"
          onClick={onWishToggle}
          style={{ backgroundColor: isWished ? 'red' : '#dad2d2' }}
        ></div>
      </section>

      <h1>size guide</h1>
      <div className="add-to-cart">
        <button onClick={onAddToCart}>Add to Collection</button>
      </div>

      <h1>Delivery & Payment Options</h1>
      <h1>cash on delivery available</h1>
      <h1>Delivery Time 2-7 days</h1>
    </div>
  );
};

export default ProductOverview;
