import './index.css'

import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

const karachayCherkessiaImage = new URL("../images/KarachayCherkessia.jpg", import.meta.url);
const ayPetriImage = new URL("../images/AyPetri.png", import.meta.url);
const switzerlandImage = new URL("../images/ZermattSwitzerland.jpg", import.meta.url);
const hawaiImage =  new URL("../images/KauaiHawaiiUSA.jpg", import.meta.url);
const chinaImage = new URL("../images/China.jpg", import.meta.url);
const fujiImage = new URL("../images/MountFuji.jpg", import.meta.url);

//записываем классы в константу здесь, чтобы работать не с классами HTML документа , а в JS
const selectors = {
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
//Объявляем перемнные форм
const popupFormEditProfile = document
  .querySelector(selectors.profilePopup)
  .querySelector(".popup__form"); //форма ПРОФАЙЛА
const popupFormAddCard = document
  .querySelector(selectors.cardPopup)
  .querySelector(".popup__form"); //форма НОВОГО МЕСТА
//Объявляем перемнные с текстовым содержимым ПРОФАЙЛА
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Объявляем перемнные с полями ввода НОВОГО МЕСТА
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeImageInput = document.querySelector(
  ".popup__input_type_place-image"
);
//Объявляем перемнные кнопок
const buttonEdidPopupProfile = document.querySelector(".profile__edit-btn"); //кнопка редактора ПРОФАЙЛА
const buttonAddNewCard = document.querySelector(".profile__add-btn"); //кнопка добавления НОВОГО МЕСТА

//6 мест по умолчанию
const initialCards = [
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
//Экземпляры класса Popup
const userPopup = new Popup({ popupSelector: selectors.profilePopup });
userPopup.setEventListeners();
const newPopup = new Popup({ popupSelector: selectors.cardPopup });
newPopup.setEventListeners();
//Экземпляр класса PopupWithImage
const zoomPopup = new PopupWithImage({ popupSelector: selectors.imagePopup });
zoomPopup.setEventListeners();


//отрисовка 6 карточек из массива по умолчанию
const defaultCardList = new Section(
  {
    items: initialCards, //массив, который передаем в конструктор
    renderer: (data) => {
      //инструкция, которую передаем в конструктор
      const cardItem = new Card(
        {
          data: data,
          handleOpenPopup: (name, link) => {
            zoomPopup.open(name, link);
          },
        },
        selectors
      );
      const cardElement = cardItem.createCard(); //сохраняю в переменную результат создания одной карты
      defaultCardList.addItem(cardElement); //вызываем метод в экземп класса и добавляю карту в конец списка
    },
  },
  photoGrid //список, который передаем в конструктор
);
defaultCardList.renderItems(); //вызвали отрисовку всех карточек по умолчанию класса Section

//Экземпляры класса FormValidator
const formValidatorEditProfile = new FormValidator(
  config,
  popupFormEditProfile
);
formValidatorEditProfile.enableValidation(); //вызов метода валидации формы
const formValidatorAddCard = new FormValidator(config, popupFormAddCard);
formValidatorAddCard.enableValidation(); //вызов метода валидации формы

//экземпляр класса  PopupWithForm  при сабмите формы ПРОФАЙЛА
const popupWithFormProfile = new PopupWithForm(
  {
    popupSelector: selectors.profilePopup,
    submitForm: (data) => {
      const user = new UserInfo({
        userNameSelector: profileTitle,
        userDescriptionSelector: profileSubtitle,
      });
      user.setUserInfo(data);
    }, //методу класса setUserInfo  присваеваем объект значений инпутов
  },
  popupFormEditProfile
);
popupWithFormProfile.setEventListeners(); //навешиваем набор слушателей событий,сабмит

//экземпляр класса  PopupWithForm при сабмите формы НОВОГО МЕСТА
const popupWithFormNewCard = new PopupWithForm(
  {
    popupSelector: selectors.cardPopup,
    submitForm: (data) => {
      const cardItem = new Card(
        {
          data: { link: placeImageInput.value, name: placeNameInput.value },
          handleOpenPopup: (name, link) => {
            zoomPopup.open(name, link);
          },
        },
        selectors
      );
      const cardElement = cardItem.createCard();
      photoGrid.prepend(cardElement);
    },
  },
  popupFormAddCard
);
popupWithFormNewCard.setEventListeners(); //навешиваем набор слушателей событий,сабмит

// Прикрепляем слушателя к кнопке редактирования ПРОФАЙЛА
buttonEdidPopupProfile.addEventListener("click", () => {
  userPopup.open();
  const user = new UserInfo({
    userNameSelector: profileTitle,
    userDescriptionSelector: profileSubtitle,
  });
  popupWithFormProfile._setInputValues(user.getUserInfo());//вернули объект со значениями textContent элементов из класса
  formValidatorEditProfile.resetFields(); //вызываем метод очистки полей от ошибок(текстовое пояснение и красное подчеркивание)
});

// Прикрепляем слушателя к кнопке добавления КАРТОЧКИ С МЕСТОМ
buttonAddNewCard.addEventListener("click", function () {
  newPopup.open();
  formValidatorAddCard.disableButton(); //по умолчанию кнопка сабмита отключена
  formValidatorAddCard.resetFields(); //вызываем метод очистки полей от ошибок(текстовое пояснение и красное подчеркивание)
});
