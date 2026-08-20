import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) return null;

  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;