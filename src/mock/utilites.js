
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
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

export const isPropertyActive = (property) => property ? `film-card__controls-item--active` : ``;
export const isItemActive = (property) => property ? `main-navigation__item--active` : ``;
