import React from 'react';
import './MoviesCard.css';
import cardImage from '../../images/card-img.jpg';

function MoviesCard () {
  return (
    <li className="card">
      <img className="card__image" src={cardImage} alt="Постер к фильму"/>
      <div className="card__description">
        <h3 className="card__title">33 слова о дизайне</h3>
        <button className="card__button card__button_like-inactive"></button>
        <p className="card__duration">1ч 47м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
