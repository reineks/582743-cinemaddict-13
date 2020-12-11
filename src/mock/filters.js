const filmsToFilterMap = {
  All: (films) => films.length,
  Watchlist: (films) => films.filter((film) => film.isWatchlist).length,
  History: (films) => films.filter((film) => film.isWatched).length,
  Favorites: (films) => films.filter((film) => film.isFavourite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmsToFilterMap).map(([filterName, filmsCount]) => {
    return {
      name: filterName,
      count: filmsCount(films),
    };
  });
};

