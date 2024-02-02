import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm ({ placeholder, handleChange, handleSubmit, tumblerState, tumblerChange }) {
  // const [searchRequest, setSearchRequest] = useState('');

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
          // required
          onChange={handleChange}
        />
        <button className="search-form__button"/>
      </form>
      <FilterCheckbox
        tumblerState={tumblerState}
        tumblerChange={tumblerChange}
      />
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
