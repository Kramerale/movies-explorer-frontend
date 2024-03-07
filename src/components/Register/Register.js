import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useFormWithValidation} from '../../hooks/useFormWithValidation';
import './Register.css';
import logo from '../../images/logo.svg';

function Register ({ handleRegisterSubmit, errMessage, turnOffErr }) {
  useEffect(() => {
    return () => {
      turnOffErr('');
    }
  }, [])

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  function handleSubmit (e) {
    e.preventDefault();
    handleRegisterSubmit(values.name, values.email, values.password);
    resetForm();
  }

  return (
    <section className="register">
      <Link className="register__logo-link" to="/">
        <img className="register__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="register__heading">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__label">
          <p className="register__input-title">Имя</p>
          <input
            className={`register__input ${errors.name ? "register__input_error" : ""}`}
            name="name"
            type="text"
            placeholder="Имя"
            onChange={handleChange}
            pattern='^[a-zA-Zа-яА-ЯёЁ\s\-]+$'
            required
          />
          <div className="register__error-container"><span className="register__error-text">{errors.name}</span></div>
        </label>
        <label className="register__label">
          <p className="register__input-title">E-mail</p>
          <input
            className={`register__input ${errors.email ? "register__input_error" : ""}`}
            name="email"
            type="email"
            placeholder="pochta@yandex.ru"
            onChange={handleChange}
            // pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|\(".+"\))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required
          />
          <div className="register__error-container"><span className="register__error-text">{errors.email}</span></div>
        </label>
        <label className="register__label">
          <p className="register__input-title">Пароль</p>
          <input
            className={`register__input ${errors.password ? "register__input_error" : ""}`}
            name="password"
            type="password"
            placeholder=""
            onChange={handleChange}
            required
          />
          <div className="register__error-container"><span className="register__error-text">{errors.password}</span></div>
        </label>
        <div className="register__error-container"><span className="register__error-text register__error-text_about-request">{errMessage}</span></div>
        <button className={`register__submit-button ${isValid ? "" : "register__submit-button_disabled"}`} type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </section>
  )
}

export default Register;
