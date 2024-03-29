import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }, form) {
    super({ popupSelector });
    this._handleSubmit = handleSubmit;
    this._form = form;
    this._inputList = this._form.querySelectorAll(".popup__input"); // достаём все элементы полей
    this._buttonSave = this._form.querySelector(".popup__submit-btn");
  }

  //приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений со значениями полей input
    return this._formValues;
  }

  //приватный метод, который подставляет в значения всех полей формы приходящий объект
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name]; //заносим дынные текста из профайла в поле ввода, используя объект data
    });
  }

  //перезаписываемый метод класса Popup
  setEventListeners() {
    super.setEventListeners(); //наследование метода из родительского класса
    this._form.addEventListener("submit", (evt) => {
      //добавляем обрабочик сабмита
      evt.preventDefault(evt); // Эта строчка отменяет стандартную отправку формы.
      this._handleSubmit(this._getInputValues()); // передаем сабмиту объект полей, чтобы использовать в колбэке
    });
  }

  //перезаписываемый метод класса Popup
  close() {
    super.close(); //наследование метода из родительского класса
    this._form.reset(); //очистка формы от введенных данных
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = "Сохранение...";
    } else {
      this._buttonSave.textContent = "Сохранить";
    }
  }
}
