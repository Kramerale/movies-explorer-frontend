import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';

function Login () {
  return (
    <section className="login">
      <Link className="login__logo-link" to="/">
        <img className="login__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="login__heading">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__label">
          <p className="login__input-title">E-mail</p>
          <input className="login__input" name="" type="email" placeholder="pochta@yandex.ru" required></input>
          <span className="login__error"></span>
        </label>
        <label className="login__label">
          <p className="login__input-title">Пароль</p>
          <input className="login__input" name="" type="password" placeholder="" required></input>
          <span className="login__error"></span>
        </label>
        <button className="login__form-submit" type="submit">Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
    </section>
  )
}

export default Login;
