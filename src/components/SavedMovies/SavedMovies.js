import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies () {
  const [searchRequest, setSearchRequest] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    mainApi.getUserMovies()
    .then(data => {
      console.log(data); //потом удалить
      const filteredData = data.filter(item =>
        item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
        );

      if (filteredData.length === 0) {
        setErrorText("Ничего не найдено");
      } else {
        setMovies(filteredData);
        setIsLoading(false);
      }
    })
    .catch(err => {
      setErrorText("Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз");
      console.log(err);
    })
  }, [])

  return (
    <section className="saved-movies">
      <SearchForm
        placeholder='Фильм'
        handleChange={e => setSearchRequest(e.target.value)}
      />
      <MoviesCardList
        movies={movies}
        isLoading={isLoading}
      />
    </section>
  );
}

export default SavedMovies;
