import React, { useState, useEffect } from 'react';
import ArtistPalette from './../ArtistPalette';
import ImageMatches from './../ImageMatches';
import * as images from '../../assets';
import './ImageMatch.css';

const data = [{'hex': '#2d5660', 'rgb': '(45, 86, 96)'}, {'hex': '#9c6e59', 'rgb': '(156, 110, 89)'}, {'hex': '#050d0e', 'rgb': '(5, 13, 14)'}, {'hex': '#427c8c', 'rgb': '(66, 124, 140)'}, {'hex': '#6e4436', 'rgb': '(110, 68, 54)'}, {'hex': '#3e2a21', 'rgb': '(62, 42, 33)'}, {'hex': '#3b7480', 'rgb': '(59, 116, 128)'}, {'hex': '#253034', 'rgb': '(37, 48, 52)'}, {'hex': '#457179', 'rgb': '(69, 113, 121)'}, {'hex': '#373c37', 'rgb': '(55, 60, 55)'}, {'hex': '#854436', 'rgb': '(133, 68, 54)'}, {'hex': '#0d1b2c', 'rgb': '(13, 27, 44)'}, {'hex': '#7c8c94', 'rgb': '(124, 140, 148)'}, {'hex': '#a67059', 'rgb': '(166, 112, 89)'}, {'hex': '#693b2d', 'rgb': '(105, 59, 45)'}, {'hex': '#070b0f', 'rgb': '(7, 11, 15)'}, {'hex': '#eeebe5', 'rgb': '(238, 235, 229)'}, {'hex': '#36221f', 'rgb': '(54, 34, 31)'}, {'hex': '#baafb2', 'rgb': '(186, 175, 178)'}, {'hex': '#818f8d', 'rgb': '(129, 143, 141)'}, {'hex': '#1e1818', 'rgb': '(30, 24, 24)'}, {'hex': '#232c2f', 'rgb': '(35, 44, 47)'}, {'hex': '#414c4e', 'rgb': '(65, 76, 78)'}, {'hex': '#20232c', 'rgb': '(32, 35, 44)'}, {'hex': '#40444c', 'rgb': '(64, 68, 76)'}, {'hex': '#7c848c', 'rgb': '(124, 132, 140)'}, {'hex': '#8a3b32', 'rgb': '(138, 59, 50)'}, {'hex': '#121a2c', 'rgb': '(18, 26, 44)'}, {'hex': '#e4a87f', 'rgb': '(228, 168, 127)'}, {'hex': '#b5735a', 'rgb': '(181, 115, 90)'}, {'hex': '#d7886b', 'rgb': '(215, 136, 107)'}, {'hex': '#503136', 'rgb': '(80, 49, 54)'}, {'hex': '#f7c4a4', 'rgb': '(247, 196, 164)'}, {'hex': '#b06055', 'rgb': '(176, 96, 85)'}, {'hex': '#975c54', 'rgb': '(151, 92, 84)'}, {'hex': '#3c485c', 'rgb': '(60, 72, 92)'}, {'hex': '#765e6c', 'rgb': '(118, 94, 108)'}, {'hex': '#661c1c', 'rgb': '(102, 28, 28)'}, {'hex': '#3c4c54', 'rgb': '(60, 76, 84)'}, {'hex': '#a76642', 'rgb': '(167, 102, 66)'}, {'hex': '#1b181e', 'rgb': '(27, 24, 30)'}, {'hex': '#764025', 'rgb': '(118, 64, 37)'}, {'hex': '#472113', 'rgb': '(71, 33, 19)'}, {'hex': '#e2ba9b', 'rgb': '(226, 186, 155)'}, {'hex': '#30130d', 'rgb': '(48, 19, 13)'}, {'hex': '#120504', 'rgb': '(18, 5, 4)'}, {'hex': '#d4a28d', 'rgb': '(212, 162, 141)'}, {'hex': '#87665c', 'rgb': '(135, 102, 92)'}, {'hex': '#332c2a', 'rgb': '(51, 44, 42)'}, {'hex': '#8c746c', 'rgb': '(140, 116, 108)'}, {'hex': '#544439', 'rgb': '(84, 68, 57)'}, {'hex': '#342c34', 'rgb': '(52, 44, 52)'}, {'hex': '#b8262e', 'rgb': '(184, 38, 46)'}, {'hex': '#fbcb56', 'rgb': '(251, 203, 86)'}, {'hex': '#211815', 'rgb': '(33, 24, 21)'}, {'hex': '#dcdcdf', 'rgb': '(220, 220, 223)'}, {'hex': '#bfa295', 'rgb': '(191, 162, 149)'}, {'hex': '#856e4d', 'rgb': '(133, 110, 77)'}, {'hex': '#c77d3b', 'rgb': '(199, 125, 59)'}, {'hex': '#4f4c4a', 'rgb': '(79, 76, 74)'}, {'hex': '#dc9b5c', 'rgb': '(220, 155, 92)'}, {'hex': '#e2a113', 'rgb': '(226, 161, 19)'}, {'hex': '#57646c', 'rgb': '(87, 100, 108)'}, {'hex': '#5c7474', 'rgb': '(92, 116, 116)'}, {'hex': '#fc3484', 'rgb': '(252, 52, 132)'}]
const imagesData = [{"artist-image":images.default.bad_bunny,"brand-image":images.default.lizzo},{"artist-image":images.default.bad_bunny,"brand-image":images.default.lizzo},{"artist-image":images.default.bad_bunny,"brand-image":images.default.lizzo}]
const ImageMatch = ({artist}) => {
  return (
    <div className="image-match-container flex-col flex">
      <div className="image-match-container-inner flex">
        <div className="image-match-headline-container flex flex-col">
          <h2 className="image-match-headline text-xl font-semibold mb-4">Artist Palette</h2>
          <p className="image-match-dek">The palette at right shows the 100 most common colors for 
  the artist, according to an analysis of <b>3</b> visual assets. 
  Hover over each to get RGB and hex values.</p>
        </div>
        <ArtistPalette colorData={data}/>
        <div>
        </div>

      </div>
      <h2 className="image-match-headline text-xl font-semibold mb-4 pt-8">Image Match</h2>
          <ImageMatches imagesData={imagesData}/>
    </div>
  );
};

export default ImageMatch;