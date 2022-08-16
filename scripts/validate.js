const config = {
  formSelector: ".popup__form", //есть
  inputSelector: ".popup__input", //есть
  submitButtonSelector: ".popup__submit-btn", //есть
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error", //есть
  errorClass: "popup__input-error_active", //есть
};

//Очистка полей от ошибок
function resetFields(formElement) {
  const error = formElement.querySelectorAll(".popup__input-error"); //очистить спан вместе с содержимым
  error.forEach(function (error) {
    error.classList.remove("popup__input-error_active");
    error.textContent = "";
  });

  const input = formElement.querySelectorAll(".popup__input"); //убрать красное подчеркиваение
  input.forEach(function (input) {
    input.classList.remove("popup__input_type_error");
  });
}
//Отключение кнопки
function disableButton(formElement) {
  const submit = formElement.querySelector(".popup__submit-btn");
  submit.setAttribute("disabled", "disabled"); //отключение кнопки
  submit.classList.add("popup__submit-btn_inactive"); // добавление класса отключенной кнопки
}

//функция, которая добавляет класс с ошибкой
showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  //Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

//функция, которая удаляет класс с ошибкой
hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  //Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

//функция, которая проверяет валидность одного поля
const checkFieldIsValid = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
  //проходим по массиву методом some
  return inputList.some((inputElement) => {
    //если поле не валидно, колбэк вернйт true
    //Обход массива прекратится и вся функция
    //hasInvalidInput вернет true
    return !inputElement.validity.valid;
  });
};

//функция вкл/выкл при валидной/невалидной формы
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

//функция добавления обработчиков всем полям формы
const setEventListeners = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) => {
  //Находим все поля внутри формы, сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    //каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      checkFieldIsValid(formElement, inputElement, inputErrorClass, errorClass);
      //вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

//функция валидации, находит и перебирает все формы
const enableValidation = ({ formSelector, ...rest }) => {
  // разложили входящий параметр obj на две составные части: переменную formSelector, и все остальные свойства obj в виде объекта rest
  //Находим все  формы c указанным классом в DOM
  const formtList = Array.from(document.querySelectorAll(formSelector));
  //Обойдем все элементы полученной коллекции
  formtList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};

//вызовем фонкцию
enableValidation(config);
