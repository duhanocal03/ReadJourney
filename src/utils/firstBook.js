const FIRST_BOOK_KEY = "readjourney_first_book_added";

export const isFirstBookAdd = () => !localStorage.getItem(FIRST_BOOK_KEY);

export const markFirstBookAdded = () => {
  localStorage.setItem(FIRST_BOOK_KEY, "true");
};