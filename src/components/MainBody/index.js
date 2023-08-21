import React, { useState } from 'react';
import logo from './../../assets/logo.png';
import * as images from '../../assets';
import AutocompleteMenu from './../AutocompleteMenu';
import Overview from './../Overview';
import BrandMatch from './../BrandMatch';
import DescriptorMatrix from './../DescriptorMatrix';
import VisualGlossary from './../VisualGlossary';
import ImageMatch from './../ImageMatch';
import './MainBody.css'

const MainBody = ({options,handleArtistChange,artist}) => {
  const [selectedArtist, setSelectedArtist] = useState(null);
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
               <img src={images.default[artist.toLowerCase().split(" ").join("_")]} alt="Bad Bunny" />
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
                 <img src={images.default[artist.toLowerCase().split(" ").join("_")]} alt="Bad Bunny" />
                </div>
                <div className="nav-artist-name-hero">
                {artist}
                </div>
              </div>
              {page === "Overview" ? <Overview artist={artist}/> : page === "Brand Match" ? <BrandMatch artist={artist}/>:page === "Descriptor Matrix"?<DescriptorMatrix page={page} displayed={displayed} setDisplayed={setDisplayed} artist={artist}/>:page === "Visual Glossary"?<VisualGlossary artist={artist}/>:<ImageMatch artist={artist}/>}
            </div>
          </div>
          </div>
        </div>
  </div>
  );
};

export default MainBody;