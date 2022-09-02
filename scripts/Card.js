const imagePopup = document.querySelector(".popup_type_open-image"); //Попап отображения масштабируемой картинки
export class Card {
  constructor(data, templateSelector, selectors, openPopup){
    this._templateSelector = templateSelector;
    this._seloctors = selectors;
    this._name = data.name;
    this._link = data.link;
    this._openPopup = openPopup;
  }

_getTemplate(){
  const cardElement = this._templateSelector
  .querySelector(this._seloctors.rectangle)
  .cloneNode(true);//заменили 'const = cardElement' на 'this._view'

  return cardElement
}
 //Публичный метод создания новой карты с местом
createCard() {
  this._view = this._getTemplate();
  const image = this._view.querySelector(this._seloctors.image);
  const text = this._view.querySelector(this._seloctors.text);
  const buttonLike = this._view.querySelector(this._seloctors.buttonLike);
  const buttonTrash = this._view.querySelector(this._seloctors.buttonTrash);
  const textAlt = `Здесь должно быть изображение '${this._name}'`;
  image.src = this._link;
  text.textContent = this._name;
  image.alt = textAlt;
  //отработка лайка при клике
  buttonLike.addEventListener("click", this._handleClickLike);
  //удаление карточки при клике на корзину
  buttonTrash.addEventListener("click", this._handleClickTrash);
  //открытие попапа при клике на изображение
  image.addEventListener("click", this._handleClickImage);

  return this._view;
}
//Приватный метод like
_handleClickLike = (evt) => {
  evt.target.classList.toggle("rectangle__button_active");
}
//Приватный метод Trash
_handleClickTrash = () => {
  console.log(this);
  this._view.remove();
}
//Приватный метод для image
_handleClickImage = () => {
  //Объявляем переменные картинки и подписи МЕСТА
  const placeImage = document.querySelector(".popup__image-place"); //изображения места
  const placeCaption = document.querySelector(".popup__caption"); //подпись к изображению места
  console.log('открыли попап с увеличенной картинкой')
  this._openPopup(imagePopup);
  placeCaption.textContent = this._name;
  placeImage.src = this._link;
  placeImage.alt = this._textAlt;
}

}

