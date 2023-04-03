export default class Api {
  constructor(options) {
    this._cardsUrl = options.cardsUrl;
    this._baseAuthUrl = options.baseAuthUrl;
    this._userInfoUrl = options.userInfoUrl;
    this._userInfoUpdateUrl = options.userInfoUpdateUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  signup(email, password) {
    return fetch(`${this._baseAuthUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => this._getResponseData(res));
  }

  signin(email, password) {
    return fetch(`${this._baseAuthUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => this._getResponseData(res));
  }

  getTokenContent = (token) => {
    return fetch(`${this._baseAuthUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  };

  getInitialCards(token) {
    return fetch(`${this._cardsUrl}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }).then((res) => this._getResponseData(res));
  }

  addCard(cardData, token) {
    return fetch(`${this._cardsUrl}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(cardData),
    }).then((res) => this._getResponseData(res));
  }

  removeCard(id, token) {
    return fetch(`${this._cardsUrl}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked, token) {
    let action = 'PUT';
    if (!isLiked) action = 'DELETE';

    return fetch(`${this._cardsUrl}/${id}/likes `, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: action,
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo(token) {
    return fetch(`${this._userInfoUrl}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }).then((res) => this._getResponseData(res));
  }

  updateUserInfo(userInfo, token) {
    return fetch(`${this._userInfoUpdateUrl}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(userInfo),
    }).then((res) => this._getResponseData(res));
  }
  updateUserAvatar(userInfo, token) {
    return fetch(`${this._userInfoUpdateUrl}/avatar`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(userInfo),
    }).then((res) => this._getResponseData(res));
  }
}

export const api = new Api({
  cardsUrl: 'http://api.irinawork.students.nomoredomains.monster/cards',
  userInfoUrl: 'http://api.irinawork.students.nomoredomains.monster/users/me',
  userInfoUpdateUrl:
    'http://api.irinawork.students.nomoredomains.monster/users/me',
  baseAuthUrl: 'http://api.irinawork.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
