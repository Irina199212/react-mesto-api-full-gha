import PopupWithForm from "../components/PopupWithForm";
import { useState } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: name, link: link });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="add-card"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <div className="form__row">
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          value={name}
          className="form__text form__text_name_name"
          id="card-name"
          required
          onChange={handleChangeName}
          placeholder="Название"
        />
        <span className="error" id="card-name-error"></span>
      </div>
      <div className="form__row">
        <input
          type="url"
          name="link"
          required
          value={link}
          className="form__text form__text_name_link"
          id="card-link"
          onChange={handleChangeLink}
          placeholder="Ссылка на картинку"
        />
        <span className="error" id="card-link-error"></span>
      </div>
    </PopupWithForm>
  );
}
