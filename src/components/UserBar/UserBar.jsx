import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { logoutUser } from "../../api/auth";
import css from "./UserBar.module.css";

const UserBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Çıkış sırasında bir hata oluştu");
    } finally {
      logout();
      navigate("/");
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className={css.wrapper}>
      <div className={css.avatar}>{initial}</div>
      <span className={css.name}>{user?.name}</span>
      <button type="button" className={css.logoutBtn} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default UserBar;
