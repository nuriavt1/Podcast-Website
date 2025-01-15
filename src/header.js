/*import React from 'react';
import logo from './nextCastLogo.svg';
import {Link} from 'react-router-dom'

function Header() {
  return (
  
      <header>

        <Link to="/">
        <img src={logo} alt="logo Next-Cast" />
        </Link>
       
        <ul>
          <li><Link to="/podcasts">Podcasts</Link></li>
          <li><Link to="/audiobooks">AudioBooks</Link></li>
        </ul>



      </header>
  );
}

export default Header;*/

import React, { useState } from 'react';
import logo from './nextCastLogo.svg';
import { Link } from 'react-router-dom';
import Searcher from './searcher';

function Header() {
  const [showPodcastsDropdown, setShowPodcastsDropdown] = useState(false);
  const [showAudiobooksDropdown, setShowAudiobooksDropdown] = useState(false);

  const togglePodcastsDropdown = () => {
    setShowPodcastsDropdown(!showPodcastsDropdown);
    setShowAudiobooksDropdown(false);
  };

  const toggleAudiobooksDropdown = () => {
    setShowAudiobooksDropdown(!showAudiobooksDropdown);
    setShowPodcastsDropdown(false);
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo Next-Cast" />
      </Link>
      <Searcher />
      <ul>
        <li onClick={togglePodcastsDropdown}>
          Podcasts
          {showPodcastsDropdown && (
            <ul className="dropdown">
              {/*COMEDY*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Comedy'] },
                  }}
                >
                  Comedy
                </Link>
              </li>

              {/*MYSTERY*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Mystery'] },
                  }}
                >
                  Mystery
                </Link>
              </li>

              {/*SPORT*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Sport'] },
                  }}
                >
                  Sport
                </Link>
              </li>

              {/*SCIENCE & TECH*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Science & Tech'] },
                  }}
                >
                  Science & Tech
                </Link>
              </li>

              {/*History*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['History'] },
                  }}
                >
                  History
                </Link>
              </li>

              {/*POLITICS*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Politics'] },
                  }}
                >
                  Politics
                </Link>
              </li>

              {/*KIDS*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Kids'] },
                  }}
                >
                  Kids
                </Link>
              </li>

              {/*ART & CULTURE*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Art & Culture'] },
                  }}
                >
                  Art & Culture
                </Link>
              </li>

              {/*HEALTH*/}
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Health'] },
                  }}
                >
                  Health
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li onClick={toggleAudiobooksDropdown}>
          AudioBooks
          {showAudiobooksDropdown && (
            <ul className="dropdown">
              <li>
                <Link
                  to={{
                    pathname: '/start-podcasts',
                    state: { selectedCategories: ['Fiction'] },
                  }}
                >
                  Fiction
                </Link>
              </li>
              <li>
                <Link to={`/start-podcasts/`}>
                  Mystery
                </Link>
              </li>
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
        </Link></li>
      </ul>

      {/* Estilos para los dropdowns */}
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
        }

        header img {
          width: 150px;
          height: auto;
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
        li:focus-within > ul.dropdown {
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
      font-weight: 00;
         /*  background-color: #16a085;*/
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

