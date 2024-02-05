import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import {useFormWithValidation} from '../../hooks/useFormWithValidation';
import logo from '../../images/logo.svg';

function Login ({ handleLoginSubmit, errMessage }) {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  function handleSubmit (e) {
    e.preventDefault();
    handleLoginSubmit(values.email, values.password);
    resetForm();
  }

  return (
    <section className="login">
      <Link className="login__logo-link" to="/">
        <img className="login__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="login__heading">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">
          <p className="login__input-title">E-mail</p>
          <input
            className={`login__input ${errors.email ? "login__input_error" : ""}`}
            name="email"
            type="email"
            placeholder="pochta@yandex.ru"
            onChange={handleChange}
            pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
            required
          />
          <div className="login__error-container"><span className="login__error-text">{errors.email}</span></div>
        </label>
        <label className="login__label">
          <p className="login__input-title">Пароль</p>
          <input
            className={`login__input ${errors.password ? "login__input_error" : ""}`}
            name="password"
            type="password"
            placeholder=""
            onChange={handleChange}
            required
          />
          <div className="login__error-container"><span className="login__error-text">{errors.password}</span></div>
        </label>
        <div className="login__error-container"><span className="login__error-text login__error-text_about-request">{errMessage}</span></div>
        <button className={`login__submit-button ${isValid ? "" : "login__submit-button_disabled"}`} type="submit">Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
    </section>
  )
}

export default Login;
