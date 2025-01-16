import React, { useEffect, useRef } from 'react';
import styles from './style/episodeCard.module.css';
import playBlackIcon from './imatges/icons/playBlackIcon.svg';
import pauseBlackIcon from './imatges/icons/pauseBlackIcon.svg';

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
<div className={styles.episodeCard}>
  <h2>{name}</h2>
  <p>{description || 'No description available'}</p>
  <div>
    <p>{formatDuration(duration_ms) + ' min - ' + formatDate(release_date)} </p>
    {/* Contenedor de las imágenes de Play/Pause */}
    <div onClick={() => onPlayPauseToggle(audio_preview_url)} style={{ cursor: 'pointer' }}>
      <img 
        src={isPlaying ? pauseBlackIcon : playBlackIcon}
        alt={isPlaying ? 'Pausa' : 'Reproducir'}
        style={{ width: '32px', height: '32px' }} // Ajusta el tamaño de la imagen
      />
    </div>
  </div>
</div>

  );
}

export default EpisodeCard;