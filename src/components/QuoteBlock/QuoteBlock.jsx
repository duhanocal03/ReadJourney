import css from "./QuoteBlock.module.css";

const QuoteBlock = () => {
  return (
    <div className={css.card}>
      <span className={css.icon} aria-hidden="true">📚</span>
      <p className={css.quote}>
        <strong>Books are windows</strong> to the world, and reading is a
        journey into the unknown.
      </p>
    </div>
  );
};

export default QuoteBlock;
