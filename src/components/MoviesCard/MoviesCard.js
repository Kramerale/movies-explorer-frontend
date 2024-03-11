import React, { useState, useEffect, useMemo } from 'react';
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';

function MoviesCard ({ movie, likeState, handleLike }) {
  const {pathname} = useLocation();
  const [like, setLike] = useState(false);

  function changeTimeFormat (time) {
    if (time < 60) {
      return `${time}м`;
    }
    return `${Math.floor(time / 60)}ч ${time % 60}м`;
  }

  useEffect(() => {
    setLike(likeState);
  }, [likeState])

  function handleLikeClick (e) {
    setLike(!like);
    handleLike(movie, like);
  }

  const movieImgSrc = useMemo(() => {
    return `https://api.nomoreparties.co${movie.image.url}`;
  }, [movie])

  return (
    <li className="card">
      <Link to={movie.trailerLink} target="_blank">
        <img className="card__image" loading='lazy' src={movieImgSrc} alt={movie.nameRU}/>
      </Link>
      <div className="card__description">
        <h3 className="card__title">{movie.nameRU}</h3>
        {pathname === '/saved-movies' ?
          <button className='card__button card__button_delete' onClick={handleLikeClick}/>
          : <button className={`card__button ${like ? 'card__button_like-active' : 'card__button_like-inactive'}`} onClick={handleLikeClick}/>
        }
        <p className="card__duration">{changeTimeFormat(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
