import { Link } from "react-router-dom";
import css from "./InfoBlock.module.css";

const InfoBlock = () => {
  return (
    <div className={css.card}>
      <h2 className={css.title}>Start your workout</h2>
      <ol className={css.steps}>
        <li className={css.step}>
          <span className={css.stepNumber}>1</span>
          <p>
            <strong>Create a personal library:</strong> add the books you
            intend to read to it.
          </p>
        </li>
        <li className={css.step}>
          <span className={css.stepNumber}>2</span>
          <p>
            <strong>Create your first workout:</strong> define a goal, choose
            a period, start training.
          </p>
        </li>
      </ol>
      <Link to="/library" className={css.link}>
        My library <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default InfoBlock;
