import React from "react";
import { playAudio } from "../util";
const LibrarySong = ({
  songs,
  song,
  currentSong,
  changeCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
}) => {
  const makeCurrentSong = () => {
    changeCurrentSong(song);
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={makeCurrentSong}
      className={`library-song ${song.active ? "selected" : ""} `}
    >
      <img src={song.cover} alt="Song In Library" />
      <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
      </div>
    </div>
  );
};

export default LibrarySong;
