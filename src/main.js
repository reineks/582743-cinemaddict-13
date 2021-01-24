import {FILMS_PER_STEP, MOST_COMMENTED_COUNT, TOP_RATED_COUNT, FILMS_PER_LIST, TOTAL_COMMENTS_COUNT} from "./consts.js";
import {render, RenderPosition} from "./mock/utilites.js";
import HeaderProfileView from "./view/header-profile.js";
import FilterView from "./view/filter.js";
import FilmCardView from "./view/film-card.js";
import FilmCardDetailsView from "./view/film-details.js";
import FilmsStatistic from "./view/films-statistic.js";
import FilmsListView from "./view/films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import SortView from "./view/sort.js";
import EmptyFilmsListView from "./view/empty-films-list.js";
import {generateFilmCard} from "./mock/films-card.js";
import {getRankLabel} from "./mock/utilites.js";

const films = new Array(FILMS_PER_LIST).fill().map(generateFilmCard);
const userRank = getRankLabel();

const HeaderElement = document.querySelector(`.header`);
const MainElement = document.querySelector(`.main`);
const BodyElement = document.querySelector(`body`);
const FooterFilmsStatisticElement = document.querySelector(`.footer__statistics`);

render(HeaderElement, new HeaderProfileView(userRank).getElement(), RenderPosition.BEFOREEND);
render(MainElement, new FilterView().getElement(), RenderPosition.AFTERBEGIN);
render(FooterFilmsStatisticElement, new FilmsStatistic(FILMS_PER_LIST).getElement(), RenderPosition.BEFOREEND);

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

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      BodyElement.removeChild(filmCardDetailsComponent.getElement());
      BodyElement.classList.remove(`hide-overflow`);
      BodyElement.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    BodyElement.removeChild(filmCardDetailsComponent.getElement());
    BodyElement.classList.remove(`hide-overflow`);
    BodyElement.removeEventListener(`keydown`, onEscKeyDown);
  });

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    BodyElement.appendChild(filmCardDetailsComponent.getElement());
    BodyElement.classList.add(`hide-overflow`);
    BodyElement.addEventListener(`keydown`, onEscKeyDown);
  });

  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    BodyElement.appendChild(filmCardDetailsComponent.getElement());
    BodyElement.classList.add(`hide-overflow`);
    BodyElement.addEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};


for (let i = 0; i < Math.min(films.length, FILMS_PER_STEP); i++) {
  renderFilmCard(filmsListContainerElement, films[i]);
}
for (let i = 0; i < MOST_COMMENTED_COUNT; i++) {
  renderFilmCard(filmsListCommentedElement, films[i]);
}

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  renderFilmCard(filmsListRatedElement, films[i]);
}

if (films.length > FILMS_PER_STEP) {

  const createMoreButtonComponent = new ShowMoreButtonView();
  render(filmsListElement, createMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  createMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    let renderedFilmsCards = FILMS_PER_STEP;

    evt.preventDefault();
    films
      .slice(renderedFilmsCards, renderedFilmsCards + FILMS_PER_STEP)
      .forEach((film) => renderFilmCard(filmsListContainerElement, film));

    renderedFilmsCards += FILMS_PER_STEP;

    if (renderedFilmsCards >= films.length) {
      createMoreButtonComponent.getElement().remove();
      createMoreButtonComponent.removeElement();
    }
  });
}
