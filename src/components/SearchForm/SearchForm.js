import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm () {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" placeholder="Фильм" required/>
        <button className="search-form__button"/>
      </form>
      <FilterCheckbox />
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
