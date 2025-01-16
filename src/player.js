// Import necessary libraries and assets
import React, { useEffect, useRef } from 'react';
import NextIcon from './imatges/icons/NextIcon.svg'; // Icon for navigating to the next episode
import playIcon from './imatges/icons/playIcon.svg'; // Icon for play
import PrevIcon from './imatges/icons/PrevIcon.svg'; // Icon for navigating to the previous episode
import pauseIcon from './imatges/icons/pauseIcon.svg'; // Icon for pause
import styles from './style/player.module.css'; // CSS module for styling the player

// Define the Player component, which manages podcast playback and navigation
const Player = ({
  audioPreviewUrl, // URL of the audio file
  isPlaying, // Boolean indicating playback state
  onPlayPauseToggle, // Function to toggle play/pause
  onTimeUpdate, // Function to update playback time
  playNextEpisode, // Function to play the next episode
  playPreviousEpisode, // Function to play the previous episode
  episodeTitle, // Title of the current episode
  podcastTitle, // Title of the podcast
  episodeImage, // Image of the episode
  episodeDuration // Duration of the episode in milliseconds
}) => {
  // Reference to the audio element
  const audioRef = useRef(null);

  // Effect hook to handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play(); // Start playback if `isPlaying` is true
      } else {
        audioRef.current.pause(); // Pause playback if `isPlaying` is false
      }
    }
  }, [isPlaying]);

  // Handle time updates and call the provided `onTimeUpdate` function
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime);
    }
  };

  // Format time in mm:ss format for better readability
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Validate the episode duration to prevent invalid values
  const validDuration = episodeDuration && !isNaN(episodeDuration) ? episodeDuration / 1000 : 0;

  return (
    <div className={styles.player}>
      {/* Header containing episode image and details */}
      <div className="player-header">
        <img src={episodeImage} alt={episodeTitle} className="episode-image" />
        <div className="episode-info">
          <h3>{episodeTitle}</h3>
          <p>{podcastTitle}</p>
        </div>
      </div>

      {/* Audio element for playback */}
      <audio
        ref={audioRef}
        src={audioPreviewUrl}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Navigation controls for previous, play/pause, and next */}
      <div className={styles.episodeNavigation}>
        <div
          onClick={playPreviousEpisode}
          style={{ cursor: 'pointer' }}
          disabled={!audioPreviewUrl}>
          <img src={PrevIcon} alt="Previous Episode" className={styles.icon} />
        </div>
        <div className="play-pause" onClick={onPlayPauseToggle} style={{ cursor: 'pointer' }}>
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? 'Pause' : 'Play'}
            className={styles.icon}
          />
        </div>
        <div
          onClick={playNextEpisode}
          style={{ cursor: 'pointer' }}
          disabled={!audioPreviewUrl}>
          <img src={NextIcon} alt="Next Episode" className={styles.icon} />
        </div>
      </div>

      {/* Progress bar and time indicators */}
      <div className={styles.progressContainer}>
        <div className={styles.progressTime}>
          <span>{formatTime(audioRef.current ? audioRef.current.currentTime : 0)}</span>
          <span>{formatTime(validDuration)}</span>
        </div>
        <progress
          value={audioRef.current ? audioRef.current.currentTime : 0}
          max={audioRef.current ? audioRef.current.duration : 100}
        />
      </div>
    </div>
  );
};

export default Player;
