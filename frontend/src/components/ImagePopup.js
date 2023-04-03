export default function ImagePopup({ card, onClose }) {
  const classes = card
    ? `popup popup_image popup_opened`
    : `popup popup_image`;
  return (
    <div className={classes}>
      <div className="popup__container popup__container_image">
        <button
          className="popup__close"
          type="button"
          aria-label="Кнопка закрытия"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img src={card?.link} className="popup__image" alt={card?.name} />
          <figcaption className="popup__text">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
