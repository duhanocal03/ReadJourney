import BookCard from "../BookCard/BookCard";
import css from "./RecommendedBooks.module.css";

const RecommendedBooks = ({
  books,
  page,
  totalPages,
  onPrev,
  onNext,
  onCardClick,
}) => {
  return (
    <section className={css.section}>
      <div className={css.headerRow}>
        <h1 className={css.title}>Recommended</h1>

        <div className={css.pagination}>
          <button
            type="button"
            className={css.pageBtn}
            onClick={onPrev}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>
          <button
            type="button"
            className={css.pageBtn}
            onClick={onNext}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>

      {books.length === 0 ? (
        <p className={css.empty}>Kitap bulunamadı.</p>
      ) : (
        <div className={css.grid}>
          {books.map((book) => (
            <BookCard key={book._id} book={book} onClick={onCardClick} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendedBooks;
