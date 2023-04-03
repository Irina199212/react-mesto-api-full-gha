import PopupWithForm from "../components/PopupWithForm";

import { useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="profile-avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <div className="form__row">
        <input
          type="url"
          ref={avatarRef}
          name="avatar"
          required
          className="form__text form__text_name_link"
          id="avatar-link"
          placeholder="Ссылка на аватар"
        />
        <span className="error" id="avatar-link-error"></span>
      </div>
    </PopupWithForm>
  );
}
