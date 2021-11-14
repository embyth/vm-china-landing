export default class Products {
  constructor() {
    this.cardTitles = document.querySelectorAll(`.products__card-title`);
    this.productCards = document.querySelectorAll(`.products__card`);

    this._mouseOverHander = this._mouseOverHander.bind(this);
    this._mouseOutHandler = this._mouseOutHandler.bind(this);
  }

  _mouseOverHander(evt) {
    const target = evt.currentTarget;

    const title = target.querySelector(`.products__card-title`);

    const filtered = [...this.cardTitles].filter((item) => item !== title);
    filtered.forEach((item) => {
      item.classList.add(`products__card-title--hide`);
    });
  }

  _mouseOutHandler() {
    this.cardTitles.forEach((item) => {
      item.classList.remove(`products__card-title--hide`);
    });
  }

  init() {
    this.productCards.forEach((card) => card.addEventListener(`mouseover`, this._mouseOverHander));
    this.productCards.forEach((card) => card.addEventListener(`mouseout`, this._mouseOutHandler));
  }
}
