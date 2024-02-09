import React, { useEffect, useState } from 'react';
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
    console.log('I am from movies');
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
      setErrorText("Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз");
      localStorage.removeItem("isTumblerOn"); //new
      localStorage.removeItem("searchRequest");
      localStorage.removeItem("movies");
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  // function saveLike () {
  //   Promise.all([moviesApi.getAllMovies(), mainApi.getUserMovies()])
  //   .then(res => {
  //     const [allMovies, savedMovies] = res;

  //   })
  // }

  function handleMovieLike (movie, isLiked) {
    // console.log(isLiked);
    if (isLiked) {
      mainApi.createMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        // owner: currentUser._id,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
      .then(newMovie => {
        console.log(newMovie)
        savedMoviesChange([newMovie, ...savedMovies]);
      })
      .catch(console.error)
    } else {
      debugger;
      mainApi.deleteUserMovie(movie._id)
      .then(() => {
        savedMoviesChange(movies => movies.filter(m => m._id !== movie._id));
        // savedMoviesChange(movies => movies.filter(m => m._id !== movie.id));
      })
      .catch(console.error)
    }
  }

  return (
    <section className="movies">
      <SearchForm
        placeholder="Фильм"
        handleSearchRequestChange={e => setSearchRequest(e.target.value)}
        handleTumbler={e => setIsTumblerOn(e.target.checked)}
        tumblerState={isTumblerOn}
        handleSubmit={handleSearchSubmit}
        tumblerChange={handleSearchSubmit}
      />
      {errorText ?
        <div className='movies__error-text'>{errorText}</div>
        :
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          // likeState={isLiked}
          likeChange={handleMovieLike}
      />
      }
    </section>
  );
}

export default Movies;
