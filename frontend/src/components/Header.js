import logo from "../images/logo.svg";

import { Link, Route, Routes } from "react-router-dom";
export default function Header({ email, loggedIn, onLogout }) {
  function handleSignOut(e) {
    e.preventDefault();
    onLogout();
  }

  return (
    <header className="header">
      <a href="/">
        <img src={logo} className="logo" alt="Место логотип" />
      </a>
      <div className="user">
        {loggedIn && email && (
          <>
            <span>{email}</span>
            <Link to="/" className="user__link" onClick={handleSignOut}>
              Выйти
            </Link>
          </>
        )}
        {!loggedIn && (
          <Routes>
            <Route
              path="/signup"
              element={
                <Link to="/signin" className="user__link">
                  Войти
                </Link>
              }
            />
            <Route
              path="/signin"
              element={
                <Link to="/signup" className="user__link">
                  Регистрация
                </Link>
              }
            />
          </Routes>
        )}
      </div>
    </header>
  );
}
