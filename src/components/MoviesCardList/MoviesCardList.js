import React, { useEffect, useMemo, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

function MoviesCardList ({ movies, isLoading, likeState, likeChange}) {
  const { pathname } = useLocation();

  const [paginatedMovies, setPaginatedMovies] = useState([]);
  const [countMore, setCountMore] = useState(1);

  function handleViewCards(e) {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setPaginatedMovies(movies.slice(0, 4 * countMore));
    } else if (screenWidth >= 768) {
      setPaginatedMovies(movies.slice(0, 3 * countMore));
    } else if (screenWidth >= 320) {
      setPaginatedMovies(movies.slice(0, 3 * countMore));
    }
  }

  useEffect(() => {
    handleViewCards(window.innerWidth);
    window.addEventListener('resize', handleViewCards);

    return () => {
      window.removeEventListener('resize', handleViewCards);
    }
  }, [movies])

  function handleMore() {
    setCountMore(countMore + 1);
    handleViewCards();
  }

  const showButtonMore = useMemo(() => {
    return pathname !== '/saved-movies' && movies.length <= paginatedMovies.length;
  }, [movies.length, paginatedMovies, pathname])

  return (
    <section className="movies-cards">
      {
      isLoading ? (
        <Preloader/>
        ) : (
        <>
        <ul className="movies-cards__list">
          {paginatedMovies.map(movie =>
            <MoviesCard
              key={movie.id}
              movie={movie}
              likeState={likeState}
              likeChange={likeChange}
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
