import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//**записываем классы в константу здесь, чтобы работать не с классами HTML документа , а в JS
const selectors = {
  template: "#rectangle-template",
  rectangle: ".rectangle",
  image: ".rectangle__image",
  text: ".rectangle__text",
  buttonLike: ".rectangle__button",
  buttonTrash: ".rectangle__button-trash",
};
// объявляем объект селекторов для форм
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  inputSpan: ".popup__input-error",
};

const photoGrid = document.querySelector(".photo-grid"); // обьявили переменную списка
const cardTemplate = document.querySelector(selectors.template).content; //обращаемся к контенту шаблона темплайт

const imagePopup = document.querySelector(".popup_type_open-image"); //Попап отображения масштабируемой картинки*/

//Объявляем переменные картинки и подписи МЕСТА
const placeImage = document.querySelector(".popup__image-place"); //изображения места
const placeCaption = document.querySelector(".popup__caption"); //подпись к изображению мест

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
const placeImageInput = document.querySelector(
  ".popup__input_type_place-image"
);
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
  const cardItem = new Card(data, cardTemplate, selectors, handleOpenPopup);
  photoGrid.append(cardItem.createCard());
});
//форма созданные по классуFormValidator
const formTypeEditProfile = new FormValidator(
  config,
  ".popup__form_type_edit-profile"
);
formTypeEditProfile.enableValidation();
const formTypeAddCard = new FormValidator(config, ".popup__form_type_add-card");
formTypeAddCard.enableValidation();

//Открытие картинки
function handleOpenPopup(name, link) {
  openPopup(imagePopup);
  placeCaption.textContent = name;
  placeImage.src = link;
  placeImage.alt = `Здесь должно быть изображение '${name}'`;
}

// Открытие/закрытие попапа
function openPopup(popupElement) {
  formTypeEditProfile.resetFields(popupElement);
  formTypeAddCard.resetFields(popupElement);
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
  const cardItem = new Card(
    { link: placeImageInput.value, name: placeNameInput.value },
    cardTemplate,
    selectors,
    handleOpenPopup
  );
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
  popupFormAddCard.reset();
  formTypeAddCard.disableButton(popupFormAddCard);
});

// Прикрепляем слушателя к форме отправки НОВОЙ КАРТОЧКИ С МЕСТОМ
popupFormAddCard.addEventListener("submit", submitFormNewCard);
