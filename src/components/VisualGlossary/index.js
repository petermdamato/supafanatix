import React, { useState, useEffect } from 'react';
import VisualGlossaryChart from './../VisualGlossaryChart'
import './VisualGlossary.css'
const data = [
    { descriptor: 'danceable', value: 75,index:75 },
    { descriptor: 'bold typography', value: 80,index:80 }
  ]
const VisualGlossary = ({artist,categories}) => {
  const [passedData,setPassedData] = useState(data)

  import(`../../assets/data/${artist.toLowerCase().split(" ").join("_")}.json`)
          .then((res) => {
            return setPassedData(res.data)})
          .catch(_ => null);

  return (
    <div className="glossary-container flex-col flex">
    <h2 className="glossary-headline text-xl font-semibold mb-4">Visual Glossary</h2>
      <VisualGlossaryChart data={passedData} artist={artist} categories={categories}/>
    </div>
  );
};

export default VisualGlossary;