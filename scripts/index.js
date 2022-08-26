const root = document.querySelector(".root");
const photoGrid = document.querySelector(".photo-grid"); // обьявили переменную списка
const cardTemplate = document.querySelector("#rectangle-template").content; //обращаемся к контенту шаблона темплайт

//Объявляем попапы
const popupsList = Array.from(document.querySelectorAll(".popup"));
const profilePopup = document.querySelector(".popup_type_edit-profile"); //Попап ПРОФАЙЛА
const cardPopup = document.querySelector(".popup_type_add-card"); //Попап НОВОГО МЕСТА
const imagePopup = document.querySelector(".popup_type_open-image"); //Попап отображения масштабируемой картинки
//Объяфвляем формы
const popupFormEditProfile = profilePopup.querySelector(".popup__form"); //форма ПРОФАЙЛА
const popupFormAddCard = cardPopup.querySelector(".popup__form"); //форма НОВОГО МЕСТА
//Объявляем переменные картинки и подписи МЕСТА
const placeImage = document.querySelector(".popup__image-place"); //изображения места
const placeCaption = document.querySelector(".popup__caption"); //подпись к изображению места
//Объявляем перемнные с полями ввода ПРОФАЙЛА
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
//Объявляем перемнные с текстовым содержимым ПРОФАЙЛА
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Объявляем перемнные с полями ввода НОВОГО МЕСТА
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeImageInput = document.querySelector(
  ".popup__input_type_place-image"
);
//Объявляем кнопки
const buttonEdidPopupProfile = document.querySelector(".profile__edit-btn"); //кнопка редактора ПРОФАЙЛА
const buttonAddNewCard = document.querySelector(".profile__add-btn"); //кнопка добавления НОВОГО МЕСТА
const buttonClosePopupProfile = document.querySelector(".popup__close-btn"); //кнопка закрытия попапа ПРОФАЙЛА
const buttonCloseNewCard = document.querySelector(
  ".popup__close-btn_type_add-card"
); //кнопка закрытия попапа НОВОГО МЕСТА
const buttonClosePopupImage = document.querySelector(
  ".popup__close-btn_type_open-image"
); //кнопка закрытия попапа масштабируемой картинки

//6 мест по умолчанию
const initialCards = [
  {
    name: "Карачаево-Черкесская Республика",
    link: "./images/KarachayCherkessia.png",
  },
  {
    name: "Ай петри",
    link: "./images/AyPetri.png",
  },
  {
    name: "Щвейцария",
    link: "./images/ZermattSwitzerland.png",
  },
  {
    name: "Гаваи",
    link: "./images/KauaiHawaiiUSA.png",
  },
  {
    name: "Великая китайская стена",
    link: "./images/China.png",
  },
  {
    name: "Фудзи",
    link: "./images/MountFuji.png",
  },
];

// добавили 6 карточек по умолчанию из массива initialCards
initialCards.forEach(function (element) {
  photoGrid.append(createCard(element.link, element.name));
});

// Открытие/закрытие попапа
function openPopup(popupElement) {
  resetFields(popupElement); //функция чистки полей
  document.addEventListener("keydown", closeEscPopup);
  popupElement.classList.add("popup_opened");
  closeOverlayPopup(popupElement); //функция закрытия попапа кликом на оверлей
}
function closePopup(popupElement) {
  document.removeEventListener("keydown", closeEscPopup);
  popupElement.classList.remove("popup_opened");
}

// отправка формы ПРОФАЙЛА
function submitFormProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value; //присваеваем значения полей ввода
  profileSubtitle.textContent = jobInput.value; //присваеваем значения полей ввода
  closePopup(profilePopup); //закрытие попапа
}

//отправка формы НОВОГО МЕСТА
function submitFormNewCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  photoGrid.prepend(createCard(placeImageInput.value, placeNameInput.value));
  closePopup(cardPopup);
}

//создание новой карты с местом
function createCard(link, name) {
  const cardElement = cardTemplate.querySelector(".rectangle").cloneNode(true);
  const image = cardElement.querySelector(".rectangle__image");
  const text = cardElement.querySelector(".rectangle__text");
  const like = cardElement.querySelector(".rectangle__button");
  const trash = cardElement.querySelector(".rectangle__button-trash");
  const textAlt = `Здесь должно быть изображение '${name}'`;
  image.src = link;
  text.textContent = name;
  image.alt = textAlt;
  //отработка лайка при клике
  like.addEventListener("click", function (evt) {
    evt.target.classList.toggle("rectangle__button_active");
  });
  //удаление карточки при клике на корзину
  trash.addEventListener("click", function (evt) {
    cardElement.remove();
  });
  //открытие попапа при клике на изображение
  image.addEventListener("click", function (item) {
    openPopup(imagePopup);
    placeCaption.textContent = name;
    placeImage.src = link;
    placeImage.alt = textAlt;
  });
  return cardElement;
}

//Закрытие попапа кликом на оверлей
function closeOverlayPopup(item) {
  item.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      closePopup(item);
    }
  });
}
//Закрытие попапа нажатием на Esc
const closeEscPopup = (evt) => {
    if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

// Прикрепляем слушателя к кнопке редактирования ПРОФАЙЛА
buttonEdidPopupProfile.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent; //заносим дынные текста из профайла в поле ввода
  jobInput.value = profileSubtitle.textContent; //заносим дынные текста из профайла в поле ввода
});

// Прикрепляем слушателя к форме отправки ПРОФАЙЛА
popupFormEditProfile.addEventListener("submit", submitFormProfile);

// Прикрепляем обработчик к кнопке добавления КАРТОЧКИ С МЕСТОМ
buttonAddNewCard.addEventListener("click", function () {
  openPopup(cardPopup);
  popupFormAddCard.reset(); //сбрасывает поля формы при нажатии на клавишу добавить
  disableButton(popupFormAddCard);
});

// Прикрепляем слушателя к форме отправки НОВОЙ КАРТОЧКИ С МЕСТОМ
popupFormAddCard.addEventListener("submit", submitFormNewCard);




//______________________________________________________//


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
