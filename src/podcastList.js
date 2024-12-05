import React, { useState } from 'react';
import Card from './card';

     const client_id = 'd21f9fa9e9834547a686c4595b539595';
     const client_secret = '224cbbce3d5943cba4229f4d40b172ad';
   
     async function getToken() {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          body: new URLSearchParams({
            'grant_type': 'client_credentials',
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic " + btoa(`${client_id}:${client_secret}`)
            //'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
          },
        });
        let a=await response.json()
        console.log(a.access_token.toString());
        return a.access_token.toString();
      }


function PodcastList() {
 


    const [podcasts, setCast] = useState([])
   
    var at= getToken()
    .then(()=>{
        console.log(at);    
        fetch("https://api.spotify.com/v1/search?q=comedy&type=show", {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + at },
            })
            //fetch(`https://api.spotify.com/v1/search?q=podcast&type=show`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue correcta');
                }
                return response.json();
            })
            .then(data => setCast(data.results)) // Acceder a 'results' en la respuesta de la API
            .catch(err => {
                console.error("Error al obtener datos de podcasts:", err);
                //alert("Error al obtener datos de podcasts.");
            });
    })
    .catch(err => {
        console.error("Error al obtener token", err);
        //alert("Error al obtener datos de podcasts.");
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
