import React from 'react';
import { Link } from 'react-router-dom';
 
import { useSavedPodcasts } from './Context';// Importamos el hook del contexto

function Card({ id, name, image, publisher }) {
  // Accedemos a las funciones del contexto
  const { savedPodcasts, addPodcast, removePodcast } = useSavedPodcasts();

  // Función para alternar entre añadir y quitar un podcast
  const toggleSavePodcast = () => {
    if (savedPodcasts.includes(id)) {
      removePodcast(id);  // Si el podcast ya está guardado, lo quitamos
    } else {
      addPodcast(id);  // Si no está guardado, lo añadimos
    }
  };

  return (
    <Link to={`/podcast-detail/${id}`}>
      <div className="games-item">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>ID: {id}</p>
        <p>{publisher}</p>
        <button onClick={(e) => {
          e.stopPropagation();  // Prevenir que el click también active el Link
          toggleSavePodcast();
        }}>
          {savedPodcasts.includes(id) ? 'Eliminar de la lista' : 'Guardar en la lista'}
        </button>
      </div>
    </Link>
  );
}

export default Card;


/*import React from 'react';
import { Link } from 'react-router-dom';

function Card({ id, name, image, publisher }) {
    console.log(id, name, image, publisher);
  return (
    <Link to={`/podcast-detail/${id}`}>
      <div className="games-item">
        <img src={image} alt={name} />
        <h2>{name}</h2>*/
        {/* This will correctly display the ID */}
       /* <p>ID: {id}</p>
        <p>{publisher}</p>
      </div>
    </Link>
  );
}

export default Card;*/



