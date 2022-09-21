export const karachayCherkessiaImage = new URL(
  "../images/KarachayCherkessia.jpg",
  import.meta.url
);
export const ayPetriImage = new URL("../images/AyPetri.png", import.meta.url);
export const switzerlandImage = new URL(
  "../images/ZermattSwitzerland.jpg",
  import.meta.url
);
export const hawaiImage = new URL(
  "../images/KauaiHawaiiUSA.jpg",
  import.meta.url
);
export const chinaImage = new URL("../images/China.jpg", import.meta.url);
export const fujiImage = new URL("../images/MountFuji.jpg", import.meta.url);

//записываем классы в константу здесь, чтобы работать не с классами HTML документа , а в JS
export const selectors = {
  template: "#rectangle-template",
  rectangle: ".rectangle",
  image: ".rectangle__image",
  text: ".rectangle__text",
  buttonLike: ".rectangle__button",
  buttonTrash: ".rectangle__button-trash",
  profilePopup: ".popup_type_edit-profile",
  cardPopup: ".popup_type_add-card",
  imagePopup: ".popup_type_open-image",
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
//Объявляем перемнные с текстовым содержимым ПРОФАЙЛА
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
//Объявляем перемнные кнопок
export const buttonEdidPopupProfile =
  document.querySelector(".profile__edit-btn"); //кнопка редактора ПРОФАЙЛА
export const buttonAddNewCard = document.querySelector(".profile__add-btn"); //кнопка добавления НОВОГО МЕСТА

//6 мест по умолчанию
export const initialCards = [
  {
    name: "Карачаево-Черкесская Республика",
    link: karachayCherkessiaImage,
  },
  {
    name: "Ай петри",
    link: ayPetriImage,
  },
  {
    name: "Щвейцария",
    link: switzerlandImage,
  },
  {
    name: "Гаваи",
    link: hawaiImage,
  },
  {
    name: "Великая китайская стена",
    link: chinaImage,
  },
  {
    name: "Фудзи",
    link: fujiImage,
  },
];
