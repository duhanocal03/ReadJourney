import { useState } from "react";
import css from "./AddReadingForm.module.css";

const AddReadingForm = ({
  isReading,
  page,
  onPageChange,
  onSubmit,
  submitting,
  minPage = 1,
  maxPage,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const pageNum = Number(page);

    if (!page || Number.isNaN(pageNum) || pageNum < 1) {
      setError("Lütfen geçerli bir sayfa numarası gir");
      return;
    }
    if (pageNum < minPage) {
      setError(
        isReading
          ? `Bitiş sayfası en az ${minPage} olmalı`
          : `Başlangıç sayfası en az ${minPage} olmalı (önceki bitiş sayfandan düşük olamaz)`
      );
      return;
    }
    if (maxPage && pageNum > maxPage) {
      setError(`Sayfa numarası kitabın toplam sayfa sayısını (${maxPage}) geçemez`);
      return;
    }

    setError("");
    onSubmit(pageNum);
  };

  return (
    <form id="reading-form" className={css.form} onSubmit={handleSubmit}>
      <p className={css.label}>{isReading ? "Stop page:" : "Start page:"}</p>

      <div className={css.field}>
        <label className={css.fieldLabel} htmlFor="page-number">
          Page number:
        </label>
        <input
          id="page-number"
          type="number"
          min={minPage}
          max={maxPage}
          placeholder="0"
          className={css.input}
          value={page}
          onChange={(e) => {
            onPageChange(e.target.value);
            if (error) setError("");
          }}
        />
        {error && <p className={css.error}>{error}</p>}
      </div>

      <button type="submit" className={css.submitBtn} disabled={submitting}>
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  );
};

export default AddReadingForm;