import React from 'react';

function Card({name, image, rating, description, released}){
    return(
        <div className="games-item">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p> <span className="medium">Released:</span>  {new Date(released).toLocaleDateString()}</p>
        <p><span className="medium">Rating:</span> {rating}/5</p>
    </div>
    )
}

export default Card;