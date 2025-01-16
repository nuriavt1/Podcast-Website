import React, { useState } from 'react';
import logo from './nextCastLogo.svg'; // Importing logo image
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation

import search from './imatges/icons/search.svg'; // Importing search icon

function Header() {
   // States for controlling dropdown visibility

  const [showPodcastsDropdown, setShowPodcastsDropdown] = useState(false);
  const [showAudiobooksDropdown, setShowAudiobooksDropdown] = useState(false);
  const navigate = useNavigate(); // React Router's navigate function for navigation

 // Toggles the visibility of the Podcasts dropdown
  const togglePodcastsDropdown = () => {
    setShowPodcastsDropdown(!showPodcastsDropdown); // Toggle Podcasts dropdown visibility

    setShowAudiobooksDropdown(false);  // Close Podcasts dropdown if Audiobooks is opened


  };
// Toggles the visibility of the Audiobooks dropdown
  const toggleAudiobooksDropdown = () => {
    setShowAudiobooksDropdown(!showAudiobooksDropdown);
    setShowPodcastsDropdown(false); // Close Podcasts dropdown if Audiobooks is opened

  };

  // Handles category selection, stores in localStorage and navigates to the podcasts page

  const handleCategorySelect = (category) => {
    localStorage.setItem('selectedCategories', JSON.stringify([category]));
   // Store selected category
   navigate('/start-podcasts', { state: { selectedCategories: [category] } });  // Navigate with the category state
  };

  return (
    <header>  {/* Logo that redirects to the home page */}
      <Link to="/">
        <img src={logo} alt="logo Next-Cast" />
      </Link>

  {/* Main navigation menu */}
      <ul>
           {/* Podcasts category menu */}

        <li
          onClick={togglePodcastsDropdown}
          onMouseEnter={() => setShowPodcastsDropdown(true)} // Show on hover
          onMouseLeave={() => setShowPodcastsDropdown(false)} // Hide on hover leave

        >
          Podcasts
           {/* Show the dropdown if Podcasts is selected */}
          {showPodcastsDropdown && (
            <ul className="dropdown">
              {/* List of podcast categories */}
              {['Comedy', 'Mystery', 'Sport', 'Science & Tech', 'History', 'Politics', 'Kids', 'Art & Culture', 'Health'].map((category) => (
                <li key={category}>
                  <Link
                    to="start-podcasts" // Navigate to the start-podcasts page when clicked
                    onClick={() => handleCategorySelect(category)} // Select the category and store it
                  >
                    {category} {/* Display category name */}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
{/* Audiobooks category menu */}
        <li
          onClick={toggleAudiobooksDropdown}
          onMouseEnter={() => setShowAudiobooksDropdown(true)}  // Show on hover
          onMouseLeave={() => setShowAudiobooksDropdown(false)}  // Hide on hover leave
        >
          AudioBooks
           {/* Show the dropdown if Audiobooks is selected */}
          {showAudiobooksDropdown && (
            <ul className="dropdown">
              {/* List of audiobook categories */}
              {['Fiction', 'Mystery'].map((category) => (
                <li key={category}>
                  <Link
                    to="start-podcasts"
                    // Navigate to the start-podcasts page when clicked

                    onClick={() => handleCategorySelect(category)}
                    // Select the category and store it

                  >
                    {category}  {/* Display category name */}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
{/* My List link */}
        <li>
          <Link className='Mylist'
            to={{
              pathname: '/savedContent', // Navigate to savedContent page

              state: { selectedCategories: ['Fiction'] }, // Pass Fiction category to the state

            }}
          >
            My List {/* Link text */}
          </Link>
        </li>
      </ul>

      <Link to="searchContainer">
  <img src={search} alt="Search" style={{ width: '32px', height: '32px' }} />  {/* Display search icon */}

</Link>


 {/* Styles for the dropdowns and header layout */}
      <style jsx>{`




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
          z-index: 100;
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
