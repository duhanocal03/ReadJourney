import css from "./LibraryBookCard.module.css";

const LibraryBookCard = ({ book, onOpen, onDelete }) => {
  return (
    <div className={css.card}>
      <button
        type="button"
        className={css.coverBtn}
        onClick={() => onOpen(book)}
      >
        <div className={css.coverWrapper}>
          {book.imageUrl ? (
            <img src={book.imageUrl} alt={book.title} className={css.cover} />
          ) : (
            <div className={css.coverPlaceholder} />
          )}
        </div>
      </button>

      <p className={css.title}>{book.title}</p>
      <p className={css.author}>{book.author}</p>

      <button
        type="button"
        className={css.deleteBtn}
        onClick={() => onDelete(book._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default LibraryBookCard;
