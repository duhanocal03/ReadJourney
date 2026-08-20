import { useState } from "react";
import css from "./Filters.module.css";

const Filters = ({ onApply }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({ title: title.trim(), author: author.trim() });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <p className={css.label}>Filters:</p>

      <div className={css.field}>
        <label className={css.fieldLabel} htmlFor="book-title">
          Book title:
        </label>
        <input
          id="book-title"
          type="text"
          placeholder="Enter text"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={css.field}>
        <label className={css.fieldLabel} htmlFor="book-author">
          The author:
        </label>
        <input
          id="book-author"
          type="text"
          placeholder="Enter text"
          className={css.input}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button type="submit" className={css.applyBtn}>
        To apply
      </button>
    </form>
  );
};

export default Filters;
