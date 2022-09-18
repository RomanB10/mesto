import { Popup } from "./Popup.js"; // выполнили привязку родительского класса Popup

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._placeImage = document.querySelector(".popup__image-place"); //изображение места
    this._placeCaption = document.querySelector(".popup__caption"); //подпись к изображению места
  }
  //перезаписываемый метод класса Popup
  open(name, link) {
    super.open(); //наследование метода из родительского класса
    //Объявляем переменные картинки и подписи МЕСТА
    const placeImage = this._placeImage;
    const placeCaption = this._placeCaption;
    placeCaption.textContent = name;
    placeImage.src = link;
    placeImage.alt = `Здесь должно быть изображение '${name}'`;
  }
}
