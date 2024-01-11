import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
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
  return (
    <Routes>
      <Route path="/" exact element={
        <>
          <Header
            isMainPage={true}
            isLoggedIn={false}
          />
          <Main />
          <Footer />
        </>
      } />

      <Route path="/movies" element={
        <>
          <Header
            isMainPage={false}
            isLoggedIn={true}
          />
          <Movies />
          <Footer />
        </>
      } />

      <Route path="/saved-movies" element={
        <>
          <Header
            isMainPage={false}
            isLoggedIn={true}
          />
          <SavedMovies />
          <Footer />
        </>
      } />

      <Route path="/profile" element={
        <>
          <Header
            isMainPage={false}
            isLoggedIn={true}
          />
          <Profile />
        </>
      } />

      <Route path="/signin" element={
        <Login />
      } />

      <Route path="/signup" element={
        <Register />
      } />

      <Route path="*" element={
        <NotFound />
      } />
    </Routes>
  );
}

export default App;
