import React, { useState, useEffect } from 'react';
import DescriptorMatrixChart from './../DescriptorMatrixChart'
import Sliders from './../Sliders'
import Leaderboard from './../Leaderboard'
import cloneDeep from 'lodash/cloneDeep'
import './DescriptorMatrix.css'

const defaultDescriptors = [
  { descriptor: 'high tempo', value: 95,category:"sonic" },
  { descriptor: 'reggaeton', value: 90,category:"sonic" },
  { descriptor: 'danceable', value: 85,category:"sonic" },
  { descriptor: 'major key', value: 70,category:"sonic" },
  { descriptor: 'arrangements', value: 50,category:"sonic" }, 
  { descriptor: 'new high tempo', value: 95,category:"visual" },
  { descriptor: 'new reggaeton', value: 90,category:"visual" },
  { descriptor: 'new danceable', value: 85,category:"visual" },
  { descriptor: 'new major key', value: 70,category:"visual" },
  { descriptor: 'new arrangements', value: 50,category:"visual" }, 
  { descriptor: 'old high tempo', value: 95,category:"vibe" },
  { descriptor: 'old reggaeton', value: 90,category:"vibe" },
  { descriptor: 'old danceable', value: 85,category:"vibe" },
  { descriptor: 'old major key', value: 70,category:"vibe" },
  { descriptor: 'old arrangements', value: 50,category:"vibe" },
    { descriptor: 'two high tempo', value: 95,category:"sonic" },
  { descriptor: 'two reggaeton', value: 90,category:"sonic" },
  { descriptor: 'two danceable', value: 85,category:"sonic" },
  { descriptor: 'two major key', value: 70,category:"sonic" },
  { descriptor: 'two arrangements', value: 50,category:"sonic" }, 
  { descriptor: 'two new high tempo', value: 95,category:"visual" },
  { descriptor: 'two new reggaeton', value: 90,category:"visual" },
  { descriptor: 'two new danceable', value: 85,category:"visual" },
  { descriptor: 'two new major key', value: 70,category:"visual" },
  { descriptor: 'two new arrangements', value: 50,category:"visual" }, 
  { descriptor: 'two old high tempo', value: 95,category:"vibe" },
  { descriptor: 'two old reggaeton', value: 90,category:"vibe" },
  { descriptor: 'two old danceable', value: 85,category:"vibe" },
  { descriptor: 'two old major key', value: 70,category:"vibe" },
  { descriptor: 'two old arrangements', value: 50,category:"vibe" }
];

const brands = [
    { brand: 'Nike', rank:1 },
    { brand: 'Guinness', rank:2 },
    { brand: 'Mucinex', rank:3 }
];

const DescriptorMatrix = ({artist,displayed,setDisplayed,page}) => {
  const [rankings, setRankings] = useState(brands);
  const [descriptors, setDescriptors] = useState(cloneDeep(defaultDescriptors));
    console.log(descriptors)
  useEffect(() => { 
    setDescriptors(cloneDeep(defaultDescriptors))
  }, [page]);

    useEffect(() => { 
      if (descriptors.find(entry=>entry.descriptor==="arrangements").value > 50) {
        setRankings([
            { brand: 'Nike', rank:3 },
            { brand: 'Guinness', rank:2 },
            { brand: 'Mucinex', rank:1 }
          ].sort((a,b)=>{
            return a.rank-b.rank
          }));
      }

  }, [descriptors]);

  return (
    <div className="matrix-container flex-col flex">
    <h2 className="matrix-headline text-xl font-semibold mb-4">Brand Descriptor Matrix</h2>
       <div className="descriptor-matrix-dek">Artists are scored across many sonic, visual and vibe metrics, which helps them get matched to brands that fit these profiles. Move the sliders below to see how adjusting some metrics could help unlock new brand partners. <span className="expand-button" onClick={()=>{
        setDisplayed(displayed==="constrained"?"unconstrained":"constrained")
      }}>{displayed==='constrained'?'Show All Descriptors':'Show Top Descriptors'}</span></div>
      <div className="matrix-container-inner flex">
        <Sliders setDisplayed={setDisplayed} displayed={displayed} descriptors={descriptors} setDescriptors={setDescriptors}/>
        <Leaderboard rankings={rankings}/>
      </div>
    </div>
  );
};

export default DescriptorMatrix;