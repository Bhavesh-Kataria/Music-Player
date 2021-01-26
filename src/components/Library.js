import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  changeCurrentSong,
  isPlaying,
  currentSong,
  audioRef,
  libraryStatus,
  setSongs,
}) => {
  return (
    <div className={`library ${libraryStatus ? "drawin" : ""}`}>
      <h1>Music Tracks</h1>
      {songs.map((song) => (
        <LibrarySong
          isPlaying={isPlaying}
          songs={songs}
          song={song}
          setSongs={setSongs}
          currentSong={currentSong}
          changeCurrentSong={changeCurrentSong}
          audioRef={audioRef}
          key={song.id}
        />
      ))}
    </div>
  );
};

export default Library;
