import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import './Profile.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {useFormWithValidation} from '../../hooks/useFormWithValidation';

function Profile ({ signOut, handleEditUserInfo, errMessage, infoMessage }) {
  const [isEditButtonOn, setEditButtonOn] = useState(false);
  const [formChanged, setFormChanged] = useState();

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit (e) {
    e.preventDefault();
    handleEditUserInfo(values.name, values.email);
    resetForm();
    setFormChanged(false);
  }

  useEffect(() => {
    const isFormChanged =
      values.name !== currentUser.name || values.email !== currentUser.email;
    setFormChanged(isFormChanged);
  }, [currentUser, values]);

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
        <button className="profile__edit-button" type="button" onClick={() => setEditButtonOn(!isEditButtonOn)}>Редактировать</button>
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
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__label">
            <p className="profile__title">Имя</p>
            <input
              className={`profile__input ${errors.name ? "profile__input_error" : ""}`}
              name="name"
              type="text"
              placeholder="Имя"
              defaultValue={currentUser.name}
              value={values.name}
              onChange={handleChange}
              // pattern='/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/'
              required
            />
            <div className="profile__message-container"><span className="profile__error-text">{errors.name}</span></div>
          </label>
          <label className="profile__label">
            <p className="profile__title">E-mail</p>
            <input
              className={`profile__input ${errors.email ? "profile__input_error" : ""}`}
              name="email"
              type="email"
              placeholder="pochta@yandex.ru"
              defaultValue={currentUser.email}
              value={values.email}
              onChange={handleChange}
              pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|\(".+"\))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
              required
            />
            <div className="profile__message-container"><span className="profile__error-text">{errors.email}</span></div>
          </label>
          <div className="profile__message-container">
            {errMessage?
              <span className="profile__error-text profile__error-text_about-request">{errMessage}</span>
              : <span className="profile__error-text profile__error-text_about-request-success">{infoMessage}</span>
            }
          </div>
          <button
            className={`profile__submit-button ${isValid && formChanged ? "" : "profile__submit-button_disabled"}`}
            type="submit"
            disabled={!isValid || !formChanged}
            >
              Редактировать
          </button>
        </form>
      </section>
    )
  }
}

export default Profile;
