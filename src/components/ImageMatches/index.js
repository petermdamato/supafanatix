import React from 'react';
import './ImageMatches.css'; // You can create a CSS file for styling

const ImageMatches = ({ imagesData }) => {

  return (
    <div className="image-row flex-col">
      {imagesData.map((item, index) => (
        <div key={index} className="row-item">
          <div className="circle-container">
            <div className="brand-image">
              <img src={item['artist-image']} alt="Artist" className="circle-image" />
            </div>
            <div className="circle" />
          </div>
          <div className="line"></div>
          <div className="brand-image-container">
            <div className="brand-image">
              <img src={item['brand-image']} alt="Brand"  />
              <div className="circle" />
            </div>
            <div className="brand-name-image">{item['brand']}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageMatches;