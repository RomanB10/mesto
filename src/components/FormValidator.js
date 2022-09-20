export class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._selectors = selectors;
    this._submitButton = this._form.querySelector(this._selectors.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
  }

  //функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
  }

  //функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = "";
  }

  //функция, которая проверяет валидность одного поля
  _checkFieldIsValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //функция проверки наличия невалидного поля
  _hasInvalidInput() {
    //проходим по массиву методом some
    return this._inputList.some((inputElement) => {
      //если поле не валидно, колбэк вернйт true
      //Обход массива прекратится и вся функция
      //hasInvalidInput вернет true
      return !inputElement.validity.valid;
    });
  }

  //Очистка полей от ошибок
  resetFields() {
    this._inputList.forEach((input) => {
        this._hideInputError(input)
    });
  }

  disableButton() {
    this._submitButton.setAttribute("disabled", "disabled"); //отключение кнопки
    this._submitButton.classList.add(this._selectors.inactiveButtonClass); // добавление класса отключенной кнопки*/
  }
  //функция вкл/выкл при валидной/невалидной форме
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._submitButton.removeAttribute("disabled"); //отключение кнопки
      this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
    }
  }

  //функция добавления обработчиков всем полям формы
  _setEventListeners() {
    //Обойдем все элементы коллекции
    this._inputList.forEach((inputElement) => {
      //каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        this._checkFieldIsValid(inputElement);
        //вызовем toggleButtonState
        this._toggleButtonState();
      });
    });
  }

  //функция валидации, находит и перебирает все формы
  enableValidation() {
    this._setEventListeners();
  }
}
