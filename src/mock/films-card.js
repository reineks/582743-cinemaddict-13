import {getRandomInteger} from './utilites.js';
import {generateRandomItem} from './utilites.js';
import {generateRandomArray} from './utilites.js';
// import {TOTAL_COMMENTS_COUNT} from '../consts.js';
import dayjs from "dayjs";

const titles = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa Claus conquers the Martians`,
  `The dance of life`,
  `The great Flamarion`,
  `The man with the golden arm`
];

const ageRatings = [`0+`, `6+`, `12+`, `16+`, `18+`];

const directors = [
  `John Cromwell`,
  `Albert Edward Sutherland`,
  `Armand Schaefer`,
  `Otto Ludwig Preminger`,
  `Nicholas Webster`,
  `Dave Fleischer`,
];

const writers = [
  `Benjamin Glazer`,
  `Paul L. Jacobson`,
  `Walter Newman`,
  `Lewis Meltzer`,
  `Lindsley Parsons`,
];

const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `John Wayne`,
  `Nancy Shubert`,
  `Lane Chandler`,
  `John Call`,
  `Leonard Hicks`,
  `Vincent Beck`,
  `Bill McCutcheon`,
  `Victor Stiles`,
  `	Hal Skelly`,
  `Nancy Carroll`,
];

const countries = [
  `USA`,
  `Germany`,
  `France`,
  `England`,
  `Italy`,
];

const genres = [
  `Comedy`,
  `Drama`,
  `Triller`,
  `Horror`,
  `Western`,
  `Sci-Fi`,
  `Fantasy`,
  `Film-Noir`,
];

const postersLinks = [
  `made-for-each-other.png`,
  `sagebrush-trail.jpg`,
  `popeye-meets-sinbad.png`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const textComments = [`
  Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`
];

const descriptionFilmTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus`;

const generateDateReleaseFilm = () => {
  const maxDays = 365;
  const daysGap = getRandomInteger(-maxDays, maxDays);

  return dayjs().add(daysGap, `day`).toDate();
};

const shortDescription = (description) => {
  return description.length > 140
    ? `${description.slice(0, 140 - 1)}...`
    : description;
};

const generateFilmDescription = () => {
  const sentencesCount = getRandomInteger(1, 5);
  const sentences = descriptionFilmTemplate.split(`.`);
  let randomFilmDescription = ``;

  for (let i = 0; i < sentencesCount; i++) {
    randomFilmDescription += generateRandomItem(sentences) + `. `;
  }

  return randomFilmDescription;
};

export const generateFilmCard = () => {
  const title = generateRandomItem(titles);
  const year = getRandomInteger(1929, 2020);
  const description = generateFilmDescription();

  return {
    poster: generateRandomItem(postersLinks),
    rating: (Math.random() * 10).toFixed(1),
    title,
    ageRating: generateRandomItem(ageRatings),
    originTitle: title,
    director: generateRandomArray(directors, 1),
    writers: generateRandomArray(writers, 5),
    actors: generateRandomArray(actors, 5),
    year,
    release: generateDateReleaseFilm(),
    runtime: getRandomInteger(1, 5) + `h ` + getRandomInteger(0, 59) + `m`,
    country: generateRandomArray(countries, 1),
    genres: generateRandomArray(genres, 5),
    description,
    descriptionPreview: shortDescription(description),
    comments: generateRandomArray(textComments, 5),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavourite: Boolean(getRandomInteger(0, 1))
  };
};
