import { createContext, useContext, useEffect, useState } from "react";
import { setAuthHeader, clearAuthHeader } from "../../api/axiosInstance";
import { getCurrentUser } from "../../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) {
        setIsRefreshing(false);
        return;
      }
      setAuthHeader(savedToken);
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setToken(savedToken);
      } catch {
        localStorage.removeItem("token");
        clearAuthHeader();
      } finally {
        setIsRefreshing(false);
      }
    };
    restoreSession();
  }, []);

  const login = ({ user: loggedInUser, token: newToken }) => {
    localStorage.setItem("token", newToken);
    setAuthHeader(newToken);
    setUser(loggedInUser);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    clearAuthHeader();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isLoggedIn: Boolean(token),
    isRefreshing,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};