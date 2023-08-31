import React, { useState, useEffect } from 'react';
import DescriptorMatrixChart from './../DescriptorMatrixChart';
import Sliders from './../Sliders';
import Leaderboard from './../Leaderboard';
import { calculateWeightedSimilarityScore } from './../../utils/similarityScore';
import cloneDeep from 'lodash/cloneDeep';
import './DescriptorMatrix.css';

const defaultDescriptors = [

];

const brands = [{"brand":"Apple","rank":42},{"brand":"Google","rank":18},{"brand":"Amazon","rank":71},{"brand":"Microsoft","rank":56},{"brand":"Coca-Cola","rank":88},{"brand":"Nike","rank":23},{"brand":"Samsung","rank":67},{"brand":"BMW","rank":35},{"brand":"Facebook","rank":52},{"brand":"Smeg","rank":88},{"brand":"Mercedes-Benz","rank":82}]

// const brands = [{"brand":"Apple","rank":42},{"brand":"Google","rank":18},{"brand":"Amazon","rank":71},{"brand":"Microsoft","rank":56},{"brand":"Coca-Cola","rank":88},{"brand":"Nike","rank":23},{"brand":"Samsung","rank":67},{"brand":"BMW","rank":35},{"brand":"Mercedes-Benz","rank":82},{"brand":"Facebook","rank":52},{"brand":"Instagram","rank":29},{"brand":"Visa","rank":63},{"brand":"Mastercard","rank":14},{"brand":"PayPal","rank":48},{"brand":"Tesla","rank":97},{"brand":"Starbucks","rank":7},{"brand":"Adidas","rank":37},{"brand":"Netflix","rank":78},{"brand":"Toyota","rank":45},{"brand":"Volkswagen","rank":24},{"brand":"IKEA","rank":66},{"brand":"Pepsi","rank":9},{"brand":"IBM","rank":3},{"brand":"Honda","rank":53},{"brand":"Ford","rank":92},{"brand":"Modelo","rank":17},{"brand":"WhatsApp","rank":61},{"brand":"Adobe","rank":21},{"brand":"Spotify","rank":85},{"brand":"Shein","rank":31},{"brand":"Zoom","rank":12},{"brand":"Airbnb","rank":95},{"brand":"Tylenol","rank":2},{"brand":"Advil","rank":74},{"brand":"Robitussin","rank":98},{"brand":"Hyundai","rank":6},{"brand":"Audi","rank":73},{"brand":"Alka-Seltzer","rank":26},{"brand":"Claritin","rank":39},{"brand":"Home Depot","rank":64},{"brand":"Snap","rank":89},{"brand":"TikTok","rank":47},{"brand":"Bose","rank":70},{"brand":"Walgreen's","rank":58},{"brand":"Mucinex","rank":32},{"brand":"Taco Bell","rank":16},{"brand":"Domino's Pizza","rank":54},{"brand":"KFC","rank":27},{"brand":"McDonald's","rank":90},{"brand":"Subway","rank":15},{"brand":"PepsiCo","rank":60},{"brand":"Chase","rank":8},{"brand":"Procter & Gamble","rank":41},{"brand":"Unilever","rank":20},{"brand":"Johnson & Johnson","rank":46},{"brand":"General Motors","rank":75},{"brand":"Chrysler","rank":28},{"brand":"Land Rover","rank":93},{"brand":"Subaru","rank":36},{"brand":"Lexus","rank":38},{"brand":"Mazda","rank":25},{"brand":"Oster","rank":51},{"brand":"Dell Technologies","rank":80},{"brand":"Smeg","rank":65},{"brand":"Tupperware","rank":22},{"brand":"Calphalon","rank":33},{"brand":"Keurig","rank":44},{"brand":"New Balance","rank":57},{"brand":"Hershey's","rank":86},{"brand":"Campbell Soup Company","rank":11},{"brand":"General Mills","rank":30},{"brand":"Kraft Heinz","rank":83},{"brand":"Frito-Lay","rank":43},{"brand":"The North Face","rank":68},{"brand":"Gucci","rank":96},{"brand":"Rolex","rank":99},{"brand":"Louis Vuitton","rank":10},{"brand":"Disney","rank":72},{"brand":"Uber","rank":84}]

const DescriptorMatrix = ({artist,displayed,setDisplayed,page}) => {
  const [artistData, setArtistData] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [brandsList, setBrandsList] = useState(cloneDeep(brands));
  const [descriptors, setDescriptors] = useState(null);

  import(`../../assets/data/${artist.toLowerCase().split(" ").join("_")}.json`)
            .then((res) => {
              return setArtistData(res.data)})
            .catch(_ => null);

  useEffect(() => {
    async function fetchData() {
      try {
         await import(`../../assets/data/brand.json`)
            .then((res) => {
              return setBrandData(res.data)})
            .catch(_ => null);

          if (artistData?.length>0&&brandData?.apple) {
            
            let brandsTemp = cloneDeep(brandsList)

            brandsTemp.map((entry)=>{
              entry.rank = calculateWeightedSimilarityScore(artistData, brandData[entry.brand.toLowerCase().replaceAll("-","_").split(" ").join("_")])
              return entry
            })

            setBrandsList(brandsTemp)
          }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [brandData]);

  useEffect(() => {

    if (artistData?.length>0&&brandData?.apple) {
        let brandsTemp = cloneDeep(brandsList)

        brandsTemp.forEach((entry)=>{
          entry.rank = calculateWeightedSimilarityScore(descriptors, brandData[entry.brand.toLowerCase().replaceAll("-","_").split(" ").join("_")])
        })

        setBrandsList(brandsTemp)
    }
  }, [descriptors]);

  return (
    <div className="matrix-container flex-col flex">
    <h2 className="matrix-headline text-xl font-semibold mb-4">Brand Descriptor Matrix</h2>
       <div className="descriptor-matrix-dek">Artists are scored across many sonic, visual and vibe metrics, which helps them get matched to brands that fit these profiles. Move the sliders below to see how adjusting some metrics could help unlock new brand partners. <span className="expand-button" onClick={()=>{
        setDisplayed(displayed==="constrained"?"unconstrained":"constrained")
      }}>{displayed==='constrained'?'Show All Descriptors':'Show Top Descriptors'}</span></div>
      <div className="matrix-container-inner flex">
        <Sliders setDisplayed={setDisplayed} displayed={displayed} descriptors={artistData} setDescriptors={setDescriptors}/>
        <Leaderboard rankings={brandsList}/>
      </div>
    </div>
  );
};

export default DescriptorMatrix;