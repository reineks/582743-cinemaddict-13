import {FILMS_ON_PAGE_COUNT, MOST_COMMENTED_COUNT, TOP_RATED_COUNT, FILMS_IN_LIST_TOTAL, TOTAL_COMMENTS_COUNT} from "./consts.js";
import {render, RenderPosition} from "./mock/utilites.js";
import HeaderProfileView from "./view/header-profile.js";
import FilterView from "./view/main-menu.js";
import FilmCardView from "./view/film-card.js";
import FilmCardDetailsView from "./view/film-details.js";
import FilmsStatistic from "./view/films-statistic.js";
import FilmsListView from "./view/films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import SortView from "./view/sort.js";
import EmptyFilmsListView from "./view/empty-films-list.js";
import {generateFilmCard} from "./mock/films-card.js";
// import {generateFilter} from "./mock/filters.js";
import {getRankLabel} from "./mock/user-rank.js";

const films = new Array(FILMS_IN_LIST_TOTAL).fill().map(generateFilmCard);
// const filters = generateFilter(films);
const userRank = getRankLabel();

const HeaderElement = document.querySelector(`.header`);
const MainElement = document.querySelector(`.main`);
const BodyElement = document.querySelector(`body`);
const FooterFilmsStatisticElement = document.querySelector(`.footer__statistics`);

render(HeaderElement, new HeaderProfileView(userRank).getElement(), RenderPosition.BEFOREEND);
render(MainElement, new FilterView().getElement(), RenderPosition.AFTERBEGIN);
render(FooterFilmsStatisticElement, new FilmsStatistic(FILMS_IN_LIST_TOTAL).getElement(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(MainElement, new EmptyFilmsListView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(MainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(MainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
}

const filmsListElement = MainElement.querySelector(`.films-list`);
const filmsListContainerElement = MainElement.querySelector(`.films-list > .films-list__container`);
const filmsListRatedElement = MainElement.querySelector(`.films-list + .films-list--extra .films-list__container`);
const filmsListCommentedElement = MainElement.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);


const renderFilmCard = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmCardDetailsComponent = new FilmCardDetailsView(film);

  filmCardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    BodyElement.removeChild(filmCardDetailsComponent.getElement());
    BodyElement.classList.remove(`hide-overflow`);
  });

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    BodyElement.appendChild(filmCardDetailsComponent.getElement());
    BodyElement.classList.add(`hide-overflow`);
  });

  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    BodyElement.appendChild(filmCardDetailsComponent.getElement());
    BodyElement.classList.add(`hide-overflow`);
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};


for (let i = 0; i < Math.min(films.length, FILMS_ON_PAGE_COUNT); i++) {
  renderFilmCard(filmsListContainerElement, films[i]);
}
for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
  renderFilmCard(filmsListCommentedElement, films[i]);
}

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  renderFilmCard(filmsListRatedElement, films[i]);
}


if (films.length > FILMS_ON_PAGE_COUNT) {
  let renderedFilmsCards = FILMS_ON_PAGE_COUNT;

  const createMoreButtonComponent = new ShowMoreButtonView();
  render(filmsListElement, createMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  createMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCards, renderedFilmsCards + FILMS_ON_PAGE_COUNT)
      .forEach((film) => renderFilmCard(filmsListContainerElement, film));
  });
}
