import React, { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
// import moviesApi from '../../utils/MoviesApi';
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
// import InfoPopup from '../InfoPopup/InfoPopup';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  // const [infoImage, setInfoImage] = React.useState("");
  // const [infoAriaLabel, setAriaLabel] = React.useState("");
  const [errMessage, setErrMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
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

  function handleRegisterSubmit (name, email, password) {
    mainApi.register(name, email, password)
    .then(() => {
      console.log('Вы зарегистрировались!');
      navigate('/signin');
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
      navigate('/');
    })
    .catch(err => {
      setErrMessage(err.message);
      navigate('/signin');
    })
  }

  React.useEffect(() => {
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

  function signOut () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isTumblerActive");
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
            />
            <Footer />
          </>
        } />

        <Route path="/profile" element={
          <>
            <Header
              isMainPage={false}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              element={Profile}
              currentUser={currentUser}
              isLoggedIn={isLoggedIn}
              signOut={signOut}
              errMessage={errMessage}
              infoMessage={infoMessage}
              handleEditUserInfo={updateUserInfo}
            />
          </>
        } />

        <Route path="/signin" element={
          <Login
            handleLoginSubmit={handleLoginSubmit}
            errMessage={errMessage}
          />
        } />

        <Route path="/signup" element={
          <Register
            handleRegisterSubmit={handleRegisterSubmit}
            errMessage={errMessage}
          />
        } />

        <Route path="*" element={
          <NotFound />
        } />
      </Routes>
      {/* <InfoPopup/> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
