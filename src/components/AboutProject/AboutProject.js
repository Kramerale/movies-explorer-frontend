import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__info">
          <h3 className="about-project__info-title">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__info-title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__info-text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__container">
        <div className="about-project__chronology">
          <p className="about-project__chronology-line about-project__chronology-line_green">1 неделя</p>
          <p className="about-project__chronology-text">Back-end</p>
        </div>
        <div className="about-project__chronology">
          <p className="about-project__chronology-line">4 недели</p>
          <p className="about-project__chronology-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
