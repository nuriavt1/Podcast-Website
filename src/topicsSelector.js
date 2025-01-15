import React, { useState, useEffect } from "react";
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

  // Recuperamos las categorías del localStorage al cargar el componente
  useEffect(() => {
    const storedCategories = localStorage.getItem("selectedCategories");
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories)); // Convertimos de string a array
    }
  }, []);

  // Guardar categoría seleccionada
  const saveCategory = (category) => {
    setSelectedCategories((prevState) => {
      const updatedCategories = [...prevState, category];
      // Guardar las categorías en localStorage
      localStorage.setItem("selectedCategories", JSON.stringify(updatedCategories));
      return updatedCategories;
    });
  };

  // Eliminar categoría seleccionada
  const deleteCategory = (category) => {
    setSelectedCategories((prevState) => {
      const updatedCategories = prevState.filter((item) => item !== category);
      // Guardar las categorías actualizadas en localStorage
      localStorage.setItem("selectedCategories", JSON.stringify(updatedCategories));
      return updatedCategories;
    });
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


