import {getRandomInteger} from './utilites.js';
import {generateRandomCount} from './utilites.js';
import dayjs from "dayjs";


const generateAuthor = [
  `John Cromwell`, `Armand Schaefer`, `Nicholas Webster`, `Dave Fleischer`, `Otto Ludwig Preminger`
];

const generateEmoji = [
  `smile`, `sleeping`, `puke`, `angry`
];

const generateDate = () => {
  const maxDaysGap = 365 * 10;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, `day`).toDate();
};

export const generateComment = () => {
  return {
    message: `my comment`,
    emoji: generateRandomCount(generateEmoji),
    author: generateRandomCount(generateAuthor),
    date: generateDate(),
  };
};
