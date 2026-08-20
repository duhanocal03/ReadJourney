import css from "./BookDetails.module.css";

const BookDetails = ({ book, actionLabel, onAction, actionLoading }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.coverWrapper}>
        {book.imageUrl ? (
          <img src={book.imageUrl} alt={book.title} className={css.cover} />
        ) : (
          <div className={css.coverPlaceholder} />
        )}
      </div>

      <h2 className={css.title}>{book.title}</h2>
      <p className={css.author}>{book.author}</p>

      {book.totalPages && (
        <p className={css.pages}>{book.totalPages} pages</p>
      )}

      {onAction && (
        <button
          type="button"
          className={css.actionBtn}
          onClick={onAction}
          disabled={actionLoading}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default BookDetails;
