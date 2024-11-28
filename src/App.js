import './App.css';
import logo from './logoGamesList.svg';
import PodcastList from './podcastList';


function App() {

  return (
    <div className="App">

      <header>
        <img src={logo} alt="logo de GamesList" />
      </header>

<main>
<PodcastList />
</main>

      
    
    <footer>
      <p>© 2024 Next-Cast All rights reserved.</p>
    </footer>

    </div>
  );
}

export default App;
