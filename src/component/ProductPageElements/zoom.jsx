import React from 'react';

const ZoomModal = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div className="zoom-modal" onClick={onClose}>
      <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel-button" onClick={onClose}>
          X
        </button>
        <img
          src={imageSrc}
          alt="Zoomed product"
          className="zoomed-image"
        />
      </div>
    </div>
  );
};

export default ZoomModal;
