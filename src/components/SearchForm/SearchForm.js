import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm ({ placeholder, searchValue, onSearchReqChange, tumblerState, onTumblerChange, handleSubmit }) {

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
          value={searchValue}
          placeholder={placeholder}
          onChange={onSearchReqChange}
        />
        <button className="search-form__button"/>
      </form>
      <FilterCheckbox
        tumblerState={tumblerState}
        handleTumbler={onTumblerChange}
      />
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
