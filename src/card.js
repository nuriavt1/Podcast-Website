import React from 'react';
import { Link } from 'react-router-dom'


function Card({ name, image, publisher }) {
    return (

        <Link to="/podcast-detail">
            <div className="games-item">
                <img src={image} alt={name} />
                <h2>{name}</h2>
                <p>{publisher}</p>
            </div>
        </Link>

    )
}

export default Card;