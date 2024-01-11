import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile () {
  return (
    <section className="profile">
      <h2 className="profile__heading">Привет, Александра!</h2>
      <form className="profile__form">
        <label className="profile__label">
          <p className="profile__input-title">Имя</p>
          <input className="profile__input" name="" type="text" placeholder="Имя" required></input>
        </label>
        <label className="profile__label">
          <p className="profile__input-title">E-mail</p>
          <input className="profile__input" name="" type="email" placeholder="Email" required></input>
        </label>
        <button className="profile__form-submit" type="submit">Редактировать</button>
      </form>
      <Link to="/signin" className="profile__signout-link">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;
