export class Card {
  constructor({ data, handleOpenPopup }, selectors) {
    this._selectors = selectors;
    this._name = data.name;
    this._link = data.link;
    this._handleOpenPopup = handleOpenPopup;
    this._data = data;
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
    this._textAlt = `Здесь должно быть изображение '${this._name}'`;
    this._cardImage.src = this._link;
    this._text.textContent = this._name;
    this._cardImage.alt = this._textAlt;
    this._setEventListeners();
    return this._view;
  }
  _setEventListeners() {
    //отработка лайка при клике
    this._buttonLike.addEventListener("click", this._handleClickLike);
    //удаление карточки при клике на корзину
    this._buttonTrash.addEventListener("click", this._handleClickTrash);
    //открытие попапа при клике на изображение
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup(this._data);
    });
  }

  //Приватный метод like
  _handleClickLike = (evt) => {
    evt.target.classList.toggle("rectangle__button_active");
  };
  //Приватный метод Trash
  _handleClickTrash = () => {
    this._view.remove();
  };
}
