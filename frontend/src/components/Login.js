import { useState } from "react";

export default function Login({ onSubmit }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <div className="popup popup_relative">
        <div className="popup__container popup__container_transparent">
          <form className="form" action="./" method="post" name="login__form">
            <h3 className="form__title form__title_white">Вход</h3>
            <div className="form__row">
              <input
                type="email"
                name="email"
                value={email || ""}
                onChange={handleChangeEmail}
                className="form__text form__text_white form__text_name_name"
                id="login-email"
                required
                placeholder="Email"
              />
            </div>
            <div className="form__row">
              <input
                type="password"
                name="password"
                className="form__text form__text_white form__text_name_post"
                id="login-password"
                placeholder="Пароль"
                onChange={handleChangePassword}
                required
                value={password || ""}
              />
            </div>
            <input
              type="submit"
              className="form__button form__button_white"
              value="Войти"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </>
  );
}
