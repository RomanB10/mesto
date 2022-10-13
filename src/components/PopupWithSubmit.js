import { Popup } from "./Popup.js"; // выполнили привязку родительского класса Popup
export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, handleSubmit }, form) {
    super({ popupSelector });
    this._handleSubmit = handleSubmit;
    this._form = form;
  }

  submitHandlerAction(action) {
    this._handleSubmit = action;
  }

  //перезаписываемый метод класса Popup
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
