import React from 'react';

function Card({name, image, publisher}){
    return(
        <div className="games-item">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{publisher}</p>
    </div>
    )
}

export default Card;