import dayjs from "dayjs";

export const createCommentTemplate = (comments) => {
  const {message, emoji, author, date} = comments;

  const commentDate = dayjs(date).format(`YYYY/MM/D H:mm`);

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDate}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};
