import React, { useEffect, useRef } from 'react';

// Componente para mostrar un episodio individual
function EpisodeCard({
  id,
  name,
  description,
  duration_ms,
  release_date,
  audio_preview_url,
  isPlaying,
  onPlayPauseToggle,
}) {
  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="episode-item">
      <h2>{name}</h2>
      <p>{description || 'No description available'}</p>
      <p>Duration: {formatDuration(duration_ms)}</p>
      <p>Release date: {formatDate(release_date)}</p>

      {/* Botón de Play/Pause */}
      <button onClick={() => onPlayPauseToggle(audio_preview_url)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default EpisodeCard;