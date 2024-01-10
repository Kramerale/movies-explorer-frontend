import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation ({isLoggedIn}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  if (isLoggedIn) {
    return (
      <nav  className={`navigation ${!isMenuOpen ? "navigation_active" : ""}`}>
        <div  className={`navigation__container ${isMenuOpen ? "navigation__container_active" : ""}`}r>
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link className="navigation__link" to="/" onClick={toggleMenu}>Главная</Link>
            </li>
            <li className="navigation__item">
              <Link className="navigation__link" to="/movies" onClick={toggleMenu}>Фильмы</Link>
            </li>
            <li className="navigation__item">
              <Link className="navigation__link" to="/saved-movies" onClick={toggleMenu}>Сохранённые фильмы</Link>
            </li>
          </ul>
          <Link className="navigation__acc-link" to="/profile" onClick={toggleMenu}>
            <p className="navigation__acc-link-title">Аккаунт</p>
            <div className="navigation__acc-link-icon"></div>
          </Link>
        </div>
        <div className={`navigation__menu-button ${!isMenuOpen ? "navigation__menu-button_active" : ""}`} onClick={toggleMenu}>
          <span></span>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navigation-auth">
        <Link className="navigation-auth__link" to="/signup">Регистрация</Link>
        <Link className="navigation-auth__link navigation-auth__link_type_button" to="/signin">Войти</Link>
      </nav>
    );
  }
}

export default Navigation;
