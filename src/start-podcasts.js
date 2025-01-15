import React from "react";
import { useLocation } from "react-router-dom"; // Para recibir el estado con las categorías seleccionadas
import Searcher from './searcher';
import PodcastList from './podcastList';
import PodcastsCategories from './podcastsCategories';
import TopRecentPodcasts from './topRecentPodcasts';

/*
const client_id = "d21f9fa9e9834547a686c4595b539595";
const client_secret = "224cbbce3d5943cba4229f4d40b172ad";

// Función para obtener el token de Spotify
async function getToken() {
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
}*/

function StartPodcasts() {
  const location = useLocation();
  const { selectedCategories = [] } = location.state || {}; // Asegúrate de que sea un array vacío si no hay datos

  return (
    <section>
      <Searcher />
      <PodcastsCategories />
      <TopRecentPodcasts />
      {/*<TopRecentPodcasts />*/}
      <PodcastList selectedCategories={selectedCategories} /> {/* Asegúrate de pasar siempre un arreglo */}
    </section>
  );
}

export default StartPodcasts;