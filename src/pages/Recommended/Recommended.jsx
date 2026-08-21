import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Dashboard from "../../components/Dashboard/Dashboard";
import Filters from "../../components/Filters/Filters";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import QuoteBlock from "../../components/QuoteBlock/QuoteBlock";
import RecommendedBooks from "../../components/RecommendedBooks/RecommendedBooks";
import BookModal from "../../components/BookModal/BookModal";
import BookDetails from "../../components/BookModal/BookDetails";
import { getRecommendedBooks, addRecommendedBookToLibrary } from "../../api/books";
import css from "./Recommended.module.css";

const LIMIT = 10;

const Recommended = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      try {
        const params = { page, limit: LIMIT };
        if (filters.title) params.title = filters.title;
        if (filters.author) params.author = filters.author;

        const data = await getRecommendedBooks(params);
        const results = Array.isArray(data) ? data : data.results || [];

        if (ignore) return;
        setBooks(results);

        if (!Array.isArray(data) && data.totalPages) {
          setTotalPages(data.totalPages);
        } else {
          setTotalPages(1);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(
            error?.response?.data?.message || "Kitaplar yüklenirken hata oluştu"
          );
        }
      }
    };

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, [page, filters]);

  const handleApplyFilters = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const handleAddToLibrary = async () => {
    if (!selectedBook) return;
    setAdding(true);
    try {
      await addRecommendedBookToLibrary(selectedBook._id);
      toast.success("Kitap kütüphanene eklendi");
      setSelectedBook(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kitap eklenirken hata oluştu"
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <Dashboard>
        <Filters onApply={handleApplyFilters} />
        <InfoBlock />
        <QuoteBlock />
      </Dashboard>

      <RecommendedBooks
        books={books}
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        onCardClick={setSelectedBook}
      />

      {selectedBook && (
        <BookModal onClose={() => setSelectedBook(null)}>
          <BookDetails
            book={selectedBook}
            actionLabel="Add to library"
            onAction={handleAddToLibrary}
            actionLoading={adding}
          />
        </BookModal>
      )}
    </div>
  );
};

export default Recommended;