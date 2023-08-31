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
            {ranking.brand}
          </li>
        ))}
      </FlipMove>
      </div>
    </div>
  );
}
export default Leaderboard
