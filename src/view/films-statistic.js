import {createElement} from '../mock/utilites.js';

const createFilmsStatisticTemplate = (FILMS_IN_LIST_TOTAL) => {

  return `<p>${FILMS_IN_LIST_TOTAL} movies inside</p>`;
};

export default class FilmsStatistic {
  constructor(FILMS_IN_LIST_TOTAL) {
    this.FILMS_IN_LIST_TOTAL = FILMS_IN_LIST_TOTAL;
    this._element = null;
  }

  getTemplate() {
    return createFilmsStatisticTemplate(this.FILMS_IN_LIST_TOTAL);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

