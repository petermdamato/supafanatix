import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const DraggableRectangle = ({ descriptor, value, index }) => {
  const [, drag] = useDrag({
    type: ItemTypes.RECTANGLE,
    item: { descriptor, value, index },
  });

  return (
    <div
      ref={drag}
      style={{
        width: '100px',
        height: '40px',
        backgroundColor: 'blue', // Change color as needed
        margin: '5px',
        cursor: 'grab', // Show grab cursor for draggable items
      }}
    >
      {descriptor}
    </div>
  );
};

export default DraggableRectangle;