import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';
import aboutMeImg from '../../images/about-me.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__heading">Студент</h2>
      <div className="about-me__info-container">
        <div className="about-me__info">
          <h3 className="about-me__title">Александра</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 27&nbsp;лет</p>
          <p className="about-me__text">Я&nbsp;живу в&nbsp;Москве. Училась на&nbsp;рекламщика в&nbsp;ЯГПУ им. Ушинского. Долгое время работала в&nbsp;сфере обслуживания клиентов (колл-центр Ренессанс Страхования -&gt; претензионный отдел Авито). Замужем, детей нет. Увлекаюсь йогой, летом катаюсь на&nbsp;вейкборде. Люблю аниме и&nbsp;настольные игры. С&nbsp;конца 2022 года обучаюсь в&nbsp;Яндекс Практикуме. В&nbsp;настоящее время нахожусь в&nbsp;поиске работы.</p>
          <Link to={"https://github.com/Kramerale"} className="about-me__github">Github</Link>
        </div>
        <img className="about-me__img" alt="Фотография студента" src={aboutMeImg}></img>
      </div>
    </section>
  );
}

export default AboutMe;
