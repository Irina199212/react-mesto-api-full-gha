import { useContext } from "react";
import Card from "../components/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  if (currentUser) {
    return (
      <main className="main">
        <section className="profile">
          <button
            className="profile__avatar"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Фото"
              className="profile__avatar-picture"
            />
          </button>
          <div className="profile__info">
            <div className="profile__block">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                aria-label="Кнопка редактирования профиля"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__button-add"
            type="button"
            aria-label="Кнопка добавления"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements" aria-label="Фото мест">
              {props.cards.map((card) => (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              ))}
        </section>
      </main>
    );
  } else {
    return <></>;
  }
}
