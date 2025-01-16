// Importing necessary styles, components, and libraries
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
import SearchContainer from './searchContainer';
import { ContextProvider } from './Context';
function App() {

  return (
    <div className="App">
      {/* Wrapping the application in the ContextProvider to manage global state */}
      <ContextProvider>
        {/* Router component provides routing capabilities between different pages */}
        <Router>
          <Header />
  
          <main>
            {/* <Hero />
            <TopicsSelector />
            <PodcastList /> */}
          </main>
  
          {/* Different routes for navigating through the app */}
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/podcasts" element={<PodcastList />} />
            <Route path="/topics-selector" element={<TopicsSelector />} />
            <Route path="/podcast-detail/:id" element={<PodcastDetail />} />
            <Route path="/start-podcasts" element={<StartPodcast />} />
            <Route path="/savedContent" element={<SavedContent />} />
            <Route path="/searchContainer" element={<SearchContainer />} />
          </Routes>
        </Router>
      </ContextProvider>

      {/* Footer section displaying copyright info */}
      <footer>
        <p>© 2024 Next-Cast All rights reserved.</p>
      </footer>
    </div>
  );
}

// Exporting the App component for use in other parts of the application
export default App;
