import React, { useState } from "react";
import topicImg from "./topicImg.svg";
import arrowRight from "./arrowRight.svg";
import plusIcon from "./plusIcon.svg";
import checkIcon from "./checkIcon.svg";

const Categories = [
  "Comedy",
  "Mistery",
  "Sport",
  "Science & Tech",
  "Politics",
  "History",
  "Health",
  "Art & Culture",
  "Kids"
];

// Componente para mostrar botones de categorías
function CategoryButton({ category, isSelected, toggleSelection }) {
  return (
    <div
      onClick={toggleSelection} // Cambia el estado al hacer clic
      className={`category-button ${isSelected ? "selected" : "unselected"}`} // Clases dinámicas
    >
     
      <img
        src={isSelected ? checkIcon : plusIcon} // Ícono dinámico
        alt={isSelected ? "Selected" : "Unselected"}
      />

<p>{category}</p>
    </div>
  );
}


// Componente principal para manejar las categorías
function TopicsSelector() {
  const [selectedCategories, setSelectedCategories] = useState({}); // Guarda el estado de cada categoría

  const toggleSelection = (category) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // Alterna el estado de la categoría
    }));
  };

  return (
    <div className="topic-selector">
      <div className="hero-text">
        <h1>What topics are you into?</h1>
        <h2>Pick your favorites so we can find podcasts you'll love.</h2>

        <div className="categories-box">
          {Categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={!!selectedCategories[category]} // Estado de selección
              toggleSelection={() => toggleSelection(category)} // Cambia el estado
            />
          ))}
        </div>

        <div className="boton" style={{ marginTop: "20px", cursor: "pointer" }}>
          <p>Next</p>
          <img src={arrowRight} alt="Arrow Right" />
        </div>
      </div>

      <img src={topicImg} alt="Topic" style={{ marginTop: "20px" }} />
    </div>
  );
}

export default TopicsSelector;
