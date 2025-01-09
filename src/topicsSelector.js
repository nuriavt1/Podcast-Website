import React, { useState } from "react";
import topicImg from "./topicImg.svg";
import arrowRight from "./arrowRight.svg";
import plusIcon from "./plusIcon.svg";
import checkIcon from "./checkIcon.svg";
import { useNavigate } from "react-router-dom";

// Lista de categorías
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

// Botón de categoría
function CategoryButton({ category, isSelected, toggleSelection }) {
  return (
    <div
      onClick={toggleSelection}
      className={`category-button ${isSelected ? "selected" : "unselected"}`}
    >
      <img src={isSelected ? checkIcon : plusIcon} alt="Icon" />
      <p>{category}</p>
    </div>
  );
}

// Componente principal
function TopicsSelector() {
  const [selectedCategories, setSelectedCategories] = useState([]); // Inicializado como array
  const navigate = useNavigate();

  // Guardar categoría seleccionada
  const saveCategory = (category) => {
    setSelectedCategories((prevState) =>
      prevState.includes(category) ? prevState : [...prevState, category]
    );
  };

  // Eliminar categoría seleccionada
  const deleteCategory = (category) => {
    setSelectedCategories((prevState) =>
      prevState.filter((item) => item !== category)
    );
  };

  // Alternar selección de categorías
  const toggleSelection = (category) => {
    if (selectedCategories.includes(category)) {
      deleteCategory(category);
    } else {
      saveCategory(category);
    }
  };

  // Manejar el clic en "Next"
  const handleNext = () => {
    navigate("/start-podcasts", { state: { selectedCategories } }); // Enviar categorías
   // navigate("/podcasts", { state: { selectedCategories, 'show', 'ES'} });
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
              isSelected={selectedCategories.includes(category)} // Ahora es un array
              toggleSelection={() => toggleSelection(category)}
            />
          ))}
        </div>

        <div
          className="boton"
          onClick={handleNext}
          style={{ marginTop: "20px", cursor: "pointer" }}
        >
          <p>Next</p>
          <img src={arrowRight} alt="Arrow Right" />
        </div>
      </div>

      <img className="img-screen" src={topicImg} alt="Topic" />
    </div>
  );
}

export default TopicsSelector;

