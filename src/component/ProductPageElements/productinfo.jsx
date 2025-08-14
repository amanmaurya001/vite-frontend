import React from 'react';

const ProductInfo = ({ product, showStates, onToggle }) => {
  if (!product) return null;

  return (
    <section className="Product-Info">
      {/* Description */}
      <div className="discription-disc" onClick={() => onToggle(100)}>
        <h1>Description</h1>
      </div>
      {showStates[100] && (
        <div className="description-content">
          {product.description.map((disc, index) => (
            <h3 key={index}>{disc}</h3>
          ))}
        </div>
      )}

      {/* Material */}
      <div className="discription-material" onClick={() => onToggle(101)}>
        <h1>Material</h1>
      </div>
      {showStates[101] && (
        <div className="description-content">
          {product.material.map((mat, index) => (
            <h3 key={index}>{mat}</h3>
          ))}
        </div>
      )}

      {/* Care */}
      <div className="discription-care" onClick={() => onToggle(102)}>
        <h1>Care</h1>
      </div>
      {showStates[102] && (
        <div className="description-content">
          {product.care.map((care, index) => (
            <h3 key={index}>{care}</h3>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductInfo;
