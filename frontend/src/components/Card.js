import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button_active"
  }`;

  const likesCount = card.likes.length || ''

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__delete"
          type="button"
          aria-label="Кнопка удаления"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        className="element__image"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__body">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          ></button>
          <div className="element__counter-like">{likesCount}</div>
        </div>
      </div>
    </article>
  );
}
