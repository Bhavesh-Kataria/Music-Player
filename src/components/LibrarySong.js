import React from "react";

const LibrarySong = ({
  songs,
  song,
  currentSong,
  changeCurrentSong,
  isPlaying,
  audioRef,
}) => {
  const makeCurrentSong = async () => {
    currentSong.active = false;
    song.active = true;
    changeCurrentSong(song);
    if (isPlaying) {
      const playPromise = await audioRef.current.play();
      if (playPromise !== undefined) {
        audioRef.current.play();
        song.active = true;
      }
    }
    audioRef.current.play();
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
