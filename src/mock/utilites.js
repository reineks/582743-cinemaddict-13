
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomItem = (array) => {
  const generateIndex = getRandomInteger(0, array.length - 1);
  return array[generateIndex];
};

export const generateRandomArray = (array, maxIndex) => {
  const lengthArray = getRandomInteger(1, maxIndex);
  let randomArray = [];

  for (let i = 0; i < lengthArray; i++) {
    randomArray.push(generateRandomItem(array));
  }

  return randomArray;
};

export const generateStringFromArray = (array, separator) => {
  let stringValue = ``;

  if (array.length > 1) {
    stringValue = array.join(separator);
  }

  return stringValue;
};

export const isPropertyActive = (property) => property ? `film-card__controls-item--active` : ``;
