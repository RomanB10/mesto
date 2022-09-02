export class FormValidator {
  constructor(selectors, formSelector){
  this._FormSelector = formSelector;
  this._seloctors = selectors;
  }

  //функция, которая добавляет класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  };

  //функция, которая удаляет класс с ошибкой
  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  };

  //функция, которая проверяет валидность одного поля
  _checkFieldIsValid(formElement, inputElement, inputErrorClass, errorClass){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };

  //функция проверки наличия невалидного поля
  _hasInvalidInput(inputList){
    //проходим по массиву методом some
    console.log('ищем невлидное поле из массива')
    return inputList.some((inputElement) => {
      //если поле не валидно, колбэк вернйт true
      //Обход массива прекратится и вся функция
      //hasInvalidInput вернет true
      return !inputElement.validity.valid;
    });
  };

  //функция вкл/выкл при валидной/невалидной формы
  _toggleButtonState(inputList, buttonElement){
    if (this._hasInvalidInput(inputList)) {
      console.log("кнопка ВЫКЛ")
      buttonElement.classList.add(this._seloctors.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      console.log("кнопка ВКЛ")
      buttonElement.classList.remove(this._seloctors.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  //функция добавления обработчиков всем полям формы
  _setEventListeners (){
    //Находим все поля внутри формы, сделаем из них массив
    const inputList = Array.from(this._FormSelector.querySelectorAll(this._seloctors.inputSelector));
    const buttonElement = this._FormSelector.querySelector(this._seloctors.submitButtonSelector);
    //Обойдем все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      //каждому полю добавим обработчик события input
      inputElement.addEventListener("input", () => {
        console.log('нажимаем клавишу, запуск проверки на валидность')
        this._checkFieldIsValid(this._FormSelector, inputElement, this._seloctors.inputErrorClass, this._seloctors.errorClass);
        //вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //функция валидации, находит и перебирает все формы
  enableValidation() {
       this.view = this._setEventListeners();
       return this.view
    };
  }



