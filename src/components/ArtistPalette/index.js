import React, { useState } from 'react';
import './ArtistPalette.css'; 

const ArtistPalette = ({ colorData }) => {
  colorData = colorData.slice(0,64)
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="color-grid">
      {colorData.map((colorObj, index) => { 
          return (
        <div
          key={index}
          className="color-tile"
          style={{ backgroundColor: colorObj.hex }}
        >
            <div className="tooltip">
              <div>Hex: {colorObj.hex}</div>
              <div>RGB: {colorObj.rgb}</div>
            </div>
        </div>
      )})}
    </div>
  );
};
export default ArtistPalette;