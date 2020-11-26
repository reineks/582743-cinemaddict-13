import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFilmsStatisticTemplate} from "./view/films-statistic.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createSortTemplate} from "./view/sort.js";

const FILM_COUNT = 5;
const MOST_COMMENTED_COUNT = 2;
const TOP_RATED_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const HeaderElement = document.querySelector(`.header`);
const MainElement = document.querySelector(`.main`);
const BodyElement = document.querySelector(`body`);
const FooterFilmsStatisticsElement = document.querySelector(`.footer__statistics`);

render(HeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(MainElement, createMainMenuTemplate(), `beforeend`);
render(MainElement, createSortTemplate(), `beforeend`);
render(MainElement, createFilmsListTemplate(), `beforeend`);
render(FooterFilmsStatisticsElement, createFilmsStatisticTemplate(), `beforeend`);
render(BodyElement, createFilmDetailsTemplate(), `beforeEnd`);


const filmsListElement = MainElement.querySelector(`.films-list > .films-list__container`);
const filmsListRatedElement = MainElement.querySelector(`.films-list + .films-list--extra .films-list__container`);
const filmsListCommentedElement = MainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);

render(filmsListElement, createShowMoreButtonTemplate(), `afterend`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(filmsListRatedElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
  render(filmsListCommentedElement, createFilmCardTemplate(), `beforeend`);
};

const Popup = BodyElement.querySelector(`.film-details`);
Popup.classList.add(`visually-hidden`);

