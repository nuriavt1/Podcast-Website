import React from "react";
import Card from "./card"; // Asegúrate de que la ruta del archivo sea correcta

function PodcastSearchList({ podcasts }) {
  if (!podcasts || podcasts.length === 0) {
    return <p>No podcasts found.</p>;
  }

  return (
    <section>
      <h2>Podcast Results</h2>
      <div className="podcast-results">
        {podcasts.map((podcast) => (
          <Card
            key={podcast.id}
            id={podcast.id}
            name={podcast.name}
            image={podcast.images[0]?.url} // Verificamos que haya una imagen
            publisher={podcast.publisher}
          />
        ))}
      </div>
    </section>
  );
}

export default PodcastSearchList;
