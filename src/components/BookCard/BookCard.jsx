import css from "./BookCard.module.css";

const BookCard = ({ book, onClick }) => {
  return (
    <button type="button" className={css.card} onClick={() => onClick(book)}>
      <div className={css.coverWrapper}>
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className={css.cover} />
        ) : (
          <div className={css.coverPlaceholder} />
        )}
      </div>
      <p className={css.title}>{book.title}</p>
      <p className={css.author}>{book.author}</p>
    </button>
  );
};

export default BookCard;
