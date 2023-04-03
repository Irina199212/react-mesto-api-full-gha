import PopupWithForm from "../components/PopupWithForm";

import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="profile-form"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <div className="form__row">
        <input
          type="text"
          name="name"
          value={name || ""}
          className="form__text form__text_name_name"
          id="profile-name"
          minLength="2"
          maxLength="40"
          required
          placeholder="Имя"
          onChange={handleChangeName}
        />
        <span className="error" id="profile-name-error"></span>
      </div>
      <div className="form__row">
        <input
          type="text"
          name="post"
          className="form__text form__text_name_post"
          id="profile-post"
          placeholder="О себе"
          minLength="2"
          required
          value={description || ""}
          maxLength="200"
          onChange={handleChangeDescription}
        />
        <span className="error" id="profile-post-error"></span>
      </div>
    </PopupWithForm>
  );
}
