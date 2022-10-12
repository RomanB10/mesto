export class Api {
 /* #onResponse(res){
     res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }*/
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
/*  _getResponse(res) {
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }*/

  //Загрузка карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/v1/cohort-51/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
  }

  //Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/v1/cohort-51/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
  //Удаление карточки
  removeCard(idCard) {
    return fetch(`${this._url}/v1/cohort-51/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Постановка лайка  PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  addLike(idCard) {
    return fetch(`${this._url}/v1/cohort-51/cards/${idCard}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  ///Cнятие лайка DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  deleteLike(idCard) {
    return fetch(`${this._url}/v1/cohort-51/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Загрузка информации о пользователе с сервера
  getInfoUser() {
    return fetch(`${this._url}/v1/cohort-51/users/me`, {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Редактирование профиля на сервере
  editInfoUser(data) {
    return fetch(`${this._url}/v1/cohort-51/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  //Смена АВАТАРА полбьзователя
  changeAvatarUser(data) {
    return fetch(`${this._url}/v1/cohort-51/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
}
