export class Section {
  constructor({ renderer }, container) {
   /* this._initialArray = items; //массив данных карточки*/
    this._container = container; //место куда будем вставлять контейнер, в '.photoGrid'
    this._renderer = renderer; //функция отрисовки одного элемента-карточки
  }
  //методы добавления елемента-карты в контейнер
  addItem(element) {
    this._container.append(element);
  }
  prependItem(element) {
    this._container.prepend(element);
  }
  //меиод отрисовки массива карточек
  renderItems(initialArray) {
    initialArray.forEach((data) => {
      this._renderer(data);
    });
  }
}
