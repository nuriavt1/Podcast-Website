import React, { useEffect, useRef } from 'react';

const Player = ({ audioPreviewUrl, isPlaying, onPlayPauseToggle, onTimeUpdate, playNextEpisode, playPreviousEpisode }) => {
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

  return (
    <div className="global-player fixed-player">
      <audio
        ref={audioRef}
        src={audioPreviewUrl}
        onTimeUpdate={handleTimeUpdate} // Esto actualiza el tiempo constantemente
      />
      <button onClick={onPlayPauseToggle}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <div>
        <progress
          value={audioRef.current ? audioRef.current.currentTime : 0}
          max={audioRef.current ? audioRef.current.duration : 100}
        />
      </div>

      {/* Botones de navegación dentro del reproductor */}
      <div className="episode-navigation">
        <button onClick={playPreviousEpisode} disabled={!audioPreviewUrl}>
          Previous Episode
        </button>
        <button onClick={playNextEpisode} disabled={!audioPreviewUrl}>
          Next Episode
        </button>
      </div>
    </div>
  );
};

export default Player;