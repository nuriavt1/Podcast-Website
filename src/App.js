import './App.css';
import logo from './nextCastLogo.svg';
import PodcastList from './podcastList';
import Hero from './hero';
import Header from './header';
import TopicsSelector from './topicsSelector';
import PodcastDetail from './podcastDetail';
import StartPodcast from './start-podcasts';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SavedContent from './savedContent';
import { ContextProvider } from './Context'; // Asegúrate de importar el ContextProvider

function App() {

  return (
    <div className="App">
      {/* Envolvemos la aplicación con ContextProvider */}
      <ContextProvider>
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
            <Route path="/savedContent" element={<SavedContent />} />
          </Routes>
        </Router>
      </ContextProvider>

      <footer>
        <p>© 2024 Next-Cast All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
