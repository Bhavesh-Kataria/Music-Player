import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({
  songs,
  changeCurrentSong,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  setSongs,
}) => {
  //useEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
  //event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      currentSong.active = false;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      currentSong.active = true;
      setIsPlaying(true);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipForward = () => {
    let nextId = 0;
    songs.forEach((item, index) => {
      if (item.id === currentSong.id && index === songs.length - 1) {
        nextId = songs[0].id;
        return;
      } else if (item.id === currentSong.id && index !== songs.length - 1) {
        nextId = songs[index + 1].id;
        return;
      }
    });
    currentSong.active = false;
    changeCurrentSong(songs.find((song) => song.id === nextId));
    currentSong.active = true;
    playAudio(isPlaying, audioRef);
  };

  const goBackward = () => {
    let prevId = 0;
    songs.forEach((item, index) => {
      if (item.id === currentSong.id && index === 0) {
        prevId = songs[songs.length - 1].id;
        return;
      } else if (item.id === currentSong.id && index !== 0) {
        prevId = songs[index - 1].id;
        return;
      }
    });
    currentSong.active = false;
    changeCurrentSong(songs.find((song) => song.id === prevId));
    currentSong.active = true;
    playAudio(isPlaying, audioRef);
  };

  return (
    <div className="player">
      <div className="time-control">
        <h2>{getTime(songInfo.currentTime)}</h2>
        <input
          className="slider"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <h2>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</h2>
      </div>
      <div className="play-controls">
        <FontAwesomeIcon
          onClick={goBackward}
          className="backward"
          size="2x"
          icon={faBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={skipForward}
          className="forward"
          size="2x"
          icon={faForward}
        />
      </div>
    </div>
  );
};

export default Player;
