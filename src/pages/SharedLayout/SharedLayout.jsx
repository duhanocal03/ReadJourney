import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import css from "./SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={css.wrapper}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
