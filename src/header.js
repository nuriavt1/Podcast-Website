import React from 'react';
import logo from './nextCastLogo.svg';

function Header() {
  return (
    <header>
      <img src={logo} alt="logo de GamesList" />

<ul>
    <li><a>Podcasts</a></li>
    <li><a>AudioBooks</a></li>
</ul>

    </header>
  );
}

export default Header;
