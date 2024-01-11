import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="technologies" id="technologies">
      <h2 className="technologies__heading">Технологии</h2>
      <h3 className="technologies__title">7 технологий</h3>
      <p className="technologies__text">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
      <ul className="technologies__list">
        <li className="technologies__item">HTML</li>
        <li className="technologies__item">CSS</li>
        <li className="technologies__item">JS</li>
        <li className="technologies__item">React</li>
        <li className="technologies__item">Git</li>
        <li className="technologies__item">Express.js</li>
        <li className="technologies__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
