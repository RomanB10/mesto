let editButton = document.querySelector(".profile__edit-btn");//Объявляем перемнную кнопки редактирования
let closeButton = document.querySelector(".popup__close-btn"); //Объявляем перемнную кнопки закрытия
let popup = document.querySelector(".popup"); //Объявляем перемнную контейнера с формой
//Объявляем перемнные с полями ввода
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
//Объявляем перемнные с текстовым содержимым профайла
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

function editForm() {
// Обработчик «открытия/редактирования» формы
  popup.classList.add("popup_opened");
}
// Обработчик «закрытия» формы
function closeForm() {
  popup.classList.remove("popup_opened");
}
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;//присваеваем значения полей ввода
  profileSubtitle.textContent = jobInput.value;//присваеваем значения полей ввода
  closeForm() //закрытие формы
}
editButton.addEventListener("click", editForm);// Прикрепляем обработчик к кнопке редактирования
closeButton.addEventListener("click", closeForm);// Прикрепляем обработчик к кнопке закрытия
popup.addEventListener("submit", formSubmitHandler);// Прикрепляем обработчик к форме
