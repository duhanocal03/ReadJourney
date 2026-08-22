import LibraryBookCard from "../LibraryBookCard/LibraryBookCard";
import StatusSelect from "../StatusSelect/StatusSelect";
import css from "./MyLibraryBooks.module.css";

const MyLibraryBooks = ({
  books,
  status,
  onStatusChange,
  onOpenBook,
  onDeleteBook,
  onScrollToForm,
}) => {
  return (
    <section className={css.section}>
      <div className={css.headerRow}>
        <h1 className={css.title}>My library</h1>
        <StatusSelect value={status} onChange={onStatusChange} />
      </div>

      {books.length === 0 ? (
        <div className={css.empty}>
          <div className={css.emptyIcon} aria-hidden="true">📚</div>
          <p className={css.emptyText}>
            To start training, add{" "}
            <a href="#add-book-form" onClick={onScrollToForm} className={css.emptyLink}>
              some of your books
            </a>{" "}
            or from the recommended ones
          </p>
        </div>
      ) : (
        <div className={css.grid}>
          {books.map((book) => (
            <LibraryBookCard
              key={book._id}
              book={book}
              onOpen={onOpenBook}
              onDelete={onDeleteBook}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyLibraryBooks;
