import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
// import Preloader from '../Preloader/Preloader';

function MoviesCardList () {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </ul>
      <button className="movies-cards__more-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
