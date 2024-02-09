import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies () {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isTumblerOn, setIsTumblerOn] = useState(false);

  useEffect(() => {
    if (savedMovies.length > 0) {
      handleSearchSubmit();
    }
  }, [isTumblerOn]);

  function handleSearchSubmit () {
    setIsLoading(true);

    mainApi.getUserMovies()
    .then(data => {
      const filteredData = data.filter(item =>
        item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
        );

      const filteredDataByTumbler = isTumblerOn ?
      filteredData.filter(movie => movie.duration < 40)
      : filteredData;


      if (filteredDataByTumbler.length === 0) {
        setErrorText("Ничего не найдено");
      } else {
        setSavedMovies(filteredDataByTumbler);
      }
    })
    .catch(err => {
      setErrorText("Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз");
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  function handleDeleteMovie (movie) {
    mainApi.deleteUserMovie(movie._id)
    .then(() => {
      setSavedMovies(movies => movies.filter(m => m.movieId !== movie.movieId));
    })
    .catch(console.error)
  }

  return (
    <section className="saved-movies">
      <SearchForm
        placeholder='Фильм'
        handleChange={e => setSearchRequest(e.target.value)}
        handleTumbler={e => setIsTumblerOn(e.target.checked)}
        tumblerState={isTumblerOn}
        handleSubmit={handleSearchSubmit}
        tumblerChange={handleSearchSubmit}
      />
      {errorText ?
        <div className='movies__error-text'>{errorText}</div>
        :
        <MoviesCardList
          movies={savedMovies}
          isLoading={isLoading}
          onSavedMovieDelete={handleDeleteMovie}
        />
      }
    </section>
  );
}

export default SavedMovies;
