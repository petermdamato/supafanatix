import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default styles
import './Sliders.css';

function Sliders({displayed,setDisplayed,descriptors,setDescriptors}) {

  const handleSliderChange = (index, newValue,category, descript) => {
    var updatedDescriptors = [...descriptors];
    updatedDescriptors.find(entry=>entry.descriptor===descript).value = newValue;
    setDescriptors(updatedDescriptors);
  };

  return (
    <div>
      <h2 className="slider-headline-labels">Sonic Descriptors</h2>
      <div className={`slider-container  ${displayed}`}>
        {displayed==="constrained"?descriptors.filter(entry=>entry.category==="sonic").slice(0,5).map((descriptor, index) => (
          <div className="slider-wrapper" key={index}>
            <label>{descriptor.descriptor}</label>
            <div className="spacer"></div>
            <Slider
              vertical
              value={descriptor.value}
              entity={descriptor.descriptor}
              onChange={(newValue) => handleSliderChange(index, newValue,"sonic",descriptor.descriptor)}
              trackStyle={{ backgroundColor: '#C54577' }}
              handleStyle={{ borderColor: '#C54577' }}
            />
            <div className="slider-value">{descriptor.value}</div>
          </div>
        )):descriptors.filter(entry=>entry.category==="sonic").map((descriptor, index) => (
          <div className="slider-wrapper" key={index}>
            <label>{descriptor.descriptor}</label>
            <div className="spacer"></div>
            <Slider
              vertical
              value={descriptor.value}
              onChange={(newValue) => handleSliderChange(index, newValue,"sonic",descriptor.descriptor)}
              trackStyle={{ backgroundColor: '#C54577' }}
              handleStyle={{ borderColor: '#C54577' }}
            />
            <div className="slider-value">{descriptor.value}</div>
          </div>
        ))}
      </div>
            <h2 className="slider-headline-labels-three">Visual Descriptors</h2>
      <div className={`slider-container  ${displayed}`}>
                {displayed==="constrained"?descriptors.filter(entry=>entry.category==="visual").slice(0,5).map((descriptor, index) => (
          <div className="slider-wrapper" key={index}>
            <label>{descriptor.descriptor}</label>
            <div className="spacer"></div>
            <Slider
              vertical
              value={descriptor.value}
              onChange={(newValue) => handleSliderChange(index, newValue,"visual",descriptor.descriptor)}
              trackStyle={{ backgroundColor: '#63846e' }}
              handleStyle={{ borderColor: '#63846e' }}
            />
            <div className="slider-value">{descriptor.value}</div>
          </div>
        )):descriptors.filter(entry=>entry.category==="visual").map((descriptor, index) => (
          <div className="slider-wrapper" key={index}>
            <label>{descriptor.descriptor}</label>
            <div className="spacer"></div>
            <Slider
              vertical
              value={descriptor.value}
              onChange={(newValue) => handleSliderChange(index, newValue,"visual",descriptor.descriptor)}
              trackStyle={{ backgroundColor: '#63846e' }}
              handleStyle={{ borderColor: '#63846e' }}
            />
            <div className="slider-value">{descriptor.value}</div>
          </div>
        ))}
      </div>
      <h2 className="slider-headline-labels-two">Vibe Descriptors</h2>
      <div className={`slider-container  ${displayed}`}>
                {displayed==="constrained"?descriptors.filter(entry=>entry.category==="vibe").slice(0,5).map((descriptor, index) => (
          <div className="slider-wrapper" key={index}>
            <label>{descriptor.descriptor}</label>
            <div className="spacer"></div>
            <Slider
              vertical
              value={descriptor.value}
              onChange={(newValue) => handleSliderChange(index, newValue,"vibe",descriptor.descriptor)}
              trackStyle={{ backgroundColor: '#007bff' }}
              handleStyle={{ borderColor: '#007bff' }}
            />
            <div className="slider-value">{descriptor.value}</div>
          </div>
        )):descriptors.filter(entry=>entry.category==="vibe").map((descriptor, index) => (
          <div className="slider-wrapper" key={index}>
            <label>{descriptor.descriptor}</label>
            <div className="spacer"></div>
            <Slider
              vertical
              value={descriptor.value}
              onChange={(newValue) => handleSliderChange(index, newValue,"vibe",descriptor.descriptor)}
              trackStyle={{ backgroundColor: '#007bff' }}
              handleStyle={{ borderColor: '#007bff' }}
            />
            <div className="slider-value">{descriptor.value}</div>
          </div>
        ))}
      </div>
      </div>
  );
}

export default Sliders;