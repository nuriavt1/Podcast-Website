import React from 'react';
import { Link } from 'react-router-dom';
import EpisodesList from './episodesList';

/*function EpisodeCard({ id, total, name, description, duration_ms, release_date }) {
    console.log(id, total, name, description, duration_ms, release_date);
  return (
      <div className="games-item">
        <h2>{total}{name}</h2>*/

        {/* This will correctly display the ID */}
       /* <p>{description}</p>
        <p>{duration_ms}</p>
        <p>{release_date}</p>
      </div>
  );
}*/



function EpisodeCard({ id, name, description, duration_ms, release_date }) {
    console.log(id, name, description, duration_ms, release_date);
  
    const formatDuration = (durationMs) => {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = ((durationMs % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Esto devuelve una fecha en formato local
    };
  
    return (
      <div className="episode-item">
        <h2>{name}</h2>
        <p>{description || 'No description available'}</p>
        <p>Duration: {formatDuration(duration_ms)}</p>
        <p>Release date: {formatDate(release_date)}</p>
      </div>
    );
  }

export default EpisodeCard;