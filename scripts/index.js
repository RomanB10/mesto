import {Card} from "./Card.js"
import {FormValidator} from "./FormValidator.js";


//**записываем классы в константу здесь, чтобы работать не с классами HTML документа , а в JS
const selectors = {
  template: '#rectangle-template',
  rectangle: '.rectangle',
  image: '.rectangle__image',
  text: '.rectangle__text',
  buttonLike: '.rectangle__button',
  buttonTrash: '.rectangle__button-trash'
}
// объявляем объект селекторов для форм
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const photoGrid = document.querySelector(".photo-grid"); // обьявили переменную списка
const cardTemplate = document.querySelector(selectors.template).content; //обращаемся к контенту шаблона темплайт

const formsList = Array.from(document.querySelectorAll(".popup__form"));//получаем список форм

//Объявляем попапы
const profilePopup = document.querySelector(".popup_type_edit-profile"); //Попап ПРОФАЙЛА
const cardPopup = document.querySelector(".popup_type_add-card"); //Попап НОВОГО МЕСТА

//Объяфвляем формы
const popupFormEditProfile = profilePopup.querySelector(".popup__form"); //форма ПРОФАЙЛА
const popupFormAddCard = cardPopup.querySelector(".popup__form"); //форма НОВОГО МЕСТА

//Объявляем перемнные с полями ввода ПРОФАЙЛА
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
//Объявляем перемнные с текстовым содержимым ПРОФАЙЛА
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Объявляем перемнные с полями ввода НОВОГО МЕСТА
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeImageInput = document.querySelector(".popup__input_type_place-image");
//Объявляем кнопки
const buttonEdidPopupProfile = document.querySelector(".profile__edit-btn"); //кнопка редактора ПРОФАЙЛА
const buttonAddNewCard = document.querySelector(".profile__add-btn"); //кнопка добавления НОВОГО МЕСТА

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
initialCards.forEach(function (data) {
  const cardItem = new Card(data, cardTemplate, selectors, openPopup);
  photoGrid.append(cardItem.createCard());
});

//Вызываем валидацию всех форм
formsList.forEach((form)=>{
  const FormValidation = new FormValidator(config, form);
  FormValidation.enableValidation();
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
  const cardItem = new Card({link:placeImageInput.value, name:placeNameInput.value}, cardTemplate, selectors, openPopup);
  photoGrid.prepend(cardItem.createCard());
  closePopup(cardPopup);
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





























