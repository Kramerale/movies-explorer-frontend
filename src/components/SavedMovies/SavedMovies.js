import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies () {
  const [searchRequest, setSearchRequest] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isTumblerActive, setTumblerActive] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    mainApi.getUserMovies()
    .then(data => {
      setSavedMovies(data);
      // console.log(data); //потом удалить
      // const filteredData = data.filter(item =>
      //   item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
      //   item.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
      //   );

      // if (filteredData.length === 0) {
      //   setErrorText("Ничего не найдено");
      // } else {
      //   setMovies(filteredData);
      //   setIsLoading(false);
      // }
    })
    .catch(err => {
      setErrorText("Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз");
      console.log(err);
    })
    // .finally(setIsLoading(false))
  }, [])

  useEffect(() => {
    if (savedMovies.length > 0) {
      handleSearchSubmit();
    }
  }, [isTumblerActive]);

  function handleSearchSubmit () {
    if (!searchRequest) {
      setErrorText("Введите текст запроса в форму поиска фильмов");
      return;
    }

    setErrorText("");
    setIsLoading(true);

    const filteredData = savedMovies.filter(item =>
      item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
      item.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
    );

    const filteredDataByTumbler = isTumblerActive ?
    filteredData.filter(movie => movie.duration < 40)
    : filteredData;

    if (filteredDataByTumbler.length === 0) {
      setErrorText("Ничего не найдено");
    } else {
      setSavedMovies(filteredDataByTumbler);
      setIsLoading(false);
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm
        placeholder='Фильм'
        handleChange={e => setSearchRequest(e.target.value)}
        handleSubmit={handleSearchSubmit}
      />
      <MoviesCardList
        movies={savedMovies}
        isLoading={isLoading}
      />
    </section>
  );
}

export default SavedMovies;
