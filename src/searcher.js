import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate

function Searcher() {
  // Estado para los filtros
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Opciones para los filtros (esto puede ser dinámico desde una API)
  const categories = [
'show', 'audiobook'
  ];

  const countries = ['ES', 'CA', 'US', 'GB', 'DE', 'FR', 'MX']; // Ejemplo de países

  // Crear una instancia del hook useNavigate
  const navigate = useNavigate();

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Función para manejar el cambio de género
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Función para manejar el cambio de país
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Navegar a la página de podcasts con los filtros aplicados
    navigate("/podcasts", { state: { search, selectedGenre, selectedCountry } });

    // Aquí puedes agregar la lógica para realizar la búsqueda
    console.log("Searching for:", search, "Categories:", selectedGenre, "Country:", selectedCountry);
  };

  return (
    <section>
      <form onSubmit={handleSearchSubmit}>
        {/* Campo de texto o Buscador */}
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search podcasts..."
        />

        {/* Filtro por género */}
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Filtro por país */}
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {/* Botón para enviar el formulario */}
        <button type="submit">Filter</button>
      </form>
    </section>
  );
}

export default Searcher;

