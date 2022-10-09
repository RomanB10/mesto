export class Card {
  constructor(
    { data, handleOpenPopup, handleClickLike, handleClickDelete },
    selectors
  ) {
    this._selectors = selectors;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleOpenPopup = handleOpenPopup;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
    this._data = data;
    this._id = data._id;
    this._owner = data.owner;
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
    this._isTrash();
    this._setEventListeners();
    return this._view;
  }
  _setEventListeners() {
    //отработка лайка при клике
    this._buttonLike.addEventListener("click", () => {
      this._handleClickLike(this);
    });
    //удаление карточки при клике на корзину
    this._buttonTrash.addEventListener("click", () => {
      this._handleClickDelete(this);
    });
    //открытие попапа при клике на изображение
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup(this._data);
    });
  }

  //обновление данных по лайкам
  changeCountLikes(data) {
    this._countLikes.textContent = data.likes.length;
  }

  isliked() {
    return this._buttonLike.classList.contains("rectangle__button_active");
  }
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

  //метод поставновки кнопки удаления только на моих карточках
  _isTrash() {
    if (this._owner._id === "a2ff312840824696faf5617a") {
      this._buttonTrash.classList.add("rectangle__button-trash_active");
    }
  }
  //метод удаеления карточки
  removeCard() {
    this._view.remove();
  }
  //Метод получения Id
  getId() {
    return this._data._id;
  }
}
