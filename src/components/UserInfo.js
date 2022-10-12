import { Api} from "./Api.js";

//управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ userName, userDescription, userAvatar }) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }

getUserInfo() {
    const obj = {
      name: this._userName.textContent,
      job: this._userDescription.textContent,
    };
    return obj; //возвращает текущее значения textContent элементов из класса в виде объекта
  }

  //метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._userAvatar.src = data.avatar;
    //получает объект с ключами и строковыми значениями и устанавливает их в разметку
  }
}

