import React, { useState, useEffect } from 'react';
import VisualGlossaryChart from './../VisualGlossaryChart'
import './VisualGlossary.css'
const data = [
     { descriptor: 'arrangements', value: 40,index:100 },
    { descriptor: 'r&b', value: 100,index:20 },
    { descriptor: 'danceable', value: 75,index:75 },
    { descriptor: 'bold typography', value: 80,index:80 }
  ]
const VisualGlossary = ({artist}) => {

  return (
    <div className="glossary-container flex-col flex">
    <h2 className="glossary-headline text-xl font-semibold mb-4">Visual Glossary</h2>
      <VisualGlossaryChart data={data} artist={artist}/>
    </div>
  );
};

export default VisualGlossary;