import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies ({ movies, savedMovies, handleLike }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [isTumblerOn, setIsTumblerOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    loadFromLocalStorage(); // Загрузить данные из localStorage при монтировании компонента
  }, []);

  useEffect(() => {
    if (displayedMovies.length > 0) {
      handleSearchSubmit();
    }
  }, [isTumblerOn]);

  function loadFromLocalStorage () {
    const storedMovies = localStorage.getItem('movies');
    const storedSearchRequest = localStorage.getItem('searchRequest');
    const storedTumbler = localStorage.getItem('isTumblerOn');

    if (storedMovies) {
      setDisplayedMovies(JSON.parse(storedMovies));
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

    setErrorText("");
    setIsLoading(true);

    localStorage.setItem('searchRequest', searchRequest);

    const filteredData = movies.filter(item =>
      item.nameRU.toLowerCase().includes(searchRequest?.toLowerCase()) ||
      item.nameEN.toLowerCase().includes(searchRequest?.toLowerCase())
      );

    const filteredDataByTumbler = isTumblerOn ?
    filteredData.filter(movie => movie.duration < 40)
    : filteredData;

    localStorage.setItem('isTumblerOn', isTumblerOn);

    if (filteredDataByTumbler.length === 0) {
      setErrorText("Ничего не найдено");
    } else {
      setDisplayedMovies(filteredDataByTumbler);
      localStorage.setItem('movies', JSON.stringify(filteredDataByTumbler));
    }

    setIsLoading(false);
  };

  return (
    <section className="movies">
      <SearchForm
        placeholder="Фильм"
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
      />
      }
    </section>
  );
}

export default Movies;
