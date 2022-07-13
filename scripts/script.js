// Находим элементы-кнопки Edit и Close
let editButton = document.querySelector(".profile__edit-btn");
let closeButton = document.querySelector(".popup__close-btn");

function editForm() {
  // Обработчик «открытия/редактирования» формы,
  let popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
}
function closeForm() {
  // Обработчик «закрытия» формы,
  let popup = document.querySelector(".popup");
  popup.classList.toggle("popup_opened");
}
editButton.addEventListener("click", editForm);
closeButton.addEventListener("click", closeForm);

// Находим форму в DOM
let formElement = document.querySelector(".popup");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__name-input");
let jobInput = document.querySelector(".popup__job-input");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let profileTitle = document.querySelector(".profile__title");
  let profileSubtitle = document.querySelector(".profile__subtitle");
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
