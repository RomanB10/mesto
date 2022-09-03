export class FormValidator {
  constructor(selectors, formSelector) {
    this._FormSelector = document.querySelector(formSelector);
    this._seloctors = selectors;
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
  _hasInvalidInput(inputList) {
    //проходим по массиву методом some
    return inputList.some((inputElement) => {
      //если поле не валидно, колбэк вернйт true
      //Обход массива прекратится и вся функция
      //hasInvalidInput вернет true
      return !inputElement.validity.valid;
    });
  }

  //Очистка полей от ошибок
  resetFields(formElement) {
    const error = formElement.querySelectorAll(this._seloctors.inputSpan); //очистить спан вместе с содержимым
    error.forEach(function (error) {
      error.classList.remove("popup__input-error_active");
      error.textContent = "";
    });

    const input = formElement.querySelectorAll(".popup__input"); //убрать красное подчеркиваение
    input.forEach(function (input) {
      input.classList.remove("popup__input_type_error");
    });
  }

  disableButton(formElement) {
    const submit = formElement.querySelector(
      this._seloctors.submitButtonSelector
    );
    submit.setAttribute("disabled", "disabled"); //отключение кнопки
    submit.classList.add(this._seloctors.inactiveButtonClass); // добавление класса отключенной кнопки*/
  }
  //функция вкл/выкл при валидной/невалидной формы
  _toggleButtonState(inputList, formElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(formElement);
    } else {
      const submit = formElement.querySelector(
        this._seloctors.submitButtonSelector
      );
      submit.removeAttribute("disabled"); //отключение кнопки
      submit.classList.remove(this._seloctors.inactiveButtonClass);
    }
  }

  //функция добавления обработчиков всем полям формы
  _setEventListeners() {
    //Находим все поля внутри формы, сделаем из них массив
    const inputList = Array.from(
      this._FormSelector.querySelectorAll(this._seloctors.inputSelector)
    );
    //Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      //каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        this._checkFieldIsValid(
          this._FormSelector,
          inputElement,
          this._seloctors.inputErrorClass,
          this._seloctors.errorClass
        );
        //вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, this._FormSelector);
      });
    });
  }

  //функция валидации, находит и перебирает все формы
  enableValidation() {
    this.view = this._setEventListeners();
  }
}
