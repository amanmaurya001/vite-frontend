import React from 'react';

const ProductImages = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="Product-Images">
      <div className="Scroll">
        {images.slice(0, 6).map((userimg, key) => (
          <img
            key={key}
            src={userimg}
            alt={`Product ${key}`}
            onClick={() => onImageClick(userimg)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
