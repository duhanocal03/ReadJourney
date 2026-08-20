import { useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "../UserNav/UserNav";
import UserBar from "../UserBar/UserBar";
import logo from "../../assets/Logo.svg";
import logoMobile from "../../assets/Logo-mobile.svg";
import css from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={css.header}>
      <Link to="/recommended" className={css.logoLink}>
        <img src={logo} alt="Read Journey" className={css.logoDesktop} />
        <img src={logoMobile} alt="Read Journey" className={css.logoMobile} />
      </Link>

      <div className={css.desktopNav}>
        <UserNav />
      </div>

      <div className={css.right}>
        <UserBar />
        <button
          type="button"
          className={css.burgerBtn}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className={css.mobileMenu}>
          <UserNav onNavigate={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
