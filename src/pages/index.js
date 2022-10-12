import "./index.css";

import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { selectors, config, configApi } from "../utils/constatnts.js";

import {
  photoGrid,
  popupFormEditProfile,
  popupFormAddCard,
  popupFormEditAvatar,
  popupFormConfirmation,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  buttonEdidPopupProfile,
  buttonAddNewCard,
  buttonEdidAvatar,
} from "../utils/constatnts.js";

//переменная пользовательского id(текущий пользователь)
let userId;

const api = new Api(configApi);
//Получаем дынные с сервера(объект данных карточек, объект данных пользователя )
Promise.all([api.getAllCards(), api.getInfoUser()])
  .then((res) => {
    const cardsFromServer = res[0];
    const userInfoFromServer = res[1];
    userId = userInfoFromServer._id; //присваивается id текущего пользователя, пришедшее с сервера
    defaultCardList.renderItems(cardsFromServer);
    user.setUserInfo(userInfoFromServer);
  })
  .catch((err) => {
    console.log(err);
  });
//метод создания карточки с местом
function createCard(data, userId) {
  const card = new Card(
    {
      data: data,
      userId: userId,
      handleOpenPopup: (data) => {
        zoomPopup.open(data);
      },
      handleClickLike: (item) => {
        if (!item.isliked()) {
          api
            .addLike(item.getId())
            .then((data) => {
              item.switchLike(data);
              item.changeCountLikes(data);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          api
            .deleteLike(item.getId())
            .then((data) => {
              item.switchLike(data);
              item.changeCountLikes(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      handleClickDelete: (card) => {
        const cardId = card.getId();
        confirmationPopup.open(card);
        confirmationPopup.submitHandlerAction(() => {
          api
            .removeCard(cardId)
            .then(() => {
              card.removeCard();
            })
            .catch((err) => {
              console.log(err);
            });
        });
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
    renderer: (data) => {
      const cardElement = createCard(data, userId); //сохраняю в переменную результат создания одной карты
      defaultCardList.addItem(cardElement); //вызываем метод в экземп класса и добавляю карту в конец списка
    },
  },
  photoGrid //список, который передаем в конструктор
);

//экземпляр класса  UserInfo, с данными пользователя
const user = new UserInfo({
  userName: profileTitle,
  userDescription: profileSubtitle,
  userAvatar: profileAvatar,
});

//<------------ПОПАПЫ---------->
//экземпляр класса  PopupWithImage, открытие картинки в увеличенном размере
const zoomPopup = new PopupWithImage({ popupSelector: selectors.imagePopup });
zoomPopup.setEventListeners();

//экземпляр класса  PopupWithSubmit, при клике на корзину всплывает подтверждение удаления
const confirmationPopup = new PopupWithSubmit(
  { popupSelector: selectors.confirmationPopup },
  popupFormConfirmation
);
confirmationPopup.setEventListeners();

//экземпляр класса  PopupWithForm, замена изображения АВАТАРА (avatar)
const popupWithFormAvatar = new PopupWithForm(
  {
    popupSelector: selectors.avatarPopup,
    handleSubmit: (data) => {
      const dataToServer = data;
      popupWithFormAvatar.renderLoading(true);
      api
        .changeAvatarUser(dataToServer)
        .then((dataFromServer) => {
          user.setUserInfo(dataFromServer); //методу класса setUserInfo  присваеваем объект значений инпутов
          popupWithFormAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAvatar.renderLoading(false);
        });
    },
  },
  popupFormEditAvatar
);
popupWithFormAvatar.setEventListeners(); //навешиваем набор слушателей событий,сабмит

//экземпляр класса  PopupWithForm, обновление данных ПОЛЬЗОВАТЕЛЯ (name, job)
const popupWithFormProfile = new PopupWithForm(
  {
    popupSelector: selectors.profilePopup,
    handleSubmit: (data) => {
      const dataToServer = data;
      popupWithFormProfile.renderLoading(true);
      api
        .editInfoUser(dataToServer)
        .then((dataFromServer) => {
          user.setUserInfo(dataFromServer); //методу класса setUserInfo  присваеваем объект значений инпутов
          popupWithFormProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormProfile.renderLoading(false);
        });
    },
  },
  popupFormEditProfile
);
popupWithFormProfile.setEventListeners(); //навешиваем набор слушателей событий,сабмит

//экземпляр класса  PopupWithForm, добаление данных карточек НОВОГО МЕСТА
const popupWithFormNewCard = new PopupWithForm(
  {
    popupSelector: selectors.cardPopup,
    handleSubmit: (data) => {
      const dataToServer = {
        link: data["place-image"],
        name: data["place-name"],
      };
      popupWithFormNewCard.renderLoading(true);
      api
        .addNewCard(dataToServer)
        .then((dataFromServer) => {
          defaultCardList.prependItem(createCard(dataFromServer, userId));
          popupWithFormNewCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormNewCard.renderLoading(false);
        });
    },
  },
  popupFormAddCard
);
popupWithFormNewCard.setEventListeners(); //навешиваем набор слушателей событий,сабмит

//<------------ВАЛИДАЦИЯ ФОРМ---------->
//Экземпляры класса FormValidator
const formValidatorEditProfile = new FormValidator(
  config,
  popupFormEditProfile
);
formValidatorEditProfile.enableValidation(); //вызов метода валидации формы
const formValidatorAddCard = new FormValidator(config, popupFormAddCard);
formValidatorAddCard.enableValidation(); //вызов метода валидации формы

const formValidatorEditAvatar = new FormValidator(config, popupFormEditAvatar);
formValidatorEditAvatar.enableValidation();

//<------------ОБРАБОТЧИКИ КНОПОК---------->
// Прикрепляем слушателя к кнопке редактирования ПРОФАЙЛА
buttonEdidPopupProfile.addEventListener("click", () => {
  popupWithFormProfile.open();
  popupWithFormProfile.setInputValues(user.getUserInfo());
  formValidatorEditProfile.resetFields(); //вызываем метод очистки полей от ошибок(текстовое пояснение и красное подчеркивание)
});

// Прикрепляем слушателя к кнопке добавления КАРТОЧКИ С МЕСТОМ
buttonAddNewCard.addEventListener("click", function () {
  popupWithFormNewCard.open();
  formValidatorAddCard.disableButton(); //по умолчанию кнопка сабмита отключена
  formValidatorAddCard.resetFields(); //вызываем метод очистки полей от ошибок(текстовое пояснение и красное подчеркивание)
});

// Прикрепляем слушателя к кнопке редактирования АВАТАРА
buttonEdidAvatar.addEventListener("click", function () {
  popupWithFormAvatar.open();
  formValidatorEditAvatar.resetFields();
});
