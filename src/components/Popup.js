export class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
  }

  //метод закрытия попапа при нажатии на "Escape"
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  //метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened"); //добавляем display: block;
    document.addEventListener("keydown", this._handleEscClose);
  }
  //метод закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened"); //убираем display: block, по умолчанию none;
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //метод добавления слушателя при клике на затемненную область и на иконку закрытия
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target === evt.currentTarget || // закрытие по совпадению попапа и клика
        evt.target.classList.contains("popup__close-btn") // елси клик совпадает с элементом кнопки закрытия
      ) {
        this.close();
      }
    });
  }
}
