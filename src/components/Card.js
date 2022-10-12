export class Card {
  constructor(
    { data, userId, handleOpenPopup, handleClickLike, handleClickDelete },
    selectors
  ) {
    this._selectors = selectors;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleOpenPopup = handleOpenPopup;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
    this._data = data; // ОБЪЕКТ карточка
    this._id = data._id; //iD КАРТОЧКИ ИЗ (ОБЪЕКТ карточка)
    this._owner = data.owner; //iD ПОЛЬЗОВАТЕЛЯ ИЗ (ПОЛЕ_owner ОБЪЕКТА карточка)
    this._userId = userId; // id МОЙ пользовательский
  }
  //Приватный метод получения шаблона
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectors.template)
      .content.querySelector(this._selectors.rectangle)
      .cloneNode(true);

    return cardElement;
  }
  //Публичный метод создания новой карты с местом
  generateCard() {
    this._view = this._getTemplate();
    this._cardImage = this._view.querySelector(this._selectors.image);
    this._text = this._view.querySelector(this._selectors.text);
    this._buttonLike = this._view.querySelector(this._selectors.buttonLike);
    this._buttonTrash = this._view.querySelector(this._selectors.buttonTrash);
    this._countLikes = this._view.querySelector(this._selectors.countLikes); //это массив лайков
    this._textAlt = `Здесь должно быть изображение '${this._name}'`;
    this._cardImage.src = this._link;
    this._text.textContent = this._name;
    this._cardImage.alt = this._textAlt;
    this._countLikes.textContent = this._likes.length;
    this._checkUserlike();
    this._isTrash();
    this._setEventListeners();
    return this._view;
  }
  _setEventListeners() {
    //Отработка лайка при клике
    this._buttonLike.addEventListener("click", () => {
      this._handleClickLike(this);
    });
    //Удаление карточки при клике на корзину
    this._buttonTrash.addEventListener("click", () => {
      this._handleClickDelete(this);
    });
    //Открытие попапа при клике на изображение
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup(this._data);
    });
  }

  //Обновление данных по количеству лайков
  changeCountLikes(data) {
    this._countLikes.textContent = data.likes.length;
  }

  //Метод проверки лайков по id текущего пользователя(если пользователь ранее лайкал карточку, отрисавать ее с активным состоянием лайка)
  _checkUserlike() {
    if (this._likes.some((item) => item._id === this._userId)) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  //Метод проверки активного состояния лайка
  isliked() {
    return this._buttonLike.classList.contains("rectangle__button_active");
  }

  //Метод переключения активного состояния лайка
  switchLike() {
    if (!this._buttonLike.classList.contains("rectangle__button_active")) {
      this.addLike(this);
    } else {
      this.removeLike(this);
    }
  }
  addLike() {
    this._buttonLike.classList.add("rectangle__button_active");
  }
  removeLike() {
    this._buttonLike.classList.remove("rectangle__button_active");
  }

  //метод поставновки кнопки удаления только на моих карточках, проверка по пользовательскому id
  _isTrash() {
    if (this._owner._id === this._userId) {
      this._buttonTrash.classList.add("rectangle__button-trash_active");
    }
  }
  //метод удаеления карточки
  removeCard() {
    this._view.remove();
    this._view = null;
  }
  //Метод получения Id карточки
  getId() {
    return this._data._id;
  }
}
