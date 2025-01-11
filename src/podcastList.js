import React, { useState, useEffect } from "react";
// Asegúrate de importar Card desde el archivo correspondiente
import Card from "./card"; // Asegúrate de que la ruta del archivo sea correcta

// Función para obtener el token de Spotify
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

function PodcastList({ selectedCategories = [] }) { // Valor predeterminado de [] para selectedCategories
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const fetchPodcasts = async () => {
        try {
          const token = await getToken();
          const allPodcasts = await Promise.all(
            selectedCategories.map(async (category) => {
              const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                  category
                )}&type=show`, // Búsqueda por categoría
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const data = await response.json();
              return data.shows.items; // Retornamos los podcasts de la categoría
            })
          );
          setPodcasts(allPodcasts.flat()); // Combinamos los resultados de todas las categorías
        } catch (err) {
          setError(err.message);
        }
      };

      fetchPodcasts();
    }
  }, [selectedCategories]); // Dependemos de las categorías seleccionadas

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
              id={item.id}
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

export default PodcastList;