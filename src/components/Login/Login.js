import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';
import logo from '../../images/logo.svg';

function Login ({ handleLoginSubmit, errMessage }) {
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange"
  });

  function onSubmit (data) {
    handleLoginSubmit(data.email, data.password);
    reset();
  }

  return (
    <section className="login">
      <Link className="login__logo-link" to="/">
        <img className="login__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="login__heading">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
      <label className="login__label">
        <p className="login__input-title">E-mail</p>
        <input
          {...register("email", {
            required: "Поле обязательно для заполнения",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Некорректный email"
            }
          })}
          className={`login__input ${errors?.email? "login__input_error" : ""}`}
          type="email"
          placeholder="pochta@yandex.ru"
        />
        <div className="login__error-container">{errors?.email && <span className="login__error-text">{errors?.email?.message || "Что-то пошло не так..."}</span>}</div>
      </label>
      <label className="login__label">
        <p className="login__input-title">E-mail</p>
        <input
          {...register("password", {
            required: "Поле обязательно для заполнения",
          })}
          className={`login__input ${errors?.email? "login__input_error" : ""}`}
          type="password"
        />
        <div className="login__error-container">{errors?.password && <span className="login__error-text">{errors?.password?.message || "Что-то пошло не так..."}</span>}</div>
      </label>
      <div className="login__error-container"><span className="login__error-text login__error-text_about-request">{errMessage}</span></div>
      <button className={`login__submit-button ${isValid ? "" : "login__submit-button_disabled"}`} type="submit">Войти</button>
      </form>
      <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
    </section>
  )

  // const [formValue, setFormValue] = useState({
  //   email: '',
  //   password: ''
  // });

  // function handleChange (e) {
  //   const {name, value} = e.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });
  // }

  // function handleSubmit (e) {
  //   e.preventDefault();
  //   handleLoginSubmit(formValue.email, formValue.password);
  // }

  // return (
  //   <section className="login">
  //     <Link className="login__logo-link" to="/">
  //       <img className="login__logo-img" src={logo} alt="Логотип"></img>
  //     </Link>
  //     <h2 className="login__heading">Рады видеть!</h2>
  //     <form className="login__form" onSubmit={handleSubmit}>
  //       <label className="login__label">
  //         <p className="login__input-title">E-mail</p>
  //         <input className="login__input" name="email" type="email" placeholder="pochta@yandex.ru" onChange={handleChange} required></input>
  //         <span className="login__error"></span>
  //       </label>
  //       <label className="login__label">
  //         <p className="login__input-title">Пароль</p>
  //         <input className="login__input" name="password" type="password" placeholder="" onChange={handleChange} required></input>
  //         <span className="login__error"></span>
  //       </label>
  //       <button className="login__form-submit" type="submit">Войти</button>
  //     </form>
  //     <p className="login__text">Ещё не зарегистрированы? <Link to="/signup" className="login__link">Регистрация</Link></p>
  //   </section>
  // )
}

export default Login;
