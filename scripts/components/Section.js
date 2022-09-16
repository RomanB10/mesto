export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items; //массив данных карточки
    this._container = containerSelector; //место куда будем вставлять контейнер, в '.photoGrid'
    this._renderer = renderer; //функция отрисовки одного элемента-карточки
  }
  //метод добавления елемента-карты в контейнер
  addItem(element) {
    this._container.append(element);
  }
  //меиод отрисовки массива карточек
  renderItems() {
    this._initialArray.forEach((data) => {
      this._renderer(data);
    });
  }
}
