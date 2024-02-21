import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies () {
  const [savedMovies, setSavedMovies] = useState([]);
  const [sortedSavedMovies, setSortedSavedMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isTumblerOn, setIsTumblerOn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    mainApi.getUserMovies()
    .then(data => {
      setSavedMovies(data);
    })
    .catch((err) => {
      setErrorText("Ничего не найдено");
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [])

  useEffect(() => {
    if (savedMovies.length > 0) {
      handleSearchSubmit();
    }
  }, [isTumblerOn]);

  function handleSearchSubmit () {
    setIsLoading(true);

    const filteredData = savedMovies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
      );

    const filteredDataByTumbler = isTumblerOn ?
    filteredData.filter(movie => movie.duration < 40)
    : filteredData;

    if (filteredDataByTumbler.length === 0) {
      setErrorText("Ничего не найдено");
      setIsLoading(false);
    } else {
      setSortedSavedMovies(filteredDataByTumbler);
      setIsLoading(false);
    }
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
        searchValue={searchRequest}
        onSearchReqChange={e => setSearchRequest(e.target.value)}
        tumblerState={isTumblerOn}
        onTumblerChange={e => setIsTumblerOn(e.target.checked)}
        handleSubmit={handleSearchSubmit}
      />
      {errorText ?
        <div className='movies__error-text'>{errorText}</div>
        :
        <MoviesCardList
          movies={sortedSavedMovies.length > 0 ? sortedSavedMovies : savedMovies}
          isLoading={isLoading}
          onSavedMovieDelete={handleDeleteMovie}
        />
      }
    </section>
  );
}

export default SavedMovies;
