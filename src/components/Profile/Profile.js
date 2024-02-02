import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Profile.css';

function Profile ({ signOut, currentUser, handleEditUserInfo, errMessage, infoMessage }) {
  //при сабмите изменений не забыть поменять данный стейт на false
  const [isEditButtonOn, setEditButtonOn] = useState(false);

  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange"
  });

  function onSubmit (data) {
    //alert(JSON.stringify(data));
    handleEditUserInfo(data.name, data.email);
    setEditButtonOn(false);
    reset();
  }

  if (isEditButtonOn === false) {
    return (
      <section className="profile">
        <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
        <div className="profile__columns">
          <div className="profile__rows">
            <h3 className="profile__title">Имя</h3>
            <p className="profile__info">{currentUser.name}</p>
          </div>
          <div className="profile__rows">
            <h3 className="profile__title">E-mail</h3>
            <p className="profile__info">{currentUser.email}</p>
          </div>
        </div>
        <button className="profile__edit-button" type="button" onClick={() => setEditButtonOn(true)}>Редактировать</button>
        <Link
          to="/"
          className="profile__signout-link"
          onClick={signOut}
        >Выйти из аккаунта</Link>
      </section>
    )
  } else {
    return (
      <section className="profile">
        <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="profile__label">
          <p className="profile__title">Имя</p>
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
            className={`profile__input ${errors?.name? "profile__input_error" : ""}`}
            type="text"
            placeholder="Имя"
            defaultValue={currentUser.name}
          />
          <div className="profile__message-container">{errors?.name && <span className="profile__error-text">{errors?.name?.message || "Что-то пошло не так..."}</span>}</div>
        </label>
        <label className="profile__label">
          <p className="profile__title">E-mail</p>
          <input
            {...register("email", {
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Некорректный email"
              }
            })}
            className="profile__input"
            type="email"
            placeholder="pochta@yandex.ru"
            defaultValue={currentUser.email}
          />
          <div className="profile__message-container">{errors?.email && <span className="profile__error-text">{errors?.email?.message || "Что-то пошло не так..."}</span>}</div>
        </label>
        {/* {errMessage?
        <div className="profile__message-container"><span className="profile__error-text profile__error-text_about-request">{errMessage}</span></div>
        :
        <div className="profile__message-container"><span className="profile__error-text profile__error-text_about-request">{infoMessage}</span></div>
        } */}
        <div className="profile__message-container"><span className="profile__error-text profile__error-text_about-request">{errMessage}</span></div>
        <button className={`profile__submit-button ${isValid ? "" : "profile__submit-button_disabled"}`} type="submit">Редактировать</button>
        </form>
      </section>

      // <section className="profile">
      //   <h2 className="profile__heading">Привет, {currentUser.name}!</h2>
      //   <form className="profile__form">
      //     <label className="profile__label">
      //       <p className="profile__title">Имя</p>
      //       <input
      //         className="profile__input"
      //         name="name"
      //         type="text"
      //         placeholder="Имя"
      //         value={currentUser.name}
      //         required
      //       />
      //       <span className="profile__error"></span>
      //     </label>
      //     <label className="profile__label">
      //       <p className="profile__title">E-mail</p>
      //       <input
      //         className="profile__input"
      //         name="email"
      //         type="email"
      //         placeholder="pochta@yandex.ru"
      //         value={currentUser.email}
      //         required
      //       />
      //       <span className="profile__error"></span>
      //     </label>
      //     <span className="profile__error profile__error_about-request"></span>
      //     <button className="profile__submit-button" type="submit">Редактировать</button>
      //   </form>
      // </section>
    )
  }
}

export default Profile;
