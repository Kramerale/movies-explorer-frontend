import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox ({ handleTumbler, tumblerState }) {

  return (
    <div className="checkbox">
      <p className="checkbox__title">Короткометражки</p>
      <label className="checkbox__switch">
        <input className="checkbox__input" type="checkbox" checked={tumblerState} onChange={handleTumbler}/>
        <span className="checkbox__slider"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
