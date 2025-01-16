import React from 'react';
import { Link } from 'react-router-dom';

import addWhite from './imatges/icons/addWhite.svg';
import dashWhite from './imatges/icons/dashWhite.svg';
import styles from './style/topCard.module.css';

import { useSavedPodcasts } from './Context';// Importamos el hook del contexto

function TopCard({ id, name, image, publisher }) {
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
    <Link to={`/podcast-detail/${id}`} className={styles.ruta}>
      <div className={styles.topCard}>
        <img src={image} alt={name} />
        {console.log(id)}

        <h2>{name}</h2>
        <p>{publisher}</p>
        <button onClick={(e) => {
  e.stopPropagation();  // Prevenir que el click también active el Link
  toggleSavePodcast();
}}>
  <img
    src={savedPodcasts.includes(id) ? dashWhite : addWhite}
    alt={savedPodcasts.includes(id) ? 'Eliminar de la lista' : 'Guardar en la lista'}
    style={{ width: '24px', height: '24px' }} // Ajusta el tamaño de las imágenes según lo necesites
  />
</button>

      </div>
    </Link>
  );
}

export default TopCard;