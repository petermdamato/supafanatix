import React, { useState, useEffect } from 'react';
import DescriptorMatrixChart from './../DescriptorMatrixChart';
import Sliders from './../Sliders';
import Leaderboard from './../Leaderboard';
import { calculateWeightedSimilarityScore } from './../../utils/similarityScore';
import cloneDeep from 'lodash/cloneDeep';
import './DescriptorMatrix.css';

// const brands = [{"brand":"Apple","rank":42},{"brand":"Google","rank":18},{"brand":"Amazon","rank":71},{"brand":"Microsoft","rank":56},{"brand":"Coca-Cola","rank":88},{"brand":"Nike","rank":23},{"brand":"Samsung","rank":67},{"brand":"BMW","rank":35},{"brand":"Facebook","rank":52},{"brand":"Smeg","rank":88},{"brand":"Mercedes-Benz","rank":82}]

const brands = [{'brand': 'ray_ban', 'rank': 1}, {'brand': 'lego', 'rank': 2}, {'brand': 'xbox', 'rank': 3}, {'brand': 'playstation', 'rank': 4}, {'brand': 'nintendo', 'rank': 5}, {'brand': 'chanel', 'rank': 6}, {'brand': 'red_bull', 'rank': 7}, {'brand': 'uber', 'rank': 8}, {'brand': 'lyft', 'rank': 9}, {'brand': 'disney', 'rank': 10}, {'brand': 'louis_vuitton', 'rank': 11}, {'brand': 'rolex', 'rank': 12}, {'brand': 'the_north_face', 'rank': 13}, {'brand': 'frito_lay', 'rank': 14}, {'brand': 'kraft_heinz', 'rank': 15}, {'brand': 'general mills', 'rank': 16}, {'brand': 'campbell_soup_company', 'rank': 17}, {'brand': 'hersheys', 'rank': 18}, {'brand': 'under_armour', 'rank': 19}, {'brand': 'gucci', 'rank': 20}, {'brand': 'new_balance', 'rank': 21}, {'brand': 'keurig', 'rank': 22}, {'brand': 'calphalon', 'rank': 23}, {'brand': 'tupperware', 'rank': 24}, {'brand': 'smeg', 'rank': 25}, {'brand': 'dell_technologies', 'rank': 26}, {'brand': 'oster', 'rank': 27}, {'brand': 'mazda', 'rank': 28}, {'brand': 'lexus', 'rank': 29}, {'brand': 'subaru', 'rank': 30}, {'brand': 'land_rover', 'rank': 31}, {'brand': 'chrysler', 'rank': 32}, {'brand': 'general_motors', 'rank': 33}, {'brand': 'johnson_&_johnson', 'rank': 34}, {'brand': 'unilever', 'rank': 35}, {'brand': 'procter_&_gamble', 'rank': 36}, {'brand': 'chase', 'rank': 37}, {'brand': 'subway', 'rank': 38}, {'brand': 'mcdonalds', 'rank': 39}, {'brand': 'kfc', 'rank': 40}, {'brand': 'dominos_pizza', 'rank': 41}, {'brand': 'taco_bell', 'rank': 42}, {'brand': 'mucinex', 'rank': 43}, {'brand': 'walgreens', 'rank': 44}, {'brand': 'bose', 'rank': 45}, {'brand': 'tiktok', 'rank': 46}, {'brand': 'snap', 'rank': 47}, {'brand': 'home_depot', 'rank': 48}, {'brand': 'claritin', 'rank': 49}, {'brand': 'alka_seltzer', 'rank': 50}, {'brand': 'audi', 'rank': 51}, {'brand': 'hyundai', 'rank': 52}, {'brand': 'robitussin', 'rank': 53}, {'brand': 'advil', 'rank': 54}, {'brand': 'tylenol', 'rank': 55}, {'brand': 'airbnb', 'rank': 56}, {'brand': 'zoom', 'rank': 57}, {'brand': 'shein', 'rank': 58}, {'brand': 'spotify', 'rank': 59}, {'brand': 'adobe', 'rank': 60}, {'brand': 'whatsapp', 'rank': 61}, {'brand': 'modelo', 'rank': 62}, {'brand': 'ford', 'rank': 63}, {'brand': 'honda', 'rank': 64}, {'brand': 'ibm', 'rank': 65}, {'brand': 'pepsi', 'rank': 66}, {'brand': 'ikea', 'rank': 67}, {'brand': 'volkswagen', 'rank': 68}, {'brand': 'toyota', 'rank': 69}, {'brand': 'netflix', 'rank': 70}, {'brand': 'adidas', 'rank': 71}, {'brand': 'starbucks', 'rank': 72}, {'brand': 'tesla', 'rank': 73}, {'brand': 'paypal', 'rank': 74}, {'brand': 'mastercard', 'rank': 75}, {'brand': 'visa', 'rank': 76}, {'brand': 'instagram', 'rank': 77}, {'brand': 'facebook', 'rank': 78}, {'brand': 'mercedes_benz', 'rank': 79}, {'brand': 'bmw', 'rank': 80}, {'brand': 'samsung', 'rank': 81}, {'brand': 'nike', 'rank': 82}, {'brand': 'amazon', 'rank': 83}, {'brand': 'microsoft', 'rank': 84}, {'brand': 'google', 'rank': 85}, {'brand': 'apple', 'rank': 86}, {'brand': 'coca_cola', 'rank': 87}]

const DescriptorMatrix = ({artist,displayed,setDisplayed,page,categories}) => {
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
              entry.rank = calculateWeightedSimilarityScore(artistData, brandData[entry.brand.toLowerCase()])
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
          entry.rank = calculateWeightedSimilarityScore(descriptors, brandData[entry.brand.toLowerCase()])
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
        <Sliders categories={categories} setDisplayed={setDisplayed} displayed={displayed} descriptors={artistData} setDescriptors={setDescriptors}/>
        <Leaderboard rankings={brandsList}/>
      </div>
    </div>
  );
};

export default DescriptorMatrix;