import React from 'react';

function InfoPopup ({ isOpen, ariaLabel, onClose, image, message }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`} aria-label={ariaLabel}>
      <div className="popup__container">
        <button type="button" title="Закрыть" aria-label="Закрыть" className="popup__close-button" onClick={onClose}/>
        <img className="popup__info-image" src={image} alt={message}/>
        <h2 className="popup__info-heading">{message}</h2>
      </div>
    </section>
  );
}

export default InfoPopup;
