import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList ({ movies, isLoading, likeState, likeChange, onSavedMovieDelete, handleMore, showButtonMore}) {

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
              key={movie.id || movie.movieId}
              movie={movie}
              likeState={likeState}
              likeChange={likeChange}
              onSavedMovieDelete={onSavedMovieDelete}
            />
          )}
        </ul>
        { showButtonMore ?
          <button className="movies-cards__more-button" onClick={handleMore}>Ещё</button>
          : null
        }
        </>
        )
      }
    </section>
  );
}

export default MoviesCardList;
