//import React from 'react';
import React, { useState, useEffect } from 'react';
import Card from './card';

const apiKey = '8b61d66a8ea7471eb3d75b6c3cb50e19'; 

function GamesList(){
    const [games, setGames] = useState ([ ])
    const [search, setSearch] = useState('');


    const fetchGames = (searchQuery) => {

        fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then(data => setGames(data.results)) // Acceder a 'results' en la respuesta de la API
        .catch(err => {
            console.error("Error al obtener datos de juegos:", err);
            alert("Error al obtener datos de juegos.");
        });
    };


    useEffect (( ) => {
        fetchGames('');
    }, []);

const handleSearchChange = (event) => {
    setSearch(event.target.value);
};

const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchGames(search);

        setSearch(''); // Limpiar solo el campo de búsqueda

};


    return(
        <section>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={search} onChange={handleSearchChange} placeholder="Search games..." />
                <button type="submit">Filter</button>
            </form>

        <ul>
            {games.map(item => <Card key={item.id} name={item.name} image={item.background_image} rating={item.rating} released={item.released}/>)}
        </ul>
    </section>
    )
}
export default GamesList;