import Footer from "../components/Footer";
import Header from "../components/Header";
import ImagePopup from "../components/ImagePopup";
import Main from "../components/Main";
import { api } from "../utils/api";

import InfoTooltip from "../components/InfoTooltip";

import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import EditProfilePopup from "../components/EditProfilePopup";
import ProtectedRouteElement from "../components/ProtectedRoute";

import Login from "../components/Login";
import Register from "../components/Register";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem("jwt");
      Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)])
        .then(([info, initialCards]) => {
          setCurrentUser(info.data);
          setCards(initialCards.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [email, loggedIn]);

  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getTokenContent(jwt)
        .then((tokenData) => {
          if (tokenData) {
            setLoggedIn(true);
            setEmail(tokenData.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(userInfo) {
    const jwt = localStorage.getItem("jwt");
    api
      .updateUserInfo(userInfo, jwt)
      .then((info) => {
        setCurrentUser(info.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userInfo) {
    const jwt = localStorage.getItem("jwt");
    api
      .updateUserAvatar(userInfo, jwt)
      .then((info) => {
        setCurrentUser(info.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    api
      .removeCard(card._id, jwt)
      .then(() => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(place) {
    const jwt = localStorage.getItem("jwt");
    api
      .addCard(place, jwt)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    setLoggedIn(false);
    setEmail(null);
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  }

  function handleAuthSubmit(email, password) {
    api
      .signin(email, password)
      .then((response) => {
        if (response.jwt) {
          localStorage.setItem("jwt", response.jwt);
          checkToken();
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsError(true);
        setMessage(`Что-то пошло не так! Попробуйте ещё раз. ${err}`);
      });
  }

  function handleRegisterSubmit(email, password) {
    api
      .signup(email, password)
      .then(() => {
        setIsError(false);
        setMessage(`Вы успешно зарегистрировались!`);
      })
      .catch((err) => {
        setIsError(true);
        setMessage(`Что-то пошло не так! Попробуйте ещё раз. ${err}`);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  const closeTooltip = () => {
    setIsInfoTooltipOpen(false);
    setMessage();
    setIsError(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} loggedIn={loggedIn} onLogout={signOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/signup"
          element={<Register onSubmit={handleRegisterSubmit} />}
        />
        <Route path="/signin" element={<Login onSubmit={handleAuthSubmit} />} />
      </Routes>
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        message={message}
        onClose={closeTooltip}
        isError={isError}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
