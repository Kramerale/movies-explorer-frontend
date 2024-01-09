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
      <>
        <nav className={`navigation ${isMenuOpen ? "navigation_active" : ""}`}>
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
        </nav>
        <div className={`navigation__menu-button ${!isMenuOpen ? "navigation__menu-button_active" : ""}`} onClick={toggleMenu}>
          <span></span>
        </div>
      </>
    );
  } else {
    return (
      <nav className="navigation__auth">
        <Link className="navigation__auth-link" to="/signup">Регистрация</Link>
        <Link className="navigation__auth-link navigation__auth-link_type_button" to="/signin">Войти</Link>
      </nav>
    );
  }
}

export default Navigation;
