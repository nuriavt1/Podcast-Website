import React, { useState } from "react";
import styles from './style/searcher.module.css';

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


function Searcher({ setPodcasts, selectedCategory, setSelectedCategory, selectedCountry, setSelectedCountry }) {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);


  const categories = ['show', 'audiobook'];
  const countries = ['ES', 'CA', 'US', 'GB', 'DE', 'FR', 'MX'];


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const handleSearchSubmit = async (e) => {
    e.preventDefault();


    // Verificamos si hay algo en el campo de búsqueda
    if (!search.trim()) {
      alert('Please enter a search term');
      return;
    }


    try {
      const token = await getToken();


      // Construir la URL con los filtros seleccionados
      let url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=show&limit=10`;
      if (selectedCountry) {
        url += `&market=${selectedCountry}`; // Aplicar el filtro de país
      }
      if (selectedCategory) {
        url += `&category=${selectedCategory}`; // Aplicar el filtro de categoría
      }


      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const data = await response.json();


      // Actualizamos los podcasts con los resultados de la búsqueda
      setPodcasts(data.shows.items || []);
    } catch (err) {
      setError("Error al obtener los podcasts: " + err.message);
    }
  };


  return (
    <section className={styles.searcher}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search podcasts..."
        />
       
        {/* Filtro de categoría */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>


        {/* Filtro de país */}
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>


        <button className="Searcher-button" type="submit">Search</button>
      </form>


      {error && <p>{error}</p>}
    </section>
  );
}


export default Searcher;
