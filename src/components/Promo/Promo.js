import React from 'react';
import './Promo.css';
import promoImg from '../../images/promo-img.svg'

function Promo () {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__img" alt="Промо-изображение" src={promoImg}/>
      </div>
    </section>
  );
}

export default Promo;
