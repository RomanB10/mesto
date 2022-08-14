const formConfing = {
  formSelector: ".popup__form", //есть
  inputSelector: ".popup__input", //есть
  submitButtonSelector: ".popup__submit-btn", //есть
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error", //есть
  errorClass: "popup__input-error_active", //есть
};

//функция, которая добавляет класс с ошибкой
showInputError = (formElement, inputElement, errorMessage) => {
  //Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formConfing.inputErrorClass);
  errorElement.classList.add(formConfing.errorClass);
  errorElement.textContent = errorMessage;
};

//функция, которая удаляет класс с ошибкой
hideInputError = (formElement, inputElement) => {
  //Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formConfing.inputErrorClass);
  errorElement.classList.remove(formConfing.errorClass);
  errorElement.textContent = "";
};

//функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  //Находим все поля внутри формы, сделаем из них массив
  const inputList = Array.from(
    formElement.querySelectorAll(formConfing.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formConfing.submitButtonSelector
  );

  //Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    //каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      //вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  //Находим все  формы c указанным классом в DOM
  const formtList = Array.from(
    document.querySelectorAll(formConfing.formSelector)
  );

  //Обойдем все элементы полученной коллекции
  formtList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    //для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  //проходим по массиву методом some
  return inputList.some((inputElement) => {
    //если поле не валидно, колбэк вернйт true
    //Обход массива прекратится и вся функция
    //hasInvalidInput вернет true
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formConfing.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(formConfing.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

//вызовем фонкцию
enableValidation();
