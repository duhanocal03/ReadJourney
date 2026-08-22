import css from "./CompletionMessage.module.css";

const CompletionMessage = ({ book }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.icon} aria-hidden="true">🎉</div>
      <h2 className={css.title}>Congratulations!</h2>
      <p className={css.text}>
        You have finished reading <strong>{book.title}</strong>. Great job!
      </p>
    </div>
  );
};

export default CompletionMessage;