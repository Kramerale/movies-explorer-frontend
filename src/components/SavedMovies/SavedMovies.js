import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies ({movies, savedMovies, handleLike}) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isTumblerOn, setIsTumblerOn] = useState(false);

  useEffect(() => {
    if (savedMovies.length > 0) {
      handleSearchSubmit();
    }
  }, [isTumblerOn]);

  useEffect(() => {
    setDisplayedMovies(movies);
  }, []);

  function handleSearchSubmit () {
    setIsLoading(true);

    const filteredData = movies.filter(movie =>
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
      setDisplayedMovies(filteredDataByTumbler);
      setIsLoading(false);
    }
  };

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
          movies={displayedMovies}
          savedMovies={savedMovies}
          isLoading={isLoading}
          handleLike={handleLike}
          isAllSaved={true}
        />
      }
    </section>
  );
}

export default SavedMovies;
