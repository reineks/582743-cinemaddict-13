import {createHeaderProfileTemplate} from "./view/header-profile.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createFilmDetailsTemplate} from "./view/film-details.js";
import {createFilmsStatisticTemplate} from "./view/films-statistic.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createSortTemplate} from "./view/sort.js";
import {createCommentTemplate} from "./view/comments-list.js";
import {generateComment} from "./mock/comments.js";
import {generateFilmCard} from "./mock/films-card.js";
import {generateUserRank} from "./mock/user-rank.js";
import {render} from "./mock/utilites.js";

const FILMS_ON_PAGE_COUNT = 5;
const MOST_COMMENTED_COUNT = 2;
const TOP_RATED_COUNT = 2;
const FILMS_IN_LIST_TOTAL_COUNT = 20;
const MAX_COMMENTS_COUNT = 5;

const films = new Array(FILMS_IN_LIST_TOTAL_COUNT).fill().map(generateFilmCard);
const comments = new Array(MAX_COMMENTS_COUNT).fill().map(generateComment);

const HeaderElement = document.querySelector(`.header`);
const MainElement = document.querySelector(`.main`);
const BodyElement = document.querySelector(`body`);
const FooterFilmsStatisticElement = document.querySelector(`.footer__statistics`);

render(HeaderElement, createHeaderProfileTemplate(), `beforeend`);
render(MainElement, createMainMenuTemplate(), `beforeend`);
render(MainElement, createSortTemplate(), `beforeend`);
render(MainElement, createFilmsListTemplate(), `beforeend`);
render(FooterFilmsStatisticElement, createFilmsStatisticTemplate(), `beforeend`);
// render(BodyElement, createFilmDetailsTemplate(films[0]), `beforeEnd`);

try {
  const filmsListElement = MainElement.querySelector(`.films-list > .films-list__container`);
  const filmsListRatedElement = MainElement.querySelector(`.films-list + .films-list--extra .films-list__container`);
  const filmsListCommentedElement = MainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);


  films.forEach((film) => {
    render(filmsListElement, createFilmCardTemplate(film), `beforeend`);
  });

// for (let i = 0; i < Math.min(films.length, FILMS_ON_PAGE_COUNT); i++) {
//   render(filmsListElement, createFilmCardTemplate(films[i]), `beforeend`);
// }

  for (let i = 0; i < TOP_RATED_COUNT; i++) {
    render(filmsListRatedElement, createFilmCardTemplate(films[i]), `beforeend`);
  }

  for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
    render(filmsListCommentedElement, createFilmCardTemplate(films[i]), `beforeend`);
  }


  if (films.length > FILMS_ON_PAGE_COUNT) {
    render(filmsListElement, createShowMoreButtonTemplate(), `afterend`);

    const createMoreButton = MainElement.querySelector(`.films-list__show-more`);
    const renderedFilmsCards = FILMS_ON_PAGE_COUNT;

    createMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      films
        .slice(renderedFilmsCards, renderedFilmsCards + FILMS_ON_PAGE_COUNT)
        .forEach((film) => render(filmsListElement, createFilmCardTemplate(film), `beforeend`));

      var test = 8

      console.log(test)

      renderedFilmsCards += FILMS_ON_PAGE_COUNT;

      if (renderedFilmsCards >= films.length) {
        createMoreButton.remove();
      }
    });
  }


  const popupElement = BodyElement.querySelector(`.film-details`);
  const popupCommentsListElement = popupElement ? popupElement.querySelector(`.film-details__comments-list`) : null;
  if (popupElement) {
    popupElement.classList.add(`visually-hidden`);
  }

  for (let i = 0; i < films[0].comments; i++) {
    if (popupCommentsListElement) {
      render(popupCommentsListElement, createCommentTemplate(comments[i])`beforeend`);
    }
  }

  const closePopupButton = popupElement.querySelector(`.film-details__close-btn`);

  closePopupButton.addEventListener(`click`, `keydown`, (evt) => {
    evt.preventDefault();
    popupElement.remove();

    if (evt.key === `Escape`) {
      popupElement.remove();
    }
  });

}
catch (e) {
console.log('ОШИБКА', e)
}
