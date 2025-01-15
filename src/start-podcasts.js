import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Para recibir el estado con las categorías seleccionadas
import Searcher from './searcher';
import PodcastList from './podcastList';
import PodcastsCategories from './podcastsCategories';
import TopRecentPodcasts from './topRecentPodcasts';

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

function StartPodcasts() {
  const location = useLocation();
  const { selectedCategories = [] } = location.state || {}; // Asegúrate de que sea un array vacío si no hay datos
  const [podcasts, setPodcasts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);

  // Llamar a la API para obtener los podcasts por defecto cuando la página se carga
  useEffect(() => {
    if (selectedCategories.length > 0) {
      const fetchPodcasts = async () => {
        try {
          const token = await getToken();
          const allPodcasts = await Promise.all(
            selectedCategories.map(async (category) => {
              const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(category)}&type=show&limit=10`, // Búsqueda por categoría
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

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <Searcher
        setPodcasts={setPodcasts} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry} 
      />
      <PodcastsCategories />
      <TopRecentPodcasts />
      <PodcastList 
        podcasts={podcasts} 
        selectedCountry={selectedCountry} 
        selectedCategory={selectedCategory} 
      />
    </section>
  );
}

export default StartPodcasts;
