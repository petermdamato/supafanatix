import React, { useState, useEffect } from 'react';
import './BrandMatch.css'
import RowChart from './../RowChart'
import CircleChart from './../CircleChart'
import DropdownHeadline from './../DropdownHeadline'
import {findDistinctions} from './../../utils/similarityScore';
import cloneDeep from 'lodash/cloneDeep';
let brands = []
const data = [[
  { "brand": "Nike", "value": 8 },
  { "brand": "Lululemon", "value": 7 },
  { "brand": "Chipotle", "value": 9 },
  { "brand": "Mucinex", "value": 2 },
  { "brand": "Guinness", "value": 2 },
  { "brand": "Apple", "value": 10 },
  { "brand": "Amazon", "value": 4 },
  { "brand": "Coca Cola", "value": 8 },
  { "brand": "Mercedes", "value": 7 },
  { "brand": "McDonald's", "value": 9 },
  { "brand": "Google", "value": 2 },
  { "brand": "Samsung", "value": 1 },
  { "brand": "Chanel", "value": 10 }
],[
  { "brand": "Nike", "value": 1 },
  { "brand": "Lululemon", "value": 7 },
  { "brand": "Chipotle", "value": 4 },
  { "brand": "Mucinex", "value": 6 },
  { "brand": "Guinness", "value": 5 },
  { "brand": "Apple", "value": 10 },
  { "brand": "Amazon", "value": 3 },
  { "brand": "Coca Cola", "value": 8 },
  { "brand": "Mercedes", "value": 2 },
  { "brand": "McDonald's", "value": 9 },
  { "brand": "Google", "value": 2 },
  { "brand": "Samsung", "value": 9 },
  { "brand": "Chanel", "value": 10 }
],[
  {"label":"earth tones","data":[{ "key": "brand", "value": 7 },
    { "key": "artist", "value": 5.2 }]},{"label":"emphasis on crisp edges","data":[{ "key": "brand", "value": 2 },
    { "key": "artist", "value": 8.2 }]},{"label":"use of gradients","data":[{ "key": "brand", "value": 3 },
    { "key": "artist", "value": 4.2 }]}
],[
  {"label":"uplifting character","data":[{ "key": "brand", "value": 7 },
    { "key": "artist", "value": 5.2 }]},{"label":"dreamy character","data":[{ "key": "brand", "value": 2 },
    { "key": "artist", "value": 8.2 }]},{"label":"r&b sound","data":[{ "key": "brand", "value": 3 },
    { "key": "artist", "value": 4.2 }]}
]]

const BrandMatch = ({artist,brandRankings,categories,brandData,incomingData}) => {
    let brandsOptions = brandRankings.map(entry=>entry.brand)
  brandsOptions = brandsOptions.sort()
  const [brand, setBrand] = useState(brandsOptions[0])
  const [sonicDiffs,setSonicDiffs] = useState([null, null, null])
  const [visualDiffs,setVisualDiffs] = useState([null, null, null])


  useEffect(()=>{
    setSonicDiffs(findDistinctions(incomingData,brand,brandData[brand],"sonic"))
    setVisualDiffs(findDistinctions(incomingData,brand,brandData[brand],"visual"))
  },[brand,artist])

  let sonicRankings = cloneDeep(brandRankings)
  sonicRankings = sonicRankings.sort((a,b)=>{return b.sonic_rank-a.sonic_rank}).map(entry=>{
    entry.value = entry.sonic_rank
    return entry
  })
  let visualRankings = cloneDeep(brandRankings)

  visualRankings = visualRankings.sort((a,b)=>{return b.visual_rank-a.visual_rank}).map(entry=>{
    entry.value = entry.visual_rank
    return entry
  })

  data[0].forEach(entry=>(!brands.includes(entry.brand)?brands.push(entry.brand):''))

  return (
    <div className="brandmatch-container flex-col flex">
    <h2 className="brandmatch-headline text-xl font-semibold mb-4">COMPARISON TO POPULAR BRANDS</h2>
      <div className="brandmatch-container-inner flex">
        <div className="row-chart-container py-6 pr-12 rounded-lg shadow-md">
          <RowChart name="Sonically Similar" setWidth={300} data={sonicRankings}/>
        </div>
        <div className="w-10">
        </div>
              <div className="row-chart-container py-6 pr-12 rounded-lg shadow-md">
          <RowChart name="Visually Similar" height="" setWidth={300} data={visualRankings}/>
        </div>
        </div>
      <DropdownHeadline options={brandsOptions} setBrand={setBrand} artist={artist} />
      <div className="brandmatch-container-inner flex">
      <div className="brandmatch-container-inner flex">
        <CircleChart name="Top Sonic Differences" setWidth={260} data={sonicDiffs}/>
      </div>
      <div className="brandmatch-container-inner flex">
        <CircleChart name="Top Visual Differences" setWidth={260} data={visualDiffs}/>
      </div>
      </div>
    </div>
  );
};

export default BrandMatch;