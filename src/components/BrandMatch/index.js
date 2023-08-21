import React, { useState, useEffect } from 'react';
import './BrandMatch.css'
import RowChart from './../RowChart'
import CircleChart from './../CircleChart'
import DropdownHeadline from './../DropdownHeadline'
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

const BrandMatch = ({artist}) => {
  data[0].forEach(entry=>(!brands.includes(entry.brand)?brands.push(entry.brand):console.log('Good')))

  return (
    <div className="brandmatch-container flex-col flex">
    <h2 className="brandmatch-headline text-xl font-semibold mb-4">COMPARISON TO POPULAR BRANDS</h2>
      <div className="brandmatch-container-inner flex">
        <div className="row-chart-container py-6 pr-12 rounded-lg shadow-md">
          <RowChart name="Visually Similar" setWidth={300} data={data[0]}/>
        </div>
        <div className="w-10">
        </div>
              <div className="row-chart-container py-6 pr-12 rounded-lg shadow-md">
          <RowChart name="Sonically Similar" height="" setWidth={300} data={data[1]}/>
        </div>
        </div>
      <DropdownHeadline options={brands} artist={artist} />
      <div className="brandmatch-container-inner flex">
      <div className="brandmatch-container-inner flex">
        <CircleChart name="Top Visual Differences" setWidth={260} data={data[2]}/>
      </div>
      <div className="brandmatch-container-inner flex">
        <CircleChart name="Top Sonic Differences" setWidth={260} data={data[3]}/>
      </div>
      </div>
    </div>
  );
};

export default BrandMatch;