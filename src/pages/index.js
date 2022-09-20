import "./index.css";

import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  karachayCherkessiaImage,
  ayPetriImage,
  switzerlandImage,
  hawaiImage,
  chinaImage,
  fujiImage,
  selectors,
  config,
} from "../utils/constatnts.js";

import {
  photoGrid,
  popupFormEditProfile,
  popupFormAddCard,
  profileTitle,
  profileSubtitle,
  placeNameInput,
  placeImageInput,
  buttonEdidPopupProfile,
  buttonAddNewCard,
  initialCards,
} from "../utils/constatnts.js";

//Экземпляр класса PopupWithImage
const zoomPopup = new PopupWithImage({ popupSelector: selectors.imagePopup });
zoomPopup.setEventListeners();

function createCard(data) {
  const card = new Card(
    {
      data: data,
      handleOpenPopup: (data) => {
        zoomPopup.open(data);
      },
    },
    selectors
  );
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

//отрисовка 6 карточек из массива по умолчанию
const defaultCardList = new Section(
  {
    items: initialCards, //массив, который передаем в конструктор
    renderer: (data) => {
      const cardElement = createCard(data); //сохраняю в переменную результат создания одной карты*/
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

const user = new UserInfo({
  userName: profileTitle,
  userDescription: profileSubtitle,
});
//экземпляр класса  PopupWithForm  при сабмите формы ПРОФАЙЛА
const popupWithFormProfile = new PopupWithForm(
  {
    popupSelector: selectors.profilePopup,
    handleSubmit: (data) => {
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
    handleSubmit: (data) => {
        const cardElement = createCard({
        link: placeImageInput.value,
        name: placeNameInput.value,
      });
      defaultCardList.prependItem(cardElement);
    },
  },
  popupFormAddCard
);
popupWithFormNewCard.setEventListeners(); //навешиваем набор слушателей событий,сабмит

// Прикрепляем слушателя к кнопке редактирования ПРОФАЙЛА
buttonEdidPopupProfile.addEventListener("click", () => {
  popupWithFormProfile.open();
  popupWithFormProfile.setInputValues(user.getUserInfo()); //вернули объект со значениями textContent элементов из класса
  formValidatorEditProfile.resetFields(); //вызываем метод очистки полей от ошибок(текстовое пояснение и красное подчеркивание)
});

// Прикрепляем слушателя к кнопке добавления КАРТОЧКИ С МЕСТОМ
buttonAddNewCard.addEventListener("click", function () {
  popupWithFormNewCard.open();
  formValidatorAddCard.disableButton(); //по умолчанию кнопка сабмита отключена
  formValidatorAddCard.resetFields(); //вызываем метод очистки полей от ошибок(текстовое пояснение и красное подчеркивание)
});
