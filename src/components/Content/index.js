import React, { useState } from 'react';
import logo from './../../assets/logo.png';
import MainBody from './../MainBody';
import AutocompleteMenu from './../AutocompleteMenu';

const Content = ({ options }) => {
  const [artist, setArtist] = useState('')

  const handleArtistChange = (val) => {
    setArtist(val);
  };
  return (
    <div>
     {artist.length>0 ? <div className="app-mainpage">

            <MainBody artist={artist} options={options} handleArtistChange={handleArtistChange}/>
     
          </div> : <div className="app-frontpage">
           <div className="app-frontpage-inner">
             <img src={logo} alt="Supafanatix Logo" />
             <AutocompleteMenu className="app-frontpage-searchbar" options={options} onOptionSelect={handleArtistChange}/>
           </div>
     
          </div>}
    </div>
  );
};

export default Content;
