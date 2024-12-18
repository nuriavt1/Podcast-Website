import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para recibir el estado con las categorías seleccionadas
import Card from "./card";

const client_id = "d21f9fa9e9834547a686c4595b539595";
const client_secret = "224cbbce3d5943cba4229f4d40b172ad";

// Función para obtener el token de Spotify
async function getToken() {
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

function StartPodcasts() {
  const location = useLocation();
  const { selectedCategories = [] } = location.state || {}; // Recuperamos las categorías seleccionadas
  const [podcasts, setPodcasts] = useState([]); // Almacenamos todos los podcasts
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPodcastsByCategory(category) {
      try {
        const token = await getToken();
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            category
          )}&type=show`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error al obtener datos para la categoría: ${category}`);
        }

        const data = await response.json();
        return data.shows.items; // Retornamos los podcasts de la categoría
      } catch (err) {
        console.error(`Error al obtener podcasts de ${category}:`, err);
        return []; // Retornamos un array vacío en caso de error
      }
    }

    async function fetchAllPodcasts() {
      try {
        const allPodcasts = await Promise.all(
          selectedCategories.map((category) => fetchPodcastsByCategory(category))
        );

        if (isMounted) {
          // Combinamos los resultados de todas las categorías
          setPodcasts(allPodcasts.flat()); // `flat` aplana el array de arrays
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    }

    fetchAllPodcasts();

    return () => {
      isMounted = false; // Limpieza para evitar actualizaciones después del desmontaje
    };
  }, [selectedCategories]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h2>Podcasts by Category</h2>
      {podcasts.length === 0 ? (
        <p>Loading podcasts...</p>
      ) : (
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
      )}
    </section>
  );
}

export default StartPodcasts;
