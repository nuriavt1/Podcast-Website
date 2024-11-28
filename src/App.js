import './App.css';
import logo from './logoGamesList.svg';
import GamesList from './gamesList';


function App() {

  return (
    <div className="App">

      <header>
        <img src={logo} alt="logo de GamesList" />
      </header>
      <GamesList />
    
    <footer>
      <p>Copyright © 2024 by Núria Vaquero Tell All Rights Reserved.</p>
    </footer>

    </div>
  );
}

export default App;
