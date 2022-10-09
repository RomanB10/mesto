//управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ userName, userDescription, userAvatar }) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }

  //метод возвращает объект с данными пользователя
  getUserInfo(data) {
    const obj = {
      name: data.name,
      job: data.about,
      avatar: data.avatar,
      _id: data._id
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

