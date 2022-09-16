export class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._selectors = selectors;
    this._submitButton = this._form.querySelector(
      this._selectors.submitButtonSelector
    );
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectors.inputSelector)
    );
  }

  //функция, которая добавляет класс с ошибкой
  _showInputError(
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
  ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  }

  //функция, которая удаляет класс с ошибкой
  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  //функция, которая проверяет валидность одного поля
  _checkFieldIsValid(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
      );
    } else {
      this._hideInputError(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
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
    const error = this._form.querySelectorAll(
      this._selectors.inputSpan
    );
    error.forEach((error) => {//очистить спан вместе с содержимым
      error.classList.remove(this._selectors.errorClass);
      error.textContent = "";
    });

    this._inputList.forEach((input) => {
      input.classList.remove(this._selectors.inputErrorClass);
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
        this._checkFieldIsValid(
          this._form,
          inputElement,
          this._selectors.inputErrorClass,
          this._selectors.errorClass
        );
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
