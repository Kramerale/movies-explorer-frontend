import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header ({isMainPage, isLoggedIn}) {
  return (
    <header className={`header ${isMainPage ? 'header_type_main' : ''}`}>
      <Link className="header__logo-link" to="/">
        <img className="header__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Header;
