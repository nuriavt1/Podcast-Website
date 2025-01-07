import React, { useState, useEffect } from 'react';
import EpisodeCard from './episodeCard';

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

function EpisodesList({ id }) {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);

  // Asegúrate de que el `podcastId` es válido antes de realizar la solicitud
  useEffect(() => {
    if (!id) {
      setError('No se proporcionó el ID del podcast');
      return;
    }

    let isMounted = true; // Para evitar actualizaciones de estado si el componente se desmonta

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
          setEpisodes(data.items); // Accedemos al array de resultados de shows
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
        console.error('Error al obtener datos de podcasts:', err);
      }
    }

    fetchPodcasts();

    return () => {
      isMounted = false; // Limpieza para evitar actualizaciones de estado tras el desmontaje
    };
  }, [id]); // Dependemos del `podcastId`, para que se ejecute cada vez que cambie

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>All Episodes</h2>
      <ul>
        {episodes.map((item) => (
          <EpisodeCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            duration_ms={item.duration_ms}
            release_date={item.release_date}
          />
        ))}
      </ul>
    </section>
  );
}

export default EpisodesList;
