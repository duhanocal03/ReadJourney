import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddReadingForm from "../../components/AddReadingForm/AddReadingForm";
import Diary from "../../components/Diary/Diary";
import Statistics from "../../components/Statistics/Statistics";
import BookModal from "../../components/BookModal/BookModal";
import CompletionMessage from "../../components/BookModal/CompletionMessage";
import {
  getBookById,
  startReading,
  finishReading,
  deleteReading,
} from "../../api/books";
import css from "./Reading.module.css";

const Reading = () => {
  const location = useLocation();
  const initialBook = location.state?.book;

  const [book, setBook] = useState(initialBook || null);
  const [page, setPage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const entries = book?.progress || [];
  const lastEntry = entries[entries.length - 1];
  const isReading = Boolean(lastEntry && !lastEntry.finishPage);

  const lastFinishedEntry = [...entries].reverse().find((e) => e.finishPage);
  const minPage = isReading
    ? Number(lastEntry?.startPage) || 1
    : Number(lastFinishedEntry?.finishPage) || 1;
  const maxPage = book?.totalPages;

  const refreshBook = async (id) => {
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kitap bilgisi alınırken hata oluştu"
      );
    }
  };

  useEffect(() => {
    if (!initialBook?._id) return;

    let ignore = false;

    const loadBook = async () => {
      try {
        const data = await getBookById(initialBook._id);
        if (!ignore) setBook(data);
      } catch (error) {
        if (!ignore) {
          toast.error(
            error?.response?.data?.message || "Kitap bilgisi alınırken hata oluştu"
          );
        }
      }
    };

    loadBook();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (pageNum) => {
    if (!book) return;
    setSubmitting(true);
    try {
      if (!isReading) {
        await startReading({ id: book._id, page: pageNum });
      } else {
        await finishReading({ id: book._id, page: pageNum });
        if (book.totalPages && pageNum >= book.totalPages) {
          setShowCompletion(true);
        }
      }
      setPage("");
      await refreshBook(book._id);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "İşlem sırasında hata oluştu"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (!book) return;
    try {
      await deleteReading({ id: book._id, readingId: entryId });
      await refreshBook(book._id);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kayıt silinirken hata oluştu"
      );
    }
  };

  if (!book) {
    return (
      <div className={css.noBook}>
        <p>Okumak için önce kütüphanenden bir kitap seçmelisin.</p>
        <Link to="/library" className={css.noBookLink}>
          My library&apos;e git
        </Link>
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <Dashboard>
        <AddReadingForm
          isReading={isReading}
          page={page}
          onPageChange={setPage}
          onSubmit={handleSubmit}
          submitting={submitting}
          minPage={minPage}
          maxPage={maxPage}
        />

        <div className={css.progressCard}>
          <p className={css.progressTitle}>Progress</p>
          <Diary
            entries={entries}
            totalPages={book.totalPages}
            onDeleteEntry={handleDeleteEntry}
          />
          <Statistics entries={entries} />
        </div>
      </Dashboard>

      <section className={css.section}>
        <h1 className={css.title}>My reading</h1>

        <div className={css.bookInfo}>
          <div className={css.coverWrapper}>
            {book.imageUrl ? (
              <img src={book.imageUrl} alt={book.title} className={css.cover} />
            ) : (
              <div className={css.coverPlaceholder} />
            )}
          </div>
          <p className={css.bookTitle}>{book.title}</p>
          <p className={css.bookAuthor}>{book.author}</p>

          <button
            type="submit"
            className={`${css.bigBtn} ${isReading ? css.bigBtnStop : ""}`}
            form="reading-form"
            aria-label={isReading ? "Stop reading" : "Start reading"}
            disabled={submitting}
          >
            {isReading && <span className={css.stopIcon} aria-hidden="true" />}
          </button>
        </div>
      </section>

      {showCompletion && (
        <BookModal onClose={() => setShowCompletion(false)}>
          <CompletionMessage book={book} />
        </BookModal>
      )}
    </div>
  );
};

export default Reading;