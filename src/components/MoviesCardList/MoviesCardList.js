import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

function MoviesCardList ({ movies, isLoading, likeState, likeChange}) {
  const path = useLocation();

  return (
    <section className="movies-cards">
      {
      isLoading ? (
        <Preloader/>
        ) : (
        <>
        <ul className="movies-cards__list">
          {movies.map(movie =>
            <MoviesCard
              key={movie.id}
              movie={movie}
              likeState={likeState}
              likeChange={likeChange}
            />
          )}
        </ul>
        { path === '/saved-movies' ?
          ""
          : <button className="movies-cards__more-button">Ещё</button>
        }
        </>
        )
      }
    </section>
  );
}

export default MoviesCardList;
