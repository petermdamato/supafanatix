import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default styles
import './Sliders.css';

function Sliders({displayed,setDisplayed,descriptors,setDescriptors,categories}) {

  const handleSliderChange = (index, newValue,category, descript) => {
    var updatedDescriptors = [...descriptors];
    updatedDescriptors.find(entry=>entry.descriptor===descript).value = newValue;
    setDescriptors(updatedDescriptors);
  };

  return (
    <div>
      <h2 className="slider-headline-labels">Sonic Descriptors</h2>
      <div className={`slider-container  ${displayed}`}>
        {descriptors?.length>0?displayed==="constrained"?descriptors.filter(entry=>categories[0].includes(entry.descriptor)).slice(0,5).map((descriptor, index) => (
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
        )):descriptors.filter(entry=>categories[0].includes(entry.descriptor)).map((descriptor, index) => (
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
        )):''}
      </div>
            <h2 className="slider-headline-labels-three">Visual Descriptors</h2>
      <div className={`slider-container  ${displayed}`}>
                {descriptors?.length>0?displayed==="constrained"?descriptors.filter(entry=>categories[1].includes(entry.descriptor)).slice(0,5).map((descriptor, index) => (
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
        )):descriptors.filter(entry=>categories[1].includes(entry.descriptor)).map((descriptor, index) => (
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
        )):''}
      </div>
      <h2 className="slider-headline-labels-two">Vibe Descriptors</h2>
      <div className={`slider-container  ${displayed}`}>
                {descriptors?.length>0?displayed==="constrained"?descriptors.filter(entry=>categories[2].includes(entry.descriptor)).slice(0,5).map((descriptor, index) => (
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
        )):descriptors.filter(entry=>categories[2].includes(entry.descriptor)).map((descriptor, index) => (
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
        )):''}
      </div>
      </div>
  );
}

export default Sliders;