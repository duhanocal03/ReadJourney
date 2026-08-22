import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import MiniRecommended from "../../components/MiniRecommended/MiniRecommended";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import BookModal from "../../components/BookModal/BookModal";
import BookDetails from "../../components/BookModal/BookDetails";
import GoodJobMessage from "../../components/BookModal/GoodJobMessage";
import { getOwnBooks, removeBook } from "../../api/books";
import { isFirstBookAdd, markFirstBookAdded } from "../../utils/firstBook";
import css from "./Library.module.css";

const Library = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [showGoodJob, setShowGoodJob] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadBooks = async () => {
      try {
        const params = status !== "all" ? { status } : undefined;
        const data = await getOwnBooks(params);
        const results = Array.isArray(data) ? data : data.results || [];
        if (!ignore) setBooks(results);
      } catch (error) {
        if (!ignore) {
          toast.error(
            error?.response?.data?.message || "Kitaplar yüklenirken hata oluştu"
          );
        }
      }
    };

    loadBooks();

    return () => {
      ignore = true;
    };
  }, [status, reloadKey]);

  const refreshBooks = () => setReloadKey((key) => key + 1);

  const handleBookAdded = () => {
    if (isFirstBookAdd()) {
      markFirstBookAdded();
      setShowGoodJob(true);
    }
    refreshBooks();
  };

  const handleDelete = async (id) => {
    try {
      await removeBook(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      toast.success("Kitap kütüphaneden silindi");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kitap silinirken hata oluştu"
      );
    }
  };

  const handleStartReading = () => {
    if (!selectedBook) return;
    navigate("/reading", { state: { book: selectedBook } });
  };

  const scrollToForm = (e) => {
    e.preventDefault();
    document
      .getElementById("add-book-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={css.wrapper}>
      <Dashboard>
        <AddBookForm onAdded={handleBookAdded} />
        <MiniRecommended onBookClick={setSelectedBook} />
      </Dashboard>

      <MyLibraryBooks
        books={books}
        status={status}
        onStatusChange={setStatus}
        onOpenBook={setSelectedBook}
        onDeleteBook={handleDelete}
        onScrollToForm={scrollToForm}
      />

      {selectedBook && (
        <BookModal onClose={() => setSelectedBook(null)}>
          <BookDetails
            book={selectedBook}
            actionLabel="Start reading"
            onAction={handleStartReading}
          />
        </BookModal>
      )}

      {showGoodJob && (
        <BookModal onClose={() => setShowGoodJob(false)}>
          <GoodJobMessage />
        </BookModal>
      )}
    </div>
  );
};

export default Library;