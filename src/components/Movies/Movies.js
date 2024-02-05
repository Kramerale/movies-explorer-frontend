import React, { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies ({ movies }) {
  const [searchRequest, setSearchRequest] = useState('');
  // const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isTumblerActive, setTumblerActive] = useState(false);
  const [isLiked, setLiked] = useState(false);

  // Функция для сохранения данных в localStorage
  function saveToLocalStorage () {
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.setItem('searchRequest', searchRequest);
    localStorage.setItem('isTumblerActive', JSON.stringify(isTumblerActive));
  };

  // Функция для загрузки данных из localStorage
  // function loadFromLocalStorage () {
  //   const storedMovies = localStorage.getItem('movies');
  //   const storedSearchRequest = localStorage.getItem('searchRequest');
  //   const storedIsTumblerActive = localStorage.getItem('isTumblerActive');

  //   if (storedMovies) {
  //     setMovies(JSON.parse(storedMovies));
  //   }

  //   if (storedSearchRequest) {
  //     setSearchRequest(storedSearchRequest);
  //   }

  //   if (storedIsTumblerActive) {
  //     setTumblerActive(JSON.parse(storedIsTumblerActive));
  //   }
  // };

  // useEffect(() => {
  //   saveToLocalStorage(); // Сохранить данные в localStorage при изменении movies, searchRequest или isTumblerActive
  // }, [movies, searchRequest, isTumblerActive]);

  // useEffect(() => {
  //   loadFromLocalStorage(); // Загрузить данные из localStorage при монтировании компонента
  // }, []);

  // useEffect(() => {
  //   if (movies.length > 0) {
  //     handleSearchSubmit();
  //   }
  // }, [isTumblerActive]);

  function handleTumbler () {
    setTumblerActive (prev => !prev);
    saveToLocalStorage();
  };

  function handleLike () {
    setLiked (prev => !prev);
  }

  // function handleSearchSubmit () {
  //   if (!searchRequest) {
  //     setErrorText("Введите текст запроса в форму поиска фильмов");
  //     return;
  //   }

  //   setErrorText("");
  //   setIsLoading(true);

  //   moviesApi.getAllMovies()
  //   .then(data => {
  //     const filteredData = data.filter(item =>
  //       item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()) ||
  //       item.nameEN.toLowerCase().includes(searchRequest.toLowerCase())
  //       );

  //     const filteredDataByTumbler = isTumblerActive ?
  //     filteredData.filter(movie => movie.duration < 40)
  //     : filteredData;

  //     if (filteredDataByTumbler.length === 0) {
  //       setErrorText("Ничего не найдено");
  //     } else {
  //       setMovies(filteredDataByTumbler);
  //       // setIsLoading(false);
  //       saveToLocalStorage();
  //     }
  //   })
  //   .catch(err => {
  //     setErrorText("Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз");
  //     localStorage.removeItem("isTumblerActive");
  //     localStorage.removeItem("searchRequest");
  //     localStorage.removeItem("movies");
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     setIsLoading(false);
  //   })
  // };

  //function handleMovieLike
  //function handleMovieDeleteLike

  return (
    <section className="movies">
      <SearchForm
        placeholder="Фильм"
        handleChange={e => setSearchRequest(e.target.value)}
        // handleSubmit={handleSearchSubmit}
        tumblerState={isTumblerActive}
        tumblerChange={handleTumbler}
      />
      {errorText ?
        <div className='movies__error-text'>{errorText}</div>
        :
        <MoviesCardList
        movies={movies}
        isLoading={isLoading}
        likeState={isLiked}
        likeChange={handleLike}
      />
      }
    </section>
  );
}

export default Movies;
