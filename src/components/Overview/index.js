import React, { useState, useEffect } from 'react';
import './Overview.css'

const overviewDescriptors = ["higher number of colors","lower skew in color lightness","higher pink tone"]
const Overview = ({artist}) => {

  return (
    <div className="overview-container flex justify-center">
      <div className="w-full py-6 pr-12 rounded-lg shadow-md">
        <h2 className="overview-headline text-xl font-semibold mb-4">THE VIBE</h2>
        <div className="mb-2 flex justify-between border-bottom-overview">
          <span className="overview-vibe-label font-semibold">Feels:</span>
          <span className="overview-vibe-descriptors">Happy, Energetic, Inspiring</span>
        </div>
        <div className="mb-2 flex justify-between border-bottom-overview">
          <span className="overview-vibe-label font-semibold">Looks:</span>
          <span className="overview-vibe-descriptors">bold typography, emphasis on crisp edges, warm tones</span>
        </div>
        <div className="mb-2 flex justify-between border-bottom-overview">
          <span className="overview-vibe-label font-semibold">Sounds:</span>
          <span className="overview-vibe-descriptors">danceable, lively, major key</span>
        </div>

    <h2 className="overview-headline text-xl font-semibold my-4">POTENTIAL COLLABORATIONS</h2>
    <div className="flex flex-col">
      <div className="flex-grow relative mt-4 h-32">
        <div className="w-1/4 h-32 rounded-tl-lg rounded-bl-lg overview-container-left absolute left-0 top-0">
          <div className="overview-headline-sub">Visually Similar
          </div>
          <div className="overview-headline-collaborators">Mucinex
          </div>
                    <div className="overview-headline-collaborators">Guinness
          </div>
          </div>
        <div className="overview-container-right rounded-lg h-20 flex-grow h-32">{artist} and these brands share a higher level of reliance on specific hues, higher usage of dark tones, and higher level of brightness</div>
      </div>
      <div className="flex-grow relative mt-4">
        <div className="w-1/4 h-32 rounded-tl-lg rounded-bl-lg overview-container-left absolute left-0 top-0">
        <div className="overview-headline-sub">Sonically Similar
          </div>
                    <div className="overview-headline-collaborators">Nike
          </div>
                    <div className="overview-headline-collaborators">Guinness
          </div>
          </div>
        <div className="overview-container-right rounded-lg h-20 flex-grow h-32">{artist} and these brands share a higher pop character, higher upbeat character, and lower dark character</div>
      </div>
    </div>

        <h2 className="overview-headline text-xl font-semibold my-4">BRAND DIFFERENTIATORS</h2>
        <div className="overview-differentiators-container rounded-lg">
          <h3 className="overview-headline-differentiators text-xl font-semibold my-4">TOP 3</h3>
          <ul className="overview-differentiators-container-list">
            {overviewDescriptors.map((entry,i)=>{
              return <li key={"overview-key-"+i}>{artist}'s have a {entry} </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;