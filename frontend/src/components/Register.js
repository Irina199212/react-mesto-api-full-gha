import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register({ onSubmit }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
    setEmail(null);
    setPassword(null);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="popup popup_relative">
        <div className="popup__container popup__container_transparent">
          <form
            className="form"
            action="./"
            method="post"
            name="register__form"
          >
            <h3 className="form__title form__title_white">Регистрация</h3>
            <div className="form__row">
              <input
                type="email"
                name="email"
                value={email || ""}
                className="form__text form__text_white form__text_name_name"
                id="register-email"
                required
                onChange={handleChangeEmail}
                placeholder="Email"
              />
            </div>
            <div className="form__row">
              <input
                type="password"
                name="password"
                className="form__text form__text_white form__text_name_post"
                id="register-password"
                value={password || ""}
                placeholder="Пароль"
                onChange={handleChangePassword}
                required
              />
            </div>
            <input
              type="submit"
              className="form__button form__button_white"
              value="Зарегистрироваться"
              onClick={handleSubmit}
            />
            <div className="form__info">
              Уже зарегистрированы?
              <Link to="/signin" className="form__link">
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
