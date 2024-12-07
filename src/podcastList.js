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


function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones de estado si el componente se desmonta


    async function fetchPodcasts() {
      try {
        const token = await getToken();
        const response = await fetch('https://api.spotify.com/v1/search?q=comedy&type=show', {
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
          setPodcasts(data.shows.items); // Accedemos al array de resultados de shows
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
  }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente


  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <section>
      <h2>All Podcasts</h2>
      <ul>
        {podcasts.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            image={item.images[0]?.url} // Verificamos que haya una imagen
            publisher={item.publisher}
          />
        ))}
      </ul>
    </section>
  );
}


export default PodcastList;
