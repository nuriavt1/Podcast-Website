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

function PodcastList() {
  const location = useLocation();
  const { search, selectedGenre, selectedCountry } = location.state || {}; // Recuperamos los valores del estado
  const [podcasts, setPodcasts] = useState([]); // Almacenamos todos los podcasts
  const [error, setError] = useState(null);

  // Función para buscar podcasts con parámetros
  async function fetchPodcasts(searchQuery, genre, country) {
    try {
      const token = await getToken();

      // Asignamos valores por defecto si no se pasa género o país
      const genreToUse = genre || 'show'; // Si no hay genre, usamos 'show' como predeterminado
      const countryToUse = country || 'ES'; // Si no hay país, usamos 'ES' como predeterminado

      // Construir la query de búsqueda de forma dinámica
      const queryParts = [];
      if (searchQuery) queryParts.push(`q=${encodeURIComponent(searchQuery)}`);
      if (genreToUse) queryParts.push(`type=${encodeURIComponent(genreToUse)}`);
      if (countryToUse) queryParts.push(`market=${countryToUse}`);  // Corrección aquí

      const queryString = queryParts.join("&"); // Unir los parámetros correctamente

      console.log(await fetch(`https://api.spotify.com/v1/search?${queryString}`));

      const response = await fetch(`https://api.spotify.com/v1/search?${queryString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los podcasts");
      }

      const data = await response.json();
      return data.shows.items; // Retornamos los podcasts encontrados
    } catch (err) {
      console.error("Error al obtener podcasts:", err);
      return []; // Retornamos un array vacío en caso de error
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchAllPodcasts() {
      try {
        const podcasts = await fetchPodcasts(search, selectedGenre, selectedCountry);
        if (isMounted) {
          setPodcasts(podcasts); // Establecemos los podcasts obtenidos
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    }

    if (selectedGenre || search || selectedCountry) {
      fetchAllPodcasts(); // Realizamos la búsqueda solo si hay algún filtro
    }

    return () => {
      isMounted = false; // Limpieza para evitar actualizaciones después del desmontaje
    };
  }, [search, selectedGenre, selectedCountry]); // Dependencias de los filtros

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
