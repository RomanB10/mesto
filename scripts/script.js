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
