import React, { useState } from 'react';
import DraggableRectangle from './DraggableRectangle';

const DescriptorMatrixChart = ({ data }) => {
  const [rectangles, setRectangles] = useState(data);

  const handleDrop = (index, newValue) => {
    console.log("drop")
    const newRectangles = [...rectangles];
    newRectangles[index].value = newValue;
    setRectangles(newRectangles);
  };

  return (
      <div>
        {rectangles.map((rectangle, index) => (
          <DraggableRectangle
            key={rectangle.descriptor}
            descriptor={rectangle.descriptor}
            value={rectangle.value}
            index={index}
            onChange={handleDrop}
          />
        ))}
      </div>
  );
};

export default DescriptorMatrixChart;