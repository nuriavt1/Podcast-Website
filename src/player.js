import React, { useEffect, useRef } from 'react';
import NextIcon from './imatges/icons/NextIcon.svg';
import playIcon from './imatges/icons/playIcon.svg';
import PrevIcon from './imatges/icons/PrevIcon.svg';
import pauseIcon from './imatges/icons/pauseIcon.svg';
import styles from './style/player.module.css';

const Player = ({
  audioPreviewUrl,
  isPlaying,
  onPlayPauseToggle,
  onTimeUpdate,
  playNextEpisode,
  playPreviousEpisode,
  episodeTitle,
  podcastTitle,
  episodeImage,
  episodeDuration
}) => {
  const audioRef = useRef(null);

  // Actualizar la barra de progreso mientras el audio esté sonando
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime); // Esto actualizará el tiempo constantemente
    }
  };

  // Formatear el tiempo en minutos:segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Validar si episodeDuration está presente y es un número válido
  const validDuration = episodeDuration && !isNaN(episodeDuration) ? episodeDuration / 1000 : 0;

  return (
    <div className={styles.player}>
      <div className="player-header">
        {/* Imagen del episodio */}
        <img src={episodeImage} alt={episodeTitle} className="episode-image" />

        <div className="episode-info">
          {/* Título del episodio */}
          <h3>{episodeTitle}</h3>
          {/* Título del podcast */}
          <p>{podcastTitle}</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioPreviewUrl}
        onTimeUpdate={handleTimeUpdate} // Esto actualiza el tiempo constantemente
      />

      {/* Imagenes de navegación (anterior y siguiente) */}
      <div className={styles.episodeNavigation}>
        <div
          onClick={playPreviousEpisode}
          style={{ cursor: 'pointer' }}
          disabled={!audioPreviewUrl}>
          <img src={PrevIcon} alt="Previous Episode" className={styles.icon} />
        </div>

        {/* Imagen de Play/Pause */}
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

      <div className={styles.progressContainer}>

      <div className={styles.progressTime}>
          {/* Mostrar el tiempo transcurrido */}
          <span>{formatTime(audioRef.current ? audioRef.current.currentTime : 0)}</span>
          {/* Mostrar la duración total del episodio */}
          <span>{formatTime(validDuration)}</span>
        </div>

        {/* Barra de progreso */}
        <progress
          value={audioRef.current ? audioRef.current.currentTime : 0}
          max={audioRef.current ? audioRef.current.duration : 100}
        />

        

      </div>
    </div>
  );
};

export default Player;
