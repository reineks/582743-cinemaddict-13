import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFooterFilmsStatisticsTemplate} from "./view/films-count.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";

const FILM_COUNT = 5;
const MOST_COMMENTED_FILMS = 2;
const TOP_RATED_FILMS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteBodyElement = document.querySelector(`body`);
const siteFooterFilmsStatistics = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(siteMainElement, createMainMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);
render(siteFooterFilmsStatistics, createFooterFilmsStatisticsTemplate(), `beforeend`);


const filmsList = siteMainElement.querySelector(`.films-list > .films-list__container`);
const filmsListRated = siteMainElement.querySelector(`.films-list + .films-list--extra .films-list__container`);
const filmsListCommented = siteMainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);

render(filmsList, createShowMoreButtonTemplate(), `afterend`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsList, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < TOP_RATED_FILMS; i++) {
  render(filmsListRated, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < MOST_COMMENTED_FILMS; i++) {
  render(filmsListCommented, createFilmCardTemplate(), `beforeend`);
};
