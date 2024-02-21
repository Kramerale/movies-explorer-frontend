import React, { useState } from 'react';
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';

function MoviesCard ({ movie, likeState, likeChange, onSavedMovieDelete }) {
  const {pathname} = useLocation();
  const [like, setLike] = useState(false);

  function changeTimeFormat (time) {
    if (time < 60) {
      return `${time}м`;
    }
    return `${Math.floor(time / 60)}ч ${time % 60}м`;
  }

  function handleDeleteClick () {
    onSavedMovieDelete(movie);
  }

  function handleLikeClick (e) {
    console.log(like);
    setLike(!like);
    console.log(like);
    likeChange(movie, like);
  }

  return (
    <li className="card">
      <Link to={movie.trailerLink} target="_blank">
        {pathname === '/saved-movies' ?
          <img className="card__image" src={movie.image} alt={movie.nameRU}/>
          : <img className="card__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}/>
        }
      </Link>
      <div className="card__description">
        <h3 className="card__title">{movie.nameRU}</h3>
        {pathname === '/saved-movies' ?
          <button className='card__button card__button_delete' onClick={handleDeleteClick}/>
          : <button className={`card__button ${like ? 'card__button_like-active' : 'card__button_like-inactive'}`} onClick={handleLikeClick}/>
        }
        <p className="card__duration">{changeTimeFormat(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
