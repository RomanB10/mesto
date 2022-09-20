import { Popup } from "./Popup.js"; // выполнили привязку родительского класса Popup

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._placeImage = this._popup.querySelector(".popup__image-place"); //изображение места
    this._placeCaption = this._popup.querySelector(".popup__caption"); //подпись к изображению места
  }
  //перезаписываемый метод класса Popup
  open(data) {
    super.open(); //наследование метода из родительского класса
    this._placeCaption.textContent = data.name;
    this._placeImage.src = data.link;
    this._placeImage.alt = `Здесь должно быть изображение'${data.name}'`;
  }
}
