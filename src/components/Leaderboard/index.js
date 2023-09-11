import React, { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';
import './Leaderboard.css'

function Leaderboard({ rankings }) {
  rankings = rankings.sort((a,b)=>{
    return b.rank - a.rank
  })
  return (
    <div className="leaderboard">
      <h2 className="leaderboard-headline">Brand Matches</h2>
      <div className="leaderboard-inner">
      <FlipMove typeName="ul" className="brand-list">
        {rankings.map((ranking, index) => (
          <li key={ranking.brand} className={`brand-item ${ranking.rank<=10?'displayed':''}`}>
            {(ranking.brand==="kfc"?'KFC':ranking.brand==="ibm"?'IBM':ranking.brand==="spotify"?'Spotify':ranking.brand==="Walgreens"?"Walgreen's":ranking.brand==="whatsapp"?"WhatsApp":ranking.brand==="McDonalds"?"McDonald's":ranking.brand.split("_").map(entry=>entry.replace(/\b\w/g, char => char.toUpperCase())).join(" "))}
          </li>
        ))}
      </FlipMove>
      </div>
    </div>
  );
}
export default Leaderboard
