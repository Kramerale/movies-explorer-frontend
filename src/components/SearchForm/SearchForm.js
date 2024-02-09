import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm ({ placeholder, handleSearchRequestChange, handleTumbler, handleSubmit, tumblerState }) {

  function handleSearchSubmit(e) {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSearchSubmit}>
        <input
          className="search-form__input"
          type="text"
          placeholder={placeholder}
          onChange={handleSearchRequestChange}
        />
        <button className="search-form__button"/>
      </form>
      <FilterCheckbox
        tumblerState={tumblerState}
        handleTumbler={handleTumbler}
      />
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
