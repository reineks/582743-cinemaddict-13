import {getRandomInteger} from './utilites.js';
import {generateRandomItem} from './utilites.js';
import dayjs from "dayjs";


const authors = [
  `John Cromwell`, `Armand Schaefer`, `Nicholas Webster`, `Dave Fleischer`, `Otto Ludwig Preminger`
];

const emoji = [
  `smile`, `sleeping`, `puke`, `angry`
];

const textComments = [`
  Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`
];

const generateDate = () => {
  const maxDaysGap = 365 * 10;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, `day`).toDate();
};

export const generateComment = () => {
  return {
    message: generateRandomItem(textComments, 4),
    emoji: generateRandomItem(emoji, 1),
    author: generateRandomItem(authors, 1),
    date: generateDate(),
  };
};
