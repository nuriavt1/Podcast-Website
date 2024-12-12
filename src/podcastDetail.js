import React, { useState, useEffect } from 'react';

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

function PodcastDetail({ id }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones de estado si el componente se desmonta

    async function fetchDetails() {
      try {
        const token = await getToken();
        const response = await fetch(`https://api.spotify.com/v1/shows/${id}`, {
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
          setDetails(data); // Aquí estamos guardando los datos completos del show
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
        console.error('Error al obtener datos de podcasts:', err);
      }
    }

    fetchDetails();

    return () => {
      isMounted = false; // Limpieza para evitar actualizaciones de estado tras el desmontaje
    };
  }, [id]); // Añadimos 'id' en el array de dependencias para recargar si el id cambia

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!details) {
    return <p>Cargando...</p>; // Mostrar cargando mientras no hay datos
  }

  return (
    <section>
      <h2>{details.name}</h2>
      <img src={details.images[0].url} alt={details.name} />
      <h3>{details.description}</h3>
      <h4>{details.publisher}</h4>
    </section>
  );
}

export default PodcastDetail;
