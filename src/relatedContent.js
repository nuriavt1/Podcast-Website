import React, { useState, useEffect } from 'react';
import Card from './card';

const client_id = 'd21f9fa9e9834547a686c4595b539595';
const client_secret = '224cbbce3d5943cba4229f4d40b172ad';

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

function RelatedContent({ podcastName }) {
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRelatedPodcasts() {
      try {
        const token = await getToken();
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(podcastName)}&type=show&limit=6`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error al obtener los podcasts relacionados');
        }

        const data = await response.json();
        if (isMounted) {
          setRelatedPodcasts(data.shows.items); // Almacenamos los podcasts relacionados
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
        console.error('Error al obtener los podcasts relacionados:', err);
      }
    }

    if (podcastName) {
      fetchRelatedPodcasts();
    }

    return () => {
      isMounted = false;
    };
  }, [podcastName]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h3>Related Podcasts</h3>
      {relatedPodcasts.length === 0 ? (
        <p>No related podcasts found.</p>
      ) : (
        <ul>
          {relatedPodcasts
            .filter((podcast) => podcast.name !== podcastName) // Excluye el podcast con el mismo nombre
            .map((podcast) => (
              <Card
                key={podcast.id}
                id={podcast.id}
                name={podcast.name}
                image={podcast.images[0]?.url}
                publisher={podcast.publisher}
              />
            ))}
        </ul>
      )}
    </section>
  );
}

export default RelatedContent;
