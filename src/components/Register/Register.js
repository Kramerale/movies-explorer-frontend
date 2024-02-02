import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Register.css';
import logo from '../../images/logo.svg';

function Register ({ handleRegisterSubmit, errMessage }) {
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange"
  });

  function onSubmit (data) {
    handleRegisterSubmit(data.name, data.email, data.password);
    reset();
  }

  return (
    <section className="register">
      <Link className="register__logo-link" to="/">
        <img className="register__logo-img" src={logo} alt="Логотип"></img>
      </Link>
      <h2 className="register__heading">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="register__label">
          <p className="register__input-title">Имя</p>
          <input
            {...register("name", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимальная длина поля - 2 символа"
              },
              maxLength: {
                value: 30,
                message: "Максимальная длина поля - 30 символов"
              },
              pattern: {
                value: /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/,
                message: "Некорректное имя"
              }
            })}
            className={`register__input ${errors?.name? "register__input_error" : ""}`}
            type="text"
            placeholder="Александра"
          />
          <div className="register__error-container">{errors?.name && <span className="register__error-text">{errors?.name?.message || "Что-то пошло не так..."}</span>}</div>
        </label>
        <label className="register__label">
          <p className="register__input-title">E-mail</p>
          <input
            {...register("email", {
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Некорректный email"
              }
            })}
            className={`register__input ${errors?.email? "register__input_error" : ""}`}
            type="email"
            placeholder="pochta@yandex.ru"
          />
          <div className="register__error-container">{errors?.email && <span className="register__error-text">{errors?.email?.message || "Что-то пошло не так..."}</span>}</div>
        </label>
        <label className="register__label">
          <p className="register__input-title">Пароль</p>
          <input
            {...register("password", {
              required: "Поле обязательно для заполнения",
            })}
            className={`register__input ${errors?.password? "register__input_error" : ""}`}
            type="password"
            placeholder=""
          />
          <div className="register__error-container">{errors?.password && <span className="register__error-text">{errors?.password?.message || "Что-то пошло не так..."}</span>}</div>
        </label>
        <div className="register__error-container"><span className="register__error-text register__error-text_about-request">{errMessage}</span></div>
        <button className={`register__submit-button ${isValid ? "" : "register__submit-button_disabled"}`} type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </section>
  )

  // const [formValue, setFormValue] = useState({
  //   name: '',
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
  //   handleRegisterSubmit(formValue.name, formValue.email, formValue.password);
  // }

  // return (
  //   <section className="register">
  //     <Link className="register__logo-link" to="/">
  //       <img className="register__logo-img" src={logo} alt="Логотип"></img>
  //     </Link>
  //     <h2 className="register__heading">Добро пожаловать!</h2>
  //     <form className="register__form" onSubmit={handleSubmit}>
  //       <label className="register__label">
  //         <p className="register__input-title">Имя</p>
  //         <input className="register__input" name="name" type="text" placeholder="Александра" onChange={handleChange} required></input>
  //         <span className="register__error"></span>
  //       </label>
  //       <label className="register__label">
  //         <p className="register__input-title">E-mail</p>
  //         <input className="register__input" name="email" type="email" placeholder="pochta@yandex.ru" onChange={handleChange} required></input>
  //         <span className="register__error"></span>
  //       </label>
  //       <label className="register__label">
  //         <p className="register__input-title">Пароль</p>
  //         <input className="register__input register__input_error" name="password" type="password" placeholder="" onChange={handleChange} required></input>
  //         <span className="register__error"></span>
  //       </label>
  //       <button className="register__submit-button" type="submit">Зарегистрироваться</button>
  //     </form>
  //     <p className="register__text">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
  //   </section>
  // )
}

export default Register;
