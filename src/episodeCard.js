import React, { useEffect, useRef } from 'react';
import styles from './style/episodeCard.module.css';
import playBlackIcon from './imatges/icons/playBlackIcon.svg';
import pauseBlackIcon from './imatges/icons/pauseBlackIcon.svg';

// Component to display an individual podcast episode
function EpisodeCard({
  id,
  name,
  description,
  duration_ms,
  release_date,
  audio_preview_url, // URL for the audio preview
  isPlaying, // Boolean indicating if the episode is currently playing
  onPlayPauseToggle,  // Function to toggle play/pause state

}) {

  // Function to format the duration of the episode from milliseconds to mm:ss format
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000); // Calculate minutes
    const seconds = ((durationMs % 60000) / 1000).toFixed(0); // Calculate seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format duration string
  };

  // Function to format the release date into a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert date string to a Date object
    return date.toLocaleDateString(); // Return formatted date as a string
  };

  return (
<div className={styles.episodeCard}>
  {/* Display the episode name */}
  <h2>{name}</h2>

   {/* Display the episode description or a default message */}
  <p>{description || 'No description available'}</p>
  <div>
    {/* Display the episode duration in mm:ss format */} {/* Display the release date of the episode */}
    <p>{formatDuration(duration_ms) + ' min - ' + formatDate(release_date)} </p>
    {/* Container with imatges of Play/Pause */}
    <div onClick={() => onPlayPauseToggle(audio_preview_url)} style={{ cursor: 'pointer' }}>
      <img 
        src={isPlaying ? pauseBlackIcon : playBlackIcon}
        alt={isPlaying ? 'Pausa' : 'Reproducir'}
        style={{ width: '32px', height: '32px' }} 
        /* Change container based on isPlaying state */
      />
    </div>
  </div>
</div>

  );
}

export default EpisodeCard;