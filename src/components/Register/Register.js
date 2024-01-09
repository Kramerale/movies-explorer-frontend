import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.svg';

function Register () {
  return (
    <section className="register">
      <Link className="register__logo-link" to="/">
        <img className="register__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="register__heading">Добро пожаловать!</h2>
      <form className="register__form">
        <label className="register__label">
          <p className="register__input-title">Имя</p>
          <input className="register__input" name="" type="text" placeholder="Александра" required></input>
          <span className="register__error"></span>
        </label>
        <label className="register__label">
          <p className="register__input-title">E-mail</p>
          <input className="register__input" name="" type="email" placeholder="pochta@yandex.ru" required></input>
          <span className="register__error"></span>
        </label>
        <label className="register__label">
          <p className="register__input-title">Пароль</p>
          <input className="register__input register__input_error" name="" type="password" placeholder="" required></input>
          <span className="register__error">Что-то пошло не так...</span>
        </label>
        <button className="register__form-submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </section>
  )
}

export default Register;
