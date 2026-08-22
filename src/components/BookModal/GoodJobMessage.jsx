import css from "./GoodJobMessage.module.css";

const GoodJobMessage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.icon} aria-hidden="true">👍</div>
      <h2 className={css.title}>Good job</h2>
      <p className={css.text}>
        Your book is now in <strong>the library!</strong> The joy knows no
        bounds and now you can start your training
      </p>
    </div>
  );
};

export default GoodJobMessage;