import React from 'react';
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

export default Header;
