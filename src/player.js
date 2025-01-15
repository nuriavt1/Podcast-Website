import React, { useEffect, useRef } from 'react';
import NextIcon from './imatges/icons/NextIcon.svg';
import playIcon from './imatges/icons/playIcon.svg';
import PrevIcon from './imatges/icons/PrevIcon.svg';
import pauseIcon from './imatges/icons/pauseIcon.svg';

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
      onTimeUpdate(audioRef.current.currentTime); // Esto actualizará el tiempo cada vez que se actualice
    }
  };

  // Formatear el tiempo en minutos:segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="global-player fixed-player">
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
      
      {/* Botón Play/Pause con icono */}
      <button className="play-pause-button" onClick={onPlayPauseToggle}>
        {isPlaying ? (
          <img src={pauseIcon} alt="Pause" />
        ) : (
          <img src={playIcon} alt="Play" />
        )}
      </button>

      <div className="progress-container">
        {/* Barra de progreso */}
        <progress
          value={audioRef.current ? audioRef.current.currentTime : 0}
          max={audioRef.current ? audioRef.current.duration : 100}
        />

        <div className="progress-time">
          {/* Mostrar el tiempo transcurrido */}
          <span>{formatTime(audioRef.current ? audioRef.current.currentTime : 0)}</span> 
          {/* Mostrar la duración total del episodio */}
          <span>{formatTime(episodeDuration / 1000)}</span> 
        </div>
      </div>

      {/* Botones de navegación con iconos */}
      <div className="episode-navigation">
        <button onClick={playPreviousEpisode} disabled={!audioPreviewUrl}>
          <img src={PrevIcon} alt="Previous Episode" />
        </button>
        <button onClick={playNextEpisode} disabled={!audioPreviewUrl}>
          <img src={NextIcon} alt="Next Episode" />
        </button>
      </div>
    </div>
  );
};

export default Player;
