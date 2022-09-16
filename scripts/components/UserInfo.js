//управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;
  }

  //метод возвращает объект с данными пользователя
  getUserInfo() {
    const obj = {
      name: this._userNameSelector.textContent,
      job: this._userDescriptionSelector.textContent,
    };
    return obj; //возвращает текущее значения textContent элементов из класса в виде объекта
  }

  //метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    console.log(data);
    this._userNameSelector.textContent = data.name;
    this._userDescriptionSelector.textContent = data.job;
    //получает объект с ключами и строковыми значениями и устанавливает их в разметку
  }
}
