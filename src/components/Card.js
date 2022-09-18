export class Card {
  constructor({ data, handleOpenPopup }, selectors) {
    this._selectors = selectors;
    this._name = data.name;
    this._link = data.link;
    this._handleOpenPopup = handleOpenPopup;
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
  createCard() {
    this._view = this._getTemplate();
    const image = this._view.querySelector(this._selectors.image);
    const text = this._view.querySelector(this._selectors.text);
    const buttonLike = this._view.querySelector(this._selectors.buttonLike);
    const buttonTrash = this._view.querySelector(this._selectors.buttonTrash);
    const textAlt = `Здесь должно быть изображение '${this._name}'`;
    image.src = this._link;
    text.textContent = this._name;
    image.alt = textAlt;
    //отработка лайка при клике
    buttonLike.addEventListener("click", this._handleClickLike);
    //удаление карточки при клике на корзину
    buttonTrash.addEventListener("click", this._handleClickTrash);
    //открытие попапа при клике на изображение
    image.addEventListener("click", () => {
      this._handleOpenPopup(this._name, this._link);
    });

    return this._view;
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
