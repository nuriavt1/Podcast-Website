import React, { useState } from 'react';
import logo from './nextCastLogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import search from './imatges/icons/search.svg';

function Header() {
  const [showPodcastsDropdown, setShowPodcastsDropdown] = useState(false);
  const [showAudiobooksDropdown, setShowAudiobooksDropdown] = useState(false);
  const navigate = useNavigate();

  const togglePodcastsDropdown = () => {
    setShowPodcastsDropdown(!showPodcastsDropdown);
    setShowAudiobooksDropdown(false); // Cerrar Audiobooks dropdown si se abre Podcasts
  };

  const toggleAudiobooksDropdown = () => {
    setShowAudiobooksDropdown(!showAudiobooksDropdown);
    setShowPodcastsDropdown(false); // Cerrar Podcasts dropdown si se abre Audiobooks
  };

  const handleCategorySelect = (category) => {
    localStorage.setItem('selectedCategories', JSON.stringify([category]));
    navigate('/start-podcasts', { state: { selectedCategories: [category] } });
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo Next-Cast" />
      </Link>

      <ul>
        <li
          onClick={togglePodcastsDropdown}
          onMouseEnter={() => setShowPodcastsDropdown(true)} // Mostrar al hacer hover
          onMouseLeave={() => setShowPodcastsDropdown(false)} // Ocultar cuando se deja de hacer hover
        >
          Podcasts
          {showPodcastsDropdown && (
            <ul className="dropdown">
              {['Comedy', 'Mystery', 'Sport', 'Science & Tech', 'History', 'Politics', 'Kids', 'Art & Culture', 'Health'].map((category) => (
                <li key={category}>
                  <Link
                    to="start-podcasts"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li
          onClick={toggleAudiobooksDropdown}
          onMouseEnter={() => setShowAudiobooksDropdown(true)} // Mostrar al hacer hover
          onMouseLeave={() => setShowAudiobooksDropdown(false)} // Ocultar cuando se deja de hacer hover
        >
          AudioBooks
          {showAudiobooksDropdown && (
            <ul className="dropdown">
              {['Fiction', 'Mystery'].map((category) => (
                <li key={category}>
                  <Link
                    to="start-podcasts"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <Link
            to={{
              pathname: '/savedContent',
              state: { selectedCategories: ['Fiction'] },
            }}
          >
            My List
          </Link>
        </li>
      </ul>

      <Link to="searchContainer">
        <img src={search} alt="Search" />
      </Link>

      {/* Estilos para los dropdowns */}
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
        }

        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          position: relative;
          margin-left: 30px;
          font-size: 16px;
          color: rgb(0, 0, 0);
          cursor: pointer;
        }

        ul.dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          display: none;
          list-style: none;
          padding: 10px 0;
          margin: 0;
          background-color: rgb(255, 255, 255);
          border-radius: 5px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        li:hover > ul.dropdown,
        li:focus-within > ul.dropdown,
        li:active > ul.dropdown {
          display: block;
          opacity: 1;
        }

        ul.dropdown li {
          padding: 10px 20px;
        }

        ul.dropdown li a {
          color: rgb(0, 0, 0);
          text-decoration: none;
          display: block;
          position: relative;
        }

        ul.dropdown li a:hover {
          color: #5700FF;
        }

        li:hover {
          color: #5700FF;
        }

        ul.dropdown li a:active {
          background-color: #1abc9c;
        }

        /* Línea morada al pasar el mouse */
        ul.dropdown li a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 3px;
          border-radius: 50px;
          background-color: #5700FF;
          transition: width 0.3s ease;
        }

        ul.dropdown li a:hover::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}

export default Header;
