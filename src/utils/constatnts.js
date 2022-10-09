//записываем классы в константу здесь, чтобы работать не с классами HTML документа , а в JS
export const selectors = {
  template: "#rectangle-template",
  rectangle: ".rectangle",
  countLikes: ".rectangle__count-likes",
  image: ".rectangle__image",
  text: ".rectangle__text",
  buttonLike: ".rectangle__button",
  buttonTrash: ".rectangle__button-trash",
  profilePopup: ".popup_type_edit-profile",
  cardPopup: ".popup_type_add-card",
  imagePopup: ".popup_type_open-image",
  confirmationPopup: ".popup_type_confirmation",
  avatarPopup: ".popup_type_change-avatar",
};
// объявляем объект селекторов для форм
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  inputSpan: ".popup__input-error",
};

export const photoGrid = document.querySelector(".photo-grid"); // обьявили переменную списка
//Объявляем перемнные форм
export const popupFormEditProfile = document
  .querySelector(selectors.profilePopup)
  .querySelector(".popup__form"); //форма ПРОФАЙЛА
export const popupFormAddCard = document
  .querySelector(selectors.cardPopup)
  .querySelector(".popup__form"); //форма НОВОГО МЕСТА
export const popupFormConfirmation = document
  .querySelector(selectors.confirmationPopup)
  .querySelector(".popup__form"); //форма ПОДТВЕРЖДЕНИЯ

export const popupFormEditAvatar = document
  .querySelector(selectors.avatarPopup)
  .querySelector(".popup__form"); //форма ПРОФАЙЛА
//Объявляем перемнные с текстовым содержимым ПРОФАЙЛА
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const profileAvatar = document.querySelector(".profile__image");
//Объявляем перемнные кнопок
export const buttonEdidPopupProfile =
  document.querySelector(".profile__edit-btn"); //кнопка редактора ПРОФАЙЛА
export const buttonAddNewCard = document.querySelector(".profile__add-btn"); //кнопка добавления НОВОГО МЕСТА
export const buttonEdidAvatar = document.querySelector(".profile__avatar-btn"); //кнопка редактора АВАТАРА

export const configApi = {
  url: "https://mesto.nomoreparties.co",
  headers: {
    "Content-type": "application/json",
    authorization: "d90e3811-ba6b-4a7f-96a8-92745ac1e8db",
  },
};
