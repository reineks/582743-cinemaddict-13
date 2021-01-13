
export const getRankLabel = (rank) => {

  if (rank <= 10) {
    return `Novice`;
  } else if (rank <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};
