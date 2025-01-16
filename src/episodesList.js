import React, { useState, useEffect } from 'react';
import EpisodeCard from './episodeCard';
import Player from './player';
import styles from './style/episodeList.module.css';

const client_id = 'd21f9fa9e9834547a686c4595b539595';
const client_secret = '224cbbce3d5943cba4229f4d40b172ad';

// Función para obtener el token de Spotify
async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el token');
  }

  const data = await response.json();
  return data.access_token;
}

// Función para guardar el progreso en localStorage
const saveProgress = (episodeId, currentTime) => {
  const savedProgress = JSON.parse(localStorage.getItem('audioProgress')) || {};
  savedProgress[episodeId] = currentTime;
  localStorage.setItem('audioProgress', JSON.stringify(savedProgress));
};

// Función para obtener el progreso desde localStorage
const getProgress = (episodeId) => {
  const savedProgress = JSON.parse(localStorage.getItem('audioProgress')) || {};
  return savedProgress[episodeId] || 0; // Devuelve 0 si no se encuentra progreso
};

function EpisodesList({ id }) {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  // Estado para el reproductor global
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // Mantener el tiempo actual
  const [currentIndex, setCurrentIndex] = useState(null); // Mantener el índice del episodio

  useEffect(() => {
    if (!id) {
      setError('No se proporcionó el ID del podcast');
      return;
    }

    let isMounted = true;

    async function fetchPodcasts() {
      try {
        const token = await getToken();
        const response = await fetch(`https://api.spotify.com/v1/shows/${id}/episodes`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API de Spotify');
        }

        const data = await response.json();
        if (isMounted) {
          setEpisodes(data.items);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    }

    fetchPodcasts();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handlePlayPauseToggle = (audioUrl, index) => {
    if (audioUrl === currentAudioUrl) {
      // Si el audio actual es el mismo, alternar entre play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Si el audio es diferente, reproducir el nuevo audio
      setCurrentAudioUrl(audioUrl);
      setIsPlaying(true);
      setCurrentIndex(index); // Establecer el índice del episodio
      const progress = getProgress(episodes[index].id);
      setCurrentTime(progress); // Recuperamos el progreso guardado para el episodio
    }
  };

  const handleTimeUpdate = (currentTime) => {
    setCurrentTime(currentTime); // Actualizamos el tiempo globalmente
    if (currentIndex !== null && episodes[currentIndex]) {
      saveProgress(episodes[currentIndex].id, currentTime); // Guardamos el progreso del episodio
    }
  };

  const playNextEpisode = () => {
    if (currentIndex !== null && currentIndex < episodes.length - 1) {
      const nextEpisode = episodes[currentIndex + 1];
      setCurrentAudioUrl(nextEpisode.audio_preview_url);
      setIsPlaying(true);
      setCurrentIndex(currentIndex + 1);
      setCurrentTime(getProgress(nextEpisode.id)); // Recuperamos el progreso del siguiente episodio
    }
  };

  const playPreviousEpisode = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const previousEpisode = episodes[currentIndex - 1];
      setCurrentAudioUrl(previousEpisode.audio_preview_url);
      setIsPlaying(true);
      setCurrentIndex(currentIndex - 1);
      setCurrentTime(getProgress(previousEpisode.id)); // Recuperamos el progreso del episodio anterior
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (episodes.length === 0) {
    return <p>No hay episodios disponibles aún.</p>;
  }

  return (
    <section className={styles.episodeList}>
      <h2 className={styles.episodesTitle}>All Episodes</h2>
      <ul>
        {episodes
          .filter((item) => item && item.id) // Filtrar episodios válidos
          .map((item, index) => (
            <EpisodeCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              duration_ms={item.duration_ms}
              release_date={item.release_date}
              audio_preview_url={item.audio_preview_url}
              isPlaying={isPlaying && currentAudioUrl === item.audio_preview_url} // Sincronizamos el play/pause
              onPlayPauseToggle={() => handlePlayPauseToggle(item.audio_preview_url, index)} // Pasamos el índice al reproducir
            />
          ))}
      </ul>
  
      {currentAudioUrl && (
        <Player
          audioPreviewUrl={currentAudioUrl}
          isPlaying={isPlaying}
          onPlayPauseToggle={() => setIsPlaying(!isPlaying)} // Reproducir/pausar en el reproductor global
          onTimeUpdate={handleTimeUpdate} // Actualizar el progreso
          playNextEpisode={playNextEpisode} // Función para el siguiente episodio
          playPreviousEpisode={playPreviousEpisode} // Función para el episodio anterior
        />
      )}
    </section>
  );
}

export default EpisodesList;
