import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies ({savedMovies, savedMoviesChange}) {
  const [movies, setMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isTumblerOn, setIsTumblerOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  // const [isLiked, setLiked] = useState(false);
  const [paginatedMovies, setPaginatedMovies] = useState([]);
  const [countMore, setCountMore] = useState(0);

  const { pathname } = useLocation();

  function handleViewCards(e) {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280 || screenWidth <= 1140) {
      setPaginatedMovies(movies.slice(0, 12 + countMore));
    }

    if (screenWidth <= 768) {
      setPaginatedMovies(movies.slice(0, 8 + countMore));
    }

    if (screenWidth <= 480) {
      setPaginatedMovies(movies.slice(0, 5 + countMore));
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
    const additionalCards = window.innerWidth >= 1280 ? 3 : 2;
    setCountMore(countMore + additionalCards);
    handleViewCards();
  }

  const showButtonMore = useMemo(() => {
    return pathname !== '/saved-movies' && movies.length > paginatedMovies.length;
  }, [movies.length, paginatedMovies, pathname]);

  useEffect(() => {
    loadFromLocalStorage(); // Загрузить данные из localStorage при монтировании компонента
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      handleSearchSubmit();
    }
  }, [isTumblerOn]);

  function loadFromLocalStorage () {
    const storedMovies = localStorage.getItem('movies');
    const storedSearchRequest = localStorage.getItem('searchRequest');
    const storedTumbler = localStorage.getItem('isTumblerOn');

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }

    if (storedSearchRequest) {
      setSearchRequest(storedSearchRequest);
    }

    if (storedTumbler) {
      setIsTumblerOn(JSON.parse(storedTumbler));
    }

  };

  function handleSearchSubmit () {
    if (!searchRequest) {
      setErrorText("Введите текст запроса в форму поиска фильмов");
      return;
    }
    localStorage.setItem('searchRequest', searchRequest);

    setErrorText("");
    setIsLoading(true);

    moviesApi.getAllMovies()
    .then(data => {
      const filteredData = data.filter(item =>
        item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
        );

      const filteredDataByTumbler = isTumblerOn ?
      filteredData.filter(movie => movie.duration < 40)
      : filteredData;

      localStorage.setItem('isTumblerOn', isTumblerOn);

      if (filteredDataByTumbler.length === 0) {
        setErrorText("Ничего не найдено");
      } else {
        setMovies(filteredDataByTumbler);
        localStorage.setItem('movies', JSON.stringify(filteredDataByTumbler));
      }
    })
    .catch(err => {
      setErrorText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
      localStorage.removeItem("isTumblerOn");
      localStorage.removeItem("searchRequest");
      localStorage.removeItem("movies");
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  function handleMovieLike (movie, isLiked) {
    if (isLiked) {
      mainApi.deleteUserMovie(movie.id)
      .then(() => {
        savedMoviesChange(movies => movies.filter(m => m.id !== movie.movieId));
      })
      .catch(console.error)
    } else {
      mainApi.createMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
      .then(newMovie => {
        savedMoviesChange([newMovie, ...savedMovies]);
      })
      .catch(console.error)
    }
  }

  return (
    <section className="movies">
      <SearchForm
        placeholder="Фильм"
        searchValue={searchRequest}
        onSearchReqChange={e => setSearchRequest(e.target.value)}
        tumblerState={isTumblerOn}
        onTumblerChange={e => setIsTumblerOn(e.target.checked)}
        handleSubmit={handleSearchSubmit}
        //tumblerChange={handleSearchSubmit} //он вообще нужен???
      />
      {errorText ?
        <div className='movies__error-text'>{errorText}</div>
        :
        <MoviesCardList
          movies={paginatedMovies}
          isLoading={isLoading}
          // likeState={isLiked}
          likeChange={handleMovieLike}
          handleMore={handleMore}
          showButtonMore={showButtonMore}
      />
      }
    </section>
  );
}

export default Movies;
