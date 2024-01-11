import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2024</p>
        <nav className="footer__navigation">
          <ul className="footer__navigation-list">
            <li className="footer__navigation-item">
              <Link to={"https://practicum.yandex.ru/"} className="footer__navigation-link" target="_blank">Яндекс.Практикум</Link>
            </li>
            <li className="footer__navigation-item">
              <Link to={"https://github.com/Kramerale"} className="footer__navigation-link" target="_blank">Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
