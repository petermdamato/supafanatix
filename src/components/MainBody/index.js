import React, { useState,useEffect } from 'react';
import logo from './../../assets/logo.png';
import * as images from '../../assets';
import AutocompleteMenu from './../AutocompleteMenu';
import Overview from './../Overview';
import BrandMatch from './../BrandMatch';
import DescriptorMatrix from './../DescriptorMatrix';
import VisualGlossary from './../VisualGlossary';
import ImageMatch from './../ImageMatch';
import { calculateWeightedSimilarityScore,findClosestDescriptor,findDistinctions } from './../../utils/similarityScore';
import cloneDeep from 'lodash/cloneDeep';
import './MainBody.css'

const MainBody = ({options,handleArtistChange,artist}) => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [labels, setLabels] = useState([[null,null,null],[null,null,null],[null,null,null]])
  const [data, setData] = useState([])
  const [differentiators, setDifferentiators] = useState([])
  const [brandData, setBrandData] = useState([])
  const [brandRankings, setBrandRankings] = useState([])
  const [sonicSimilarities, setSonicSimilarities] = useState([null, null, null])
  const [visualSimilarities, setVisualSimilarities] = useState([null, null, null])
  const [displayed, setDisplayed] = useState("constrained");
  const [page, setPage] = useState('Overview')

  const imageUrl = `../../assets/logo.png`
  const navigation = ["Overview", "Brand Match", "Descriptor Matrix", "Visual Glossary", "Image Match"]

  const handleArtistSelect = (selectedArtist) => {
    setSelectedArtist(selectedArtist);
  };
  const handlePageSelect = (entry) => {
    setPage(entry) 
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let innerData;
         await import(`../../assets/data/${artist.toLowerCase().split(" ").join("_")}.json`)
            .then((res) => {
              innerData = res.data
              setData(res.data)
              const dat = res.data.sort((a,b)=>{
                return b.value - a.value
              })
              let sonic = res.data.filter(entry=>entry.category==="sonic")
              let visual = res.data.filter(entry=>entry.category==="visual")
              let vibe = res.data.filter(entry=>entry.category==="vibe")

              sonic = sonic.map((entry)=>entry.descriptor)
              visual = visual.map(entry=>entry.descriptor)
              vibe = vibe.map(entry=>entry.descriptor)
              const readyData = findDistinctions(res.data)

              setDifferentiators(readyData)

              setLabels([sonic.splice(0,3).join(", "), visual.splice(0,3).join(", "), vibe.splice(0,3).join(", ")])

              })
            .catch(_ => null);

      await import(`../../assets/data/brand.json`)
              .then((res) => {
                const bdata = res.data
                setBrandData(bdata)

                let brands = Object.keys(bdata)
                brands = brands.map(entry=>{
                  let payload = {}
                  payload['brand'] = entry
                  payload['visual_rank'] = calculateWeightedSimilarityScore(innerData,bdata[entry],'visual')
                  payload['sonic_rank'] = calculateWeightedSimilarityScore(innerData,bdata[entry],'sonic')
                  return payload
                })
  
                setBrandRankings(brands)

                setSonicSimilarities(findClosestDescriptor(bdata[cloneDeep(brands).sort((a,b)=>{
                          return b.sonic_rank - a.sonic_rank
                        })[0].brand],bdata[cloneDeep(brands).sort((a,b)=>{
                          return b.sonic_rank - a.sonic_rank
                        })[1].brand],innerData.filter(entry=>entry.category==="sonic"&&entry.descriptor[0]===entry.descriptor[0].toLowerCase())))
                setVisualSimilarities(findClosestDescriptor(bdata[cloneDeep(brands).sort((a,b)=>{
                          return b.visual_rank - a.visual_rank
                        })[0].brand],bdata[cloneDeep(brands).sort((a,b)=>{
                          return b.visual_rank - a.visual_rank
                        })[1].brand],innerData.filter(entry=>entry.category==="visual")))

                })

              .catch(_ => null);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  }, [artist,page]);

  return (
    <div className="h-full app-mainpage-inner">
      <div className="h-screen fill-screen">
        <div className="flex h-1/6 fill-screen-inner border-bottom">
          <div className="w-1/5 flex flex-col">
            <div className="image-container"><img src={logo} alt="Supafanatix Logo" /></div>
          </div>
          <div className={`autocomplete-container ${displayed==="unconstrained"&&page==="Descriptor Matrix"?'autocomplete-unconstrained':'autocomplete-constrained'} flex-grow flex justify-center items-center`}>
              <AutocompleteMenu className="app-frontpage-searchbar" artist={artist} options={options} onOptionSelect={handleArtistChange}/>
          </div>
        </div>
        
        <div className="flex container-lower w-screen">
          <div className="w-1/5 border-right flex-col justify-center nav-artist-container pt-10">
            <div className="flex justify-center nav-artist">
              <div className="nav-artist-image">
               <img src={images.default[artist.toLowerCase().split(" ").join("_")][0]} alt="Bad Bunny" />
              </div>
              <div className="nav-artist-name">
              {artist}
              </div>
            </div>
            <ul className="nav-navigation pt-10 ">
              {navigation.map(entry=>{
                return (<li key={"key-" +entry} onClick={() => handlePageSelect(entry)} className={`${entry === page ? 'page-link selected-page' : ''}`}><a href="#">{entry}</a></li>)
              })}
            </ul>
          </div>
          <div className="w-4/5 flex-grow">
            <div className="w-full flex-col nav-artist-container-hero pt-10">
              <div className="flex nav-artist-hero">
                <div className="nav-artist-image-hero">
                 <img src={images.default[artist.toLowerCase().split(" ").join("_")][0]} alt="Bad Bunny" />
                </div>
                <div className="nav-artist-name-hero">
                {artist}
                </div>
              </div>
              {page === "Overview" ? <Overview artist={artist} differentiators={differentiators} brandRankings={brandRankings} visualSimilarities={visualSimilarities} sonicSimilarities={sonicSimilarities} brandData={brandData} data={data} labels={labels} /> : page === "Brand Match" ? <BrandMatch artist={artist} brandRankings={brandRankings} incomingData={data} brandData={brandData}/>:page === "Descriptor Matrix"?<DescriptorMatrix page={page} displayed={displayed} setDisplayed={setDisplayed} artist={artist}/>:page === "Visual Glossary"?<VisualGlossary artist={artist}/>:<ImageMatch artist={artist}/>}
            </div>
          </div>
          </div>
        </div>
  </div>
  );
};

export default MainBody;