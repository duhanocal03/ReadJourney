import css from "./Dashboard.module.css";

const Dashboard = ({ children }) => {
  return <aside className={css.sidebar}>{children}</aside>;
};

export default Dashboard;
