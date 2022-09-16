import { Popup } from "./Popup.js"; // выполнили привязку родительского класса Popup

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }
  //перезаписываемый метод класса Popup
  open(name, link) {
    super.open(); //наследование метода из родительского класса
    //Объявляем переменные картинки и подписи МЕСТА
    const placeImage = document.querySelector(".popup__image-place"); //изображение места
    const placeCaption = document.querySelector(".popup__caption"); //подпись к изображению места
    placeCaption.textContent = name;
    placeImage.src = link;
    placeImage.alt = `Здесь должно быть изображение '${name}'`;
  }
}
