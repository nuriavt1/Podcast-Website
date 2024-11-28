import React, { useState } from 'react';
import Card from './card';

//const token = 'd21f9fa9e9834547a686c4595b539595';

/*curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"*/
     //https://developer.spotify.com/documentation/web-api/tutorials/getting-started


function PodcastList() {

    const [podcasts, setCast] = useState([])


    fetch(`https://api.spotify.com/v1/search?q=podcast&type=show`)
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
    })
    .then(data => setCast(data.results)) // Acceder a 'results' en la respuesta de la API
    .catch(err => {
        console.error("Error al obtener datos de juegos:", err);
        alert("Error al obtener datos de juegos.");
    });




    return (
        <section>
            <h2>All Podcasts</h2>
            <ul>
                {podcasts.map(item => <Card key={item.id} name={item.name} image={item.image} publisher={item.publisher} />)}
            </ul>
        </section>
    )

};
export default PodcastList;