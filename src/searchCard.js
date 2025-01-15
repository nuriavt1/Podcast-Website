import React from 'react';
import { Link } from 'react-router-dom';

function SearchCard({ id, name, image, publisher }) {
    console.log(id, name, image, publisher);
    return (
        <Link to={`/podcast-detail/${id}`}>
            <div className="SearchCard">

                <img src={image} alt={name} />
                <div>
                    <h2>{name}</h2>
                    {/* This will correctly display the ID */}
                    <p>ID: {id}</p>
                    <p>{publisher}</p>
                </div>

            </div>
        </Link>
    );
}

export default Card;
