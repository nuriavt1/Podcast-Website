import React, { useState, useEffect } from 'react';
import EpisodeCard from './episodeCard';
import Player from './player';
import styles from './style/episodeList.module.css';

// Spotify API client credentials
const client_id = 'd21f9fa9e9834547a686c4595b539595';
const client_secret = '224cbbce3d5943cba4229f4d40b172ad';

// Function to fetch the Spotify API token for authentication
async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'client_credentials', // Requesting access via client credentials

    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`, // Base64 encode client_id and client_secret

    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el token'); // Error if token fetch fails

  }

  const data = await response.json();
  return data.access_token; // Return the access token for API calls

}

// Function to save playback progress in localStorage
const saveProgress = (episodeId, currentTime) => {
  const savedProgress = JSON.parse(localStorage.getItem('audioProgress')) || {};
  savedProgress[episodeId] = currentTime; // Store the progress for the episode
  localStorage.setItem('audioProgress', JSON.stringify(savedProgress)); // Save to localStorage

};

// Function to retrieve saved progress from localStorage
const getProgress = (episodeId) => {
  const savedProgress = JSON.parse(localStorage.getItem('audioProgress')) || {};
  return savedProgress[episodeId] || 0; // Return the saved progress or 0 if none found

};

function EpisodesList({ id }) {
  const [episodes, setEpisodes] = useState([]); // State to store the list of episodes

  const [error, setError] = useState(null); // State to manage errors during fetch


  // States for the audio player and playback
  const [isPlaying, setIsPlaying] = useState(false); // Whether the episode is playing

  const [currentAudioUrl, setCurrentAudioUrl] = useState(null); // URL of the current playing episode
  const [currentTime, setCurrentTime] = useState(0); // Mantener el tiempo actual
  const [currentIndex, setCurrentIndex] = useState(null); // Index of the current episode



  useEffect(() => {
    if (!id) {
      setError('No se proporcionó el ID del podcast'); // Handle missing podcast ID

      return;
    }

    let isMounted = true;

    async function fetchPodcasts() {
      try {
        const token = await getToken(); // Fetch the token for Spotify API access
        const response = await fetch(`https://api.spotify.com/v1/shows/${id}/episodes`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request header
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API de Spotify'); // Handle API fetch error

        }

        const data = await response.json();
        if (isMounted) {
          setEpisodes(data.items); // Set the list of episodes if the component is still mounted

        }
      } catch (err) {
        if (isMounted) {
          setError(err.message); // Set error message if fetch fails
        }
      }
    }

    fetchPodcasts(); // Fetch the podcast episodes when the component is mounted


    return () => {
      isMounted = false; // Clean up to avoid setting state on an unmounted component

    };
  }, [id]); // Dependency on `id`, refetch when the ID changes


  // Handle play/pause toggle
  const handlePlayPauseToggle = (audioUrl, index) => {
    if (audioUrl === currentAudioUrl) {

      setIsPlaying(!isPlaying);// Toggle play/pause if the same episode is clicked
    } else {

      setCurrentAudioUrl(audioUrl); // Play new episode
      setIsPlaying(true); // Set the player to playing
      setCurrentIndex(index); // Update the current episode index
      const progress = getProgress(episodes[index].id); // Retrieve saved progress for the new episode
      setCurrentTime(progress); // Set the current playback time

    }
  };
  // Update current playback time during the episode
  const handleTimeUpdate = (currentTime) => {
    setCurrentTime(currentTime); // Update the playback time
    if (currentIndex !== null && episodes[currentIndex]) {
      saveProgress(episodes[currentIndex].id, currentTime);
      // Save the progress for the current episode

    }
  };

  // Play the next episode in the list
  const playNextEpisode = () => {
    if (currentIndex !== null && currentIndex < episodes.length - 1) {
      const nextEpisode = episodes[currentIndex + 1];
      setCurrentAudioUrl(nextEpisode.audio_preview_url);
      setIsPlaying(true); // Play the next episode
      setCurrentIndex(currentIndex + 1); // Update the current index
      setCurrentTime(getProgress(nextEpisode.id)); // Load saved progress for the next episode
    }
  };

  // Play the previous episode in the list
  const playPreviousEpisode = () => {
    if (currentIndex !== null && currentIndex > 0) {
      const previousEpisode = episodes[currentIndex - 1];
      setCurrentAudioUrl(previousEpisode.audio_preview_url); // Set the previous episode URL
      setIsPlaying(true);  // Play the previous episode
      setCurrentIndex(currentIndex - 1);  // Update the current index
      setCurrentTime(getProgress(previousEpisode.id));  // Load saved progress for the previous episode

    }
  };

  // Error handling if the API fetch fails
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Display message if no episodes are available
  if (episodes.length === 0) {
    return <p>No episodes available yet.</p>;
  }


  return (
    <section className={styles.episodeList}>
      <h2 className={styles.episodesTitle}>All Episodes</h2>
      <ul>
        {/* Filter out invalid episodes and map over valid episodes to render */}
        {episodes
          .filter((item) => item && item.id) // Ensure each episode has a valid ID
          .map((item, index) => (
            <EpisodeCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              duration_ms={item.duration_ms}
              release_date={item.release_date}
              audio_preview_url={item.audio_preview_url} // Sync play/pause state
              isPlaying={isPlaying && currentAudioUrl === item.audio_preview_url}
              onPlayPauseToggle={() => handlePlayPauseToggle(item.audio_preview_url, index)} // Pass index to toggle play/pause

            />
          ))}
      </ul>

      {/* Display the player if there's an audio URL to play */}
      {currentAudioUrl && (
        <Player
          audioPreviewUrl={currentAudioUrl}
          isPlaying={isPlaying}
          onPlayPauseToggle={() => setIsPlaying(!isPlaying)} // Toggle play/pause in the global player

          onTimeUpdate={handleTimeUpdate} // Update the playback time

          playNextEpisode={playNextEpisode} // Function to play next episode

          playPreviousEpisode={playPreviousEpisode} // Function to play previous episode

        />
      )}
    </section>
  );
}

export default EpisodesList;
