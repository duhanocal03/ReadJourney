import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecommendedBooks } from "../../api/books";
import css from "./MiniRecommended.module.css";

const MiniRecommended = ({ onBookClick }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getRecommendedBooks({ page: 1, limit: 3 });
        const results = Array.isArray(data) ? data : data.results || [];
        setBooks(results.slice(0, 3));
      } catch {
        setBooks([]);
      }
    };
    fetchBooks();
  }, []);

  if (books.length === 0) return null;

  return (
    <div className={css.card}>
      <p className={css.title}>Recommended books</p>

      <ul className={css.list}>
        {books.map((book) => (
          <li key={book._id}>
            <button
              type="button"
              className={css.item}
              onClick={() => onBookClick?.(book)}
            >
              <div className={css.coverWrapper}>
                {book.imageUrl ? (
                  <img src={book.imageUrl} alt={book.title} className={css.cover} />
                ) : (
                  <div className={css.coverPlaceholder} />
                )}
              </div>
              <p className={css.bookTitle}>{book.title}</p>
              <p className={css.bookAuthor}>{book.author}</p>
            </button>
          </li>
        ))}
      </ul>

      <Link to="/recommended" className={css.link}>
        <span className={css.linkText}>Home</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default MiniRecommended;
