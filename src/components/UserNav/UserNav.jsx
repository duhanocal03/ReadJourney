import { NavLink } from "react-router-dom";
import css from "./UserNav.module.css";

const UserNav = ({ onNavigate }) => {
  const linkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <nav className={css.nav}>
      <NavLink to="/recommended" className={linkClass} onClick={onNavigate}>
        Home
      </NavLink>
      <NavLink to="/library" className={linkClass} onClick={onNavigate}>
        My library
      </NavLink>
    </nav>
  );
};

export default UserNav;
