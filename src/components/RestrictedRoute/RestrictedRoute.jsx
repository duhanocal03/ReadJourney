import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

const RestrictedRoute = ({ children, redirectTo = "/recommended" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) return null;

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;