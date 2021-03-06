import React from "react";

const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="Current Song Being Played" />
      <h1>{currentSong.name}</h1>
      <h2>By {currentSong.artist}</h2>
    </div>
  );
};

export default Song;
