import {createElement} from '../mock/utilites.js';
import {getRankLabel} from '../mock/user-rank.js';

const createHeaderProfileTemplate = (isWatched) => {
  const userRank = getRankLabel(isWatched);

  return `<section class="header__profile profile">
  ${isWatched !== 0 ? `<p class="profile__rating">${userRank}</p>` : ``}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class HeaderProfile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderProfileTemplate();
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
