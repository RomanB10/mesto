const root = document.querySelector(".root");
const photoGrid = document.querySelector(".photo-grid"); // обьявили переменную списка
const rectangleTemplate = document.querySelector("#rectangle-template").content; //обращаемся к контенту шаблона темплайт

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
  const rectangleElement = rectangleTemplate
    .querySelector(".rectangle")
    .cloneNode(true);
  rectangleElement.querySelector(".rectangle__image").src = element.link; // Указываем значение поля link каждого перебираемого элемента;
  rectangleElement.querySelector(".rectangle__text").textContent = element.name; // Указываем значение поля name каждого перебираемого элемента;
  rectangleElement.querySelector(".rectangle__image").alt = `${element.name}`; // Указываем значение поля name каждого перебираемого элемента;
  photoGrid.append(rectangleElement);
});

let rectangleImage = document.querySelectorAll(".rectangle__image");
rectangleImageArray = Array.from(rectangleImage);

let editButton = document.querySelector(".profile__edit-btn"); //Объявляем перемнную кнопки редактирования
let closeButton = document.querySelector(".popup__close-btn"); //Объявляем перемнную кнопки закрытия
let addButton = document.querySelector(".profile__add-btn"); //Объявляем перемнную кнопки добавления карточки
let closeButtonAddCard = document.querySelector(
  ".popup__close-btn_type_add-card"
); //Объявляем перемнную кнопки закрытия формы <<добавления>> карточки
let likeButton = document.querySelectorAll(".rectangle__button"); //Объявляем перемнную лайка
let trashButton = document.querySelectorAll(".rectangle__button-trash"); //Объявляем перемнную корзины
let closeButtonOpenImage = document.querySelector(
  ".popup__close-btn_type_open-image"
); //Объявляем перемнную кнопки закрытия попапа с открытой <<полной>> картинкой

//открытие попапа при клике на изображение
rectangleImageArray.forEach(function (item) {
  item.addEventListener("click", function () {
    console.log(item);
    popupOpenImage.classList.add("popup_opened");
    popupCaption.textContent = item.alt;
    popupImagePlace.src = item.src;
  });
});
//отработка лайка при клике
let likeButtonArray = Array.from(likeButton); //перевели колекцию лайка в массив
likeButtonArray.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle("rectangle__button_active");
  });
});
//удаление карточки при клике на корзину
let trashButtonArray = Array.from(trashButton);
console.log(trashButtonArray.length);
trashButtonArray.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    const rectangleElement = document.querySelector(".rectangle");
    rectangleElement.remove();
  });
});

let popup = document.querySelector(".popup"); //Объявляем перемнную контейнера с формой
let popupTypeAddCard = document.querySelector(".popup_type_add-card"); //Объявляем перемнную контейнера с формой добавления карточки
let popupForm = document.querySelector(".popup__form"); //Объявляем перемнную  с формой
let popupFormAddCard = document.querySelector(".popup__form_type_add-card"); //Объявляем перемнную  с формой добавления карточки
let popupOpenImage = document.querySelector(".popup_type_open-image"); //Объявляем перемнную контейнера с изображением места
let popupImagePlace = document.querySelector(".popup__image-place"); //Объявляем перемнную изображения места
let popupCaption = document.querySelector(".popup__caption"); //Объявляем перемнную подписи изображения

//Объявляем перемнные с полями ввода
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
//Объявляем перемнные с полями ввода от формы с добавлеием корточки
let placeNameInput = document.querySelector(".popup__input_type_place-name");
let placeImageInput = document.querySelector(".popup__input_type_place-image");
//Объявляем перемнные с текстовым содержимым профайла
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

function editForm() {
  // Обработчик «открытия/редактирования» формы
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent; //заносим дынные текста из профайла в поле ввода
  jobInput.value = profileSubtitle.textContent; //заносим дынные текста из профайла в поле ввода
}
// Обработчик «закрытия» формы
function closeForm() {
  popup.classList.remove("popup_opened");
}
// Обработчик «отправки» формы (добавляющей данные в профайл)
function submitFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value; //присваеваем значения полей ввода
  profileSubtitle.textContent = jobInput.value; //присваеваем значения полей ввода
  closeForm(); //закрытие формы
}
// Обработчик «закрытия» контейнера с полным изображением
function closePlace() {
  popupOpenImage.classList.remove("popup_opened");
}
// Обработчик «открытия» формы (добавляющей карточку с местом)
function addFormCard() {
  popupTypeAddCard.classList.add("popup_opened");
}
// Обработчик «закрытия» формы (добавляющей карточку с местом)
function closeFormCard() {
  popupTypeAddCard.classList.remove("popup_opened");
}

//Обработчик «отправки» формы-добавления/удаления карты с новым местом
function submitFormHandlerAddCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const rectangleElement = rectangleTemplate
    .querySelector(".rectangle")
    .cloneNode(true);
  rectangleElement.querySelector(".rectangle__image").src =
    placeImageInput.value;
  rectangleElement.querySelector(".rectangle__text").textContent =
    placeNameInput.value;
  rectangleElement.querySelector(
    ".rectangle__image"
  ).alt = `здесь должно быть изображение ${placeNameInput.value} `;
  photoGrid.prepend(rectangleElement);
  //отработка лайка при клике
  rectangleElement
    .querySelector(".rectangle__button")
    .addEventListener("click", function (evt) {
      const eventTarget = evt.target;
      eventTarget.classList.toggle("rectangle__button_active");
    });
  //удаление карточки при клике на корзину
  rectangleElement
    .querySelector(".rectangle__button-trash")
    .addEventListener("click", function (item) {
      //перебираем массив и выполняем удалеие элемента на котором target
      const rectangleElement = document.querySelector(".rectangle");
      rectangleElement.remove();
    });
  //открытие попапа при клике на изображение
  rectangleElement
    .querySelector(".rectangle__image")
    .addEventListener("click", function (item) {
      popupOpenImage.classList.add("popup_opened");
      popupCaption.textContent = placeNameInput.value;
      popupImagePlace.src = placeImageInput.value;
    });

  closeFormCard(); //закрытие формы
}

editButton.addEventListener("click", editForm); // Прикрепляем обработчик к кнопке редактирования
closeButton.addEventListener("click", closeForm); // Прикрепляем обработчик к кнопке закрытия
popupForm.addEventListener("submit", submitFormHandler); // Прикрепляем обработчик к форме
addButton.addEventListener("click", addFormCard); // Прикрепляем обработчик к кнопке добавления карточек
closeButtonAddCard.addEventListener("click", closeFormCard); // Прикрепляем обработчик к кнопке закрытия <<добавления>> карточек
popupFormAddCard.addEventListener("submit", submitFormHandlerAddCard); // Прикрепляем обработчик к форме c <<добавлениея/удаления>> карточек
closeButtonOpenImage.addEventListener("click", closePlace); // Прикрепляем обработчик к кнопке закрытия попапа с полным изображением
