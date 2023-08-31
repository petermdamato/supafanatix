import React from 'react';
import './Overview.css'
import cloneDeep from 'lodash/cloneDeep';

const overviewDescriptors = ["higher number of colors","lower skew in color lightness","higher pink tone"]
const Overview = ({artist,labels,brandRankings,sonicSimilarities,visualSimilarities,differentiators}) => {
  
  return (
    <div className="overview-container flex justify-center">
      <div className="w-full py-6 pr-12 rounded-lg shadow-md">
        <h2 className="overview-headline text-xl font-semibold mb-4">THE VIBE</h2>
        <div className="mb-2 flex justify-between border-bottom-overview">
          <span className="overview-vibe-label font-semibold">Feels:</span>
          <span className="overview-vibe-descriptors">{labels[2]}</span>
        </div>
        <div className="mb-2 flex justify-between border-bottom-overview">
          <span className="overview-vibe-label font-semibold">Looks:</span>
          <span className="overview-vibe-descriptors">{labels[1]}</span>
        </div>
        <div className="mb-2 flex justify-between border-bottom-overview">
          <span className="overview-vibe-label font-semibold">Sounds:</span>
          <span className="overview-vibe-descriptors">{labels[0]}</span>
        </div>

    <h2 className="overview-headline text-xl font-semibold my-4">POTENTIAL COLLABORATIONS</h2>
    <div className="flex flex-col">
      <div className="flex-grow relative mt-4 h-32">
        <div className="w-1/4 h-32 rounded-tl-lg rounded-bl-lg overview-container-left absolute left-0 top-0">
          <div className="overview-headline-sub">Visually Similar
          </div>
          <div className="overview-headline-collaborators">{brandRankings.length>0?cloneDeep(brandRankings).sort((a,b)=>{
            return b.visual_rank - a.visual_rank
          })[0].brand.replace("_"," ").replace(/\b\w/g, match => match.toUpperCase()):''}
          </div>
                    <div className="overview-headline-collaborators">{brandRankings.length>0?cloneDeep(brandRankings).sort((a,b)=>{
            return b.visual_rank - a.visual_rank
          })[1].brand.replace("_"," ").replace(/\b\w/g, match => match.toUpperCase()):''}
          </div>
          </div>
        <div className="overview-container-right rounded-lg h-20 flex-grow h-32">{artist} and these brands share an association with {sonicSimilarities.join(", ")}</div>
      </div>
      <div className="flex-grow relative mt-4">
        <div className="w-1/4 h-32 rounded-tl-lg rounded-bl-lg overview-container-left absolute left-0 top-0">
        <div className="overview-headline-sub">Sonically Similar
          </div>
                    <div className="overview-headline-collaborators">{brandRankings.length>0?cloneDeep(brandRankings).sort((a,b)=>{
            return b.visual_rank - a.sonic_rank
          })[0].brand.replace("_"," ").replace(/\b\w/g, match => match.toUpperCase()):''}
          </div>
                    <div className="overview-headline-collaborators">{brandRankings.length>0?cloneDeep(brandRankings).sort((a,b)=>{
            return b.visual_rank - a.sonic_rank
          })[1].brand.replace("_"," ").replace(/\b\w/g, match => match.toUpperCase()):''}
          </div>
          </div>
        <div className="overview-container-right rounded-lg h-20 flex-grow h-32">{artist} and these brands share an association with {visualSimilarities.join(", ")}</div>
      </div>
    </div>

        <h2 className="overview-headline text-xl font-semibold my-4">BRAND DIFFERENTIATORS</h2>
        <div className="overview-differentiators-container rounded-lg">
          <h3 className="overview-headline-differentiators text-xl font-semibold my-4">TOP 3</h3>
          <ul className="overview-differentiators-container-list">
            {differentiators.map((entry,i)=>{
              return <li key={"overview-key-"+i}>{artist}'s {entry.category==="sonic" ? 'music has' : entry.category==="vibe" ? 'overall vibe has' : 'visual design has'} a {entry.direction} associations with {entry.category==="vibe" ? `a${(entry.descriptor[0]==='e'||entry.descriptor[0]==='o'||entry.descriptor[0]==='u'||entry.descriptor[0]==='a'||entry.descriptor[0]==='i')?'n':''} ${entry.descriptor} vibe` : entry.descriptor}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;