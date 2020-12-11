import {getRandomInteger} from './mock/utilites.js';

const FILMS_ON_PAGE_COUNT = 5;
const MOST_COMMENTED_COUNT = 2;
const TOP_RATED_COUNT = 2;
const FILMS_IN_LIST_TOTAL_COUNT = 20;
const TOTAL_COMMENTS_COUNT = getRandomInteger(0, 5);

export {FILMS_ON_PAGE_COUNT, MOST_COMMENTED_COUNT, TOP_RATED_COUNT, FILMS_IN_LIST_TOTAL_COUNT, TOTAL_COMMENTS_COUNT};