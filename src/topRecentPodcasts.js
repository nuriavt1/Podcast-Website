import React, { useState, useEffect } from 'react';
import Card from "./card";

// Función para obtener el token de acceso de Spotify
async function getToken() {
  const client_id = "d21f9fa9e9834547a686c4595b539595";
  const client_secret = "224cbbce3d5943cba4229f4d40b172ad";
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el token");
  }

  const data = await response.json();
  return data.access_token;
}

function TopRecentPodcasts() {
  const [topPodcasts, setTopPodcasts] = useState([]);  // Estado para los podcasts del scraper
  const [podcasts, setPodcasts] = useState([]);         // Estado para los podcasts obtenidos de Spotify
  const [error, setError] = useState(null);             // Estado para manejar errores

  // Obtener los podcasts del servidor local (solo se ejecuta una vez)
  useEffect(() => {
    const fetchScraperNames = async () => {
      try {
        const response = await fetch('http://localhost:3001/top-podcasts');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTopPodcasts(data);  // Guardar la lista de podcasts/categorías
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };

    fetchScraperNames();
  }, []);  // Se ejecuta solo una vez cuando el componente se monta

  // Obtener los podcasts desde Spotify (solo se ejecuta una vez después de obtener los topPodcasts)
  useEffect(() => {
    if (topPodcasts.length > 0) {
      const fetchPodcasts = async () => {
        try {
          const token = await getToken();
          const limitedPodcasts = topPodcasts.slice(0, 5); // Tomamos solo los primeros 5 elementos
          const allPodcasts = await Promise.all(
            limitedPodcasts.map(async (podcast) => {
              const encodedPodcast = encodeURIComponent(podcast);
  
              const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodedPodcast}&type=show&limit=1`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const data = await response.json();
              
              if (data.shows && data.shows.items) {
                return data.shows.items; // Extraemos los podcasts encontrados
              } else {
                return []; // Si no hay resultados, retornamos un array vacío
              }
            })
          );
          setPodcasts(allPodcasts.flat()); // Aplanamos los resultados y los guardamos en el estado
        } catch (err) {
          setError(err.message); // Capturamos errores y los mostramos
        }
      };
  
      fetchPodcasts();
    }
  }, [topPodcasts]);
   // Este efecto depende de la lista de topPodcasts, pero no se vuelve a ejecutar

  // Si hay errores, los mostramos
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>Top Podcasts</h2>
      {podcasts.length === 0 ? (
        <p>Loading podcasts...</p>  // Mensaje mientras se cargan los podcasts
      ) : (
        <ul>
          {podcasts.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.images[0]?.url}  // Aseguramos que haya imagen
              publisher={item.publisher}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TopRecentPodcasts;
