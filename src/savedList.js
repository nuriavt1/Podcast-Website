import React, { useState, useEffect } from 'react';
import { useSavedPodcasts } from './Context';  // Importar el hook del contexto
import Card from './card';

function SavedList() {
  const client_id = 'd21f9fa9e9834547a686c4595b539595';
  const client_secret = '224cbbce3d5943cba4229f4d40b172ad';

  const { savedPodcasts } = useSavedPodcasts();  // Obtener los IDs de los podcasts desde el contexto
  const [podcastDetails, setPodcastDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el token de Spotify
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

  // Obtener detalles de los podcasts desde la API
  async function fetchPodcasts() {
    try {
      setLoading(true);
      setError(null);

      // Si no hay podcasts guardados, mostrar mensaje
      if (savedPodcasts.length === 0) {
        setPodcastDetails([]);
        setLoading(false);
        return;
      }

      const token = await getToken();
      const response = await fetch(
        `https://api.spotify.com/v1/shows?ids=${savedPodcasts.join(',')}`,  // Usamos los IDs del contexto
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener los detalles de los podcasts');
      }

      const data = await response.json();
      setPodcastDetails(data.shows);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  // Ejecutar fetchPodcasts al montar el componente
  useEffect(() => {
    fetchPodcasts();
  }, [savedPodcasts]);  // Dependemos de savedPodcasts para actualizar los detalles al cambiar

  // Renderizar el componente
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (podcastDetails.length === 0) return <p>No hay podcasts guardados.</p>;

  return (
    <section>
      <ul>
        {podcastDetails.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.images[0]?.url} // Verificamos que haya una imagen
            publisher={item.publisher}
          />
        ))}
      </ul>
    </section>
  );
}

export default SavedList;
