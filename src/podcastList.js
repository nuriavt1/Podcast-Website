import React, { useState, useEffect } from "react";
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

function PodcastList({ podcasts, selectedCountry, selectedCategory }) {
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(
    JSON.parse(localStorage.getItem("selectedCategories")) || []
  );

  // UseEffect para escuchar cambios en localStorage y actualizar el estado de selectedCategories
  useEffect(() => {
    const handleStorageChange = () => {
      // Actualizamos el estado cuando localStorage cambia
      setSelectedCategories(JSON.parse(localStorage.getItem("selectedCategories")) || []);
    };

    // Añadimos el listener para cambios en localStorage
    window.addEventListener("storage", handleStorageChange);

    // Limpiamos el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Solo lo hacemos una vez al montar el componente

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!podcasts || podcasts.length === 0) {
    return <p>No podcasts found.</p>;
  }

  return (
    <section>
      <h2>Podcasts by category</h2>
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
    </section>
  );
}

export default PodcastList;
