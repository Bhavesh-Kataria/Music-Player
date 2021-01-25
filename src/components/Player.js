import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
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
        <h2>{getTime(songInfo.duration)}</h2>
      </div>
      <div className="play-controls">
        <FontAwesomeIcon className="backward" size="2x" icon={faBackward} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon className="forward" size="2x" icon={faForward} />
      </div>
    </div>
  );
};

export default Player;
