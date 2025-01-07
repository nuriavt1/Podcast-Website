import './App.css';
import logo from './nextCastLogo.svg';
import PodcastList from './podcastList';
import Hero from './hero';
import Header from './header';
import TopicsSelector from './topicsSelector';
import PodcastDetail from './podcastDetail';
import StartPodcast from './start-podcasts';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function App() {
  /*const client_id = 'd21f9fa9e9834547a686c4595b539595';
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
    console.log(a);
    return a;
  }*/

  //EJEMPLO OBTENIENDO TRACK
  /*async function getTrackInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
    });
  
    return await response.json();
  }
  
  getToken().then(response => {
    getTrackInfo(response.access_token).then(profile => {
      console.log(profile)
    })
  });*/
  //

  //PARA OBTENER SHOWS DE COMEDIA EJEMPLO
  /*async function getPodcastInfo(access_token) {
    const response = await fetch("https://api.spotify.com/v1/search?offset=0&limit=20&query=comedy&type=show&locale=es-ES,es;q%3D0.9", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
    });
  
    return await response.json();
  }
  
  getToken().then(response => {
    getPodcastInfo(response.access_token).then(profile => {
      console.log(profile)
    })
  });*/

  //

  return (
    <div className="App">


<Router>
      <Header />

      <main>
      {/*  <Hero />
        <TopicsSelector />
        <PodcastList />*/}
      </main>
     
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/podcasts" element={<PodcastList />} />
          {/*<Route path="/audiobooks" element={<AudioBooksList />} />*/}
          <Route path="/topics-selector" element={<TopicsSelector />} />
          <Route path="/podcast-detail/:id" element={<PodcastDetail />} />
          <Route path="/start-podcasts" element={<StartPodcast />} />
        </Routes>
      </Router>



      <footer>
        <p>© 2024 Next-Cast All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
