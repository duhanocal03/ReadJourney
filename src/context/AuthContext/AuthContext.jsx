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
        setToken(null);
        setUser(null);
      } finally {
        setIsRefreshing(false);
      }
    };
    restoreSession();
  }, []);

  const login = async ({ user: loggedInUser, token: newToken }) => {
    localStorage.setItem("token", newToken);
    setAuthHeader(newToken);
    setToken(newToken);
    setUser(loggedInUser);

    try {
      const fullUser = await getCurrentUser();
      console.log("getCurrentUser() sonucu:", fullUser);
      setUser(fullUser);
    } catch (err) {
      console.error("getCurrentUser() hatası:", err?.response?.status, err?.response?.data, err);
    }
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