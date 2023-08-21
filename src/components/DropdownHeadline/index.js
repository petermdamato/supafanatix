import React, { useState } from 'react';
import './DropdownHeadline.css'

const DropdownHeadline = ({ options,artist }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  return (
    <h3 className="dropdown-headline pt-4" style={{  }}>Compare <span className="dropdown-headline-artist-span">{artist}</span> to 
      <select className="dropdown-headline-brand-span"
        value={selectedOption}
        onChange={handleOptionChange}
        style={{
          border: 'none',
          background: 'transparent',
          marginLeft: '0.5em',
          outline: 'none',
        }}
      >
        {options.map(option => (
          <option className="dropdown-headline-brand-option" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </h3>
  );
};

export default DropdownHeadline;