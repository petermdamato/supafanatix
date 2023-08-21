import React from 'react';
import './ArtistProfile.css'

const ArtistProfile = ({ selectedArtist }) => {
  return (
    <div className="artist-profile">
      {selectedArtist ? (
        <div>
          <h2>{selectedArtist}</h2>
          {/* Add other artist profile information here */}
        </div>
      ) : (
        <p>No artist selected.</p>
      )}
    </div>
  );
};

export default ArtistProfile;
