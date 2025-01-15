import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const SavedPodcastsContext = createContext();

// Crear el provider
export const ContextProvider = ({ children }) => {
  // Cargar el estado inicial desde localStorage
  const [savedPodcasts, setSavedPodcasts] = useState(() => {
    const saved = localStorage.getItem('savedPodcastsIds');
    return saved ? JSON.parse(saved) : [];  // Si hay datos en localStorage, usarlos; si no, iniciar con un array vacío.
  });

  // Función para agregar un podcast al estado
  const addPodcast = (id) => {
    setSavedPodcasts((prevState) => {
      const updatedState = [...prevState, id];
      localStorage.setItem('savedPodcastsIds', JSON.stringify(updatedState));  // Guardar en localStorage
      return updatedState;
    });
  };

  // Función para eliminar un podcast del estado
  const removePodcast = (id) => {
    setSavedPodcasts((prevState) => {
      const updatedState = prevState.filter((podcastId) => podcastId !== id);
      localStorage.setItem('savedPodcastsIds', JSON.stringify(updatedState));  // Guardar en localStorage
      return updatedState;
    });
  };

  return (
    <SavedPodcastsContext.Provider value={{ savedPodcasts, addPodcast, removePodcast }}>
      {children}
    </SavedPodcastsContext.Provider>
  );
};

// Crear el hook para acceder al contexto
export const useSavedPodcasts = () => {
  return useContext(SavedPodcastsContext);
};
