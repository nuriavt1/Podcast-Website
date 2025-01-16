import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the context to manage saved podcasts
const SavedPodcastsContext = createContext();

// Creating the ContextProvider component that will wrap around the app
export const ContextProvider = ({ children }) => {
  // Load the initial state from localStorage if available
  const [savedPodcasts, setSavedPodcasts] = useState(() => {
    const saved = localStorage.getItem('savedPodcastsIds');
    return saved ? JSON.parse(saved) : [];  // If data exists in localStorage, use it; otherwise, initialize with an empty array
  });

  // Function to add a podcast to the saved list
  const addPodcast = (id) => {
    setSavedPodcasts((prevState) => {
      const updatedState = [...prevState, id];  // Add the new podcast ID to the saved podcasts array
      localStorage.setItem('savedPodcastsIds', JSON.stringify(updatedState));  // Save the updated list to localStorage
      return updatedState;
    });
  };

  // Function to remove a podcast from the saved list
  const removePodcast = (id) => {
    setSavedPodcasts((prevState) => {
      const updatedState = prevState.filter((podcastId) => podcastId !== id);  // Remove the podcast ID from the array
      localStorage.setItem('savedPodcastsIds', JSON.stringify(updatedState));  // Save the updated list to localStorage
      return updatedState;
    });
  };

  return (
    // Providing the savedPodcasts state and functions to the rest of the app
    <SavedPodcastsContext.Provider value={{ savedPodcasts, addPodcast, removePodcast }}>
      {children} {/* Render the child components */}
    </SavedPodcastsContext.Provider>
  );
};

// Custom hook to access the saved podcasts context
export const useSavedPodcasts = () => {
  return useContext(SavedPodcastsContext); // Access the savedPodcasts context using useContext hook
};
