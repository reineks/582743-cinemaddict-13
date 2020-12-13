const createFilterItemTemplate = ({name, count}, isActive) => {
  return `<a href="${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
  ${name} ${!isActive ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
};

export const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join(``);

  return `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
