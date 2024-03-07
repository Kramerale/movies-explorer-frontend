import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getToken(jwt)
      .then(data => {
        if (data) {
          setLoggedIn(true);
          navigate('/');
        } else {
          setLoggedIn(false);
        }
      })
      .catch(err => {
        setLoggedIn(false);
        console.error(err);
      })
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      moviesApi.getAllMovies()
      .then(data => {
        setMovies(data);
      })
      .catch(err => {
        setErrMessage(err.message);
      })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserMovies()
      .then(data => {
        setSavedMovies(data);
      })
      .catch(err => {
        setErrMessage(err.message);
      })
    }
  }, [isLoggedIn])

  function handleRegisterSubmit (name, email, password) {
    mainApi.register(name, email, password)
    .then(() => {
      handleLoginSubmit(email, password);
    })
    .then(() => {
      navigate('/movies');
    })
    .catch(err => {
      setErrMessage(err.message);
      navigate('/signup');
    })
  }

  function handleLoginSubmit (email, password) {
    mainApi.login(email, password)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
      navigate('/movies');
    })
    .catch(err => {
      setErrMessage(err.message);
      navigate('/signin');
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
      .then(res => {
        const userData = res;
        setCurrentUser(userData);
      })
      .catch(console.error)
    }
  }, [isLoggedIn])

  function updateUserInfo (name, email) {
    mainApi.editUserInfo(name, email)
    .then(newUserInfo => {
      setInfoMessage('Профиль успешно обновлен!');
      setCurrentUser(newUserInfo);
    })
    .catch(err => {
      setErrMessage(err.message);
    })
  }

  function handleLike (movie, isLiked) {
    if (isLiked) {
      const savedMovieIds = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;
      mainApi.deleteUserMovie(savedMovieIds)
      .then(() => {
        const updatedSavedMoviesList = savedMovies.filter(savedMovie => savedMovie.movieId !== movie.id)
        setSavedMovies(updatedSavedMoviesList);
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
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch(console.error)
    }
  }

  function signOut () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isTumblerOn");
    localStorage.removeItem("searchRequest");
    localStorage.removeItem("movies");
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" exact element={
          <>
            <Header
              isMainPage={true}
              isLoggedIn={isLoggedIn}
            />
            <Main />
            <Footer />
          </>
        } />

        <Route path="/movies" element={
          <>
            <Header
              isMainPage={false}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              element={Movies}
              isLoggedIn={isLoggedIn}
              movies={movies}
              savedMovies={savedMovies}
              handleLike={handleLike}
            />
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header
              isMainPage={false}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              movies={movies}
              savedMovies={savedMovies}
              handleLike={handleLike}
            />
            <Footer />
          </>
        }/>

        <Route path="/profile" element={
          <>
            <Header
              isMainPage={false}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              signOut={signOut}
              errMessage={errMessage}
              infoMessage={infoMessage}
              handleEditUserInfo={updateUserInfo}
              turnOffErr={setErrMessage}
            />
          </>
        } />

        <Route path="/signin" element={
          <Login
            handleLoginSubmit={handleLoginSubmit}
            errMessage={errMessage}
            turnOffErr={setErrMessage}
          />
        } />

        <Route path="/signup" element={
          <Register
            handleRegisterSubmit={handleRegisterSubmit}
            errMessage={errMessage}
            turnOffErr={setErrMessage}
          />
        } />

        <Route path="*" element={
          <NotFound />
        } />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
