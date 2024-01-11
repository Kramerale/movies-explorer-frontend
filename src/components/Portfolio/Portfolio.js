import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link to={"https://github.com/Kramerale/how-to-learn"} className="portfolio__link" target="_blank">Статичный сайт</Link>
        </li>
        <li className="portfolio__list-item">
          <Link to={"https://github.com/Kramerale/russian-travel"} className="portfolio__link" target="_blank">Адаптивный сайт</Link>
        </li>
        <li className="portfolio__list-item">
          <Link to={"https://github.com/Kramerale/react-mesto-api-full-gha"} className="portfolio__link" target="_blank">Одностраничное приложение</Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
