import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }, form) {
    super({ popupSelector });
    this._submitForm = submitForm;
    this._form = form;
    this._inputList = this._form.querySelectorAll(".popup__input");// достаём все элементы полей
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
  _setInputValues(data) {
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
      this._submitForm(this._getInputValues()); // передаем сабмиту объект полей, чтобы использовать в колбэке
      this.close();
    });
  }
  //перезаписываемый метод класса Popup
  close() {
    super.close(); //наследование метода из родительского класса
    this._form.reset(); //очистка формы от введенных данных
  }
}
