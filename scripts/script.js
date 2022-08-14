const root = document.querySelector(".root");
const photoGrid = document.querySelector(".photo-grid"); // обьявили переменную списка
const rectangleTemplate = document.querySelector("#rectangle-template").content; //обращаемся к контенту шаблона темплайт

//Объявляем попапы
const listPopup = Array.from(document.querySelectorAll(".popup"));
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
const buttonClosePopupProfile = document.querySelector(".popup__close-btn"); //кнопка закрытия попапа ПРОФАЙЛА
const buttonAddNewCard = document.querySelector(".profile__add-btn"); //кнопка добавления НОВОГО МЕСТА
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
  resetFields(popupElement);
  popupElement.classList.add("popup_opened");
}
function closePopup(popupElement) {
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
  const rectangleElement = rectangleTemplate
    .querySelector(".rectangle")
    .cloneNode(true);
  const image = rectangleElement.querySelector(".rectangle__image");
  const text = rectangleElement.querySelector(".rectangle__text");
  const like = rectangleElement.querySelector(".rectangle__button");
  const trash = rectangleElement.querySelector(".rectangle__button-trash");
  image.src = link;
  text.textContent = name;
  image.alt = `здесь должно быть изображение ${name} `;
  //отработка лайка при клике
  like.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("rectangle__button_active");
  });
  //удаление карточки при клике на корзину
  trash.addEventListener("click", function (item) {
    //перебираем массив и выполняем удалеие элемента на котором target
    const rectangleElement = document.querySelector(".rectangle");
    rectangleElement.remove();
  });
  //открытие попапа при клике на изображение
  image.addEventListener("click", function (item) {
    openPopup(imagePopup);
    placeCaption.textContent = name;
    placeImage.src = link;
    placeImage.alt = `Зесь должно быть изображение '${name}'`;
  });
  return rectangleElement;
}

//Закрытие попапа кликом на оверлей
function closeOverlayPopup() {
  listPopup.forEach(function (popupItem) {
    popupItem.addEventListener("click", function (evt) {
      closePopup(evt.target);
    });
  });
}
//Закрытие попапа нажатием на Esc
function closeEscPopup() {
  root.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      console.log("нажали кнопку Escape");
      listPopup.forEach(function (popupItem) {
        closePopup(popupItem);
      });
    }
  });
}

//Очистка полей от ошибок
function resetFields(formElement) {
  const error = formElement.querySelectorAll(".popup__input-error"); //очистить спан вместе с содержимым
  error.forEach(function (error) {
    error.classList.remove("popup__input-error_active");
    error.textContent = "";
  });

  const input = formElement.querySelectorAll(".popup__input"); //убрать красныое подчеркиваение
  input.forEach(function (input) {
    input.classList.remove("popup__input_type_error");
  });
}

//Отключение кнопки
function disabledButton(formElement) {
  const submit = formElement.querySelector(".popup__submit-btn");
  submit.setAttribute("disabled", "disabled"); //отключение кнопки
  submit.classList.add("popup__submit-btn_inactive"); // добавление класса отключенной кнопки
}

// Прикрепляем слушателя к кнопке редактирования ПРОФАЙЛА
buttonEdidPopupProfile.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = profileTitle.textContent; //заносим дынные текста из профайла в поле ввода
  jobInput.value = profileSubtitle.textContent; //заносим дынные текста из профайла в поле ввода
});
// Прикрепляем слушателя к кнопке закрытия попапа ПРОФАЙЛА
buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(profilePopup);
});
// Прикрепляем слушателя к форме отправки ПРОФАЙЛА
popupFormEditProfile.addEventListener("submit", submitFormProfile);

// Прикрепляем обработчик к кнопке добавления КАРТОЧКИ С МЕСТОМ
buttonAddNewCard.addEventListener("click", function () {
  openPopup(cardPopup);
  popupFormAddCard.reset(); //сбрасывает поля формы при нажатии на клавишу добавить
  disabledButton(popupFormAddCard);
});
// Прикрепляем обработчик к кнопке закрытия попапа добавления КАРТОЧКИ С МЕСТОМ
buttonCloseNewCard.addEventListener("click", function () {
  closePopup(cardPopup);
});
// Прикрепляем слушателя к форме отправки НОВОЙ КАРТОЧКИ С МЕСТОМ
popupFormAddCard.addEventListener("submit", submitFormNewCard);

// Прикрепляем обработчик к кнопке закрытия попапа с УВЕЛИЧЕННЫМ ИЗОБРАЖЕНИЕМ МЕСТА
buttonClosePopupImage.addEventListener("click", function () {
  closePopup(imagePopup);
});

// Закрытие попапа кликом и Escape
closeOverlayPopup();
closeEscPopup();
