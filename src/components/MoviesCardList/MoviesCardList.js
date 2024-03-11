import React, {useState, useEffect, useMemo} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList ({ movies, savedMovies, isLoading, handleLike, isAllSaved }) {

  const [paginatedMovies, setPaginatedMovies] = useState([]);
  const [countMore, setCountMore] = useState(1);

  function handleViewCards(e) {
    const screenWidth = window.innerWidth;

    let moviesToShow = 0;

    if (screenWidth >= 1280 || screenWidth <= 1140) {
      moviesToShow = 11 + countMore;
    }

    if (screenWidth <= 768) {
      moviesToShow = 7 + countMore;
    }

    if (screenWidth <= 480) {
      moviesToShow = 4 + countMore;
    }

    setPaginatedMovies(movies.slice(0, moviesToShow));
  }

  useEffect(() => {
    handleViewCards(window.innerWidth);
    window.addEventListener('resize', handleViewCards);

    return () => {
      window.removeEventListener('resize', handleViewCards);
    }
  }, [movies, countMore])

  function handleMore() {
    const additionalCards = window.innerWidth >= 1280 ? 3 : 2;
    setCountMore(countMore + additionalCards);
  }

  const moviesToShow = useMemo(() => {
    const savedMovieIds = savedMovies?.map(item => item.movieId) || [];
    if (isAllSaved) {
      return movies.filter((movie) => {
        return savedMovieIds?.includes(movie.id);
      })
    } else {
      return paginatedMovies;
    }
  }, [movies, savedMovies, isAllSaved, paginatedMovies])

  const showButtonMore = useMemo(() => {
    return !isAllSaved && movies.length > paginatedMovies.length;
  }, [movies.length, paginatedMovies, isAllSaved]);

  return (
    <section className="movies-cards">
      {
      isLoading ? (
        <Preloader/>
        ) : (
        <>
        <ul className="movies-cards__list">
          {moviesToShow && moviesToShow.map(movie =>
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              likeState={isAllSaved || savedMovies?.some(item => item.movieId === movie.id)}
              handleLike={handleLike}
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
