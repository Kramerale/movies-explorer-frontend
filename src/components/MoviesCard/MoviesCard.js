import React, { useState } from 'react';
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';
// import cardImage from '../../images/card-img.jpg';

function MoviesCard ({ movie, likeState, likeChange }) {
  const path = useLocation();

  function changeTimeFormat (time) {
    if (time < 60) {
      return `${time}м`;
    }
    return `${Math.floor(time / 60)}ч ${time % 60}м`;
  }

  return (
    <li className="card">
      <Link to={movie.trailerLink} target="_blank">
        <img className="card__image" src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU}/>
      </Link>
      <div className="card__description">
        <h3 className="card__title">{movie.nameRU}</h3>
        <button
          className={`card__button ${path === '/saved-movies' ?
            'card__button_delete'
            : likeState ? 'card__button_like-active' : 'card__button_like-inactive'
          }`}
          onClick={likeChange}
        />
        <p className="card__duration">{changeTimeFormat(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
