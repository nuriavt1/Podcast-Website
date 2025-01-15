import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PodcastsCategories() {
  // Leer las categorías seleccionadas desde el localStorage
  const storedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];

  // Estado para controlar las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState(storedCategories);

  // Función para manejar el toggle de selección de categorías
  const handleCategoryToggle = (category) => {
    let updatedCategories;

    // Si la categoría ya está seleccionada, la deseleccionamos
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter(item => item !== category);
    } else {
      // Si la categoría no está seleccionada, la añadimos
      updatedCategories = [...selectedCategories, category];
    }

    // Actualizamos el estado y guardamos la nueva lista en localStorage
    setSelectedCategories(updatedCategories);
    localStorage.setItem('selectedCategories', JSON.stringify(updatedCategories));
  };

  return (
    <section>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Comedy') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Comedy')}
        >
          Comedy
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Mystery') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Mystery')}
        >
          Mystery
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Sport') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Sport')}
        >
          Sport
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Science & Tech') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Science & Tech')}
        >
          Science & Tech
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('History') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('History')}
        >
          History
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Politics') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Politics')}
        >
          Politics
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Kids') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Kids')}
        >
          Kids
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Art & Culture') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Art & Culture')}
        >
          Art & Culture
        </h2>
      </div>
      <div>
        <h2
          style={{ cursor: 'pointer', color: selectedCategories.includes('Health') ? '#5700FF' : 'black' }}
          onClick={() => handleCategoryToggle('Health')}
        >
          Health
        </h2>
      </div>
    </section>
  );
}

export default PodcastsCategories;
