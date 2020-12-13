import {FILMS_ON_PAGE_COUNT, MOST_COMMENTED_COUNT, TOP_RATED_COUNT, FILMS_IN_LIST_TOTAL_COUNT, TOTAL_COMMENTS_COUNT} from "./consts.js";
import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createFiltersTemplate} from "./view/main-menu.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFilmsStatisticTemplate} from "./view/films-statistic.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createSortTemplate} from "./view/sort.js";
import {createCommentTemplate} from "./view/comments-list.js";
// import {createEmptyFilmsTemplate} from "./view/empty-films-list.js";
// import {createStatisticsTemplate} from "./view/user-statistic.js";
import {generateComment} from "./mock/comments.js";
import {generateFilmCard} from "./mock/films-card.js";
import {generateFilter} from "./mock/filters.js";
import {render} from "./mock/utilites.js";

const films = new Array(FILMS_IN_LIST_TOTAL_COUNT).fill().map(generateFilmCard);
const comments = new Array(TOTAL_COMMENTS_COUNT).fill().map(generateComment);
const filters = generateFilter(films);

const HeaderElement = document.querySelector(`.header`);
const MainElement = document.querySelector(`.main`);
const BodyElement = document.querySelector(`body`);
const FooterFilmsStatisticElement = document.querySelector(`.footer__statistics`);

render(HeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(MainElement, createFiltersTemplate(filters), `beforeend`);
render(MainElement, createSortTemplate(), `beforeend`);
render(MainElement, createFilmsListTemplate(films), `beforeend`);
render(FooterFilmsStatisticElement, createFilmsStatisticTemplate(), `beforeend`);


const filmsListElement = MainElement.querySelector(`.films-list > .films-list__container`);
const filmsListRatedElement = MainElement.querySelector(`.films-list + .films-list--extra .films-list__container`);
const filmsListCommentedElement = MainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);


for (let i = 0; i < Math.min(films.length, FILMS_ON_PAGE_COUNT); i++) {
  render(filmsListElement, createFilmCardTemplate(films[i]), `beforeend`);
}

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(filmsListRatedElement, createFilmCardTemplate(films[i]), `beforeend`);
}

for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
  render(filmsListCommentedElement, createFilmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILMS_ON_PAGE_COUNT) {
  let renderedFilmsCards = FILMS_ON_PAGE_COUNT;

  render(filmsListElement, createShowMoreButtonTemplate(), `afterend`);

  const createMoreButton = MainElement.querySelector(`.films-list__show-more`);

  createMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films.slice(renderedFilmsCards, renderedFilmsCards + FILMS_ON_PAGE_COUNT)
      .forEach((film) => render(filmsListElement, createFilmCardTemplate(film), `beforeend`));
  });
}

render(BodyElement, createFilmDetailsTemplate(films[0]), `beforeEnd`);
const popupElement = BodyElement.querySelector(`.film-details`);
const CommentsList = popupElement ? popupElement.querySelector(`.film-details__comments-list`) : null;
popupElement.classList.add(`visually-hidden`);

for (let i = 0; i < comments.length; i++) {
  render(CommentsList, createCommentTemplate(comments[i]), `afterend`);
}
